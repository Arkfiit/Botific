'use client'

import { useState } from 'react'
import {
    Bot,
    TrendingUp,
    TrendingDown,
    ArrowUpRight,
    ExternalLink,
    Calendar,
    Eye,
    FileText,
    Info
} from 'lucide-react'

// Mock AI agent data
const aiVisibilityScore = {
    current: 78,
    previous: 66,
    change: 12,
}

const aiAgents = [
    {
        id: 1,
        name: 'ChatGPT (GPTBot)',
        company: 'OpenAI',
        visits: 1234,
        trend: 23,
        topPages: ['/pricing', '/features', '/vs-competitor', '/docs'],
        firstSeen: '2024-01-15',
        lastSeen: '2 hours ago',
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
        lastSeen: '4 hours ago',
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
        lastSeen: '1 day ago',
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
        lastSeen: '3 hours ago',
        frequency: 'Daily',
        status: 'active'
    },
    {
        id: 5,
        name: 'Copilot',
        company: 'Microsoft',
        visits: 187,
        trend: 34,
        topPages: ['/docs', '/api-reference'],
        firstSeen: '2024-04-01',
        lastSeen: '2 days ago',
        frequency: 'Weekly',
        status: 'active'
    },
]

const pageAccessFrequency = [
    { page: '/pricing', visits: 2340, agents: ['ChatGPT', 'Perplexity', 'Gemini'] },
    { page: '/features', visits: 1890, agents: ['ChatGPT', 'Claude'] },
    { page: '/docs', visits: 1567, agents: ['Perplexity', 'Claude', 'Copilot'] },
    { page: '/blog/how-to-guide', visits: 1234, agents: ['Perplexity'] },
    { page: '/api-docs', visits: 987, agents: ['Claude', 'Copilot'] },
]

export default function AIAgentsPage() {
    const [selectedAgent, setSelectedAgent] = useState<number | null>(null)

    return (
        <div className="space-y-6">
            {/* Page header */}
            <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
                <div>
                    <h1 className="text-2xl font-bold text-white">AI Agents</h1>
                    <p className="text-dark-400">Track AI agents discovering your content</p>
                </div>
                <div className="flex items-center gap-2 px-3 py-2 bg-dark-800 rounded-xl text-dark-300 text-sm">
                    <Calendar className="w-4 h-4" />
                    <span>Last 30 days</span>
                </div>
            </div>

            {/* AI Visibility Score */}
            <div className="grid lg:grid-cols-3 gap-6">
                <div className="lg:col-span-2 bg-gradient-to-br from-primary-500/20 to-accent-500/10 border border-primary-500/30 rounded-2xl p-6">
                    <div className="flex flex-col md:flex-row md:items-center justify-between gap-6">
                        <div>
                            <div className="flex items-center gap-2 mb-2">
                                <h3 className="text-dark-400 font-medium">AI Visibility Score</h3>
                                <button className="text-dark-500 hover:text-dark-300">
                                    <Info className="w-4 h-4" />
                                </button>
                            </div>
                            <div className="flex items-baseline gap-3">
                                <span className="text-6xl font-bold text-white">{aiVisibilityScore.current}</span>
                                <span className="text-3xl text-primary-400">/100</span>
                                <span className="flex items-center gap-1 text-success-400 text-lg">
                                    <TrendingUp className="w-5 h-5" />
                                    +{aiVisibilityScore.change}
                                </span>
                            </div>
                            <p className="mt-4 text-dark-300 max-w-md">
                                Your site is <span className="text-success-400 font-medium">well-positioned</span> for AI agent discovery.
                                AI agents are actively crawling and indexing your content.
                            </p>
                        </div>

                        {/* Score gauge */}
                        <div className="relative w-40 h-40">
                            <svg viewBox="0 0 100 100" className="w-full h-full -rotate-90">
                                <circle
                                    cx="50" cy="50" r="45"
                                    fill="transparent"
                                    stroke="currentColor"
                                    strokeWidth="8"
                                    className="text-dark-700"
                                />
                                <circle
                                    cx="50" cy="50" r="45"
                                    fill="transparent"
                                    stroke="url(#scoreGradient)"
                                    strokeWidth="8"
                                    strokeLinecap="round"
                                    strokeDasharray={`${aiVisibilityScore.current * 2.83} 283`}
                                />
                                <defs>
                                    <linearGradient id="scoreGradient" x1="0%" y1="0%" x2="100%" y2="0%">
                                        <stop offset="0%" stopColor="#6366f1" />
                                        <stop offset="100%" stopColor="#22d3ee" />
                                    </linearGradient>
                                </defs>
                            </svg>
                            <div className="absolute inset-0 flex items-center justify-center">
                                <div className="text-center">
                                    <div className="text-2xl font-bold text-white">{aiVisibilityScore.current}%</div>
                                    <div className="text-dark-400 text-xs">Score</div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>

                {/* Quick stats */}
                <div className="space-y-4">
                    <div className="bg-dark-800/50 border border-dark-700 rounded-xl p-4">
                        <div className="text-dark-400 text-sm mb-1">Total AI Visits</div>
                        <div className="text-3xl font-bold text-white">3,034</div>
                        <div className="text-success-400 text-sm flex items-center gap-1 mt-1">
                            <TrendingUp className="w-4 h-4" />
                            +45% vs last month
                        </div>
                    </div>
                    <div className="bg-dark-800/50 border border-dark-700 rounded-xl p-4">
                        <div className="text-dark-400 text-sm mb-1">Active AI Agents</div>
                        <div className="text-3xl font-bold text-white">5</div>
                        <div className="text-dark-400 text-sm mt-1">Crawling your site</div>
                    </div>
                </div>
            </div>

            {/* AI Agents list */}
            <div className="bg-dark-800/50 border border-dark-700 rounded-2xl overflow-hidden">
                <div className="p-6 border-b border-dark-700">
                    <h3 className="text-white font-semibold">AI Agents Visiting Your Site</h3>
                </div>

                <div className="divide-y divide-dark-700">
                    {aiAgents.map((agent) => (
                        <div
                            key={agent.id}
                            className="p-6 hover:bg-dark-800/50 cursor-pointer transition-colors"
                            onClick={() => setSelectedAgent(selectedAgent === agent.id ? null : agent.id)}
                        >
                            <div className="flex items-center justify-between">
                                <div className="flex items-center gap-4">
                                    <div className="w-12 h-12 rounded-xl bg-primary-500/20 flex items-center justify-center">
                                        <Bot className="w-6 h-6 text-primary-400" />
                                    </div>
                                    <div>
                                        <div className="flex items-center gap-2">
                                            <span className="text-white font-semibold">{agent.name}</span>
                                            <span className="text-dark-500 text-sm">by {agent.company}</span>
                                        </div>
                                        <div className="flex items-center gap-4 mt-1 text-sm text-dark-400">
                                            <span>{agent.visits.toLocaleString()} visits</span>
                                            <span>•</span>
                                            <span>{agent.frequency}</span>
                                            <span>•</span>
                                            <span>Last: {agent.lastSeen}</span>
                                        </div>
                                    </div>
                                </div>
                                <div className="flex items-center gap-4">
                                    <div className={`flex items-center gap-1 ${agent.trend >= 0 ? 'text-success-400' : 'text-danger-400'}`}>
                                        {agent.trend >= 0 ? <TrendingUp className="w-4 h-4" /> : <TrendingDown className="w-4 h-4" />}
                                        <span className="font-medium">{agent.trend >= 0 ? '+' : ''}{agent.trend}%</span>
                                    </div>
                                    <ArrowUpRight className={`w-5 h-5 text-dark-400 transition-transform ${selectedAgent === agent.id ? 'rotate-90' : ''}`} />
                                </div>
                            </div>

                            {/* Expanded details */}
                            {selectedAgent === agent.id && (
                                <div className="mt-4 pt-4 border-t border-dark-700">
                                    <div className="grid md:grid-cols-2 gap-4">
                                        <div>
                                            <div className="text-dark-400 text-sm mb-2">Top Pages Accessed</div>
                                            <div className="space-y-2">
                                                {agent.topPages.map((page, i) => (
                                                    <div key={i} className="flex items-center gap-2 text-sm">
                                                        <FileText className="w-4 h-4 text-dark-500" />
                                                        <span className="text-white">{page}</span>
                                                    </div>
                                                ))}
                                            </div>
                                        </div>
                                        <div>
                                            <div className="text-dark-400 text-sm mb-2">Activity</div>
                                            <div className="space-y-2 text-sm">
                                                <div className="flex justify-between">
                                                    <span className="text-dark-400">First seen</span>
                                                    <span className="text-white">{agent.firstSeen}</span>
                                                </div>
                                                <div className="flex justify-between">
                                                    <span className="text-dark-400">Last seen</span>
                                                    <span className="text-white">{agent.lastSeen}</span>
                                                </div>
                                                <div className="flex justify-between">
                                                    <span className="text-dark-400">Frequency</span>
                                                    <span className="text-white">{agent.frequency}</span>
                                                </div>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            )}
                        </div>
                    ))}
                </div>
            </div>

            {/* Page access frequency */}
            <div className="bg-dark-800/50 border border-dark-700 rounded-2xl p-6">
                <h3 className="text-white font-semibold mb-4">Pages Most Accessed by AI Agents</h3>
                <div className="space-y-3">
                    {pageAccessFrequency.map((page, i) => (
                        <div key={i} className="flex items-center gap-4">
                            <div className="w-8 text-dark-500 text-sm font-medium">#{i + 1}</div>
                            <div className="flex-1">
                                <div className="flex items-center justify-between mb-1">
                                    <span className="text-white font-medium">{page.page}</span>
                                    <span className="text-dark-300">{page.visits.toLocaleString()} visits</span>
                                </div>
                                <div className="h-2 bg-dark-700 rounded-full overflow-hidden">
                                    <div
                                        className="h-full bg-gradient-to-r from-primary-500 to-accent-500 rounded-full"
                                        style={{ width: `${(page.visits / pageAccessFrequency[0].visits) * 100}%` }}
                                    />
                                </div>
                                <div className="flex items-center gap-2 mt-1">
                                    {page.agents.map((agent, j) => (
                                        <span key={j} className="text-xs text-dark-400 px-2 py-0.5 bg-dark-700 rounded">
                                            {agent}
                                        </span>
                                    ))}
                                </div>
                            </div>
                        </div>
                    ))}
                </div>
            </div>
        </div>
    )
}
