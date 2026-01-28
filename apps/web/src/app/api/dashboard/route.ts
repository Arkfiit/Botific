import { NextRequest, NextResponse } from 'next/server'

// Mock data for dashboard API
// In production, this would come from the database

const mockStats = {
    totalVisits: 10234,
    humanTraffic: 42,
    aiAgentTraffic: 28,
    searchBotTraffic: 18,
    badBotTraffic: 12,
    aiVisibilityScore: 78,
    trueConversionRate: 3.8,
    pollutedConversionRate: 1.4,
    trueBounceRate: 45,
    pollutedBounceRate: 72,
    trueAvgDuration: 192, // seconds
    pollutedAvgDuration: 34, // seconds
}

const mockTrafficBreakdown = {
    human: { count: 4287, pct: 42, trend: -2 },
    aiAgent: { count: 2866, pct: 28, trend: 45 },
    searchBot: { count: 1842, pct: 18, trend: 5 },
    badBot: { count: 1239, pct: 12, trend: -8 },
}

const mockAIAgents = [
    {
        id: 1,
        name: 'ChatGPT (GPTBot)',
        company: 'OpenAI',
        visits: 1234,
        trend: 23,
        topPages: ['/pricing', '/features', '/vs-competitor', '/docs'],
        firstSeen: '2024-01-15',
        lastSeen: new Date().toISOString(),
        frequency: 'Daily',
        status: 'active'
    },
    {
        id: 2,
        name: 'Perplexity',
        company: 'Perplexity AI',
        visits: 856,
        trend: 67,
        topPages: ['/blog/how-to-guide', '/docs', '/pricing'],
        firstSeen: '2024-02-20',
        lastSeen: new Date().toISOString(),
        frequency: 'Daily',
        status: 'active'
    },
    {
        id: 3,
        name: 'Claude',
        company: 'Anthropic',
        visits: 432,
        trend: 12,
        topPages: ['/api-docs', '/integrations', '/changelog'],
        firstSeen: '2024-03-01',
        lastSeen: new Date(Date.now() - 86400000).toISOString(),
        frequency: 'Weekly',
        status: 'active'
    },
    {
        id: 4,
        name: 'Gemini',
        company: 'Google',
        visits: 325,
        trend: 89,
        topPages: ['/pricing', '/about', '/case-studies'],
        firstSeen: '2024-03-15',
        lastSeen: new Date().toISOString(),
        frequency: 'Daily',
        status: 'active'
    },
]

const mockRecentActivity = [
    { time: new Date(Date.now() - 120000).toISOString(), type: 'ai', agent: 'ChatGPT', page: '/pricing', action: 'Page view' },
    { time: new Date(Date.now() - 300000).toISOString(), type: 'human', agent: null, page: '/features', action: 'Conversion' },
    { time: new Date(Date.now() - 480000).toISOString(), type: 'search', agent: 'Googlebot', page: '/blog/how-to', action: 'Crawl' },
    { time: new Date(Date.now() - 720000).toISOString(), type: 'ai', agent: 'Perplexity', page: '/docs', action: 'Page view' },
    { time: new Date(Date.now() - 900000).toISOString(), type: 'bad', agent: 'Unknown Scraper', page: '/api/*', action: 'Blocked' },
]

export async function GET(request: NextRequest) {
    const { searchParams } = new URL(request.url)
    const dataType = searchParams.get('type') || 'overview'
    const siteId = searchParams.get('siteId') || 'default'
    const range = searchParams.get('range') || '7d'

    // TODO: Add authentication check
    // TODO: Fetch real data from database

    switch (dataType) {
        case 'overview':
            return NextResponse.json({
                stats: mockStats,
                trafficBreakdown: mockTrafficBreakdown,
                topAIAgents: mockAIAgents.slice(0, 4),
                recentActivity: mockRecentActivity,
            })

        case 'true-metrics':
            return NextResponse.json({
                sessions: { polluted: 10234, true: 4287, change: -58 },
                conversionRate: { polluted: 1.4, true: 3.8, change: 171 },
                bounceRate: { polluted: 72, true: 45, change: -38 },
                avgDuration: { polluted: 34, true: 192, change: 465 },
                pageViews: { polluted: 28456, true: 14230, change: -50 },
                avgPagesPerSession: { polluted: 1.8, true: 3.3, change: 83 },
            })

        case 'bot-traffic':
            return NextResponse.json({
                breakdown: mockTrafficBreakdown,
                bots: [
                    { name: 'ChatGPT (GPTBot)', type: 'AI Agent', visits: 1234, status: 'good', action: 'Allow' },
                    { name: 'Perplexity', type: 'AI Agent', visits: 856, status: 'good', action: 'Allow' },
                    { name: 'Googlebot', type: 'Search', visits: 1245, status: 'good', action: 'Allow' },
                    { name: 'Bingbot', type: 'Search', visits: 597, status: 'good', action: 'Allow' },
                    { name: 'Claude', type: 'AI Agent', visits: 432, status: 'good', action: 'Allow' },
                    { name: 'AhrefsBot', type: 'SEO Tool', visits: 345, status: 'neutral', action: 'Monitor' },
                    { name: 'Unknown Scraper', type: 'Bad Bot', visits: 567, status: 'bad', action: 'Block' },
                    { name: 'DataForSeo', type: 'Scraper', visits: 423, status: 'bad', action: 'Block' },
                ],
            })

        case 'ai-agents':
            return NextResponse.json({
                aiVisibilityScore: 78,
                previousScore: 66,
                agents: mockAIAgents,
                pageAccessFrequency: [
                    { page: '/pricing', visits: 2340, agents: ['ChatGPT', 'Perplexity', 'Gemini'] },
                    { page: '/features', visits: 1890, agents: ['ChatGPT', 'Claude'] },
                    { page: '/docs', visits: 1567, agents: ['Perplexity', 'Claude', 'Copilot'] },
                    { page: '/blog/how-to-guide', visits: 1234, agents: ['Perplexity'] },
                    { page: '/api-docs', visits: 987, agents: ['Claude', 'Copilot'] },
                ],
            })

        case 'optimization':
            return NextResponse.json({
                completedCount: 1,
                inProgressCount: 1,
                pendingCount: 3,
                recommendations: [
                    {
                        id: 1,
                        priority: 'high',
                        category: 'content',
                        title: 'Add structured data to your pricing page',
                        description: 'Your /pricing page gets 3x more AI agent visits than any other page.',
                        impact: 'High impact on AI readability',
                        effort: 'Low effort',
                        status: 'pending',
                    },
                    {
                        id: 2,
                        priority: 'high',
                        category: 'content',
                        title: 'Create an AI-friendly sitemap (llms.txt)',
                        description: 'AI agents prefer llms.txt files that describe your site structure.',
                        impact: 'High impact on discoverability',
                        effort: 'Medium effort',
                        status: 'pending',
                    },
                    {
                        id: 3,
                        priority: 'medium',
                        category: 'technical',
                        title: 'Update robots.txt for AI agents',
                        description: 'Your robots.txt currently blocks some AI crawlers.',
                        impact: 'Medium impact on visibility',
                        effort: 'Low effort',
                        status: 'in-progress',
                    },
                ],
            })

        default:
            return NextResponse.json(
                { error: 'Invalid data type' },
                { status: 400 }
            )
    }
}
