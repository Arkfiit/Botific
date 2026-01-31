'use client'

import { useState, useEffect } from 'react'
import Link from 'next/link'
import { usePathname, useParams, useRouter } from 'next/navigation'
import { createClient } from '@/utils/supabase/client'
import {
    Bot,
    LayoutDashboard,
    BarChart3,
    Activity,
    Cpu,
    Lightbulb,
    Menu,
    X,
    LogOut,
    Settings,
    Bell,
    ChevronDown,
    Plus,
    Check
} from 'lucide-react'

const getNavItems = (projectId?: string) => [
    { href: projectId ? `/dashboard/project/${projectId}` : '/dashboard', label: 'Overview', icon: LayoutDashboard },
    // Placeholder links for future features
    { href: projectId ? `/dashboard/project/${projectId}#metrics` : '#', label: 'True Metrics', icon: BarChart3 },
    { href: projectId ? `/dashboard/project/${projectId}#bot-traffic` : '#', label: 'Bot Traffic', icon: Activity },
    { href: projectId ? `/dashboard/project/${projectId}#ai-agents` : '#', label: 'AI Agents', icon: Cpu },
    { href: projectId ? `/dashboard/project/${projectId}#optimization` : '#', label: 'Optimization', icon: Lightbulb },
]

export default function DashboardLayout({
    children,
}: {
    children: React.ReactNode
}) {
    const pathname = usePathname()
    const params = useParams()
    const projectId = params.id as string | undefined
    const [sidebarOpen, setSidebarOpen] = useState(false)
    const [userMenuOpen, setUserMenuOpen] = useState(false)
    const [projectMenuOpen, setProjectMenuOpen] = useState(false)
    const [projects, setProjects] = useState<any[]>([])
    const supabase = createClient()
    const router = useRouter()

    useEffect(() => {
        async function loadProjects() {
            try {
                // Get current user first to be safe, though RLS handles it
                const { data: { user } } = await supabase.auth.getUser()
                if (!user) return

                const { data } = await supabase
                    .from('projects')
                    .select('id, name')
                    .order('created_at', { ascending: false })

                if (data) setProjects(data)
            } catch (e) {
                console.error('Error loading projects list:', e)
            }
        }
        loadProjects()
    }, [supabase])

    const activeProject = projects.find(p => p.id === projectId)

    const navItems = getNavItems(projectId)

    return (
        <div className="min-h-screen bg-dark-950">
            {/* Mobile sidebar backdrop */}
            {sidebarOpen && (
                <div
                    className="fixed inset-0 bg-black/50 z-40 lg:hidden"
                    onClick={() => setSidebarOpen(false)}
                />
            )}

            {/* Sidebar */}
            <aside className={`
        fixed top-0 left-0 z-50 h-full w-64 bg-dark-900 border-r border-dark-800
        transform transition-transform duration-300 ease-in-out
        lg:translate-x-0
        ${sidebarOpen ? 'translate-x-0' : '-translate-x-full'}
      `}>
                {/* Logo */}
                <div className="h-16 flex items-center justify-between px-4 border-b border-dark-800">
                    <Link href="/dashboard" className="flex items-center gap-2">
                        <div className="w-9 h-9 rounded-xl bg-gradient-to-br from-primary-500 to-accent-500 flex items-center justify-center">
                            <Bot className="w-5 h-5 text-white" />
                        </div>
                        <span className="text-lg font-bold text-white">Botfic</span>
                    </Link>
                    <button
                        onClick={() => setSidebarOpen(false)}
                        className="lg:hidden p-2 text-dark-400 hover:text-white"
                    >
                        <X className="w-5 h-5" />
                    </button>
                </div>

                {/* Navigation */}
                <nav className="p-4 space-y-1">
                    {navItems.map((item) => {
                        const isActive = pathname === item.href ||
                            (item.href !== '/dashboard' && pathname.startsWith(item.href))
                        const Icon = item.icon

                        return (
                            <Link
                                key={item.href}
                                href={item.href}
                                className={`
                  flex items-center gap-3 px-3 py-2.5 rounded-xl transition-all duration-200
                  ${isActive
                                        ? 'bg-primary-500/10 text-primary-400 border border-primary-500/20'
                                        : 'text-dark-400 hover:text-white hover:bg-dark-800'
                                    }
                `}
                            >
                                <Icon className="w-5 h-5" />
                                <span className="font-medium">{item.label}</span>
                            </Link>
                        )
                    })}
                </nav>

                {/* Bottom section */}
                <div className="absolute bottom-0 left-0 right-0 p-4 border-t border-dark-800">
                    <Link
                        href="/dashboard/settings"
                        className="flex items-center gap-3 px-3 py-2.5 rounded-xl text-dark-400 hover:text-white hover:bg-dark-800 transition-colors"
                    >
                        <Settings className="w-5 h-5" />
                        <span className="font-medium">Settings</span>
                    </Link>
                </div>
            </aside>

            {/* Main content */}
            <div className="lg:pl-64">
                {/* Top bar */}
                <header className="h-16 bg-dark-900/80 backdrop-blur-xl border-b border-dark-800 sticky top-0 z-30">
                    <div className="h-full px-4 flex items-center justify-between">
                        {/* Mobile menu button */}
                        <button
                            onClick={() => setSidebarOpen(true)}
                            className="lg:hidden p-2 text-dark-400 hover:text-white"
                        >
                            <Menu className="w-6 h-6" />
                        </button>

                        {/* Site selector */}
                        {/* Site selector dropdown */}
                        <div className="hidden lg:relative lg:block">
                            <button
                                onClick={() => setProjectMenuOpen(!projectMenuOpen)}
                                className="flex items-center gap-2 px-3 py-2 bg-dark-800 rounded-xl cursor-pointer hover:bg-dark-700 transition-colors border border-transparent hover:border-dark-600"
                            >
                                <div className={`w-2 h-2 rounded-full ${projectId ? 'bg-success-500' : 'bg-dark-500'}`} />
                                <span className="text-white font-medium truncate max-w-[150px]">
                                    {activeProject ? activeProject.name : (projectId ? 'Project Loading...' : 'Select Project')}
                                </span>
                                <ChevronDown className="w-4 h-4 text-dark-400" />
                            </button>

                            {projectMenuOpen && (
                                <>
                                    <div className="fixed inset-0 z-40" onClick={() => setProjectMenuOpen(false)} />
                                    <div className="absolute left-0 top-full mt-2 w-64 bg-dark-800 border border-dark-700 rounded-xl shadow-xl z-50 overflow-hidden">
                                        <div className="p-2 text-xs font-semibold text-dark-400 uppercase tracking-wider px-3 py-2">
                                            Switch Project
                                        </div>
                                        <div className="max-h-64 overflow-y-auto">
                                            {projects.map(p => (
                                                <Link
                                                    key={p.id}
                                                    href={`/dashboard/project/${p.id}`}
                                                    onClick={() => setProjectMenuOpen(false)}
                                                    className={`flex items-center justify-between px-3 py-2.5 mx-2 rounded-lg transition-colors ${projectId === p.id ? 'bg-primary-500/10 text-primary-400' : 'text-gray-300 hover:bg-dark-700 hover:text-white'}`}
                                                >
                                                    <span className="truncate">{p.name}</span>
                                                    {projectId === p.id && <Check className="w-4 h-4" />}
                                                </Link>
                                            ))}
                                        </div>
                                        <div className="p-2 border-t border-dark-700 mt-1">
                                            <Link
                                                href="/dashboard"
                                                onClick={() => setProjectMenuOpen(false)}
                                                className="flex items-center gap-2 px-3 py-2 text-primary-400 hover:bg-primary-500/10 rounded-lg transition-colors text-sm font-medium"
                                            >
                                                <Plus className="w-4 h-4" />
                                                Create New Project
                                            </Link>
                                        </div>
                                    </div>
                                </>
                            )}
                        </div>

                        {/* Right side */}
                        <div className="flex items-center gap-4">
                            {/* Notifications */}
                            <button className="relative p-2 text-dark-400 hover:text-white transition-colors">
                                <Bell className="w-5 h-5" />
                                <span className="absolute top-1 right-1 w-2 h-2 bg-primary-500 rounded-full" />
                            </button>

                            {/* User menu */}
                            <div className="relative">
                                <button
                                    onClick={() => setUserMenuOpen(!userMenuOpen)}
                                    className="flex items-center gap-2 p-2 rounded-xl hover:bg-dark-800 transition-colors"
                                >
                                    <div className="w-8 h-8 rounded-full bg-gradient-to-br from-primary-500 to-accent-500 flex items-center justify-center text-white text-sm font-bold">
                                        JD
                                    </div>
                                    <ChevronDown className="w-4 h-4 text-dark-400" />
                                </button>

                                {userMenuOpen && (
                                    <>
                                        <div
                                            className="fixed inset-0 z-40"
                                            onClick={() => setUserMenuOpen(false)}
                                        />
                                        <div className="absolute right-0 top-full mt-2 w-48 bg-dark-800 border border-dark-700 rounded-xl shadow-xl z-50 overflow-hidden">
                                            <div className="p-3 border-b border-dark-700">
                                                <div className="text-white font-medium">John Doe</div>
                                                <div className="text-dark-400 text-sm">john@example.com</div>
                                            </div>
                                            <div className="p-2">
                                                <Link
                                                    href="/dashboard/settings"
                                                    className="flex items-center gap-2 px-3 py-2 text-dark-300 hover:text-white hover:bg-dark-700 rounded-lg transition-colors"
                                                >
                                                    <Settings className="w-4 h-4" />
                                                    Settings
                                                </Link>
                                                <button className="w-full flex items-center gap-2 px-3 py-2 text-dark-300 hover:text-white hover:bg-dark-700 rounded-lg transition-colors">
                                                    <LogOut className="w-4 h-4" />
                                                    Log out
                                                </button>
                                            </div>
                                        </div>
                                    </>
                                )}
                            </div>
                        </div>
                    </div>
                </header>

                {/* Page content */}
                <main className="p-6">
                    {children}
                </main>
            </div>
        </div>
    )
}
