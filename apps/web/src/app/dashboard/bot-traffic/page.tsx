'use client'

import { useState } from 'react'
import {
    Users,
    Bot,
    Search,
    AlertTriangle,
    PieChart,
    TrendingUp,
    TrendingDown,
    Info,
    Filter,
    Calendar
} from 'lucide-react'

// Mock traffic data
const trafficBreakdown = {
    human: { count: 4287, pct: 42, trend: -2 },
    aiAgent: { count: 2866, pct: 28, trend: 45 },
    searchBot: { count: 1842, pct: 18, trend: 5 },
    badBot: { count: 1239, pct: 12, trend: -8 },
}

const dailyData = [
    { day: 'Mon', human: 580, aiAgent: 420, searchBot: 280, badBot: 150 },
    { day: 'Tue', human: 620, aiAgent: 380, searchBot: 260, badBot: 180 },
    { day: 'Wed', human: 590, aiAgent: 450, searchBot: 300, badBot: 120 },
    { day: 'Thu', human: 640, aiAgent: 410, searchBot: 270, badBot: 160 },
    { day: 'Fri', human: 680, aiAgent: 480, searchBot: 290, badBot: 140 },
    { day: 'Sat', human: 520, aiAgent: 350, searchBot: 220, badBot: 200 },
    { day: 'Sun', human: 500, aiAgent: 340, searchBot: 210, badBot: 190 },
]

const botDetails = [
    { name: 'ChatGPT (GPTBot)', type: 'AI Agent', visits: 1234, status: 'good', action: 'Allow' },
    { name: 'Perplexity', type: 'AI Agent', visits: 856, status: 'good', action: 'Allow' },
    { name: 'Googlebot', type: 'Search', visits: 1245, status: 'good', action: 'Allow' },
    { name: 'Bingbot', type: 'Search', visits: 597, status: 'good', action: 'Allow' },
    { name: 'Claude', type: 'AI Agent', visits: 432, status: 'good', action: 'Allow' },
    { name: 'AhrefsBot', type: 'SEO Tool', visits: 345, status: 'neutral', action: 'Monitor' },
    { name: 'Unknown Scraper', type: 'Bad Bot', visits: 567, status: 'bad', action: 'Block' },
    { name: 'DataForSeo', type: 'Scraper', visits: 423, status: 'bad', action: 'Block' },
]

const timeRanges = ['Today', '7 days', '30 days', '90 days']

export default function BotTrafficPage() {
    const [selectedRange, setSelectedRange] = useState('7 days')
    const [filterType, setFilterType] = useState('all')

    const filteredBots = filterType === 'all'
        ? botDetails
        : botDetails.filter(bot => {
            if (filterType === 'good') return bot.status === 'good'
            if (filterType === 'bad') return bot.status === 'bad'
            return true
        })

    return (
        <div className="space-y-6">
            {/* Page header */}
            <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
                <div>
                    <h1 className="text-2xl font-bold text-white">Bot Traffic</h1>
                    <p className="text-dark-400">Understand who's visiting your site</p>
                </div>
                <div className="flex items-center gap-2 p-1 bg-dark-800 rounded-xl">
                    {timeRanges.map((range) => (
                        <button
                            key={range}
                            onClick={() => setSelectedRange(range)}
                            className={`px-4 py-2 rounded-lg text-sm font-medium transition-colors ${selectedRange === range
                                    ? 'bg-primary-500 text-white'
                                    : 'text-dark-400 hover:text-white'
                                }`}
                        >
                            {range}
                        </button>
                    ))}
                </div>
            </div>

            {/* Traffic breakdown cards */}
            <div className="grid grid-cols-2 lg:grid-cols-4 gap-4">
                <TrafficCard
                    label="Human"
                    icon="👤"
                    count={trafficBreakdown.human.count}
                    pct={trafficBreakdown.human.pct}
                    trend={trafficBreakdown.human.trend}
                    color="success"
                />
                <TrafficCard
                    label="AI Agent"
                    icon="🤖"
                    count={trafficBreakdown.aiAgent.count}
                    pct={trafficBreakdown.aiAgent.pct}
                    trend={trafficBreakdown.aiAgent.trend}
                    color="primary"
                />
                <TrafficCard
                    label="Search Bot"
                    icon="🔍"
                    count={trafficBreakdown.searchBot.count}
                    pct={trafficBreakdown.searchBot.pct}
                    trend={trafficBreakdown.searchBot.trend}
                    color="accent"
                />
                <TrafficCard
                    label="Bad Bot"
                    icon="⚠️"
                    count={trafficBreakdown.badBot.count}
                    pct={trafficBreakdown.badBot.pct}
                    trend={trafficBreakdown.badBot.trend}
                    color="danger"
                />
            </div>

            {/* Chart and distribution */}
            <div className="grid lg:grid-cols-2 gap-6">
                {/* Daily trend chart */}
                <div className="bg-dark-800/50 border border-dark-700 rounded-2xl p-6">
                    <div className="flex items-center justify-between mb-6">
                        <h3 className="text-white font-semibold">Daily Traffic by Type</h3>
                        <div className="flex items-center gap-4 text-sm">
                            <div className="flex items-center gap-2">
                                <div className="w-3 h-3 rounded-full bg-success-500" />
                                <span className="text-dark-400">Human</span>
                            </div>
                            <div className="flex items-center gap-2">
                                <div className="w-3 h-3 rounded-full bg-primary-500" />
                                <span className="text-dark-400">AI</span>
                            </div>
                            <div className="flex items-center gap-2">
                                <div className="w-3 h-3 rounded-full bg-accent-500" />
                                <span className="text-dark-400">Search</span>
                            </div>
                            <div className="flex items-center gap-2">
                                <div className="w-3 h-3 rounded-full bg-danger-500" />
                                <span className="text-dark-400">Bad</span>
                            </div>
                        </div>
                    </div>

                    {/* Simple bar chart */}
                    <div className="flex items-end justify-between gap-2 h-48">
                        {dailyData.map((day, i) => {
                            const total = day.human + day.aiAgent + day.searchBot + day.badBot
                            const maxTotal = 1500 // Approximate max for scaling
                            const scale = 180 / maxTotal

                            return (
                                <div key={i} className="flex-1 flex flex-col items-center gap-2">
                                    <div className="w-full flex flex-col-reverse gap-0.5">
                                        <div
                                            className="w-full bg-success-500 rounded-t-sm"
                                            style={{ height: `${day.human * scale}px` }}
                                        />
                                        <div
                                            className="w-full bg-primary-500"
                                            style={{ height: `${day.aiAgent * scale}px` }}
                                        />
                                        <div
                                            className="w-full bg-accent-500"
                                            style={{ height: `${day.searchBot * scale}px` }}
                                        />
                                        <div
                                            className="w-full bg-danger-500 rounded-b-sm"
                                            style={{ height: `${day.badBot * scale}px` }}
                                        />
                                    </div>
                                    <span className="text-dark-500 text-xs">{day.day}</span>
                                </div>
                            )
                        })}
                    </div>
                </div>

                {/* Pie chart representation */}
                <div className="bg-dark-800/50 border border-dark-700 rounded-2xl p-6">
                    <h3 className="text-white font-semibold mb-6">Traffic Distribution</h3>

                    {/* Visual pie representation */}
                    <div className="flex items-center justify-center mb-6">
                        <div className="relative w-48 h-48">
                            {/* SVG Pie Chart */}
                            <svg viewBox="0 0 100 100" className="w-full h-full -rotate-90">
                                <circle
                                    cx="50" cy="50" r="40"
                                    fill="transparent"
                                    stroke="currentColor"
                                    strokeWidth="20"
                                    strokeDasharray={`${trafficBreakdown.human.pct * 2.51} 251`}
                                    strokeDashoffset="0"
                                    className="text-success-500"
                                />
                                <circle
                                    cx="50" cy="50" r="40"
                                    fill="transparent"
                                    stroke="currentColor"
                                    strokeWidth="20"
                                    strokeDasharray={`${trafficBreakdown.aiAgent.pct * 2.51} 251`}
                                    strokeDashoffset={`${-trafficBreakdown.human.pct * 2.51}`}
                                    className="text-primary-500"
                                />
                                <circle
                                    cx="50" cy="50" r="40"
                                    fill="transparent"
                                    stroke="currentColor"
                                    strokeWidth="20"
                                    strokeDasharray={`${trafficBreakdown.searchBot.pct * 2.51} 251`}
                                    strokeDashoffset={`${-(trafficBreakdown.human.pct + trafficBreakdown.aiAgent.pct) * 2.51}`}
                                    className="text-accent-500"
                                />
                                <circle
                                    cx="50" cy="50" r="40"
                                    fill="transparent"
                                    stroke="currentColor"
                                    strokeWidth="20"
                                    strokeDasharray={`${trafficBreakdown.badBot.pct * 2.51} 251`}
                                    strokeDashoffset={`${-(trafficBreakdown.human.pct + trafficBreakdown.aiAgent.pct + trafficBreakdown.searchBot.pct) * 2.51}`}
                                    className="text-danger-500"
                                />
                            </svg>
                            <div className="absolute inset-0 flex items-center justify-center">
                                <div className="text-center">
                                    <div className="text-3xl font-bold text-white">10.2K</div>
                                    <div className="text-dark-400 text-sm">Total visits</div>
                                </div>
                            </div>
                        </div>
                    </div>

                    {/* Legend */}
                    <div className="grid grid-cols-2 gap-3">
                        <LegendItem label="Human" pct={42} color="success" />
                        <LegendItem label="AI Agent" pct={28} color="primary" />
                        <LegendItem label="Search Bot" pct={18} color="accent" />
                        <LegendItem label="Bad Bot" pct={12} color="danger" />
                    </div>
                </div>
            </div>

            {/* Bot details table */}
            <div className="bg-dark-800/50 border border-dark-700 rounded-2xl overflow-hidden">
                <div className="p-6 border-b border-dark-700">
                    <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
                        <h3 className="text-white font-semibold">Identified Bots</h3>
                        <div className="flex items-center gap-2">
                            <button
                                onClick={() => setFilterType('all')}
                                className={`px-3 py-1.5 rounded-lg text-sm transition-colors ${filterType === 'all' ? 'bg-dark-700 text-white' : 'text-dark-400 hover:text-white'
                                    }`}
                            >
                                All
                            </button>
                            <button
                                onClick={() => setFilterType('good')}
                                className={`px-3 py-1.5 rounded-lg text-sm transition-colors ${filterType === 'good' ? 'bg-success-500/20 text-success-400' : 'text-dark-400 hover:text-white'
                                    }`}
                            >
                                Good Bots
                            </button>
                            <button
                                onClick={() => setFilterType('bad')}
                                className={`px-3 py-1.5 rounded-lg text-sm transition-colors ${filterType === 'bad' ? 'bg-danger-500/20 text-danger-400' : 'text-dark-400 hover:text-white'
                                    }`}
                            >
                                Bad Bots
                            </button>
                        </div>
                    </div>
                </div>

                <div className="overflow-x-auto">
                    <table className="w-full">
                        <thead>
                            <tr className="border-b border-dark-700">
                                <th className="px-6 py-3 text-left text-dark-400 text-sm font-medium">Bot Name</th>
                                <th className="px-6 py-3 text-left text-dark-400 text-sm font-medium">Type</th>
                                <th className="px-6 py-3 text-left text-dark-400 text-sm font-medium">Visits</th>
                                <th className="px-6 py-3 text-left text-dark-400 text-sm font-medium">Status</th>
                                <th className="px-6 py-3 text-left text-dark-400 text-sm font-medium">Recommendation</th>
                            </tr>
                        </thead>
                        <tbody>
                            {filteredBots.map((bot, i) => (
                                <tr key={i} className="border-b border-dark-700/50 hover:bg-dark-800/50">
                                    <td className="px-6 py-4">
                                        <div className="flex items-center gap-3">
                                            <BotIcon type={bot.type} />
                                            <span className="text-white font-medium">{bot.name}</span>
                                        </div>
                                    </td>
                                    <td className="px-6 py-4 text-dark-300">{bot.type}</td>
                                    <td className="px-6 py-4 text-white">{bot.visits.toLocaleString()}</td>
                                    <td className="px-6 py-4">
                                        <StatusBadge status={bot.status} />
                                    </td>
                                    <td className="px-6 py-4">
                                        <ActionBadge action={bot.action} />
                                    </td>
                                </tr>
                            ))}
                        </tbody>
                    </table>
                </div>
            </div>
        </div>
    )
}

function TrafficCard({
    label,
    icon,
    count,
    pct,
    trend,
    color
}: {
    label: string
    icon: string
    count: number
    pct: number
    trend: number
    color: 'success' | 'primary' | 'accent' | 'danger'
}) {
    const colors = {
        success: 'border-success-500/30 bg-success-500/10',
        primary: 'border-primary-500/30 bg-primary-500/10',
        accent: 'border-accent-500/30 bg-accent-500/10',
        danger: 'border-danger-500/30 bg-danger-500/10',
    }

    return (
        <div className={`border rounded-2xl p-5 ${colors[color]}`}>
            <div className="flex items-center justify-between mb-3">
                <span className="text-2xl">{icon}</span>
                <div className={`flex items-center gap-1 text-sm ${trend >= 0 ? 'text-success-400' : 'text-danger-400'}`}>
                    {trend >= 0 ? <TrendingUp className="w-4 h-4" /> : <TrendingDown className="w-4 h-4" />}
                    {trend >= 0 ? '+' : ''}{trend}%
                </div>
            </div>
            <div className="text-3xl font-bold text-white mb-1">{pct}%</div>
            <div className="text-dark-400 text-sm">{label} • {count.toLocaleString()} visits</div>
        </div>
    )
}

function LegendItem({ label, pct, color }: { label: string; pct: number; color: string }) {
    const colors = {
        success: 'bg-success-500',
        primary: 'bg-primary-500',
        accent: 'bg-accent-500',
        danger: 'bg-danger-500',
    }
    return (
        <div className="flex items-center justify-between p-2 bg-dark-800 rounded-lg">
            <div className="flex items-center gap-2">
                <div className={`w-3 h-3 rounded-full ${colors[color as keyof typeof colors]}`} />
                <span className="text-dark-300 text-sm">{label}</span>
            </div>
            <span className="text-white font-medium">{pct}%</span>
        </div>
    )
}

function BotIcon({ type }: { type: string }) {
    if (type === 'AI Agent') return <Bot className="w-5 h-5 text-primary-400" />
    if (type === 'Search') return <Search className="w-5 h-5 text-accent-400" />
    if (type === 'Bad Bot' || type === 'Scraper') return <AlertTriangle className="w-5 h-5 text-danger-400" />
    return <Bot className="w-5 h-5 text-dark-400" />
}

function StatusBadge({ status }: { status: string }) {
    if (status === 'good') {
        return <span className="px-2 py-1 bg-success-500/20 text-success-400 rounded-lg text-sm">Good Bot</span>
    }
    if (status === 'bad') {
        return <span className="px-2 py-1 bg-danger-500/20 text-danger-400 rounded-lg text-sm">Bad Bot</span>
    }
    return <span className="px-2 py-1 bg-warning-500/20 text-warning-400 rounded-lg text-sm">Neutral</span>
}

function ActionBadge({ action }: { action: string }) {
    if (action === 'Allow') {
        return <span className="text-success-400 text-sm font-medium">✓ Allow</span>
    }
    if (action === 'Block') {
        return <span className="text-danger-400 text-sm font-medium">✕ Block</span>
    }
    return <span className="text-warning-400 text-sm font-medium">◐ Monitor</span>
}
