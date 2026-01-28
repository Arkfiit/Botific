import { NextRequest, NextResponse } from 'next/server'
import { classifyVisitor } from '@/lib/detection'

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

        // TODO: Store in database
        // For now, log the classification
        console.log('[Ingest]', {
            siteId: payload.siteId,
            sessionId: payload.sessionId,
            url: payload.url,
            classification: classification.label,
            confidence: classification.confidence,
            agent: classification.agent,
        })

        // Return classification result (useful for debugging)
        return NextResponse.json({
            success: true,
            sessionId: payload.sessionId,
            classification: {
                label: classification.label,
                confidence: classification.confidence,
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
