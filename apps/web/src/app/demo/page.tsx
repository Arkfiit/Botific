'use client'

import { useState } from 'react'
import Link from 'next/link'
import {
    Bot,
    ArrowLeft,
    Search,
    CheckCircle2,
    AlertTriangle,
    Users,
    Cpu,
    Zap,
    Copy,
    Check
} from 'lucide-react'

const exampleUserAgents = [
    {
        label: 'ChatGPT (GPTBot)',
        userAgent: 'Mozilla/5.0 AppleWebKit/537.36 (KHTML, like Gecko; compatible; GPTBot/1.0; +https://openai.com/gptbot)',
        expected: 'ai_agent'
    },
    {
        label: 'Perplexity',
        userAgent: 'Mozilla/5.0 AppleWebKit/537.36 (KHTML, like Gecko; compatible; PerplexityBot/1.0; +https://perplexity.ai/perplexitybot)',
        expected: 'ai_agent'
    },
    {
        label: 'Googlebot',
        userAgent: 'Mozilla/5.0 (compatible; Googlebot/2.1; +http://www.google.com/bot.html)',
        expected: 'search_bot'
    },
    {
        label: 'Bad Scraper',
        userAgent: 'python-requests/2.28.0',
        expected: 'bad_bot'
    },
    {
        label: 'Chrome (Human)',
        userAgent: 'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/120.0.0.0 Safari/537.36',
        expected: 'human'
    },
]

interface DetectionResult {
    label: string
    confidence: number
    agent?: string
    company?: string
    category?: string
    isGoodBot: boolean
    signals: string[]
}

export default function DemoPage() {
    const [userAgent, setUserAgent] = useState('')
    const [loading, setLoading] = useState(false)
    const [result, setResult] = useState<DetectionResult | null>(null)
    const [copied, setCopied] = useState(false)

    const handleDetect = async () => {
        if (!userAgent.trim()) return

        setLoading(true)
        setResult(null)

        try {
            const response = await fetch('/api/detect', {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify({ userAgent }),
            })

            const data = await response.json()
            if (data.success) {
                setResult(data.result)
            }
        } catch (error) {
            console.error('Detection failed:', error)
        } finally {
            setLoading(false)
        }
    }

    const handleExampleClick = (ua: string) => {
        setUserAgent(ua)
        setResult(null)
    }

    const handleCopyScript = () => {
        navigator.clipboard.writeText('<script src="https://cdn.botfic.com/tracker.js" data-site="YOUR_SITE_ID"></script>')
        setCopied(true)
        setTimeout(() => setCopied(false), 2000)
    }

    return (
        <div className="min-h-screen bg-dark-950">
            {/* Header */}
            <header className="border-b border-dark-800 bg-dark-900/80 backdrop-blur-xl sticky top-0 z-50">
                <div className="max-w-5xl mx-auto px-4 h-16 flex items-center justify-between">
                    <Link href="/" className="flex items-center gap-2 text-dark-400 hover:text-white transition-colors">
                        <ArrowLeft className="w-5 h-5" />
                        <span>Back to home</span>
                    </Link>
                    <Link href="/" className="flex items-center gap-2">
                        <div className="w-9 h-9 rounded-xl bg-gradient-to-br from-primary-500 to-accent-500 flex items-center justify-center">
                            <Bot className="w-5 h-5 text-white" />
                        </div>
                        <span className="text-lg font-bold text-white">Botfic</span>
                    </Link>
                </div>
            </header>

            <main className="max-w-5xl mx-auto px-4 py-12">
                {/* Hero */}
                <div className="text-center mb-12">
                    <h1 className="text-3xl md:text-4xl font-bold text-white mb-4">
                        Test Our Bot Detection
                    </h1>
                    <p className="text-dark-400 text-lg max-w-2xl mx-auto">
                        Enter any user agent string to see how Botfic classifies it.
                        Try the examples below or paste your own.
                    </p>
                </div>

                {/* Detection tool */}
                <div className="bg-dark-800/50 border border-dark-700 rounded-2xl p-6 md:p-8 mb-8">
                    {/* Input */}
                    <div className="mb-6">
                        <label className="block text-white font-medium mb-2">User Agent String</label>
                        <div className="flex gap-3">
                            <input
                                type="text"
                                value={userAgent}
                                onChange={(e) => setUserAgent(e.target.value)}
                                placeholder="Paste a user agent string here..."
                                className="flex-1 px-4 py-3 bg-dark-900 border border-dark-700 focus:border-primary-500 rounded-xl text-white placeholder-dark-500 outline-none transition-colors"
                            />
                            <button
                                onClick={handleDetect}
                                disabled={loading || !userAgent.trim()}
                                className="px-6 py-3 bg-gradient-to-r from-primary-500 to-accent-500 hover:from-primary-400 hover:to-accent-400 disabled:opacity-50 text-white font-semibold rounded-xl transition-all flex items-center gap-2"
                            >
                                {loading ? (
                                    <div className="w-5 h-5 border-2 border-white/30 border-t-white rounded-full animate-spin" />
                                ) : (
                                    <>
                                        <Search className="w-5 h-5" />
                                        Detect
                                    </>
                                )}
                            </button>
                        </div>
                    </div>

                    {/* Examples */}
                    <div className="mb-6">
                        <div className="text-dark-400 text-sm mb-3">Try these examples:</div>
                        <div className="flex flex-wrap gap-2">
                            {exampleUserAgents.map((example) => (
                                <button
                                    key={example.label}
                                    onClick={() => handleExampleClick(example.userAgent)}
                                    className={`px-3 py-1.5 rounded-lg text-sm transition-colors ${userAgent === example.userAgent
                                            ? 'bg-primary-500/20 text-primary-400 border border-primary-500/30'
                                            : 'bg-dark-700 text-dark-300 hover:text-white border border-dark-600'
                                        }`}
                                >
                                    {example.label}
                                </button>
                            ))}
                        </div>
                    </div>

                    {/* Result */}
                    {result && (
                        <div className="border-t border-dark-700 pt-6">
                            <h3 className="text-white font-semibold mb-4">Detection Result</h3>
                            <div className="grid md:grid-cols-2 gap-6">
                                {/* Classification */}
                                <div className="space-y-4">
                                    <div className="flex items-center gap-4">
                                        <ResultIcon label={result.label} />
                                        <div>
                                            <div className="text-white font-semibold text-lg capitalize">
                                                {result.label.replace('_', ' ')}
                                            </div>
                                            <div className="text-dark-400">
                                                {result.confidence}% confidence
                                            </div>
                                        </div>
                                    </div>

                                    {result.agent && (
                                        <div className="flex items-center justify-between p-3 bg-dark-800 rounded-xl">
                                            <span className="text-dark-400">Identified as</span>
                                            <span className="text-white font-medium">{result.agent}</span>
                                        </div>
                                    )}

                                    {result.company && (
                                        <div className="flex items-center justify-between p-3 bg-dark-800 rounded-xl">
                                            <span className="text-dark-400">Company</span>
                                            <span className="text-white font-medium">{result.company}</span>
                                        </div>
                                    )}

                                    <div className="flex items-center justify-between p-3 bg-dark-800 rounded-xl">
                                        <span className="text-dark-400">Classification</span>
                                        <span className={`font-medium ${result.isGoodBot ? 'text-success-400' : 'text-danger-400'}`}>
                                            {result.isGoodBot ? '✓ Good Bot / Human' : '✕ Bad Bot'}
                                        </span>
                                    </div>
                                </div>

                                {/* Signals */}
                                <div>
                                    <div className="text-dark-400 text-sm mb-3">Detection Signals</div>
                                    <div className="space-y-2">
                                        {result.signals.length > 0 ? (
                                            result.signals.map((signal, i) => (
                                                <div key={i} className="flex items-center gap-2 text-sm p-3 bg-dark-800 rounded-xl">
                                                    <Zap className="w-4 h-4 text-primary-400" />
                                                    <span className="text-white">{signal}</span>
                                                </div>
                                            ))
                                        ) : (
                                            <div className="text-dark-500 text-sm p-3 bg-dark-800 rounded-xl">
                                                No specific bot patterns detected
                                            </div>
                                        )}
                                    </div>
                                </div>
                            </div>
                        </div>
                    )}
                </div>

                {/* CTA */}
                <div className="bg-gradient-to-br from-primary-500/20 to-accent-500/10 border border-primary-500/30 rounded-2xl p-8 text-center">
                    <h2 className="text-2xl font-bold text-white mb-4">
                        Ready to see your real traffic?
                    </h2>
                    <p className="text-dark-300 mb-6 max-w-xl mx-auto">
                        Add our tracking script to your site and start seeing which bots visit,
                        your true metrics, and opportunities you're missing.
                    </p>

                    {/* Script preview */}
                    <div className="relative max-w-2xl mx-auto mb-6">
                        <pre className="p-4 bg-dark-900 border border-dark-700 rounded-xl text-sm text-dark-300 text-left overflow-x-auto">
                            <code>&lt;script src="https://cdn.botfic.com/tracker.js" data-site="YOUR_SITE_ID"&gt;&lt;/script&gt;</code>
                        </pre>
                        <button
                            onClick={handleCopyScript}
                            className="absolute top-3 right-3 p-2 bg-dark-700 hover:bg-dark-600 text-white rounded-lg transition-colors"
                        >
                            {copied ? <Check className="w-4 h-4 text-success-400" /> : <Copy className="w-4 h-4" />}
                        </button>
                    </div>

                    <Link
                        href="/signup"
                        className="inline-flex items-center gap-2 px-8 py-3 bg-gradient-to-r from-primary-500 to-accent-500 hover:from-primary-400 hover:to-accent-400 text-white font-semibold rounded-xl transition-all"
                    >
                        Start Free Trial
                    </Link>
                </div>
            </main>
        </div>
    )
}

function ResultIcon({ label }: { label: string }) {
    const configs = {
        human: { icon: <Users className="w-6 h-6" />, bg: 'bg-success-500/20', color: 'text-success-400' },
        ai_agent: { icon: <Cpu className="w-6 h-6" />, bg: 'bg-primary-500/20', color: 'text-primary-400' },
        search_bot: { icon: <Search className="w-6 h-6" />, bg: 'bg-accent-500/20', color: 'text-accent-400' },
        bad_bot: { icon: <AlertTriangle className="w-6 h-6" />, bg: 'bg-danger-500/20', color: 'text-danger-400' },
    }
    const config = configs[label as keyof typeof configs] || configs.human

    return (
        <div className={`w-14 h-14 rounded-2xl ${config.bg} flex items-center justify-center ${config.color}`}>
            {config.icon}
        </div>
    )
}
