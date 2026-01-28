'use client'

import {
    Users,
    Bot,
    Search,
    AlertTriangle,
    TrendingUp,
    TrendingDown,
    ArrowUpRight,
    Activity,
    Eye
} from 'lucide-react'

// Mock data for the dashboard
const overviewStats = {
    totalVisits: 10234,
    humanTraffic: 42,
    aiAgentTraffic: 28,
    searchBotTraffic: 18,
    badBotTraffic: 12,
    aiVisibilityScore: 78,
    trueConversionRate: 3.8,
    pollutedConversionRate: 1.4,
}

const recentActivity = [
    { time: '2 min ago', type: 'ai', agent: 'ChatGPT', page: '/pricing', action: 'Page view' },
    { time: '5 min ago', type: 'human', agent: null, page: '/features', action: 'Conversion' },
    { time: '8 min ago', type: 'search', agent: 'Googlebot', page: '/blog/how-to', action: 'Crawl' },
    { time: '12 min ago', type: 'ai', agent: 'Perplexity', page: '/docs', action: 'Page view' },
    { time: '15 min ago', type: 'bad', agent: 'Unknown Scraper', page: '/api/*', action: 'Blocked' },
]

const topAIAgents = [
    { name: 'ChatGPT', visits: 1234, trend: '+23%', pages: ['/pricing', '/features'] },
    { name: 'Perplexity', visits: 856, trend: '+67%', pages: ['/blog', '/docs'] },
    { name: 'Claude', visits: 432, trend: '+12%', pages: ['/api-docs', '/integrations'] },
    { name: 'Gemini', visits: 325, trend: '+89%', pages: ['/pricing', '/about'] },
]

export default function DashboardOverview() {
    return (
        <div className="space-y-6">
            {/* Page header */}
            <div className="flex items-center justify-between">
                <div>
                    <h1 className="text-2xl font-bold text-white">Overview</h1>
                    <p className="text-dark-400">Your traffic at a glance</p>
                </div>
                <div className="flex items-center gap-2 px-3 py-2 bg-dark-800 rounded-xl text-dark-300 text-sm">
                    <Activity className="w-4 h-4" />
                    <span>Last 7 days</span>
                </div>
            </div>

            {/* Main stats grid */}
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
                <StatCard
                    label="Total Visits"
                    value={overviewStats.totalVisits.toLocaleString()}
                    icon={<Eye className="w-5 h-5" />}
                    trend="+12%"
                    trendUp={true}
                    color="primary"
                />
                <StatCard
                    label="Human Traffic"
                    value={`${overviewStats.humanTraffic}%`}
                    icon={<Users className="w-5 h-5" />}
                    subtext={`${Math.round(overviewStats.totalVisits * overviewStats.humanTraffic / 100).toLocaleString()} visits`}
                    color="success"
                />
                <StatCard
                    label="AI Agent Traffic"
                    value={`${overviewStats.aiAgentTraffic}%`}
                    icon={<Bot className="w-5 h-5" />}
                    trend="+45%"
                    trendUp={true}
                    subtext={`${Math.round(overviewStats.totalVisits * overviewStats.aiAgentTraffic / 100).toLocaleString()} visits`}
                    color="accent"
                />
                <StatCard
                    label="Bad Bot Traffic"
                    value={`${overviewStats.badBotTraffic}%`}
                    icon={<AlertTriangle className="w-5 h-5" />}
                    trend="-8%"
                    trendUp={false}
                    subtext="Identified & filtered"
                    color="danger"
                />
            </div>

            {/* Second row - Key insights */}
            <div className="grid grid-cols-1 lg:grid-cols-3 gap-4">
                {/* AI Visibility Score */}
                <div className="bg-dark-800/50 border border-primary-500/30 rounded-2xl p-6">
                    <div className="flex items-center justify-between mb-4">
                        <h3 className="text-dark-400 font-medium">AI Visibility Score</h3>
                        <span className="text-xs text-success-400 bg-success-500/10 px-2 py-1 rounded-full">+12 this week</span>
                    </div>
                    <div className="flex items-baseline gap-2">
                        <span className="text-5xl font-bold text-white">{overviewStats.aiVisibilityScore}</span>
                        <span className="text-2xl text-primary-400">/100</span>
                    </div>
                    <div className="mt-4 h-3 bg-dark-700 rounded-full overflow-hidden">
                        <div
                            className="h-full bg-gradient-to-r from-primary-500 to-accent-500 rounded-full transition-all duration-500"
                            style={{ width: `${overviewStats.aiVisibilityScore}%` }}
                        />
                    </div>
                    <p className="mt-3 text-dark-400 text-sm">
                        Your site is well-positioned for AI agent discovery
                    </p>
                </div>

                {/* True Metrics Highlight */}
                <div className="bg-dark-800/50 border border-success-500/30 rounded-2xl p-6">
                    <div className="flex items-center justify-between mb-4">
                        <h3 className="text-dark-400 font-medium">True Conversion Rate</h3>
                        <span className="text-xs text-success-400">Humans only</span>
                    </div>
                    <div className="flex items-center gap-4">
                        <div>
                            <div className="text-dark-500 text-sm line-through">{overviewStats.pollutedConversionRate}%</div>
                            <div className="text-4xl font-bold text-success-400">{overviewStats.trueConversionRate}%</div>
                        </div>
                        <div className="flex-1">
                            <div className="text-success-400 text-lg font-semibold flex items-center gap-1">
                                <TrendingUp className="w-5 h-5" />
                                +171%
                            </div>
                            <div className="text-dark-400 text-sm">vs polluted rate</div>
                        </div>
                    </div>
                    <p className="mt-4 text-dark-400 text-sm">
                        Your real conversion rate is <span className="text-success-400 font-medium">2.7x better</span> than GA shows
                    </p>
                </div>

                {/* Traffic Distribution */}
                <div className="bg-dark-800/50 border border-dark-700 rounded-2xl p-6">
                    <h3 className="text-dark-400 font-medium mb-4">Traffic Distribution</h3>
                    <div className="space-y-3">
                        <TrafficBar label="Human" pct={overviewStats.humanTraffic} color="success" icon="👤" />
                        <TrafficBar label="AI Agent" pct={overviewStats.aiAgentTraffic} color="primary" icon="🤖" />
                        <TrafficBar label="Search Bot" pct={overviewStats.searchBotTraffic} color="accent" icon="🔍" />
                        <TrafficBar label="Bad Bot" pct={overviewStats.badBotTraffic} color="danger" icon="⚠️" />
                    </div>
                </div>
            </div>

            {/* Third row - Tables */}
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
                {/* Top AI Agents */}
                <div className="bg-dark-800/50 border border-dark-700 rounded-2xl p-6">
                    <div className="flex items-center justify-between mb-4">
                        <h3 className="text-white font-semibold">Top AI Agents</h3>
                        <a href="/dashboard/ai-agents" className="text-primary-400 text-sm hover:text-primary-300 flex items-center gap-1">
                            View all <ArrowUpRight className="w-4 h-4" />
                        </a>
                    </div>
                    <div className="space-y-3">
                        {topAIAgents.map((agent, i) => (
                            <div key={i} className="flex items-center justify-between p-3 bg-dark-800 rounded-xl">
                                <div className="flex items-center gap-3">
                                    <div className="w-10 h-10 rounded-xl bg-primary-500/20 flex items-center justify-center">
                                        <Bot className="w-5 h-5 text-primary-400" />
                                    </div>
                                    <div>
                                        <div className="text-white font-medium">{agent.name}</div>
                                        <div className="text-dark-400 text-sm">{agent.visits.toLocaleString()} visits</div>
                                    </div>
                                </div>
                                <div className="text-right">
                                    <div className="text-success-400 text-sm font-medium">{agent.trend}</div>
                                    <div className="text-dark-500 text-xs">{agent.pages[0]}</div>
                                </div>
                            </div>
                        ))}
                    </div>
                </div>

                {/* Recent Activity */}
                <div className="bg-dark-800/50 border border-dark-700 rounded-2xl p-6">
                    <div className="flex items-center justify-between mb-4">
                        <h3 className="text-white font-semibold">Recent Activity</h3>
                        <span className="text-dark-400 text-sm">Live feed</span>
                    </div>
                    <div className="space-y-3">
                        {recentActivity.map((activity, i) => (
                            <div key={i} className="flex items-center gap-3 p-3 bg-dark-800 rounded-xl">
                                <ActivityIcon type={activity.type} />
                                <div className="flex-1 min-w-0">
                                    <div className="flex items-center gap-2">
                                        <span className="text-white font-medium truncate">
                                            {activity.agent || 'Human visitor'}
                                        </span>
                                        <span className="text-dark-500 text-xs">{activity.time}</span>
                                    </div>
                                    <div className="text-dark-400 text-sm truncate">
                                        {activity.action} • {activity.page}
                                    </div>
                                </div>
                            </div>
                        ))}
                    </div>
                </div>
            </div>
        </div>
    )
}

function StatCard({
    label,
    value,
    icon,
    trend,
    trendUp,
    subtext,
    color
}: {
    label: string
    value: string
    icon: React.ReactNode
    trend?: string
    trendUp?: boolean
    subtext?: string
    color: 'primary' | 'success' | 'accent' | 'danger'
}) {
    const colors = {
        primary: 'from-primary-500/20 to-primary-500/5 border-primary-500/30 text-primary-400',
        success: 'from-success-500/20 to-success-500/5 border-success-500/30 text-success-400',
        accent: 'from-accent-500/20 to-accent-500/5 border-accent-500/30 text-accent-400',
        danger: 'from-danger-500/20 to-danger-500/5 border-danger-500/30 text-danger-400',
    }

    return (
        <div className={`bg-gradient-to-br ${colors[color]} border rounded-2xl p-5`}>
            <div className="flex items-center justify-between mb-3">
                <span className="text-dark-400 text-sm font-medium">{label}</span>
                <div className={`w-10 h-10 rounded-xl bg-dark-800/50 flex items-center justify-center ${colors[color].split(' ').pop()}`}>
                    {icon}
                </div>
            </div>
            <div className="text-3xl font-bold text-white mb-1">{value}</div>
            {trend && (
                <div className={`flex items-center gap-1 text-sm ${trendUp ? 'text-success-400' : 'text-danger-400'}`}>
                    {trendUp ? <TrendingUp className="w-4 h-4" /> : <TrendingDown className="w-4 h-4" />}
                    {trend}
                </div>
            )}
            {subtext && <div className="text-dark-400 text-sm">{subtext}</div>}
        </div>
    )
}

function TrafficBar({ label, pct, color, icon }: { label: string; pct: number; color: string; icon: string }) {
    const colors = {
        success: 'bg-success-500',
        primary: 'bg-primary-500',
        accent: 'bg-accent-500',
        danger: 'bg-danger-500',
    }
    return (
        <div>
            <div className="flex items-center justify-between text-sm mb-1">
                <span className="text-dark-300">{icon} {label}</span>
                <span className="text-white font-medium">{pct}%</span>
            </div>
            <div className="h-2 bg-dark-700 rounded-full overflow-hidden">
                <div
                    className={`h-full ${colors[color as keyof typeof colors]} rounded-full transition-all duration-500`}
                    style={{ width: `${pct}%` }}
                />
            </div>
        </div>
    )
}

function ActivityIcon({ type }: { type: string }) {
    const configs = {
        human: { icon: <Users className="w-4 h-4" />, bg: 'bg-success-500/20', color: 'text-success-400' },
        ai: { icon: <Bot className="w-4 h-4" />, bg: 'bg-primary-500/20', color: 'text-primary-400' },
        search: { icon: <Search className="w-4 h-4" />, bg: 'bg-accent-500/20', color: 'text-accent-400' },
        bad: { icon: <AlertTriangle className="w-4 h-4" />, bg: 'bg-danger-500/20', color: 'text-danger-400' },
    }
    const config = configs[type as keyof typeof configs] || configs.human

    return (
        <div className={`w-10 h-10 rounded-xl ${config.bg} flex items-center justify-center ${config.color}`}>
            {config.icon}
        </div>
    )
}
