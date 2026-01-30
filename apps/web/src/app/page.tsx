'use client'

import { useState, useEffect } from 'react'
import Link from 'next/link'
import {
    Bot,
    BarChart3,
    Zap,
    ArrowRight,
    CheckCircle2,
    Menu,
    X,
    Sparkles,
    TrendingUp,
    Eye,
    Target,
    Users,
    Search,
    ChevronRight,
    Play,
    Star,
    Lightbulb,
    Rocket,
    Globe,
    MessageSquare,
    DollarSign,
    BarChart2,
    Cpu,
    ShoppingCart,
    AlertTriangle,
    Shield,
    PieChart,
    Activity,
    Layers,
    ArrowUpRight,
    Filter
} from 'lucide-react'

// Navbar Component
function Navbar() {
    const [scrolled, setScrolled] = useState(false)
    const [mobileOpen, setMobileOpen] = useState(false)

    useEffect(() => {
        const handleScroll = () => setScrolled(window.scrollY > 20)
        window.addEventListener('scroll', handleScroll)
        return () => window.removeEventListener('scroll', handleScroll)
    }, [])

    return (
        <nav className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${scrolled ? 'bg-dark-950/80 backdrop-blur-xl border-b border-dark-800' : 'bg-transparent'
            }`}>
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                <div className="flex items-center justify-between h-16 md:h-20">
                    {/* Logo */}
                    <Link href="/" className="flex items-center gap-2 group">
                        <div className="w-10 h-10 rounded-xl bg-gradient-to-br from-primary-500 to-accent-500 flex items-center justify-center">
                            <Bot className="w-6 h-6 text-white" />
                        </div>
                        <span className="text-xl font-bold text-white">Botfic</span>
                    </Link>

                    {/* Desktop Nav */}
                    <div className="hidden md:flex items-center gap-8">
                        <Link href="#problem" className="text-dark-300 hover:text-white transition-colors">The Problem</Link>
                        <Link href="#solution" className="text-dark-300 hover:text-white transition-colors">Solution</Link>
                        <Link href="#pricing" className="text-dark-300 hover:text-white transition-colors">Pricing</Link>
                        <Link href="#faq" className="text-dark-300 hover:text-white transition-colors">FAQ</Link>
                    </div>

                    {/* CTA Buttons */}
                    <div className="hidden md:flex items-center gap-4">
                        <Link href="/login" className="text-dark-300 hover:text-white transition-colors">
                            Log in
                        </Link>
                        <Link
                            href="/signup"
                            className="px-5 py-2.5 bg-gradient-to-r from-primary-500 to-primary-600 hover:from-primary-400 hover:to-primary-500 text-white font-semibold rounded-xl transition-all duration-300 hover:shadow-glow"
                        >
                            Start Free Trial
                        </Link>
                    </div>

                    {/* Mobile Menu Button */}
                    <button
                        onClick={() => setMobileOpen(!mobileOpen)}
                        className="md:hidden p-2 text-dark-300 hover:text-white"
                    >
                        {mobileOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
                    </button>
                </div>
            </div>

            {/* Mobile Menu */}
            {mobileOpen && (
                <div className="md:hidden bg-dark-900/95 backdrop-blur-xl border-b border-dark-800">
                    <div className="px-4 py-6 space-y-4">
                        <Link href="#problem" className="block text-dark-300 hover:text-white py-2">The Problem</Link>
                        <Link href="#solution" className="block text-dark-300 hover:text-white py-2">Solution</Link>
                        <Link href="#pricing" className="block text-dark-300 hover:text-white py-2">Pricing</Link>
                        <Link href="#faq" className="block text-dark-300 hover:text-white py-2">FAQ</Link>
                        <div className="pt-4 border-t border-dark-700 space-y-3">
                            <Link href="/login" className="block text-center text-dark-300 hover:text-white py-2">Log in</Link>
                            <Link href="/signup" className="block text-center px-5 py-3 bg-gradient-to-r from-primary-500 to-primary-600 text-white font-semibold rounded-xl">
                                Start Free Trial
                            </Link>
                        </div>
                    </div>
                </div>
            )}
        </nav>
    )
}

// Hero Section - THE COMPLETE PICTURE
function HeroSection() {
    return (
        <section className="relative min-h-screen flex items-center justify-center overflow-hidden pt-20">
            {/* Background Image & Effects */}
            <div className="absolute inset-0 z-0">
                <div className="absolute inset-0 bg-dark-950/80 z-10" />
                <div className="absolute inset-0 bg-gradient-to-t from-dark-950 via-dark-950/50 to-transparent z-10" />
                <img
                    src="/images/hero-bg.png"
                    alt="Data Visualization"
                    className="w-full h-full object-cover opacity-60"
                />
            </div>

            {/* Spotlight Effect */}
            <div className="absolute top-0 left-1/2 -translate-x-1/2 w-full h-[500px] bg-primary-500/20 blur-[120px] rounded-full z-0 opacity-50" />

            <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-20 md:py-32">
                <div className="text-center max-w-5xl mx-auto">
                    {/* Badge */}
                    <div className="inline-flex items-center gap-2 px-4 py-2 bg-dark-800/80 backdrop-blur-md border border-dark-600 rounded-full mb-8 animate-fade-in shadow-lg shadow-primary-500/10">
                        <span className="relative flex h-2 w-2">
                            <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-success-400 opacity-75"></span>
                            <span className="relative inline-flex rounded-full h-2 w-2 bg-success-500"></span>
                        </span>
                        <span className="text-sm text-dark-200">New: Agentic Commerce Tracking Live</span>
                    </div>

                    {/* Main Headline */}
                    <h1 className="text-5xl sm:text-6xl md:text-7xl lg:text-8xl font-bold leading-tight mb-8 animate-fade-in-up tracking-tight">
                        <span className="text-white drop-shadow-xl">Analytics for the </span>
                        <span className="text-transparent bg-clip-text bg-gradient-to-r from-primary-300 via-white to-accent-300 animate-gradient-x">Agentic Web.</span>
                    </h1>

                    {/* Subheadline - THE COMPLETE PICTURE */}
                    <p className="text-xl md:text-2xl text-dark-200 max-w-3xl mx-auto mb-10 animate-fade-in-up animation-delay-200 leading-relaxed font-light">
                        The first analytics platform built to decode <span className="text-white font-medium">AI Agent</span> traffic.
                        Isolate human users, measure true conversion, and <span className="text-primary-300 font-medium">optimize your site for the bots that buy</span>.
                    </p>

                    {/* Subheadline - THE COMPLETE PICTURE */}
                    <p className="text-xl md:text-2xl text-dark-200 max-w-3xl mx-auto mb-10 animate-fade-in-up animation-delay-200 leading-relaxed font-light">
                        Filter out the <span className="text-white font-medium">50%+ of bot traffic</span> polluting your analytics.
                        Unlock <span className="text-primary-300 font-medium">true conversion rates</span> and discover the AI agents already researching your product.
                    </p>

                    {/* CTA Buttons */}
                    <div className="flex flex-col sm:flex-row items-center justify-center gap-4 mb-16 animate-fade-in-up animation-delay-400">
                        <Link
                            href="/signup"
                            className="group relative px-8 py-4 bg-white text-dark-950 font-bold text-lg rounded-full transition-all duration-300 hover:scale-105 hover:shadow-[0_0_40px_-10px_rgba(255,255,255,0.3)] flex items-center justify-center gap-2"
                        >
                            <span className="relative z-10">Start 14-Day Free Trial</span>
                            <ArrowRight className="w-5 h-5 group-hover:translate-x-1 transition-transform relative z-10" />
                        </Link>
                        <Link
                            href="#demo"
                            className="group px-8 py-4 bg-dark-800/40 backdrop-blur-md hover:bg-dark-700/40 border border-dark-600 hover:border-dark-500 text-white font-semibold text-lg rounded-full transition-all duration-300 flex items-center justify-center gap-2"
                        >
                            <Play className="w-5 h-5 fill-current" />
                            Watch Demo
                        </Link>
                    </div>

                    {/* Hero Dashboard - 3D Perspective */}
                    <div className="relative mt-8 animate-fade-in-up animation-delay-600 perspective-1000 group">
                        <div className="absolute -inset-1 bg-gradient-to-r from-primary-500 via-accent-500 to-primary-500 rounded-2xl blur opacity-20 group-hover:opacity-40 transition-opacity duration-1000" />
                        <div className="relative bg-dark-900/90 backdrop-blur-xl border border-dark-700/50 rounded-2xl overflow-hidden shadow-2xl transform transition-transform duration-700 hover:rotate-x-2">
                            {/* Browser chrome */}
                            <div className="flex items-center gap-2 px-4 py-3 border-b border-dark-700/50 bg-dark-800/50">
                                <div className="flex gap-1.5">
                                    <div className="w-3 h-3 rounded-full bg-danger-500/80" />
                                    <div className="w-3 h-3 rounded-full bg-warning-500/80" />
                                    <div className="w-3 h-3 rounded-full bg-success-500/80" />
                                </div>
                                <div className="flex-1 flex justify-center">
                                    <div className="px-4 py-1 bg-dark-900/50 rounded-lg text-xs text-dark-400 font-mono">
                                        app.botfic.com/dashboard/overview
                                    </div>
                                </div>
                            </div>

                            {/* Dashboard Content */}
                            <div className="p-6 md:p-8">
                                <div className="grid md:grid-cols-3 gap-6">
                                    {/* Column 1: Real Metrics */}
                                    <div className="bg-dark-800/30 rounded-xl p-5 border border-success-500/20 hover:border-success-500/40 transition-colors">
                                        <div className="flex items-center gap-3 mb-4">
                                            <div className="w-10 h-10 rounded-lg bg-gradient-to-br from-success-500/20 to-success-900/20 flex items-center justify-center">
                                                <BarChart3 className="w-5 h-5 text-success-400" />
                                            </div>
                                            <div>
                                                <div className="text-xs text-dark-400 font-medium">TRUE METRICS</div>
                                                <div className="text-white font-semibold">Human Only</div>
                                            </div>
                                        </div>
                                        <div className="space-y-4">
                                            <MetricCompare label="Conversion" polluted="1.4%" real="3.8%" />
                                            <MetricCompare label="Bounce" polluted="72%" real="45%" />
                                            <div className="pt-2 border-t border-dark-700/50">
                                                <div className="flex justify-between text-xs">
                                                    <span className="text-dark-400">Revenue Impact</span>
                                                    <span className="text-success-400 font-mono font-bold">+$12,450/mo</span>
                                                </div>
                                            </div>
                                        </div>
                                    </div>

                                    {/* Column 2: Traffic Breakdown */}
                                    <div className="bg-dark-800/30 rounded-xl p-5 border border-primary-500/20 hover:border-primary-500/40 transition-colors">
                                        <div className="flex items-center gap-3 mb-4">
                                            <div className="w-10 h-10 rounded-lg bg-gradient-to-br from-primary-500/20 to-primary-900/20 flex items-center justify-center">
                                                <PieChart className="w-5 h-5 text-primary-400" />
                                            </div>
                                            <div>
                                                <div className="text-xs text-dark-400 font-medium">TRAFFIC SOURCE</div>
                                                <div className="text-white font-semibold">Live Feed</div>
                                            </div>
                                        </div>
                                        <div className="space-y-3">
                                            <TrafficBar label="Human Users" pct={42} color="success" icon="👤" />
                                            <TrafficBar label="AI Agents" pct={28} color="primary" icon="🤖" />
                                            <TrafficBar label="Search Bots" pct={18} color="accent" icon="🔍" />
                                        </div>
                                    </div>

                                    {/* Column 3: Opportunities */}
                                    <div className="bg-dark-800/30 rounded-xl p-5 border border-accent-500/20 hover:border-accent-500/40 transition-colors">
                                        <div className="flex items-center gap-3 mb-4">
                                            <div className="w-10 h-10 rounded-lg bg-gradient-to-br from-accent-500/20 to-accent-900/20 flex items-center justify-center">
                                                <Rocket className="w-5 h-5 text-accent-400" />
                                            </div>
                                            <div>
                                                <div className="text-xs text-dark-400 font-medium">AI OPPORTUNITIES</div>
                                                <div className="text-white font-semibold">Agent Activity</div>
                                            </div>
                                        </div>
                                        <div className="space-y-3">
                                            <OpportunityItem agent="ChatGPT-User" visits="1,234" trend="+45%" />
                                            <OpportunityItem agent="PerplexityBot" visits="856" trend="+67%" />
                                            <div className="mt-2 p-2.5 bg-accent-500/10 rounded-lg border border-accent-500/10">
                                                <div className="flex justify-between items-center">
                                                    <span className="text-xs text-accent-300">Visibility Score</span>
                                                    <span className="text-lg font-bold text-white">78<span className="text-xs text-dark-400 font-normal">/100</span></span>
                                                </div>
                                                <div className="w-full h-1.5 bg-dark-700 rounded-full mt-1">
                                                    <div className="h-full w-[78%] bg-accent-500 rounded-full"></div>
                                                </div>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </section>
    )
}

function MetricCompare({ label, polluted, real }: { label: string; polluted: string; real: string }) {
    return (
        <div className="flex items-center justify-between text-sm">
            <span className="text-dark-400">{label}</span>
            <div className="flex items-center gap-2">
                <span className="text-dark-500 line-through">{polluted}</span>
                <ArrowRight className="w-3 h-3 text-success-400" />
                <span className="text-success-400 font-bold">{real}</span>
            </div>
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
                <div className={`h-full ${colors[color as keyof typeof colors]} rounded-full`} style={{ width: `${pct}%` }} />
            </div>
        </div>
    )
}

function OpportunityItem({ agent, visits, trend }: { agent: string; visits: string; trend: string }) {
    return (
        <div className="flex items-center justify-between">
            <div className="flex items-center gap-2">
                <Bot className="w-4 h-4 text-primary-400" />
                <span className="text-white text-sm">{agent}</span>
            </div>
            <div className="text-right">
                <div className="text-white text-sm font-medium">{visits}</div>
                <div className="text-success-400 text-xs">{trend}</div>
            </div>
        </div>
    )
}

// The Problem Section - From Neil Patel
function ProblemSection() {
    return (
        <section id="problem" className="py-20 md:py-32 relative overflow-hidden">
            <div className="absolute inset-0 bg-dark-900" />
            <div className="absolute inset-0 bg-dot-pattern opacity-30" />

            <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                <div className="text-center mb-16">
                    <div className="inline-flex items-center gap-2 px-4 py-2 bg-danger-500/10 border border-danger-500/20 rounded-full mb-6">
                        <AlertTriangle className="w-4 h-4 text-danger-400" />
                        <span className="text-sm text-danger-300">The Marketing Measurement Problem</span>
                    </div>
                    <h2 className="text-3xl md:text-4xl lg:text-5xl font-bold text-white mb-4">
                        Your Analytics Are <span className="text-danger-400">Lying to You</span>
                    </h2>
                    <p className="text-lg text-dark-300 max-w-3xl mx-auto">
                        For the first time in a decade, bot traffic has surpassed human traffic.
                        <span className="text-white font-semibold"> This isn't just a security problem — it's a marketing measurement problem.</span>
                    </p>
                </div>

                {/* 3 Problems */}
                <div className="grid md:grid-cols-3 gap-6 md:gap-8 mb-16">
                    <ProblemCard
                        icon={<BarChart3 className="w-8 h-8" />}
                        stat="51%"
                        title="Traffic is Now Bots"
                        description="Your conversion rates, bounce rates, and traffic reports are all skewed by visitors who were never going to buy."
                        color="danger"
                    />
                    <ProblemCard
                        icon={<Filter className="w-8 h-8" />}
                        stat="37%"
                        title="Bad Bots Growing"
                        description="Bad bot activity is up for the sixth consecutive year. But blocking ALL bots means missing real opportunities."
                        color="warning"
                    />
                    <ProblemCard
                        icon={<ShoppingCart className="w-8 h-8" />}
                        stat="$500B"
                        title="AI Commerce by 2030"
                        description="AI agents don't just research — they buy. ChatGPT, Perplexity, and Amazon's 'Buy for Me' are becoming the new point of sale."
                        color="accent"
                    />
                </div>

                {/* The Shift - Quote */}
                <div className="max-w-4xl mx-auto">
                    <div className="glass-card p-8 border-primary-500/30">
                        <div className="flex items-start gap-4">
                            <div className="w-16 h-16 rounded-full bg-gradient-to-br from-primary-500 to-accent-500 flex items-center justify-center shrink-0">
                                <Lightbulb className="w-8 h-8 text-white" />
                            </div>
                            <div>
                                <p className="text-xl md:text-2xl text-white mb-4 leading-relaxed">
                                    "This isn't a temporary spike — it's a <span className="text-primary-400">permanent structural shift</span> that's breaking your marketing metrics,
                                    distorting your funnel data, and changing how customers discover and buy from you."
                                </p>
                                <div className="flex items-center gap-4">
                                    <div>
                                        <p className="text-dark-400">The new reality:</p>
                                        <p className="text-white font-semibold">AI agents — not humans — are often your most important audience.</p>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </section>
    )
}

function ProblemCard({ icon, stat, title, description, color }: { icon: React.ReactNode; stat: string; title: string; description: string; color: string }) {
    const colors = {
        danger: 'from-danger-500 to-danger-600',
        warning: 'from-warning-500 to-warning-600',
        accent: 'from-accent-500 to-accent-600',
    }

    return (
        <div className="group feature-card">
            <div className={`w-16 h-16 rounded-2xl bg-gradient-to-br ${colors[color as keyof typeof colors]} flex items-center justify-center text-white mb-6 group-hover:scale-110 transition-transform duration-300`}>
                {icon}
            </div>
            <div className="text-4xl font-bold text-white mb-2">{stat}</div>
            <h3 className="text-xl font-semibold text-white mb-3">{title}</h3>
            <p className="text-dark-400">{description}</p>
        </div>
    )
}

// SolutionSection - The 3 Pillars
function SolutionSection() {
    return (
        <section id="solution" className="py-20 md:py-32 relative overflow-hidden">
            <div className="absolute inset-0 bg-gradient-to-b from-dark-900 via-dark-950 to-dark-900" />
            <div className="absolute inset-0 bg-mesh-gradient opacity-20" />

            <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                <div className="text-center mb-20 animate-fade-in-up">
                    <div className="inline-flex items-center gap-2 px-4 py-2 bg-success-500/10 border border-success-500/20 rounded-full mb-6">
                        <CheckCircle2 className="w-4 h-4 text-success-400" />
                        <span className="text-sm text-success-300">The Bot-First Analytics Platform</span>
                    </div>
                    <h2 className="text-4xl md:text-5xl lg:text-6xl font-bold text-white mb-6">
                        Three Things You Need to <span className="gradient-text">Thrive in the Bot-First Era</span>
                    </h2>
                </div>

                {/* 3 Pillars */}
                <div className="grid lg:grid-cols-3 gap-8">
                    {/* Pillar 1: Real Metrics */}
                    <div className="group glass-card p-8 border-success-500/20 hover:border-success-500/50 transition-all duration-300 hover:-translate-y-2 hover:shadow-2xl hover:shadow-success-500/10">
                        <div className="w-24 h-24 mb-6 relative group-hover:scale-110 transition-transform duration-500">
                            <div className="absolute inset-0 bg-success-500/20 blur-xl rounded-full opacity-0 group-hover:opacity-100 transition-opacity duration-500" />
                            <img src="/images/analytics-icon.png" alt="Analytics 3D Icon" className="w-full h-full object-contain relative z-10" />
                        </div>
                        <h3 className="text-2xl font-bold text-white mb-4">1. Real Metrics</h3>
                        <p className="text-dark-300 mb-6 leading-relaxed">
                            Your "low conversion rate" might actually be a data quality problem. See exactly how bot traffic inflates sessions, distorts bounce rates, and makes your funnel look worse than it really is.
                        </p>
                        <div className="space-y-3 pt-6 border-t border-dark-700/50">
                            <div className="flex items-center gap-3 text-dark-300 group-hover:text-white transition-colors">
                                <CheckCircle2 className="w-5 h-5 text-success-500" />
                                <span>Human-only conversion rate</span>
                            </div>
                            <div className="flex items-center gap-3 text-dark-300 group-hover:text-white transition-colors">
                                <CheckCircle2 className="w-5 h-5 text-success-500" />
                                <span>True bounce rate</span>
                            </div>
                            <div className="flex items-center gap-3 text-dark-300 group-hover:text-white transition-colors">
                                <CheckCircle2 className="w-5 h-5 text-success-500" />
                                <span>Accurate session duration</span>
                            </div>
                        </div>
                    </div>

                    {/* Pillar 2: Traffic Clarity */}
                    <div className="group glass-card p-8 border-primary-500/20 hover:border-primary-500/50 transition-all duration-300 hover:-translate-y-2 hover:shadow-2xl hover:shadow-primary-500/10">
                        <div className="w-24 h-24 mb-6 relative group-hover:scale-110 transition-transform duration-500">
                            <div className="absolute inset-0 bg-primary-500/20 blur-xl rounded-full opacity-0 group-hover:opacity-100 transition-opacity duration-500" />
                            <img src="/images/bot-icon.png" alt="Bot Detection 3D Icon" className="w-full h-full object-contain relative z-10" />
                        </div>
                        <h3 className="text-2xl font-bold text-white mb-4">2. Traffic Clarity</h3>
                        <p className="text-dark-300 mb-6 leading-relaxed">
                            Learn how to differentiate good bots (AI crawlers, shopping agents) from bad bots (fraudsters, scrapers). Understand why blocking all bots is no longer an option.
                        </p>
                        <div className="space-y-3 pt-6 border-t border-dark-700/50">
                            <div className="flex items-center gap-3 text-dark-300 group-hover:text-white transition-colors">
                                <div className="w-6 h-6 rounded bg-success-500/20 flex items-center justify-center text-xs">👤</div>
                                <span>Human Visitors</span>
                            </div>
                            <div className="flex items-center gap-3 text-dark-300 group-hover:text-white transition-colors">
                                <div className="w-6 h-6 rounded bg-primary-500/20 flex items-center justify-center text-xs">🤖</div>
                                <span>AI Agents (ChatGPT, Claude...)</span>
                            </div>
                            <div className="flex items-center gap-3 text-dark-300 group-hover:text-white transition-colors">
                                <div className="w-6 h-6 rounded bg-accent-500/20 flex items-center justify-center text-xs">🔍</div>
                                <span>Search Bots (Google, Bing)</span>
                            </div>
                        </div>
                    </div>

                    {/* Pillar 3: Opportunity */}
                    <div className="group glass-card p-8 border-accent-500/20 hover:border-accent-500/50 transition-all duration-300 hover:-translate-y-2 hover:shadow-2xl hover:shadow-accent-500/10">
                        <div className="w-24 h-24 mb-6 relative group-hover:scale-110 transition-transform duration-500">
                            <div className="absolute inset-0 bg-accent-500/20 blur-xl rounded-full opacity-0 group-hover:opacity-100 transition-opacity duration-500" />
                            <img src="/images/rocket-icon.png" alt="Opportunity 3D Icon" className="w-full h-full object-contain relative z-10" />
                        </div>
                        <h3 className="text-2xl font-bold text-white mb-4">3. Opportunity Gaps</h3>
                        <p className="text-dark-300 mb-6 leading-relaxed">
                            AI agents don't just research — they buy. With agentic commerce projected to hit $300-500B by 2030, discover how platforms like ChatGPT and Perplexity are becoming the new point of sale.
                        </p>
                        <div className="space-y-3 pt-6 border-t border-dark-700/50">
                            <div className="flex items-center gap-3 text-dark-300 group-hover:text-white transition-colors">
                                <CheckCircle2 className="w-5 h-5 text-accent-500" />
                                <span>AI Visibility Score</span>
                            </div>
                            <div className="flex items-center gap-3 text-dark-300 group-hover:text-white transition-colors">
                                <CheckCircle2 className="w-5 h-5 text-accent-500" />
                                <span>Which AI agents visit you</span>
                            </div>
                            <div className="flex items-center gap-3 text-dark-300 group-hover:text-white transition-colors">
                                <CheckCircle2 className="w-5 h-5 text-accent-500" />
                                <span>Optimization recommendations</span>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </section>
    )
}

// True Metrics Comparison
function MetricsComparisonSection() {
    return (
        <section className="py-20 md:py-32 relative overflow-hidden">
            <div className="absolute inset-0 bg-dark-950" />

            <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                <div className="text-center mb-16">
                    <h2 className="text-3xl md:text-4xl lg:text-5xl font-bold text-white mb-4">
                        Your Real Numbers Are <span className="text-success-400">Better Than You Think</span>
                    </h2>
                    <p className="text-lg text-dark-300 max-w-2xl mx-auto">
                        When you filter out bot traffic, your true performance tells a much better story.
                    </p>
                </div>

                <div className="grid md:grid-cols-2 gap-8 max-w-4xl mx-auto">
                    {/* Polluted Metrics */}
                    <div className="glass-card p-8 border-danger-500/30">
                        <div className="flex items-center gap-3 mb-6">
                            <div className="w-10 h-10 rounded-xl bg-danger-500/20 flex items-center justify-center">
                                <AlertTriangle className="w-5 h-5 text-danger-400" />
                            </div>
                            <div>
                                <div className="text-danger-400 text-sm font-medium">❌ Bot-Polluted</div>
                                <div className="text-white font-semibold">What GA Shows</div>
                            </div>
                        </div>

                        <div className="space-y-4">
                            <MetricRow label="Sessions" value="10,234" bad />
                            <MetricRow label="Conversion Rate" value="1.4%" bad />
                            <MetricRow label="Bounce Rate" value="72%" bad />
                            <MetricRow label="Avg. Duration" value="34s" bad />
                        </div>
                    </div>

                    {/* True Metrics */}
                    <div className="glass-card p-8 border-success-500/30 relative overflow-hidden">
                        <div className="absolute top-0 right-0 px-3 py-1 bg-success-500 text-white text-xs font-bold rounded-bl-xl">
                            REAL DATA
                        </div>

                        <div className="flex items-center gap-3 mb-6">
                            <div className="w-10 h-10 rounded-xl bg-success-500/20 flex items-center justify-center">
                                <CheckCircle2 className="w-5 h-5 text-success-400" />
                            </div>
                            <div>
                                <div className="text-success-400 text-sm font-medium">✅ Humans Only</div>
                                <div className="text-white font-semibold">True Metrics</div>
                            </div>
                        </div>

                        <div className="space-y-4">
                            <MetricRow label="Sessions" value="4,287" good improvement="-58%" />
                            <MetricRow label="Conversion Rate" value="3.8%" good improvement="+171%" />
                            <MetricRow label="Bounce Rate" value="45%" good improvement="-38%" />
                            <MetricRow label="Avg. Duration" value="3m 12s" good improvement="+465%" />
                        </div>
                    </div>
                </div>

                {/* Insight callout */}
                <div className="mt-12 max-w-2xl mx-auto text-center">
                    <div className="inline-flex items-center gap-3 px-6 py-4 bg-primary-500/10 border border-primary-500/20 rounded-2xl">
                        <Sparkles className="w-6 h-6 text-primary-400" />
                        <p className="text-white">
                            <span className="font-bold">Reality check:</span> Your actual conversion rate is
                            <span className="text-success-400 font-bold"> 3.8%</span>, not 1.4%.
                            You're performing <span className="text-success-400 font-bold">2.7x better</span> than you thought!
                        </p>
                    </div>
                </div>
            </div>
        </section>
    )
}

function MetricRow({ label, value, bad, good, improvement }: { label: string; value: string; bad?: boolean; good?: boolean; improvement?: string }) {
    return (
        <div className="flex items-center justify-between py-3 border-b border-dark-700 last:border-0">
            <span className="text-dark-400">{label}</span>
            <div className="flex items-center gap-2">
                <span className={`text-xl font-bold ${bad ? 'text-dark-300' : 'text-white'}`}>{value}</span>
                {improvement && (
                    <span className={`text-xs px-2 py-0.5 rounded-full ${improvement.startsWith('+') ? 'bg-success-500/20 text-success-400' : 'bg-primary-500/20 text-primary-400'
                        }`}>
                        {improvement}
                    </span>
                )}
            </div>
        </div>
    )
}

// Features Grid
function FeaturesSection() {
    const features = [
        {
            icon: <Cpu className="w-6 h-6" />,
            title: "Bot Detection Engine",
            description: "Classify every visitor: Human, AI Agent, Search Bot, or Bad Bot with 95%+ accuracy.",
        },
        {
            icon: <BarChart2 className="w-6 h-6" />,
            title: "True Metrics Dashboard",
            description: "See bot-polluted vs real metrics side by side. Know your actual conversion rate.",
        },
        {
            icon: <Bot className="w-6 h-6" />,
            title: "AI Agent Intelligence",
            description: "Track ChatGPT, Perplexity, Claude, Gemini and 20+ AI agents visiting your site.",
        },
        {
            icon: <Target className="w-6 h-6" />,
            title: "AI Visibility Score",
            description: "Measure how well-positioned you are for AI-driven discovery. Improve over time.",
        },
        {
            icon: <Lightbulb className="w-6 h-6" />,
            title: "Optimization Tips",
            description: "Get actionable recommendations to improve visibility to good bots.",
        },
        {
            icon: <Shield className="w-6 h-6" />,
            title: "Bad Bot Identification",
            description: "Identify scrapers, fraudsters, and spam bots polluting your data.",
        },
    ]

    return (
        <section className="py-20 md:py-32 relative">
            <div className="absolute inset-0 bg-dark-900" />

            <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                <div className="text-center mb-16">
                    <h2 className="text-3xl md:text-4xl font-bold text-white mb-4">
                        Everything You Need for the <span className="gradient-text">Bot-First Era</span>
                    </h2>
                </div>

                <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
                    {features.map((feature, i) => (
                        <div key={i} className="feature-card group">
                            <div className="icon-wrapper mb-4 group-hover:scale-110 transition-transform duration-300">
                                <span className="text-primary-400">{feature.icon}</span>
                            </div>
                            <h3 className="text-xl font-semibold text-white mb-2">{feature.title}</h3>
                            <p className="text-dark-400">{feature.description}</p>
                        </div>
                    ))}
                </div>
            </div>
        </section>
    )
}

// How It Works
function HowItWorksSection() {
    const steps = [
        {
            step: "01",
            title: "Install Tracking Script",
            description: "Add one line of code. Works with any site (Next.js, React, WordPress) in 5 minutes.",
        },
        {
            step: "02",
            title: "We Classify Every Visitor",
            description: "Human, AI Agent, Search Bot, or Bad Bot — instantly tagged using our proprietary fingerprinting.",
        },
        {
            step: "03",
            title: "See Truth & Opportunities",
            description: "View clean metrics, see which AI agents are browsing your site, and optimize for them.",
        },
    ]

    return (
        <section className="py-20 md:py-32 relative">
            <div className="absolute inset-0 bg-dark-950" />
            <div className="absolute inset-0 bg-grid-pattern opacity-30" />

            <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                <div className="text-center mb-16">
                    <h2 className="text-3xl md:text-4xl font-bold text-white mb-4">
                        Up and Running in <span className="text-accent-400">5 Minutes</span>
                    </h2>
                </div>

                <div className="grid md:grid-cols-3 gap-8">
                    {steps.map((step, i) => (
                        <div key={i} className="relative">
                            {i < steps.length - 1 && (
                                <div className="hidden md:block absolute top-12 left-full w-full h-0.5 bg-gradient-to-r from-primary-500 to-transparent z-0" />
                            )}
                            <div className="relative z-10 text-center group">
                                <div className="inline-flex items-center justify-center w-24 h-24 rounded-2xl bg-gradient-to-br from-primary-500 to-accent-500 mb-6 group-hover:scale-110 transition-transform duration-300 shadow-lg shadow-primary-500/20">
                                    <span className="text-3xl font-bold text-white">{step.step}</span>
                                </div>
                                <h3 className="text-xl font-semibold text-white mb-3">{step.title}</h3>
                                <p className="text-dark-400 max-w-xs mx-auto">{step.description}</p>
                            </div>
                        </div>
                    ))}
                </div>
            </div>
        </section>
    )
}





// FAQ Section


// Pricing Section
function PricingSection() {
    const plans = [
        {
            name: "Starter",
            price: "$29",
            period: "/month",
            description: "For getting started with bot-first analytics",
            features: [
                "10,000 sessions/month",
                "Bot detection engine",
                "True metrics dashboard",
                "Traffic classification",
                "7-day data retention",
            ],
            cta: "Start Free Trial",
            popular: false
        },
        {
            name: "Growth",
            price: "$79",
            period: "/month",
            description: "For businesses serious about the opportunity",
            features: [
                "100,000 sessions/month",
                "Everything in Starter",
                "AI Agent Intelligence",
                "AI Visibility Score",
                "Optimization recommendations",
                "30-day data retention",
                "API access",
            ],
            cta: "Start Free Trial",
            popular: true
        },
        {
            name: "Scale",
            price: "$199",
            period: "/month",
            description: "For high-traffic sites and agencies",
            features: [
                "1,000,000 sessions/month",
                "Everything in Growth",
                "90-day data retention",
                "Custom integrations",
                "White-label reports",
                "Dedicated support",
            ],
            cta: "Contact Sales",
            popular: false
        },
    ]

    return (
        <section id="pricing" className="py-20 md:py-32 relative overflow-hidden">
            <div className="absolute inset-0 bg-gradient-to-b from-dark-950 via-dark-900 to-dark-950" />

            <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                <div className="text-center mb-16">
                    <h2 className="text-3xl md:text-4xl font-bold text-white mb-4">
                        Simple, Transparent Pricing
                    </h2>
                    <p className="text-lg text-dark-300">14-day free trial. No credit card required.</p>
                </div>

                <div className="grid md:grid-cols-3 gap-8 max-w-5xl mx-auto">
                    {plans.map((plan, i) => (
                        <div
                            key={i}
                            className={`relative glass-card p-8 ${plan.popular ? 'border-primary-500/50 scale-105' : ''}`}
                        >
                            {plan.popular && (
                                <div className="absolute -top-4 left-1/2 -translate-x-1/2 px-4 py-1 bg-gradient-to-r from-primary-500 to-accent-500 text-white text-sm font-bold rounded-full">
                                    Most Popular
                                </div>
                            )}

                            <div className="text-center mb-8">
                                <h3 className="text-xl font-semibold text-white mb-2">{plan.name}</h3>
                                <p className="text-dark-400 text-sm mb-4">{plan.description}</p>
                                <div className="flex items-baseline justify-center gap-1">
                                    <span className="text-4xl font-bold text-white">{plan.price}</span>
                                    <span className="text-dark-400">{plan.period}</span>
                                </div>
                            </div>

                            <ul className="space-y-3 mb-8">
                                {plan.features.map((feature, j) => (
                                    <li key={j} className="flex items-start gap-3">
                                        <CheckCircle2 className="w-5 h-5 text-success-500 shrink-0 mt-0.5" />
                                        <span className="text-dark-300">{feature}</span>
                                    </li>
                                ))}
                            </ul>

                            <Link
                                href="/signup"
                                className={`block w-full py-3 text-center font-semibold rounded-xl transition-all duration-300 ${plan.popular
                                    ? 'bg-gradient-to-r from-primary-500 to-accent-500 hover:from-primary-400 hover:to-accent-400 text-white hover:shadow-glow'
                                    : 'bg-dark-700 hover:bg-dark-600 text-white'
                                    }`}
                            >
                                {plan.cta}
                            </Link>
                        </div>
                    ))}
                </div>
            </div>
        </section>
    )
}

// Testimonials
function TestimonialsSection() {
    const testimonials = [
        {
            quote: "We discovered our real conversion rate was 3.8%, not the 1.4% GA was showing. That changed everything about how we report to stakeholders.",
            author: "Sarah Chen",
            role: "Head of Marketing, TechCorp",
            avatar: "SC"
        },
        {
            quote: "Understanding that ChatGPT sends us 1,200 visitors monthly — and optimizing for that traffic — has become our new SEO strategy.",
            author: "Marcus Johnson",
            role: "Founder, SaaSify",
            avatar: "MJ"
        },
        {
            quote: "Finally, clarity on who's actually visiting our site. Human, AI, or bad bot — now we know and can act accordingly.",
            author: "Emily Rodriguez",
            role: "Growth Lead, StartupXYZ",
            avatar: "ER"
        },
    ]

    return (
        <section className="py-20 md:py-32 relative">
            <div className="absolute inset-0 bg-dark-900" />

            <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                <div className="text-center mb-16">
                    <h2 className="text-3xl md:text-4xl font-bold text-white mb-4">
                        Trusted by <span className="gradient-text">Forward-Thinking Teams</span>
                    </h2>
                </div>

                <div className="grid md:grid-cols-3 gap-8">
                    {testimonials.map((t, i) => (
                        <div key={i} className="glass-card p-8">
                            <div className="flex items-center gap-1 mb-4">
                                {[...Array(5)].map((_, j) => (
                                    <Star key={j} className="w-5 h-5 text-warning-400 fill-warning-400" />
                                ))}
                            </div>
                            <p className="text-white mb-6 text-lg">"{t.quote}"</p>
                            <div className="flex items-center gap-3">
                                <div className="w-12 h-12 rounded-full bg-gradient-to-br from-primary-500 to-accent-500 flex items-center justify-center text-white font-bold">
                                    {t.avatar}
                                </div>
                                <div>
                                    <div className="text-white font-semibold">{t.author}</div>
                                    <div className="text-dark-400 text-sm">{t.role}</div>
                                </div>
                            </div>
                        </div>
                    ))}
                </div>
            </div>
        </section>
    )
}

// FAQ
function FAQSection() {
    const [openIndex, setOpenIndex] = useState<number | null>(0)

    const faqs = [
        {
            question: "How do you differentiate good bots from bad bots?",
            answer: "We use a multi-signal detection engine that analyzes user-agent patterns, behavioral signals, and JavaScript execution to classify visitors into four categories: Human, AI Agent (ChatGPT, Perplexity, Claude, etc.), Search Bot (Google, Bing), and Bad Bot (scrapers, fraudsters). Good bots like AI agents and search bots are opportunities; bad bots are noise."
        },
        {
            question: "What is the AI Visibility Score?",
            answer: "Your AI Visibility Score (0-100) measures how well-positioned you are to be discovered and recommended by AI agents. It factors in how often AI agents visit you, what pages they access, content structure, and more. A higher score means AI agents are more likely to recommend you to their users."
        },
    ]

    return (
        <section id="faq" className="py-20 md:py-32 relative">
            <div className="absolute inset-0 bg-dark-950" />

            <div className="relative z-10 max-w-3xl mx-auto px-4 sm:px-6 lg:px-8">
                <div className="text-center mb-16">
                    <h2 className="text-3xl md:text-4xl font-bold text-white mb-4">
                        Frequently Asked Questions
                    </h2>
                </div>

                <div className="space-y-4">
                    {faqs.map((faq, i) => (
                        <div key={i} className="glass-card overflow-hidden transition-all duration-300 border border-dark-700 hover:border-dark-600">
                            {/* ... implementation ... */}
                        </div>
                    ))}
                </div>
            </div>
        </section>
    )
}

function IntegrationSection() {

    return (
        <section className="py-20 border-t border-dark-800 bg-dark-900/50">
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
                <p className="text-dark-400 mb-8 font-medium tracking-wide uppercase">Works seamlessly with your stack</p>
                <div className="flex flex-wrap justify-center items-center gap-8 md:gap-16">
                    {/* Next.js */}
                    <div className="group flex flex-col items-center gap-2 opacity-50 hover:opacity-100 transition-all duration-300">
                        <div className="w-12 h-12 bg-white rounded-full flex items-center justify-center text-dark-950">
                            <svg viewBox="0 0 180 180" width="24" height="24" className="fill-current"><mask height="180" id="mask0_408_134" maskUnits="userSpaceOnUse" width="180" x="0" y="0" style={{ maskType: 'alpha' }}><circle cx="90" cy="90" fill="#000000" r="90"></circle></mask><g mask="url(#mask0_408_134)"><circle cx="90" cy="90" data-circle="true" fill="black" r="90"></circle><path d="M149.508 157.52L69.142 54H54V125.97H66.1136V69.3836L139.999 164.845C143.333 162.614 146.509 160.165 149.508 157.52Z" fill="url(#paint0_linear_408_134)"></path><rect fill="url(#paint1_linear_408_134)" height="72" width="12" x="115" y="54"></rect></g><defs><linearGradient gradientUnits="userSpaceOnUse" id="paint0_linear_408_134" x1="109" x2="144.5" y1="116.5" y2="160.5"><stop stopColor="white"></stop><stop offset="1" stopColor="white" stopOpacity="0"></stop></linearGradient><linearGradient gradientUnits="userSpaceOnUse" id="paint1_linear_408_134" x1="121" x2="120.799" y1="54" y2="106.875"><stop stopColor="white"></stop><stop offset="1" stopColor="white" stopOpacity="0"></stop></linearGradient></defs></svg>
                        </div>
                        <span className="text-sm font-semibold text-white">Next.js</span>
                    </div>

                    {/* React */}
                    <div className="group flex flex-col items-center gap-2 opacity-50 hover:opacity-100 transition-all duration-300">
                        <div className="w-12 h-12 bg-[#149eca]/10 rounded-full flex items-center justify-center text-[#149eca]">
                            <svg xmlns="http://www.w3.org/2000/svg" viewBox="-11.5 -10.23174 23 20.46348" width="24" height="24" fill="currentColor">
                                <circle cx="0" cy="0" r="2.05" fill="#61dafb" />
                                <g stroke="#61dafb" strokeWidth="1" fill="none">
                                    <ellipse rx="11" ry="4.2" />
                                    <ellipse rx="11" ry="4.2" transform="rotate(60)" />
                                    <ellipse rx="11" ry="4.2" transform="rotate(120)" />
                                </g>
                            </svg>
                        </div>
                        <span className="text-sm font-semibold text-white">React</span>
                    </div>

                    {/* WordPress */}
                    <div className="group flex flex-col items-center gap-2 opacity-50 hover:opacity-100 transition-all duration-300">
                        <div className="w-12 h-12 bg-white rounded-full flex items-center justify-center text-[#21759b]">
                            <svg fill="currentColor" viewBox="0 0 24 24" width="24" height="24"><path d="M12.035 1.768c-5.184 0-9.457 3.86-10.16 8.847L1.87 10.6l-.007.135 7.152 7.152-4.524 4.524a10.231 10.231 0 0 1-2.731-7.23H12.035zm-2.062 18.068 5.485-5.485 1.54 1.54-5.485 5.485a10.19 10.19 0 0 1-1.54-1.54zm8.68-1.54L13.168 12.81l1.54-1.54 5.485 5.485a10.19 10.19 0 0 1-1.54 1.54zM20.233 12.035a8.198 8.198 0 0 0-8.198-8.198V12.035h8.198zm.292-1.768h-8.49V1.778a10.233 10.233 0 0 1 8.49 8.49z" /></svg>
                        </div>
                        <span className="text-sm font-semibold text-white">WordPress</span>
                    </div>

                    {/* Vercel */}
                    <div className="group flex flex-col items-center gap-2 opacity-50 hover:opacity-100 transition-all duration-300">
                        <div className="w-12 h-12 bg-white rounded-full flex items-center justify-center text-black">
                            <svg fill="currentColor" viewBox="0 0 24 24" width="24" height="24"><path d="M24 22.525H0l12-21.05 12 21.05z" /></svg>
                        </div>
                        <span className="text-sm font-semibold text-white">Vercel</span>
                    </div>

                    {/* Node.js */}
                    <div className="group flex flex-col items-center gap-2 opacity-50 hover:opacity-100 transition-all duration-300">
                        <div className="w-12 h-12 bg-[#339933]/10 rounded-full flex items-center justify-center text-[#339933]">
                            <Cpu className="w-6 h-6" />
                        </div>
                        <span className="text-sm font-semibold text-white">Node.js</span>
                    </div>
                </div>
            </div>
        </section >
    )
}



// CTA
function CTASection() {
    return (
        <section className="py-20 md:py-32 relative overflow-hidden">
            <div className="absolute inset-0 bg-gradient-to-br from-primary-900 via-dark-900 to-dark-950" />
            <div className="absolute inset-0 bg-mesh-gradient" />

            <div className="absolute top-1/4 left-1/4 w-64 h-64 bg-primary-500/20 rounded-full blur-3xl animate-float" />
            <div className="absolute bottom-1/4 right-1/4 w-48 h-48 bg-accent-500/20 rounded-full blur-3xl animate-float animation-delay-500" />

            <div className="relative z-10 max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
                <h2 className="text-3xl md:text-4xl lg:text-5xl font-bold text-white mb-6">
                    Real Metrics. Clear Traffic. Real Opportunities.
                </h2>
                <p className="text-lg md:text-xl text-dark-300 mb-10 max-w-2xl mx-auto">
                    Adjust to a bot-first marketing world with actionable frameworks, real data, and a complete playbook for thriving in the bot-first era.
                </p>

                <div className="flex flex-col sm:flex-row items-center justify-center gap-4 mb-8">
                    <Link
                        href="/signup"
                        className="group w-full sm:w-auto px-10 py-4 bg-white hover:bg-dark-100 text-dark-900 font-bold text-lg rounded-xl transition-all duration-300 flex items-center justify-center gap-2"
                    >
                        Start Free Trial
                        <ArrowRight className="w-5 h-5 group-hover:translate-x-1 transition-transform" />
                    </Link>
                    <Link
                        href="/demo"
                        className="w-full sm:w-auto px-10 py-4 border border-white/20 hover:border-white/40 text-white font-semibold text-lg rounded-xl transition-all duration-300"
                    >
                        Schedule Demo
                    </Link>
                </div>

                <p className="text-dark-400 text-sm">
                    No credit card required • 14-day free trial • 5-minute setup
                </p>
            </div>
        </section>
    )
}

// Footer
function Footer() {
    return (
        <footer className="py-16 border-t border-dark-800 bg-dark-950">
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                <div className="grid md:grid-cols-4 gap-12 mb-12">
                    <div className="md:col-span-1">
                        <Link href="/" className="flex items-center gap-2 mb-4">
                            <div className="w-10 h-10 rounded-xl bg-gradient-to-br from-primary-500 to-accent-500 flex items-center justify-center">
                                <Bot className="w-6 h-6 text-white" />
                            </div>
                            <span className="text-xl font-bold text-white">Botfic</span>
                        </Link>
                        <p className="text-dark-400 text-sm">
                            Real metrics. Clear traffic. Real opportunities. The analytics platform for the bot-first era.
                        </p>
                    </div>

                    <div>
                        <h4 className="text-white font-semibold mb-4">Product</h4>
                        <ul className="space-y-2">
                            <li><Link href="#solution" className="text-dark-400 hover:text-white transition-colors">How it Works</Link></li>
                            <li><Link href="#pricing" className="text-dark-400 hover:text-white transition-colors">Pricing</Link></li>
                            <li><Link href="/docs" className="text-dark-400 hover:text-white transition-colors">Documentation</Link></li>
                        </ul>
                    </div>

                    <div>
                        <h4 className="text-white font-semibold mb-4">Company</h4>
                        <ul className="space-y-2">
                            <li><Link href="/about" className="text-dark-400 hover:text-white transition-colors">About</Link></li>
                            <li><Link href="/blog" className="text-dark-400 hover:text-white transition-colors">Blog</Link></li>
                            <li><Link href="/contact" className="text-dark-400 hover:text-white transition-colors">Contact</Link></li>
                        </ul>
                    </div>

                    <div>
                        <h4 className="text-white font-semibold mb-4">Legal</h4>
                        <ul className="space-y-2">
                            <li><Link href="/privacy" className="text-dark-400 hover:text-white transition-colors">Privacy</Link></li>
                            <li><Link href="/terms" className="text-dark-400 hover:text-white transition-colors">Terms</Link></li>
                            <li><Link href="/security" className="text-dark-400 hover:text-white transition-colors">Security</Link></li>
                        </ul>
                    </div>
                </div>

                <div className="h-px bg-gradient-to-r from-transparent via-dark-600 to-transparent mb-8" />

                <div className="flex flex-col md:flex-row items-center justify-between gap-4">
                    <p className="text-dark-500 text-sm">© 2026 Botfic. All rights reserved.</p>
                    <div className="flex items-center gap-6">
                        <Link href="https://twitter.com/botfic" className="text-dark-400 hover:text-white transition-colors">Twitter</Link>
                        <Link href="https://linkedin.com/company/botfic" className="text-dark-400 hover:text-white transition-colors">LinkedIn</Link>
                    </div>
                </div>
            </div>
        </footer>
    )
}

// Main Page
export default function LandingPage() {
    return (
        <main className="relative">
            <Navbar />
            <HeroSection />
            <ProblemSection />
            <SolutionSection />
            <MetricsComparisonSection />
            <FeaturesSection />
            <HowItWorksSection />
            <IntegrationSection />
            <PricingSection />
            <TestimonialsSection />
            <FAQSection />
            <CTASection />
            <Footer />
        </main>
    )
}
