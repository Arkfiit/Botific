'use client'

import { useState, useEffect, useCallback } from 'react'
import { createClient } from '@/utils/supabase/client'
import {
    Activity,
    AlertTriangle,
    ArrowUpRight,
    Bot,
    Check,
    Copy,
    Eye,
    RefreshCw,
    Search,
    TrendingDown,
    TrendingUp,
    Users
} from 'lucide-react'
import { useRouter } from 'next/navigation'

export default function ProjectDashboard({ params }: { params: { id: string } }) {
    const [loading, setLoading] = useState(true)
    const [project, setProject] = useState<any>(null)
    const [stats, setStats] = useState<any>({
        totalVisits: 0,
        humanVisits: 0,
        aiVisits: 0,
        badBotVisits: 0,
        humanPct: 0,
        aiPct: 0
    })
    const [copied, setCopied] = useState(false)
    const supabase = createClient()
    const router = useRouter()

    const fetchProjectData = useCallback(async () => {
        try {
            setLoading(true)
            // 1. Get Project Details
            const { data: projectData, error: projectError } = await supabase
                .from('projects')
                .select('*')
                .eq('id', params.id)
                .single()

            if (projectError) throw projectError
            setProject(projectData)

            // 2. Get Real Stats (Aggregated from analytics_events for MVP)
            // In a real app, rely on 'daily_metrics' background jobs. 
            // Here we do a simple client-side count for the demo.
            const { count: totalVisits } = await supabase
                .from('analytics_events')
                .select('*', { count: 'exact', head: true })
                .eq('project_id', params.id)

            const { count: humanVisits } = await supabase
                .from('analytics_events')
                .select('*', { count: 'exact', head: true })
                .eq('project_id', params.id)
                .eq('visitor_type', 'human')

            const { count: aiVisits } = await supabase
                .from('analytics_events')
                .select('*', { count: 'exact', head: true })
                .eq('project_id', params.id)
                .eq('visitor_type', 'ai_agent')

            const { count: badBotVisits } = await supabase
                .from('analytics_events')
                .select('*', { count: 'exact', head: true })
                .eq('project_id', params.id)
                .eq('visitor_type', 'bad_bot')

            setStats({
                totalVisits: totalVisits || 0,
                humanVisits: humanVisits || 0,
                aiVisits: aiVisits || 0,
                badBotVisits: badBotVisits || 0,
                // Simple aggregates
                humanPct: totalVisits ? Math.round(((humanVisits || 0) / totalVisits) * 100) : 0,
                aiPct: totalVisits ? Math.round(((aiVisits || 0) / totalVisits) * 100) : 0,
            })

        } catch (error) {
            console.error('Error fetching project:', error)
        } finally {
            setLoading(false)
        }
    }, [params.id, supabase])

    useEffect(() => {
        fetchProjectData()

        // Realtime subscription for new events
        const channel = supabase
            .channel('realtime_project_events')
            .on(
                'postgres_changes',
                {
                    event: 'INSERT',
                    schema: 'public',
                    table: 'analytics_events',
                    filter: `project_id=eq.${params.id}`,
                },
                () => {
                    fetchProjectData() // Refresh stats on new hit
                }
            )
            .subscribe()

        return () => {
            supabase.removeChannel(channel)
        }
    }, [fetchProjectData, supabase, params.id])


    const copySnippet = () => {
        const snippet = `<script src="${window.location.origin}/tracker.js" data-site-id="${params.id}"></script>`
        navigator.clipboard.writeText(snippet)
        setCopied(true)
        setTimeout(() => setCopied(false), 2000)
    }

    if (loading && !project) {
        return <div className="p-10 text-center text-dark-400">Loading project data...</div>
    }

    if (!project) {
        return <div className="p-10 text-center text-red-400">Project not found</div>
    }

    // New Project State (Zero Data)
    if (stats && stats.totalVisits === 0) {
        return (
            <div className="max-w-4xl mx-auto space-y-8 animate-fade-in">
                <div className="text-center space-y-4">
                    <div className="w-16 h-16 bg-primary-500/10 rounded-2xl flex items-center justify-center mx-auto mb-6">
                        <Bot className="w-8 h-8 text-primary-400" />
                    </div>
                    <h1 className="text-3xl font-bold text-white">Let's connect {project.name}</h1>
                    <p className="text-dark-400 max-w-lg mx-auto">
                        Your project is created! Install the tracking script to start gathering real-time bot intelligence.
                    </p>
                </div>

                <div className="bg-dark-900 border border-dark-700 rounded-2xl p-8 max-w-2xl mx-auto shadow-2xl">
                    <h3 className="text-white font-medium mb-4 flex items-center gap-2">
                        <div className="w-6 h-6 rounded-full bg-primary-500 flex items-center justify-center text-white text-xs font-bold">1</div>
                        Add this snippet to your &lt;head&gt;
                    </h3>

                    <div className="relative group">
                        <pre className="bg-black/50 p-6 rounded-xl border border-dark-700 text-gray-300 font-mono text-sm overflow-x-auto">
                            {`<script src="${typeof window !== 'undefined' ? window.location.origin : 'https://botfic.com'}/tracker.js" \n  data-site-id="${project.id}">\n</script>`}
                        </pre>
                        <button
                            onClick={copySnippet}
                            className="absolute top-4 right-4 p-2 bg-dark-800 hover:bg-dark-700 rounded-lg border border-dark-600 transition-colors text-white"
                        >
                            {copied ? <Check className="w-4 h-4 text-success-400" /> : <Copy className="w-4 h-4" />}
                        </button>
                    </div>

                    <div className="mt-8 flex items-center justify-center gap-4">
                        <div className="flex items-center gap-2 text-sm text-dark-400">
                            <div className="w-2 h-2 rounded-full bg-yellow-500 animate-pulse" />
                            Waiting for first visit...
                        </div>
                        <button
                            onClick={fetchProjectData}
                            className="px-4 py-2 bg-dark-800 hover:bg-dark-700 text-white rounded-lg text-sm flex items-center gap-2 transition-colors"
                        >
                            <RefreshCw className="w-4 h-4" /> Check Connection
                        </button>
                    </div>
                </div>
            </div>
        )
    }

    // Dashboard View (Has Data)
    return (
        <div className="space-y-6 animate-fade-in">
            {/* Header */}
            <div className="flex items-center justify-between">
                <div>
                    <h1 className="text-2xl font-bold text-white">{project.name}</h1>
                    <p className="text-dark-400 flex items-center gap-2">
                        <span className="w-2 h-2 rounded-full bg-success-500"></span>
                        Live Tracking Active
                    </p>
                </div>
                <div className="flex items-center gap-3">
                    <button title="Copy Snippet" onClick={copySnippet} className="p-2 bg-dark-800 hover:bg-dark-700 rounded-lg text-dark-400 hover:text-white transition-colors">
                        <Copy className="w-5 h-5" />
                    </button>
                    <div className="px-3 py-2 bg-dark-800 rounded-xl text-dark-300 text-sm flex items-center gap-2">
                        <Activity className="w-4 h-4" />
                        <span>Real-time</span>
                    </div>
                </div>
            </div>

            {/* Main Stats Grid */}
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
                <StatCard
                    label="Total Visits"
                    value={stats.totalVisits.toLocaleString()}
                    icon={<Eye className="w-5 h-5" />}
                    color="primary"
                />
                <StatCard
                    label="Human Traffic"
                    value={`${stats.humanPct}%`}
                    subtext={`${stats.humanVisits} visits`}
                    icon={<Users className="w-5 h-5" />}
                    color="success"
                />
                <StatCard
                    label="AI Agent Traffic"
                    value={`${stats.aiPct}%`}
                    subtext={`${stats.aiVisits} visits`}
                    icon={<Bot className="w-5 h-5" />}
                    color="accent"
                />
                <StatCard
                    label="Bad Bot Traffic"
                    value={`${stats.badBotVisits}`}
                    subtext="Filtered"
                    icon={<AlertTriangle className="w-5 h-5" />}
                    color="danger"
                />
            </div>

            {/* Charts / Details Placeholder for MVP */}
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
                <div className="bg-dark-800/50 border border-dark-700 rounded-2xl p-6 min-h-[300px] flex items-center justify-center relative overflow-hidden group">
                    <div className="text-center z-10">
                        <h3 className="text-white font-medium mb-2">Traffic Classification</h3>
                        <p className="text-dark-400 text-sm">Detailed charts coming soon</p>
                    </div>
                    <div className="absolute inset-x-0 bottom-0 h-32 bg-gradient-to-t from-dark-900 to-transparent pointer-events-none" />
                </div>
                <div className="bg-dark-800/50 border border-dark-700 rounded-2xl p-6 min-h-[300px] flex items-center justify-center">
                    <div className="text-center">
                        <h3 className="text-white font-medium mb-2">Top AI Agents</h3>
                        <p className="text-dark-400 text-sm">Requires 24h of data to analyze</p>
                    </div>
                </div>
            </div>
        </div>
    )
}

// Reusing StatCard component locally
function StatCard({
    label,
    value,
    icon,
    subtext,
    color
}: {
    label: string
    value: string
    icon: React.ReactNode
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
            {subtext && <div className="text-dark-400 text-sm">{subtext}</div>}
        </div>
    )
}
