import { NextRequest, NextResponse } from 'next/server'
import { classifyVisitor } from '@/lib/detection'
import { createClient } from '@supabase/supabase-js'

// Types
interface IngestPayload {
    siteId: string
    sessionId: string
    url: string
    referrer?: string
    userAgent: string
    timestamp: number
    screenWidth?: number
    screenHeight?: number
    timezone?: string
    language?: string
    cookiesEnabled?: boolean
    jsEnabled?: boolean
}

// Rate limiting map (in production, use Redis)
const rateLimitMap = new Map<string, { count: number; resetTime: number }>()

function checkRateLimit(ip: string): boolean {
    const now = Date.now()
    const limit = rateLimitMap.get(ip)

    if (!limit || now > limit.resetTime) {
        rateLimitMap.set(ip, { count: 1, resetTime: now + 60000 }) // 1 minute window
        return true
    }

    if (limit.count >= 100) { // 100 requests per minute
        return false
    }

    limit.count++
    return true
}

export async function POST(request: NextRequest) {
    try {
        // Get client IP for rate limiting
        const ip = request.headers.get('x-forwarded-for')?.split(',')[0] ||
            request.headers.get('x-real-ip') ||
            'unknown'

        // Check rate limit
        if (!checkRateLimit(ip)) {
            return NextResponse.json(
                { error: 'Rate limit exceeded' },
                { status: 429 }
            )
        }

        // Parse request body
        const payload: IngestPayload = await request.json()

        // Validate required fields
        if (!payload.siteId || !payload.sessionId || !payload.url || !payload.userAgent) {
            return NextResponse.json(
                { error: 'Missing required fields' },
                { status: 400 }
            )
        }

        // Classify the visitor
        const classification = classifyVisitor({
            userAgent: payload.userAgent,
            ip,
            url: payload.url,
            referrer: payload.referrer,
            screenWidth: payload.screenWidth,
            screenHeight: payload.screenHeight,
            cookiesEnabled: payload.cookiesEnabled,
            jsEnabled: payload.jsEnabled,
        })

        // Initialize Supabase Client (Anon)
        // Note: In a real production app, you would use the SERVICE_ROLE_KEY to bypass RLS for ingestion,
        // or ensure your RLS policy allows 'INSERT' for public users on specific tables.
        const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL!
        const supabaseKey = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!
        const supabase = createClient(supabaseUrl, supabaseKey)

        // 1. Store Raw Event
        const { error: eventError } = await supabase
            .from('analytics_events')
            .insert({
                project_id: payload.siteId, // Assuming siteId is the UUID of the project
                session_id: payload.sessionId,
                visitor_type: classification.label, // 'human', 'ai_agent', 'bad_bot', 'search_bot'
                agent_name: classification.agent || null,
                path: new URL(payload.url).pathname,
                country: request.headers.get('x-vercel-ip-country') || 'Unknown',
                device: payload.screenWidth ? (payload.screenWidth < 768 ? 'Mobile' : 'Desktop') : 'Unknown',
                duration: 0, // Initial hit
            })

        if (eventError) {
            console.error('[Supabase Insert Error]', eventError)
            // Don't fail the request to the client, just log it
        }

        // 2. If it's an AI Agent, update Opportunities (Upsert)
        if (classification.label === 'ai_agent' && classification.agent) {
            // We can't easily upsert with increment in standard client without a stored procedure or RLS blocking.
            // For MVP, we'll try a raw insert if the schema allows, or just rely on raw events for calculating this later.
            // Ideally: call an RPC function 'increment_agent_visit'
        }

        console.log('[Ingest] Processed:', {
            siteId: payload.siteId,
            type: classification.label,
            agent: classification.agent
        })

        return NextResponse.json({
            success: true,
            classification: {
                label: classification.label,
                agent: classification.agent,
            }
        })

    } catch (error) {
        console.error('[Ingest Error]', error)
        return NextResponse.json(
            { error: 'Internal server error' },
            { status: 500 }
        )
    }
}

// Handle OPTIONS for CORS preflight
export async function OPTIONS() {
    return new NextResponse(null, {
        status: 200,
        headers: {
            'Access-Control-Allow-Origin': '*',
            'Access-Control-Allow-Methods': 'POST, OPTIONS',
            'Access-Control-Allow-Headers': 'Content-Type',
        },
    })
}
