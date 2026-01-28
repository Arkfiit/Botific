import { NextRequest, NextResponse } from 'next/server'
import { classifyVisitor, getPatternStats } from '@/lib/detection'

/**
 * API endpoint to test bot detection
 * POST /api/detect
 */
export async function POST(request: NextRequest) {
    try {
        const { userAgent, ip } = await request.json()

        if (!userAgent) {
            return NextResponse.json(
                { error: 'userAgent is required' },
                { status: 400 }
            )
        }

        const result = classifyVisitor({
            userAgent,
            ip,
        })

        return NextResponse.json({
            success: true,
            result,
        })

    } catch (error) {
        return NextResponse.json(
            { error: 'Failed to process request' },
            { status: 500 }
        )
    }
}

/**
 * GET endpoint for pattern stats
 */
export async function GET() {
    const stats = getPatternStats()

    return NextResponse.json({
        success: true,
        patternStats: stats,
        message: `Botfic can detect ${stats.total} different bots including ${stats.aiAgents} AI agents`,
    })
}
