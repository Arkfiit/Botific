'use client'

import {
    Lightbulb,
    CheckCircle2,
    AlertTriangle,
    ArrowRight,
    Bot,
    FileText,
    Code,
    Globe,
    Zap,
    Eye,
    Shield
} from 'lucide-react'

// Mock optimization recommendations
const recommendations = [
    {
        id: 1,
        priority: 'high',
        category: 'content',
        title: 'Add structured data to your pricing page',
        description: 'Your /pricing page gets 3x more AI agent visits than any other page. Adding schema.org structured data will help AI agents better understand your pricing tiers.',
        impact: 'High impact on AI readability',
        effort: 'Low effort',
        status: 'pending',
        details: [
            'Add Product schema with pricing information',
            'Include FAQ schema for common pricing questions',
            'Add BreadcrumbList for navigation context'
        ]
    },
    {
        id: 2,
        priority: 'high',
        category: 'content',
        title: 'Create an AI-friendly sitemap',
        description: 'AI agents like ChatGPT and Perplexity prefer llms.txt files that describe your site structure. This helps them understand what your site offers.',
        impact: 'High impact on discoverability',
        effort: 'Medium effort',
        status: 'pending',
        details: [
            'Create an llms.txt file in your root directory',
            'Include clear descriptions of your main pages',
            'Update it when you add new important content'
        ]
    },
    {
        id: 3,
        priority: 'medium',
        category: 'technical',
        title: 'Update robots.txt for AI agents',
        description: 'Your robots.txt currently blocks some AI crawlers. Consider allowing GPTBot and other beneficial AI agents to improve your visibility.',
        impact: 'Medium impact on visibility',
        effort: 'Low effort',
        status: 'pending',
        details: [
            'Add "User-agent: GPTBot" with Allow directive',
            'Add "User-agent: PerplexityBot" with Allow directive',
            'Keep blocking bad bots and scrapers'
        ]
    },
    {
        id: 4,
        priority: 'medium',
        category: 'content',
        title: 'Improve meta descriptions',
        description: 'Several of your high-traffic pages have missing or generic meta descriptions. AI agents use these to understand page content.',
        impact: 'Medium impact on understanding',
        effort: 'Low effort',
        status: 'in-progress',
        details: [
            '/features - Missing meta description',
            '/docs - Generic "Documentation" description',
            '/blog/* - Inconsistent description format'
        ]
    },
    {
        id: 5,
        priority: 'low',
        category: 'technical',
        title: 'Add OpenGraph tags to blog posts',
        description: 'Your blog posts are missing OpenGraph tags. These help AI agents understand content hierarchy and relationships.',
        impact: 'Low impact on visibility',
        effort: 'Low effort',
        status: 'completed',
        details: [
            'og:title, og:description, og:image added',
            'article:published_time added',
            'article:author added'
        ]
    },
]

const quickActions = [
    {
        icon: <FileText className="w-5 h-5" />,
        title: 'Generate llms.txt',
        description: 'Create an AI-friendly site description file',
        action: 'Generate'
    },
    {
        icon: <Code className="w-5 h-5" />,
        title: 'Audit robots.txt',
        description: 'Check your current bot permissions',
        action: 'Audit'
    },
    {
        icon: <Globe className="w-5 h-5" />,
        title: 'Schema Generator',
        description: 'Create structured data for key pages',
        action: 'Create'
    },
]

const botRules = [
    { name: 'ChatGPT (GPTBot)', status: 'allowed', visits: 1234, recommendation: 'Keep allowing' },
    { name: 'Perplexity', status: 'allowed', visits: 856, recommendation: 'Keep allowing' },
    { name: 'Claude', status: 'allowed', visits: 432, recommendation: 'Keep allowing' },
    { name: 'Googlebot', status: 'allowed', visits: 1245, recommendation: 'Keep allowing' },
    { name: 'Unknown Scraper', status: 'blocked', visits: 567, recommendation: 'Keep blocked' },
    { name: 'DataForSeo', status: 'blocked', visits: 423, recommendation: 'Keep blocked' },
    { name: 'AhrefsBot', status: 'allowed', visits: 345, recommendation: 'Consider throttling' },
]

export default function OptimizationPage() {
    return (
        <div className="space-y-6">
            {/* Page header */}
            <div>
                <h1 className="text-2xl font-bold text-white">Optimization</h1>
                <p className="text-dark-400">Improve your AI visibility and manage bot access</p>
            </div>

            {/* Score summary */}
            <div className="grid lg:grid-cols-3 gap-6">
                <div className="bg-dark-800/50 border border-dark-700 rounded-2xl p-6">
                    <div className="flex items-center gap-3 mb-4">
                        <div className="w-10 h-10 rounded-xl bg-success-500/20 flex items-center justify-center">
                            <CheckCircle2 className="w-5 h-5 text-success-400" />
                        </div>
                        <div>
                            <div className="text-dark-400 text-sm">Completed</div>
                            <div className="text-2xl font-bold text-white">1</div>
                        </div>
                    </div>
                    <div className="h-2 bg-dark-700 rounded-full">
                        <div className="h-full w-1/5 bg-success-500 rounded-full" />
                    </div>
                </div>

                <div className="bg-dark-800/50 border border-dark-700 rounded-2xl p-6">
                    <div className="flex items-center gap-3 mb-4">
                        <div className="w-10 h-10 rounded-xl bg-warning-500/20 flex items-center justify-center">
                            <Zap className="w-5 h-5 text-warning-400" />
                        </div>
                        <div>
                            <div className="text-dark-400 text-sm">In Progress</div>
                            <div className="text-2xl font-bold text-white">1</div>
                        </div>
                    </div>
                    <div className="h-2 bg-dark-700 rounded-full">
                        <div className="h-full w-1/5 bg-warning-500 rounded-full" />
                    </div>
                </div>

                <div className="bg-dark-800/50 border border-dark-700 rounded-2xl p-6">
                    <div className="flex items-center gap-3 mb-4">
                        <div className="w-10 h-10 rounded-xl bg-primary-500/20 flex items-center justify-center">
                            <Lightbulb className="w-5 h-5 text-primary-400" />
                        </div>
                        <div>
                            <div className="text-dark-400 text-sm">Pending</div>
                            <div className="text-2xl font-bold text-white">3</div>
                        </div>
                    </div>
                    <div className="h-2 bg-dark-700 rounded-full">
                        <div className="h-full w-3/5 bg-primary-500 rounded-full" />
                    </div>
                </div>
            </div>

            {/* Quick actions */}
            <div className="bg-dark-800/50 border border-dark-700 rounded-2xl p-6">
                <h3 className="text-white font-semibold mb-4">Quick Actions</h3>
                <div className="grid md:grid-cols-3 gap-4">
                    {quickActions.map((action, i) => (
                        <button
                            key={i}
                            className="flex items-start gap-4 p-4 bg-dark-800 hover:bg-dark-700 border border-dark-700 hover:border-primary-500/30 rounded-xl text-left transition-all group"
                        >
                            <div className="w-10 h-10 rounded-xl bg-primary-500/20 flex items-center justify-center text-primary-400 group-hover:bg-primary-500/30 transition-colors">
                                {action.icon}
                            </div>
                            <div className="flex-1">
                                <div className="text-white font-medium">{action.title}</div>
                                <div className="text-dark-400 text-sm">{action.description}</div>
                            </div>
                            <ArrowRight className="w-5 h-5 text-dark-500 group-hover:text-primary-400 transition-colors" />
                        </button>
                    ))}
                </div>
            </div>

            {/* Recommendations */}
            <div className="bg-dark-800/50 border border-dark-700 rounded-2xl overflow-hidden">
                <div className="p-6 border-b border-dark-700">
                    <h3 className="text-white font-semibold">Recommendations</h3>
                    <p className="text-dark-400 text-sm mt-1">Actions to improve your AI visibility</p>
                </div>

                <div className="divide-y divide-dark-700">
                    {recommendations.map((rec) => (
                        <RecommendationCard key={rec.id} recommendation={rec} />
                    ))}
                </div>
            </div>

            {/* Bot rules */}
            <div className="bg-dark-800/50 border border-dark-700 rounded-2xl overflow-hidden">
                <div className="p-6 border-b border-dark-700">
                    <div className="flex items-center justify-between">
                        <div>
                            <h3 className="text-white font-semibold">Bot Access Rules</h3>
                            <p className="text-dark-400 text-sm mt-1">Manage which bots can access your site</p>
                        </div>
                        <button className="px-4 py-2 bg-dark-700 hover:bg-dark-600 text-white rounded-xl text-sm transition-colors">
                            Edit robots.txt
                        </button>
                    </div>
                </div>

                <div className="overflow-x-auto">
                    <table className="w-full">
                        <thead>
                            <tr className="border-b border-dark-700">
                                <th className="px-6 py-3 text-left text-dark-400 text-sm font-medium">Bot</th>
                                <th className="px-6 py-3 text-left text-dark-400 text-sm font-medium">Status</th>
                                <th className="px-6 py-3 text-left text-dark-400 text-sm font-medium">Visits</th>
                                <th className="px-6 py-3 text-left text-dark-400 text-sm font-medium">Recommendation</th>
                            </tr>
                        </thead>
                        <tbody>
                            {botRules.map((bot, i) => (
                                <tr key={i} className="border-b border-dark-700/50 hover:bg-dark-800/50">
                                    <td className="px-6 py-4">
                                        <div className="flex items-center gap-3">
                                            <Bot className={`w-5 h-5 ${bot.status === 'allowed' ? 'text-success-400' : 'text-danger-400'}`} />
                                            <span className="text-white font-medium">{bot.name}</span>
                                        </div>
                                    </td>
                                    <td className="px-6 py-4">
                                        {bot.status === 'allowed' ? (
                                            <span className="flex items-center gap-1 text-success-400 text-sm">
                                                <CheckCircle2 className="w-4 h-4" />
                                                Allowed
                                            </span>
                                        ) : (
                                            <span className="flex items-center gap-1 text-danger-400 text-sm">
                                                <Shield className="w-4 h-4" />
                                                Blocked
                                            </span>
                                        )}
                                    </td>
                                    <td className="px-6 py-4 text-dark-300">{bot.visits.toLocaleString()}</td>
                                    <td className="px-6 py-4 text-dark-400 text-sm">{bot.recommendation}</td>
                                </tr>
                            ))}
                        </tbody>
                    </table>
                </div>
            </div>
        </div>
    )
}

function RecommendationCard({ recommendation }: { recommendation: typeof recommendations[0] }) {
    const priorityColors = {
        high: 'border-l-danger-500 bg-danger-500/5',
        medium: 'border-l-warning-500 bg-warning-500/5',
        low: 'border-l-primary-500 bg-primary-500/5',
    }

    const statusColors = {
        pending: 'bg-dark-700 text-dark-300',
        'in-progress': 'bg-warning-500/20 text-warning-400',
        completed: 'bg-success-500/20 text-success-400',
    }

    return (
        <div className={`p-6 border-l-4 ${priorityColors[recommendation.priority as keyof typeof priorityColors]}`}>
            <div className="flex items-start justify-between gap-4">
                <div className="flex-1">
                    <div className="flex items-center gap-3 mb-2">
                        <h4 className="text-white font-semibold">{recommendation.title}</h4>
                        <span className={`px-2 py-0.5 rounded-lg text-xs font-medium ${statusColors[recommendation.status as keyof typeof statusColors]}`}>
                            {recommendation.status === 'in-progress' ? 'In Progress' :
                                recommendation.status === 'completed' ? 'Completed' : 'Pending'}
                        </span>
                    </div>
                    <p className="text-dark-400 text-sm mb-3">{recommendation.description}</p>

                    {/* Details */}
                    <div className="space-y-1 mb-4">
                        {recommendation.details.map((detail, i) => (
                            <div key={i} className="flex items-center gap-2 text-sm text-dark-300">
                                <div className="w-1.5 h-1.5 rounded-full bg-dark-500" />
                                {detail}
                            </div>
                        ))}
                    </div>

                    <div className="flex items-center gap-4 text-sm">
                        <span className="text-primary-400">{recommendation.impact}</span>
                        <span className="text-dark-500">•</span>
                        <span className="text-dark-400">{recommendation.effort}</span>
                    </div>
                </div>

                {recommendation.status !== 'completed' && (
                    <button className="px-4 py-2 bg-primary-500 hover:bg-primary-400 text-white rounded-xl text-sm font-medium transition-colors">
                        {recommendation.status === 'in-progress' ? 'Continue' : 'Start'}
                    </button>
                )}
            </div>
        </div>
    )
}
