'use client'

import React, { useState, useEffect } from 'react'
import Link from 'next/link'
import Script from 'next/script'
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
        <nav className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${scrolled ? 'bg-growthz-bg/80 backdrop-blur-xl border-b border-dark-800' : 'bg-transparent'
            }`}>
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                <div className="flex items-center justify-between h-16 md:h-20">
                    {/* Logo */}
                    <Link href="/" className="flex items-center gap-2 group">
                        <div className="w-10 h-10 rounded-xl bg-growthz-blue flex items-center justify-center shadow-lg shadow-growthz-blue/20">
                            <Bot className="w-6 h-6 text-white" />
                        </div>
                        <span className="text-xl font-bold text-white tracking-tight">Botfic</span>
                    </Link>

                    {/* Desktop Nav */}
                    <div className="hidden md:flex items-center gap-8">
                        {['Problem', 'Solution', 'Pricing', 'FAQ'].map((item) => (
                            <Link
                                key={item}
                                href={`#${item.toLowerCase()}`}
                                className="text-sm font-medium text-gray-300 hover:text-white transition-colors relative group"
                            >
                                {item}
                                <span className="absolute -bottom-1 left-0 w-0 h-0.5 bg-growthz-blue transition-all duration-300 group-hover:w-full" />
                            </Link>
                        ))}
                    </div>

                    {/* CTA Buttons */}
                    <div className="hidden md:flex items-center gap-4">
                        <Link href="/login" className="text-sm font-medium text-gray-300 hover:text-white transition-colors">
                            Log in
                        </Link>
                        <Link
                            href="/signup"
                            className="px-5 py-2.5 bg-white text-growthz-bg font-bold text-sm rounded-full hover:bg-gray-100 transition-all duration-300 shadow-lg shadow-white/10"
                        >
                            Start Free Trial
                        </Link>
                    </div>

                    {/* Mobile Menu Button */}
                    <button
                        onClick={() => setMobileOpen(!mobileOpen)}
                        className="md:hidden p-2 text-gray-300 hover:text-white"
                    >
                        {mobileOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
                    </button>
                </div>
            </div>

            {/* Mobile Menu */}
            {mobileOpen && (
                <div className="md:hidden bg-growthz-bg/95 backdrop-blur-xl border-b border-dark-800">
                    <div className="px-4 py-6 space-y-4">
                        {['Problem', 'Solution', 'Pricing', 'FAQ'].map((item) => (
                            <Link key={item} href={`#${item.toLowerCase()}`} className="block text-gray-300 hover:text-white py-2 font-medium">{item}</Link>
                        ))}
                        <div className="pt-4 border-t border-dark-700 space-y-3">
                            <Link href="/login" className="block text-center text-gray-300 hover:text-white py-2">Log in</Link>
                            <Link href="/signup" className="block text-center px-5 py-3 bg-growthz-blue text-white font-bold rounded-xl shadow-lg shadow-growthz-blue/20">
                                Start Free Trial
                            </Link>
                        </div>
                    </div>
                </div>
            )}
        </nav>
    )
}

// Hero Section - Growthz.ai Inspired
function HeroSection() {
    return (
        <section className="relative min-h-[90vh] flex items-center justify-center overflow-hidden pt-20">
            {/* Background - Radial Gradient from bottom left */}
            <div className="absolute inset-0 z-0 bg-growthz-bg" style={{
                background: 'radial-gradient(circle at bottom left, #0163F8 0%, #101827 40%)'
            }} />

            {/* Overlay for readability if needed */}
            <div className="absolute inset-0 bg-dark-950/20 z-0" />

            <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-20 text-center">

                {/* Logo/Icon if they have one central */}
                <div className="flex justify-center mb-12">
                    <div className="relative w-28 h-28">
                        <div className="absolute inset-0 bg-growthz-blue/40 blur-2xl rounded-full animate-pulse-glow" />
                        <div className="relative w-full h-full bg-gradient-to-br from-growthz-blue to-accent-400 rounded-2xl flex items-center justify-center shadow-2xl rotate-12 hover:rotate-0 transition-all duration-500">
                            <Bot className="w-16 h-16 text-white" />
                        </div>
                    </div>
                </div>

                {/* Main Headline - Serif */}
                <h1 className="text-5xl md:text-7xl lg:text-8xl font-serif font-bold text-white mb-8 leading-tight max-w-5xl mx-auto drop-shadow-2xl animate-fade-in-up tracking-tight">
                    Analytics Built for the <br />
                    <span className="text-transparent bg-clip-text bg-gradient-to-r from-growthz-blue via-blue-400 to-white">Agentic Economy</span>
                </h1>

                {/* Subheadline Expanded */}
                <p className="text-xl md:text-2xl text-gray-300 max-w-3xl mx-auto mb-12 leading-relaxed font-light animate-fade-in-up animation-delay-200">
                    Traditional analytics are broken. <strong className="text-white font-medium">Over 50% of your traffic is now non-human.</strong> <br className="hidden md:block" />
                    Botfic is the first intelligence platform designed to decode this new world: <br className="hidden md:block" />
                    <span className="text-growthz-blue font-medium">isolate human buyers</span>, <span className="text-growthz-blue font-medium">track AI agent visits</span>, and <span className="text-growthz-blue font-medium">unlock your true conversion metrics</span>.
                </p>

                {/* CTA Button */}
                <div className="flex justify-center animate-fade-in-up animation-delay-400">
                    <Link
                        href="/signup"
                        className="relative group transition-all duration-300 hover:scale-105"
                    >
                        <div className="absolute -inset-1 bg-gradient-to-r from-growthz-blue to-accent-400 rounded-full blur opacity-40 group-hover:opacity-75 transition duration-200" />
                        <button className="relative px-8 py-4 bg-dark-900 border border-growthz-blue/30 hover:bg-growthz-blue hover:border-growthz-blue text-white font-bold text-lg rounded-full transition-all duration-300 shadow-xl flex items-center gap-3">
                            <Sparkles className="w-5 h-5" />
                            Start Free Trial
                        </button>
                    </Link>
                </div>

                {/* Visual/Dashboard Preview */}
                {/* Visual/Dashboard Preview */}
                <div className="mt-20 relative animate-fade-in-up animation-delay-600 perspective-1000 group">
                    {/* Glow Effects */}
                    <div className="absolute -inset-1 bg-gradient-to-r from-growthz-blue via-blue-500 to-growthz-blue rounded-xl blur-lg opacity-20 group-hover:opacity-40 transition-opacity duration-1000" />

                    {/* Dashboard Container */}
                    <div className="relative bg-[#0B1221] border border-white/10 rounded-xl overflow-hidden shadow-2xl transform rotate-x-12 group-hover:rotate-x-0 transition-transform duration-700 ease-out">

                        {/* Window Header */}
                        <div className="flex items-center gap-4 px-6 py-4 border-b border-white/5 bg-[#0F172A]">
                            <div className="flex gap-2">
                                <div className="w-3 h-3 rounded-full bg-[#FF5F57]" />
                                <div className="w-3 h-3 rounded-full bg-[#FEBC2E]" />
                                <div className="w-3 h-3 rounded-full bg-[#28C840]" />
                            </div>
                            <div className="flex-1 flex justify-center">
                                <div className="px-4 py-1.5 bg-black/20 rounded-md border border-white/5 text-[10px] text-gray-400 font-mono flex items-center gap-2">
                                    <Shield className="w-3 h-3" />
                                    app.botfic.com/dashboard
                                </div>
                            </div>
                            <div className="w-16" /> {/* Spacer for centering */}
                        </div>

                        {/* Dashboard Body */}
                        <div className="p-8 grid md:grid-cols-3 gap-6 text-left">

                            {/* Card 1: Bot Purification */}
                            <div className="bg-[#131B2D] rounded-xl p-5 border border-white/5 relative overflow-hidden group/card hover:border-growthz-blue/30 transition-colors">
                                <div className="absolute inset-0 bg-gradient-to-b from-white/5 to-transparent pointer-events-none" />
                                <div className="flex items-center justify-between mb-6">
                                    <div>
                                        <div className="text-gray-400 text-xs font-semibold uppercase tracking-wider mb-1">Total Sessions</div>
                                        <div className="text-2xl font-bold text-white">24,592</div>
                                    </div>
                                    <div className="w-10 h-10 rounded-lg bg-growthz-blue/10 flex items-center justify-center border border-growthz-blue/20">
                                        <Activity className="w-5 h-5 text-growthz-blue" />
                                    </div>
                                </div>
                                <div className="space-y-4">
                                    <div className="flex justify-between items-center text-sm">
                                        <span className="text-gray-400">Bot Traffic</span>
                                        <span className="text-red-400 font-mono">13,201 (53%)</span>
                                    </div>
                                    <div className="w-full h-1.5 bg-dark-800 rounded-full overflow-hidden">
                                        <div className="h-full bg-red-500 w-[53%] rounded-full relative">
                                            <div className="absolute inset-0 bg-white/20 animate-shimmer" />
                                        </div>
                                    </div>
                                    <div className="flex justify-between items-center text-sm">
                                        <span className="text-gray-400">Real Humans</span>
                                        <span className="text-emerald-400 font-mono">11,391 (47%)</span>
                                    </div>
                                    <div className="w-full h-1.5 bg-dark-800 rounded-full overflow-hidden">
                                        <div className="h-full bg-emerald-500 w-[47%] rounded-full shadow-[0_0_10px_rgba(16,185,129,0.5)]" />
                                    </div>
                                </div>
                            </div>

                            {/* Card 2: Metrics Recovery */}
                            <div className="bg-[#131B2D] rounded-xl p-5 border border-white/5 relative overflow-hidden group/card hover:border-emerald-500/30 transition-colors">
                                <div className="flex items-center gap-3 mb-6">
                                    <div className="w-10 h-10 rounded-lg bg-emerald-500/10 flex items-center justify-center border border-emerald-500/20">
                                        <BarChart3 className="w-5 h-5 text-emerald-400" />
                                    </div>
                                    <div>
                                        <div className="text-white font-medium">True Metrics</div>
                                        <div className="text-xs text-gray-500">Filtered View</div>
                                    </div>
                                </div>
                                <div className="space-y-4">
                                    <MetricCompare label="Conversion" polluted="1.2%" real="3.8%" />
                                    <MetricCompare label="Bounce Rate" polluted="82%" real="45%" />
                                    <MetricCompare label="Avg. Session" polluted="24s" real="3m 12s" />
                                </div>
                                <div className="mt-4 pt-3 border-t border-white/5">
                                    <div className="flex items-center gap-2 text-xs text-emerald-400">
                                        <TrendingUp className="w-3 h-3" />
                                        <span>Data Confidence: 99.8%</span>
                                    </div>
                                </div>
                            </div>

                            {/* Card 3: AI Opportunities */}
                            <div className="bg-[#131B2D] rounded-xl p-5 border border-white/5 relative overflow-hidden group/card hover:border-purple-500/30 transition-colors">
                                <div className="flex items-center gap-3 mb-6">
                                    <div className="w-10 h-10 rounded-lg bg-purple-500/10 flex items-center justify-center border border-purple-500/20">
                                        <Sparkles className="w-5 h-5 text-purple-400" />
                                    </div>
                                    <div>
                                        <div className="text-white font-medium">Agent Activity</div>
                                        <div className="text-xs text-gray-500">Last 24h</div>
                                    </div>
                                </div>
                                <div className="space-y-3">
                                    <OpportunityItem agent="ChatGPT (User)" visits="842" trend="+12%" icon={<Bot className="w-3 h-3" />} />
                                    <OpportunityItem agent="Perplexity" visits="315" trend="+45%" icon={<Search className="w-3 h-3" />} />
                                    <OpportunityItem agent="ClaudeBot" visits="159" trend="+8%" icon={<Cpu className="w-3 h-3" />} />
                                </div>
                                <div className="mt-4 p-2 bg-gradient-to-r from-purple-500/10 to-blue-500/10 rounded border border-purple-500/10">
                                    <div className="flex justify-between text-xs">
                                        <span className="text-purple-300">Visibility Score</span>
                                        <span className="text-white font-bold">88/100</span>
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
        <div className="group/item">
            <div className="flex justify-between items-center text-sm mb-1">
                <span className="text-gray-400 group-hover/item:text-white transition-colors">{label}</span>
            </div>
            <div className="flex items-center gap-2 bg-dark-950/50 p-1.5 rounded-lg border border-white/5">
                <div className="flex-1 flex flex-col items-center border-r border-white/5 px-2">
                    <span className="text-[10px] text-gray-500 line-through">{polluted}</span>
                </div>
                <ArrowRight className="w-3 h-3 text-emerald-500" />
                <div className="flex-1 flex flex-col items-center px-2">
                    <span className="text-sm font-bold text-emerald-400">{real}</span>
                </div>
            </div>
        </div>
    )
}

function TrafficBar({ label, pct, color, icon }: { label: string; pct: number; color: string; icon: string }) {
    // Component preserved for other usages if needed, though replaced in Hero
    const colors = {
        success: 'bg-emerald-500',
        primary: 'bg-growthz-blue',
        accent: 'bg-purple-500',
        danger: 'bg-red-500',
    }
    return (
        <div>
            <div className="flex items-center justify-between text-sm mb-1">
                <span className="text-gray-400 flex items-center gap-2">{icon} {label}</span>
                <span className="text-white font-mono">{pct}%</span>
            </div>
            <div className="h-1.5 bg-dark-800 rounded-full overflow-hidden">
                <div className={`h-full ${colors[color as keyof typeof colors]} rounded-full`} style={{ width: `${pct}%` }} />
            </div>
        </div>
    )
}

function OpportunityItem({ agent, visits, trend, icon }: { agent: string; visits: string; trend: string, icon?: React.ReactNode }) {
    return (
        <div className="flex items-center justify-between p-2 rounded-lg hover:bg-white/5 transition-colors border border-transparent hover:border-white/5 group/item">
            <div className="flex items-center gap-3">
                <div className="w-6 h-6 rounded bg-purple-500/10 flex items-center justify-center text-purple-400">
                    {icon || <Bot className="w-3 h-3" />}
                </div>
                <span className="text-gray-300 text-sm font-medium group-hover/item:text-white">{agent}</span>
            </div>
            <div className="text-right flex items-center gap-3">
                <div className="text-white text-sm font-mono">{visits}</div>
                <div className="text-emerald-400 text-[10px] bg-emerald-500/10 px-1.5 py-0.5 rounded border border-emerald-500/20">{trend}</div>
            </div>
        </div>
    )
}

// The Problem Section - From Neil Patel
// The Problem Section
function ProblemSection() {
    return (
        <section id="problem" className="py-20 md:py-32 relative overflow-hidden bg-growthz-bg">
            <div className="absolute inset-0 bg-grid-pattern opacity-10" />

            <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                <div className="text-center mb-16">
                    <div className="inline-flex items-center gap-2 px-4 py-2 bg-red-500/10 border border-red-500/20 rounded-full mb-8 hover:bg-red-500/20 transition-colors cursor-default">
                        <AlertTriangle className="w-4 h-4 text-red-500" />
                        <span className="text-sm font-bold text-red-500 tracking-widest uppercase">The Problem</span>
                    </div>
                    <h2 className="text-4xl md:text-6xl font-serif font-bold text-white mb-6 tracking-tight">
                        Your Analytics Are <span className="text-transparent bg-clip-text bg-gradient-to-r from-red-500 to-orange-600">Lying to You</span>
                    </h2>
                    <p className="text-lg text-gray-400 max-w-3xl mx-auto leading-relaxed">
                        For the first time in a decade, bot traffic has surpassed human traffic.
                        <span className="text-white font-medium"> This isn't just a security problem — it's a marketing measurement problem.</span>
                    </p>
                </div>

                {/* 3 Problems Expanded */}
                <div className="grid md:grid-cols-3 gap-6 md:gap-8 mb-16">
                    <ProblemCard
                        icon={<BarChart3 className="w-8 h-8" />}
                        stat="51%"
                        title="Your Funnel is Polluted"
                        description="Every forgotten dashboard and skewed report stems from one issue: half your visitors aren't people. When bots inflate your sessions, your conversion rates plummet artificially, leading to misguided ad spend and poor strategic decisions."
                        color="blue"
                    />
                    <ProblemCard
                        icon={<Filter className="w-8 h-8" />}
                        stat="37%"
                        title="Good Bots vs. Bad Bots"
                        description="Not all non-human traffic is malicious. While scrapers and fraudsters drain resources, AI shopping agents and search crawlers are vital for discovery. Legacy tools block everything blindly—costing you visibility in the AI era."
                        color="blue"
                    />
                    <ProblemCard
                        icon={<ShoppingCart className="w-8 h-8" />}
                        stat="$500B"
                        title="The Rise of Agentic Commerce"
                        description="We are entering a new paradigm where AI agents don't just browse—they buy. Platforms like ChatGPT, Perplexity, and autonomous shopping bots are becoming the new 'users'. Ignoring them means ignoring the fastest-growing segment of e-commerce."
                        color="blue"
                    />
                </div>

                {/* The Shift - Quote */}
                <div className="max-w-4xl mx-auto">
                    <div className="group relative p-8 rounded-2xl bg-white/5 border border-white/10 hover:border-growthz-blue/30 transition-all duration-300">
                        {/* Glow effect */}
                        <div className="absolute inset-0 bg-growthz-blue/5 blur-xl rounded-2xl opacity-0 group-hover:opacity-100 transition-opacity" />

                        <div className="relative flex items-start gap-6">
                            <div className="w-16 h-16 rounded-full bg-growthz-blue/20 flex items-center justify-center shrink-0">
                                <Lightbulb className="w-8 h-8 text-growthz-blue" />
                            </div>
                            <div>
                                <p className="text-xl md:text-2xl text-white mb-4 leading-relaxed font-light">
                                    "This isn't a temporary spike — it's a <span className="text-growthz-blue font-medium">permanent structural shift</span> that's breaking your marketing metrics,
                                    distorting your funnel data, and changing how customers discover and buy from you."
                                </p>
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
        blue: 'from-growthz-blue to-accent-600',
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
                    <div className="inline-flex items-center gap-2 px-4 py-2 bg-growthz-blue/10 border border-growthz-blue/20 rounded-full mb-8 hover:bg-growthz-blue/20 transition-colors cursor-default">
                        <CheckCircle2 className="w-4 h-4 text-growthz-blue" />
                        <span className="text-sm font-bold text-growthz-blue tracking-widest uppercase">The Solution</span>
                    </div>
                    <h2 className="text-4xl md:text-6xl font-bold text-white mb-6 tracking-tight">
                        Three Things You Need to <span className="text-transparent bg-clip-text bg-gradient-to-r from-growthz-blue to-cyan-400">Thrive in the Bot Era</span>
                    </h2>
                </div>

                {/* 3 Pillars Expanded */}
                <div className="grid lg:grid-cols-3 gap-8">
                    {/* Pillar 1: Real Metrics */}
                    <div className="group glass-card p-10 border-white/5 hover:border-growthz-blue/30 hover:bg-white/5 transition-all duration-300 hover:-translate-y-2 hover:shadow-2xl hover:shadow-growthz-blue/10">
                        <div className="w-24 h-24 mb-8 relative group-hover:scale-110 transition-transform duration-500">
                            <div className="absolute inset-0 bg-growthz-blue/20 blur-2xl rounded-full opacity-0 group-hover:opacity-100 transition-opacity duration-500" />
                            <div className="relative w-full h-full bg-gradient-to-br from-growthz-blue/20 to-transparent rounded-2xl flex items-center justify-center border border-white/10">
                                <BarChart3 className="w-10 h-10 text-growthz-blue" />
                            </div>
                        </div>
                        <h3 className="text-2xl font-bold text-white mb-4">1. Uncover Your True Metrics</h3>
                        <p className="text-gray-400 mb-8 leading-relaxed h-24">
                            Stop optimizing for ghosts. By filtering out non-human sessions, you reveal the actual behavior of your potential customers. Suddenly, your "low conversion rate" might look healthy, and your "high bounce rate" might be a myth.
                        </p>
                        <ul className="space-y-4 pt-8 border-t border-white/10">
                            <li className="flex items-center gap-3 text-gray-300 group-hover:text-white transition-colors">
                                <CheckCircle2 className="w-5 h-5 text-growthz-blue" />
                                <span>Human-only conversion baselines</span>
                            </li>
                            <li className="flex items-center gap-3 text-gray-300 group-hover:text-white transition-colors">
                                <CheckCircle2 className="w-5 h-5 text-growthz-blue" />
                                <span>Accurate session duration & engagement</span>
                            </li>
                            <li className="flex items-center gap-3 text-gray-300 group-hover:text-white transition-colors">
                                <CheckCircle2 className="w-5 h-5 text-growthz-blue" />
                                <span>Clean data for better ad targeting</span>
                            </li>
                        </ul>
                    </div>

                    {/* Pillar 2: Traffic Clarity */}
                    <div className="group glass-card p-10 border-white/5 hover:border-growthz-blue/30 hover:bg-white/5 transition-all duration-300 hover:-translate-y-2 hover:shadow-2xl hover:shadow-growthz-blue/10">
                        <div className="w-24 h-24 mb-8 relative group-hover:scale-110 transition-transform duration-500">
                            <div className="absolute inset-0 bg-growthz-blue/20 blur-2xl rounded-full opacity-0 group-hover:opacity-100 transition-opacity duration-500" />
                            <div className="relative w-full h-full bg-gradient-to-br from-growthz-blue/20 to-transparent rounded-2xl flex items-center justify-center border border-white/10">
                                <Layers className="w-10 h-10 text-growthz-blue" />
                            </div>
                        </div>
                        <h3 className="text-2xl font-bold text-white mb-4">2. Granular Traffic Clarity</h3>
                        <p className="text-gray-400 mb-8 leading-relaxed h-24">
                            We don't just say "Bot". We tell you *which* bot. Is it Google crawling your SEO? Is it a scraper stealing your prices? Or is it an AI agent researching your product for a user? Specificity changes your strategy.
                        </p>
                        <ul className="space-y-4 pt-8 border-t border-white/10">
                            <li className="flex items-center gap-3 text-gray-300 group-hover:text-white transition-colors">
                                <div className="w-6 h-6 rounded bg-growthz-blue/20 flex items-center justify-center text-xs text-growthz-blue">👤</div>
                                <span>Real Human Visitors</span>
                            </li>
                            <li className="flex items-center gap-3 text-gray-300 group-hover:text-white transition-colors">
                                <div className="w-6 h-6 rounded bg-growthz-blue/20 flex items-center justify-center text-xs text-growthz-blue">🤖</div>
                                <span>LLM Agents (ChatGPT, Claude)</span>
                            </li>
                            <li className="flex items-center gap-3 text-gray-300 group-hover:text-white transition-colors">
                                <div className="w-6 h-6 rounded bg-growthz-blue/20 flex items-center justify-center text-xs text-growthz-blue">bad</div>
                                <span>Malicious Scrapers & Fraud</span>
                            </li>
                        </ul>
                    </div>

                    {/* Pillar 3: Opportunity */}
                    <div className="group glass-card p-10 border-white/5 hover:border-growthz-blue/30 hover:bg-white/5 transition-all duration-300 hover:-translate-y-2 hover:shadow-2xl hover:shadow-growthz-blue/10">
                        <div className="w-24 h-24 mb-8 relative group-hover:scale-110 transition-transform duration-500">
                            <div className="absolute inset-0 bg-growthz-blue/20 blur-2xl rounded-full opacity-0 group-hover:opacity-100 transition-opacity duration-500" />
                            <div className="relative w-full h-full bg-gradient-to-br from-growthz-blue/20 to-transparent rounded-2xl flex items-center justify-center border border-white/10">
                                <Rocket className="w-10 h-10 text-growthz-blue" />
                            </div>
                        </div>
                        <h3 className="text-2xl font-bold text-white mb-4">3. Seize the AI Opportunity</h3>
                        <p className="text-gray-400 mb-8 leading-relaxed h-24">
                            The future of SEO isn't just ranking on Google—it's being recommended by AI. Botfic gives you an "AI Visibility Score" and actionable tips to ensure your brand is the top answer when agents are asked for recommendations.
                        </p>
                        <ul className="space-y-4 pt-8 border-t border-white/10">
                            <li className="flex items-center gap-3 text-gray-300 group-hover:text-white transition-colors">
                                <CheckCircle2 className="w-5 h-5 text-growthz-blue" />
                                <span>Optimize content for LLM training data</span>
                            </li>
                            <li className="flex items-center gap-3 text-gray-300 group-hover:text-white transition-colors">
                                <CheckCircle2 className="w-5 h-5 text-growthz-blue" />
                                <span>Track "Referral from AI" metrics</span>
                            </li>
                            <li className="flex items-center gap-3 text-gray-300 group-hover:text-white transition-colors">
                                <CheckCircle2 className="w-5 h-5 text-growthz-blue" />
                                <span>Stay ahead of Agentic SEO trends</span>
                            </li>
                        </ul>
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
                    <div className="inline-flex items-center gap-2 px-4 py-2 bg-emerald-500/10 border border-emerald-500/20 rounded-full mb-8 hover:bg-emerald-500/20 transition-colors cursor-default">
                        <Sparkles className="w-4 h-4 text-emerald-500" />
                        <span className="text-sm font-bold text-emerald-500 tracking-widest uppercase">The Benefit</span>
                    </div>
                    <h2 className="text-4xl md:text-6xl font-bold text-white mb-4 tracking-tight">
                        Your Real Numbers Are <span className="text-transparent bg-clip-text bg-gradient-to-r from-emerald-400 to-emerald-600">Better Than You Think</span>
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
        <section className="py-20 md:py-32 relative bg-dark-950">
            {/* Soft gradient background */}
            <div className="absolute inset-0 bg-gradient-to-b from-growthz-bg via-dark-900 to-growthz-bg" />

            <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                <div className="text-center mb-16">
                    <h2 className="text-3xl md:text-5xl font-serif font-bold text-white mb-4">
                        Everything You Need for the <span className="text-growthz-blue">Bot-First Era</span>
                    </h2>
                </div>

                <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
                    {features.map((feature, i) => (
                        <div key={i} className="group p-8 rounded-2xl bg-white/5 border border-white/10 hover:border-growthz-blue/50 hover:bg-white/10 transition-all duration-300">
                            <div className="w-12 h-12 rounded-xl bg-growthz-blue/20 flex items-center justify-center text-growthz-blue mb-4 group-hover:scale-110 transition-transform duration-300">
                                {feature.icon}
                            </div>
                            <h3 className="text-xl font-semibold text-white mb-2">{feature.title}</h3>
                            <p className="text-gray-400 leading-relaxed">{feature.description}</p>
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

                {/* Steps Expanded */}
                <div className="grid md:grid-cols-3 gap-8">
                    {steps.map((step, i) => (
                        <div key={i} className="relative">
                            {i < steps.length - 1 && (
                                <div className="hidden md:block absolute top-12 left-full w-full h-0.5 bg-gradient-to-r from-growthz-blue to-transparent z-0 opacity-20" />
                            )}
                            <div className="relative z-10 text-center group bg-white/5 p-8 rounded-2xl border border-white/10 hover:border-growthz-blue/30 transition-all duration-300 hover:-translate-y-1">
                                <div className="inline-flex items-center justify-center w-20 h-20 rounded-2xl bg-growthz-blue/10 mb-6 group-hover:scale-110 transition-transform duration-300 shadow-lg shadow-growthz-blue/5 border border-growthz-blue/20">
                                    <span className="text-3xl font-bold text-growthz-blue">{step.step}</span>
                                </div>
                                <h3 className="text-xl font-bold text-white mb-4">{step.title}</h3>
                                <p className="text-gray-400 leading-relaxed text-sm">{step.description}</p>
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
        <section id="pricing" className="py-20 md:py-32 relative overflow-hidden bg-growthz-bg">
            <div className="absolute inset-0 bg-grid-pattern opacity-10" />

            <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                <div className="text-center mb-16">
                    <h2 className="text-3xl md:text-5xl font-serif font-bold text-white mb-4">
                        Simple, Transparent Pricing
                    </h2>
                    <p className="text-lg text-gray-400">14-day free trial. No credit card required.</p>
                </div>

                <div className="grid md:grid-cols-3 gap-8 max-w-5xl mx-auto">
                    {plans.map((plan, i) => (
                        <div
                            key={i}
                            className={`relative group p-8 rounded-2xl bg-white/5 border transition-all duration-300 ${plan.popular ? 'border-growthz-blue/50 scale-105 shadow-2xl shadow-growthz-blue/10' : 'border-white/10 hover:border-growthz-blue/30'}`}
                        >
                            {plan.popular && (
                                <div className="absolute -top-4 left-1/2 -translate-x-1/2 px-4 py-1 bg-growthz-blue text-white text-sm font-bold rounded-full shadow-lg">
                                    Most Popular
                                </div>
                            )}

                            <div className="text-center mb-8">
                                <h3 className="text-xl font-semibold text-white mb-2">{plan.name}</h3>
                                <p className="text-gray-400 text-sm mb-4">{plan.description}</p>
                                <div className="flex items-baseline justify-center gap-1">
                                    <span className="text-4xl font-bold text-white">{plan.price}</span>
                                    <span className="text-gray-400">{plan.period}</span>
                                </div>
                            </div>

                            <ul className="space-y-3 mb-8">
                                {plan.features.map((feature, j) => (
                                    <li key={j} className="flex items-start gap-3">
                                        <CheckCircle2 className={`w-5 h-5 shrink-0 mt-0.5 ${plan.popular ? 'text-growthz-blue' : 'text-gray-500'}`} />
                                        <span className="text-gray-300">{feature}</span>
                                    </li>
                                ))}
                            </ul>

                            <Link
                                href="/signup"
                                className={`block w-full py-3 text-center font-semibold rounded-xl transition-all duration-300 ${plan.popular
                                    ? 'bg-growthz-blue hover:bg-blue-600 text-white shadow-lg shadow-growthz-blue/25'
                                    : 'bg-white/10 hover:bg-white/20 text-white'
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
    const [classification, setClassification] = useState<{ label: string; agent?: string } | null>(null)

    useEffect(() => {
        const handleClassification = (e: CustomEvent) => {
            setClassification(e.detail)
        }
        window.addEventListener('botific-classification', handleClassification as EventListener)
        return () => window.removeEventListener('botific-classification', handleClassification as EventListener)
    }, [])

    return (
        <main className="relative">
            <Script src="/tracker.js" data-site-id="demo-landing" strategy="afterInteractive" />

            <Navbar />

            {/* Live Classification Demo Pill */}
            <div className={`fixed bottom-6 right-6 z-50 transition-all duration-500 transform ${classification ? 'translate-y-0 opacity-100' : 'translate-y-10 opacity-0'}`}>
                <div className="bg-dark-900/90 backdrop-blur-xl border border-white/10 p-4 rounded-xl shadow-2xl flex items-center gap-4 max-w-sm">
                    <div className={`w-10 h-10 rounded-full flex items-center justify-center ${classification?.label === 'human' ? 'bg-emerald-500/20 text-emerald-400' : 'bg-growthz-blue/20 text-growthz-blue'}`}>
                        {classification?.label === 'human' ? <Users className="w-5 h-5" /> : <Bot className="w-5 h-5" />}
                    </div>
                    <div>
                        <div className="text-[10px] text-gray-400 uppercase tracking-wider font-semibold">Live Identification</div>
                        <div className="text-white font-medium flex items-center gap-1.5">
                            You are identified as:
                            <span className={classification?.label === 'human' ? 'text-emerald-400' : 'text-growthz-blue'}>
                                {classification?.label === 'human' ? 'Human' : (classification?.agent || 'Bot')}
                            </span>
                        </div>
                    </div>
                    <button onClick={() => setClassification(null)} className="text-gray-500 hover:text-white">
                        <X className="w-4 h-4" />
                    </button>
                </div>
            </div>

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
