'use client'

import { useState } from 'react'
import {
    BarChart3,
    TrendingUp,
    TrendingDown,
    ArrowRight,
    CheckCircle2,
    AlertTriangle,
    Info,
    Calendar
} from 'lucide-react'

// Mock metrics data
const metricsData = {
    sessions: { polluted: 10234, true: 4287, change: -58 },
    conversionRate: { polluted: 1.4, true: 3.8, change: 171 },
    bounceRate: { polluted: 72, true: 45, change: -38 },
    avgDuration: { polluted: '0:34', true: '3:12', change: 465 },
    pageViews: { polluted: 28456, true: 14230, change: -50 },
    avgPagesPerSession: { polluted: 1.8, true: 3.3, change: 83 },
}

const timeRanges = ['Today', '7 days', '30 days', '90 days']

export default function TrueMetricsPage() {
    const [selectedRange, setSelectedRange] = useState('7 days')

    return (
        <div className="space-y-6">
            {/* Page header */}
            <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
                <div>
                    <h1 className="text-2xl font-bold text-white">True Metrics</h1>
                    <p className="text-dark-400">See your real performance without bot pollution</p>
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

            {/* Info banner */}
            <div className="flex items-start gap-4 p-4 bg-primary-500/10 border border-primary-500/20 rounded-2xl">
                <Info className="w-6 h-6 text-primary-400 shrink-0 mt-0.5" />
                <div>
                    <h3 className="text-white font-semibold mb-1">Why True Metrics Matter</h3>
                    <p className="text-dark-300 text-sm">
                        Bot traffic inflates your session count and deflates your conversion rate.
                        True Metrics filter out all non-human traffic to show you what your real users are doing.
                        <span className="text-primary-400 font-medium"> Your actual performance is likely much better than you think.</span>
                    </p>
                </div>
            </div>

            {/* Comparison headers */}
            <div className="grid grid-cols-3 gap-4 px-4">
                <div className="text-dark-400 text-sm font-medium">Metric</div>
                <div className="text-center">
                    <div className="flex items-center justify-center gap-2 text-dark-400">
                        <AlertTriangle className="w-4 h-4 text-danger-400" />
                        <span className="text-sm font-medium">Bot-Polluted</span>
                    </div>
                    <div className="text-dark-500 text-xs">What GA shows</div>
                </div>
                <div className="text-center">
                    <div className="flex items-center justify-center gap-2 text-success-400">
                        <CheckCircle2 className="w-4 h-4" />
                        <span className="text-sm font-medium">True Metrics</span>
                    </div>
                    <div className="text-dark-500 text-xs">Humans only</div>
                </div>
            </div>

            {/* Metrics comparison cards */}
            <div className="space-y-4">
                <MetricCompareCard
                    label="Sessions"
                    description="Total site visits"
                    polluted={metricsData.sessions.polluted.toLocaleString()}
                    true={metricsData.sessions.true.toLocaleString()}
                    change={metricsData.sessions.change}
                    insight="58% of your 'sessions' were actually bots"
                />
                <MetricCompareCard
                    label="Conversion Rate"
                    description="Visitors who converted"
                    polluted={`${metricsData.conversionRate.polluted}%`}
                    true={`${metricsData.conversionRate.true}%`}
                    change={metricsData.conversionRate.change}
                    highlight
                    insight="Your real conversion rate is 2.7x higher than reported!"
                />
                <MetricCompareCard
                    label="Bounce Rate"
                    description="Single-page sessions"
                    polluted={`${metricsData.bounceRate.polluted}%`}
                    true={`${metricsData.bounceRate.true}%`}
                    change={metricsData.bounceRate.change}
                    insight="Bots inflate bounce rate by visiting single pages"
                />
                <MetricCompareCard
                    label="Avg. Session Duration"
                    description="Time spent on site"
                    polluted={metricsData.avgDuration.polluted}
                    true={metricsData.avgDuration.true}
                    change={metricsData.avgDuration.change}
                    insight="Real users spend 5x longer on your site"
                />
                <MetricCompareCard
                    label="Page Views"
                    description="Total pages viewed"
                    polluted={metricsData.pageViews.polluted.toLocaleString()}
                    true={metricsData.pageViews.true.toLocaleString()}
                    change={metricsData.pageViews.change}
                    insight="Half of page views came from bots crawling your site"
                />
                <MetricCompareCard
                    label="Pages per Session"
                    description="Avg pages visited"
                    polluted={metricsData.avgPagesPerSession.polluted.toString()}
                    true={metricsData.avgPagesPerSession.true.toString()}
                    change={metricsData.avgPagesPerSession.change}
                    insight="Real users explore nearly twice as many pages"
                />
            </div>

            {/* Key insight box */}
            <div className="bg-gradient-to-br from-success-500/20 to-success-500/5 border border-success-500/30 rounded-2xl p-6">
                <div className="flex items-start gap-4">
                    <div className="w-12 h-12 rounded-xl bg-success-500/20 flex items-center justify-center shrink-0">
                        <TrendingUp className="w-6 h-6 text-success-400" />
                    </div>
                    <div>
                        <h3 className="text-xl font-bold text-white mb-2">Your Real Performance</h3>
                        <p className="text-dark-300 mb-4">
                            When we filter out bot traffic, your true conversion rate is <span className="text-success-400 font-bold">3.8%</span>,
                            not 1.4%. That's <span className="text-success-400 font-bold">2.7x better</span> than what Google Analytics reports.
                        </p>
                        <div className="grid md:grid-cols-3 gap-4">
                            <InsightStat label="Real conversion" value="3.8%" positive />
                            <InsightStat label="Real bounce rate" value="45%" positive />
                            <InsightStat label="Real engagement" value="3m 12s" positive />
                        </div>
                    </div>
                </div>
            </div>
        </div>
    )
}

function MetricCompareCard({
    label,
    description,
    polluted,
    true: trueValue,
    change,
    highlight,
    insight
}: {
    label: string
    description: string
    polluted: string
    true: string
    change: number
    highlight?: boolean
    insight: string
}) {
    return (
        <div className={`bg-dark-800/50 border rounded-2xl p-4 ${highlight ? 'border-success-500/50' : 'border-dark-700'}`}>
            <div className="grid grid-cols-3 gap-4 items-center">
                {/* Label */}
                <div>
                    <div className="text-white font-semibold">{label}</div>
                    <div className="text-dark-400 text-sm">{description}</div>
                </div>

                {/* Polluted value */}
                <div className="text-center">
                    <div className="text-2xl font-bold text-dark-400">{polluted}</div>
                </div>

                {/* True value */}
                <div className="text-center">
                    <div className="flex items-center justify-center gap-2">
                        <span className={`text-2xl font-bold ${highlight ? 'text-success-400' : 'text-white'}`}>
                            {trueValue}
                        </span>
                        <span className={`text-sm px-2 py-0.5 rounded-full ${change > 0
                                ? 'bg-success-500/20 text-success-400'
                                : 'bg-primary-500/20 text-primary-400'
                            }`}>
                            {change > 0 ? '+' : ''}{change}%
                        </span>
                    </div>
                </div>
            </div>

            {/* Insight */}
            <div className="mt-3 pt-3 border-t border-dark-700">
                <p className="text-dark-400 text-sm flex items-center gap-2">
                    <Info className="w-4 h-4 text-primary-400" />
                    {insight}
                </p>
            </div>
        </div>
    )
}

function InsightStat({ label, value, positive }: { label: string; value: string; positive?: boolean }) {
    return (
        <div className="bg-dark-800/50 rounded-xl p-3 text-center">
            <div className="text-dark-400 text-sm mb-1">{label}</div>
            <div className={`text-xl font-bold ${positive ? 'text-success-400' : 'text-white'}`}>{value}</div>
        </div>
    )
}
