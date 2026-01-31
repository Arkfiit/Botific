'use client'

import { useState, useEffect } from 'react'
import { createClient } from '@/utils/supabase/client'
import { useRouter } from 'next/navigation'
import Link from 'next/link'
import {
    Plus,
    Globe,
    ArrowRight,
    Loader2,
    Shield,
    Activity
} from 'lucide-react'

export default function DashboardHome() {
    const [projects, setProjects] = useState<any[]>([])
    const [loading, setLoading] = useState(true)
    const [creating, setCreating] = useState(false)
    const [newProjectUrl, setNewProjectUrl] = useState('')
    const [error, setError] = useState<string | null>(null)

    const supabase = createClient()
    const router = useRouter()

    useEffect(() => {
        async function loadProjects() {
            try {
                // Get current user first
                const { data: { user } } = await supabase.auth.getUser()

                if (!user) {
                    // Redirect to login if not authenticated (should be handled by middleware essentially)
                    return
                }

                const { data, error } = await supabase
                    .from('projects')
                    .select('*')
                    .order('created_at', { ascending: false })

                if (error) throw error
                setProjects(data || [])
            } catch (err: any) {
                console.error('Error loading projects:', err)
                // For MVP, if we fail (e.g., auth issue), we might just show empty state or mock it
            } finally {
                setLoading(false)
            }
        }
        loadProjects()
    }, [supabase])

    const handleCreateProject = async (e: React.FormEvent) => {
        e.preventDefault()
        if (!newProjectUrl) return

        setCreating(true)
        setError(null)

        try {
            const { data: { user } } = await supabase.auth.getUser()

            if (!user) {
                // For demo/dev mode without real auth, we can't create real RLS protected rows.
                // But let's assume the user is signed in or the detailed prompt allowed for this.
                // If not, we'll error out.
                setError('You must be logged in to create a project.')
                return
            }

            // Extract generic name from URL
            let name = newProjectUrl.replace(/^https?:\/\//, '').replace(/^www\./, '').split('/')[0]

            const { data, error } = await supabase
                .from('projects')
                .insert({
                    name: name,
                    domain: newProjectUrl,
                    user_id: user.id
                })
                .select()
                .single()

            if (error) throw error

            // Redirect to the new project dashboard
            router.push(`/dashboard/project/${data.id}`)

        } catch (err: any) {
            console.error('Error creating project:', err)
            setError(err.message || 'Failed to create project')
        } finally {
            setCreating(false)
        }
    }

    if (loading) {
        return (
            <div className="flex h-[50vh] items-center justify-center">
                <Loader2 className="w-8 h-8 text-primary-500 animate-spin" />
            </div>
        )
    }

    return (
        <div className="max-w-5xl mx-auto space-y-12 animate-fade-in">
            <div className="flex items-center justify-between">
                <div>
                    <h1 className="text-3xl font-bold text-white mb-2">My Projects</h1>
                    <p className="text-dark-400">Manage your websites and tracking.</p>
                </div>
            </div>

            {/* Create Project Form */}
            <div className="bg-dark-900 border border-dark-800 rounded-2xl p-8 shadow-xl">
                <h2 className="text-xl font-semibold text-white mb-6 flex items-center gap-2">
                    <Plus className="w-5 h-5 text-primary-400" />
                    Add a new website
                </h2>
                <form onSubmit={handleCreateProject} className="flex gap-4 items-start">
                    <div className="flex-1">
                        <input
                            type="text"
                            placeholder="example.com"
                            className="w-full px-4 py-3 bg-dark-950 border border-dark-700 rounded-xl text-white focus:ring-2 focus:ring-primary-500/50 focus:border-primary-500 outline-none transition-all placeholder:text-dark-600"
                            value={newProjectUrl}
                            onChange={(e) => setNewProjectUrl(e.target.value)}
                            required
                        />
                        {error && <p className="mt-2 text-danger-400 text-sm">{error}</p>}
                    </div>
                    <button
                        type="submit"
                        disabled={creating || !newProjectUrl}
                        className="px-6 py-3 bg-primary-600 hover:bg-primary-500 text-white font-medium rounded-xl transition-all disabled:opacity-50 disabled:cursor-not-allowed flex items-center gap-2"
                    >
                        {creating ? <Loader2 className="w-5 h-5 animate-spin" /> : 'Create Project'}
                    </button>
                </form>
            </div>

            {/* Projects Grid */}
            <div>
                <h2 className="text-lg font-medium text-dark-300 mb-4">Active Projects ({projects.length})</h2>
                {projects.length === 0 ? (
                    <div className="text-center py-12 border border-dashed border-dark-800 rounded-2xl bg-dark-900/50">
                        <Globe className="w-12 h-12 text-dark-600 mx-auto mb-4" />
                        <h3 className="text-dark-400 font-medium">No projects yet</h3>
                        <p className="text-dark-500 text-sm mt-1">Add your website above to start tracking.</p>
                    </div>
                ) : (
                    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                        {projects.map((project) => (
                            <Link
                                key={project.id}
                                href={`/dashboard/project/${project.id}`}
                                className="group block bg-dark-900 border border-dark-800 hover:border-primary-500/50 rounded-2xl p-6 transition-all hover:shadow-2xl hover:-translate-y-1"
                            >
                                <div className="flex items-center justify-between mb-4">
                                    <div className="w-10 h-10 rounded-xl bg-dark-800 flex items-center justify-center group-hover:bg-primary-500/10 transition-colors">
                                        <Shield className="w-5 h-5 text-dark-400 group-hover:text-primary-400 transition-colors" />
                                    </div>
                                    <ArrowRight className="w-5 h-5 text-dark-600 group-hover:text-primary-400 -translate-x-2 opacity-0 group-hover:translate-x-0 group-hover:opacity-100 transition-all" />
                                </div>
                                <h3 className="text-lg font-bold text-white mb-1 group-hover:text-primary-400 transition-colors">{project.name}</h3>
                                <div className="text-dark-400 text-sm mb-4 truncate">{project.domain}</div>

                                <div className="flex items-center gap-2 text-xs text-success-400 bg-success-500/10 px-2 py-1 rounded w-fit">
                                    <Activity className="w-3 h-3" />
                                    Active
                                </div>
                            </Link>
                        ))}
                    </div>
                )}
            </div>
        </div>
    )
}
