'use client'

import { useState } from 'react'
import {
    Settings,
    User,
    Globe,
    Code,
    Bell,
    CreditCard,
    Copy,
    Check,
    ExternalLink,
    Trash2
} from 'lucide-react'

export default function SettingsPage() {
    const [copied, setCopied] = useState(false)
    const trackingCode = `<script src="https://cdn.botfic.com/tracker.js" data-site="site_abc123"></script>`

    const handleCopy = () => {
        navigator.clipboard.writeText(trackingCode)
        setCopied(true)
        setTimeout(() => setCopied(false), 2000)
    }

    return (
        <div className="space-y-6 max-w-4xl">
            {/* Page header */}
            <div>
                <h1 className="text-2xl font-bold text-white">Settings</h1>
                <p className="text-dark-400">Manage your account and site settings</p>
            </div>

            {/* Account settings */}
            <div className="bg-dark-800/50 border border-dark-700 rounded-2xl overflow-hidden">
                <div className="p-6 border-b border-dark-700">
                    <div className="flex items-center gap-3">
                        <User className="w-5 h-5 text-primary-400" />
                        <h3 className="text-white font-semibold">Account</h3>
                    </div>
                </div>
                <div className="p-6 space-y-4">
                    <div className="grid md:grid-cols-2 gap-4">
                        <div>
                            <label className="block text-dark-400 text-sm mb-2">Name</label>
                            <input
                                type="text"
                                defaultValue="John Doe"
                                className="w-full px-4 py-2.5 bg-dark-800 border border-dark-700 rounded-xl text-white focus:outline-none focus:border-primary-500"
                            />
                        </div>
                        <div>
                            <label className="block text-dark-400 text-sm mb-2">Email</label>
                            <input
                                type="email"
                                defaultValue="john@example.com"
                                className="w-full px-4 py-2.5 bg-dark-800 border border-dark-700 rounded-xl text-white focus:outline-none focus:border-primary-500"
                            />
                        </div>
                    </div>
                    <button className="px-4 py-2 bg-primary-500 hover:bg-primary-400 text-white rounded-xl text-sm font-medium transition-colors">
                        Save Changes
                    </button>
                </div>
            </div>

            {/* Site settings */}
            <div className="bg-dark-800/50 border border-dark-700 rounded-2xl overflow-hidden">
                <div className="p-6 border-b border-dark-700">
                    <div className="flex items-center gap-3">
                        <Globe className="w-5 h-5 text-primary-400" />
                        <h3 className="text-white font-semibold">Site Settings</h3>
                    </div>
                </div>
                <div className="p-6 space-y-4">
                    <div>
                        <label className="block text-dark-400 text-sm mb-2">Site URL</label>
                        <input
                            type="url"
                            defaultValue="https://mywebsite.com"
                            className="w-full px-4 py-2.5 bg-dark-800 border border-dark-700 rounded-xl text-white focus:outline-none focus:border-primary-500"
                        />
                    </div>
                    <div>
                        <label className="block text-dark-400 text-sm mb-2">Site ID</label>
                        <div className="flex items-center gap-2">
                            <input
                                type="text"
                                value="site_abc123"
                                disabled
                                className="flex-1 px-4 py-2.5 bg-dark-900 border border-dark-700 rounded-xl text-dark-400"
                            />
                            <button
                                onClick={() => {
                                    navigator.clipboard.writeText('site_abc123')
                                }}
                                className="px-4 py-2.5 bg-dark-700 hover:bg-dark-600 text-white rounded-xl transition-colors"
                            >
                                <Copy className="w-4 h-4" />
                            </button>
                        </div>
                    </div>
                    <button className="px-4 py-2 bg-primary-500 hover:bg-primary-400 text-white rounded-xl text-sm font-medium transition-colors">
                        Save Changes
                    </button>
                </div>
            </div>

            {/* Tracking code */}
            <div className="bg-dark-800/50 border border-dark-700 rounded-2xl overflow-hidden">
                <div className="p-6 border-b border-dark-700">
                    <div className="flex items-center gap-3">
                        <Code className="w-5 h-5 text-primary-400" />
                        <h3 className="text-white font-semibold">Tracking Code</h3>
                    </div>
                </div>
                <div className="p-6">
                    <p className="text-dark-400 text-sm mb-4">
                        Add this script to your website's <code className="text-primary-400">&lt;head&gt;</code> tag to start tracking.
                    </p>
                    <div className="relative">
                        <pre className="p-4 bg-dark-900 border border-dark-700 rounded-xl text-sm text-dark-300 overflow-x-auto">
                            <code>{trackingCode}</code>
                        </pre>
                        <button
                            onClick={handleCopy}
                            className="absolute top-3 right-3 p-2 bg-dark-700 hover:bg-dark-600 text-white rounded-lg transition-colors"
                        >
                            {copied ? <Check className="w-4 h-4 text-success-400" /> : <Copy className="w-4 h-4" />}
                        </button>
                    </div>
                    <div className="mt-4 flex items-center gap-4">
                        <div className="flex items-center gap-2 text-success-400 text-sm">
                            <Check className="w-4 h-4" />
                            Script installed correctly
                        </div>
                        <a href="#" className="text-primary-400 text-sm hover:text-primary-300 flex items-center gap-1">
                            View documentation <ExternalLink className="w-3 h-3" />
                        </a>
                    </div>
                </div>
            </div>

            {/* Notifications */}
            <div className="bg-dark-800/50 border border-dark-700 rounded-2xl overflow-hidden">
                <div className="p-6 border-b border-dark-700">
                    <div className="flex items-center gap-3">
                        <Bell className="w-5 h-5 text-primary-400" />
                        <h3 className="text-white font-semibold">Notifications</h3>
                    </div>
                </div>
                <div className="p-6 space-y-4">
                    <NotificationToggle
                        label="Weekly reports"
                        description="Receive weekly summaries of your traffic"
                        defaultChecked={true}
                    />
                    <NotificationToggle
                        label="New AI agent detection"
                        description="Get notified when a new AI agent starts visiting"
                        defaultChecked={true}
                    />
                    <NotificationToggle
                        label="Bad bot alerts"
                        description="Receive alerts about suspicious bot activity"
                        defaultChecked={false}
                    />
                </div>
            </div>

            {/* Billing */}
            <div className="bg-dark-800/50 border border-dark-700 rounded-2xl overflow-hidden">
                <div className="p-6 border-b border-dark-700">
                    <div className="flex items-center gap-3">
                        <CreditCard className="w-5 h-5 text-primary-400" />
                        <h3 className="text-white font-semibold">Billing</h3>
                    </div>
                </div>
                <div className="p-6">
                    <div className="flex items-center justify-between p-4 bg-primary-500/10 border border-primary-500/20 rounded-xl mb-4">
                        <div>
                            <div className="text-white font-semibold">Growth Plan</div>
                            <div className="text-dark-400 text-sm">$79/month • 100,000 sessions</div>
                        </div>
                        <button className="px-4 py-2 bg-dark-700 hover:bg-dark-600 text-white rounded-xl text-sm font-medium transition-colors">
                            Manage Plan
                        </button>
                    </div>
                    <div className="flex items-center justify-between text-sm">
                        <span className="text-dark-400">Sessions used this month</span>
                        <span className="text-white">42,856 / 100,000</span>
                    </div>
                    <div className="mt-2 h-2 bg-dark-700 rounded-full overflow-hidden">
                        <div className="h-full w-[43%] bg-gradient-to-r from-primary-500 to-accent-500 rounded-full" />
                    </div>
                </div>
            </div>

            {/* Danger zone */}
            <div className="bg-dark-800/50 border border-danger-500/30 rounded-2xl overflow-hidden">
                <div className="p-6 border-b border-danger-500/30">
                    <div className="flex items-center gap-3">
                        <Trash2 className="w-5 h-5 text-danger-400" />
                        <h3 className="text-white font-semibold">Danger Zone</h3>
                    </div>
                </div>
                <div className="p-6">
                    <div className="flex items-center justify-between">
                        <div>
                            <div className="text-white font-medium">Delete Site</div>
                            <div className="text-dark-400 text-sm">Permanently delete this site and all its data</div>
                        </div>
                        <button className="px-4 py-2 bg-danger-500/20 hover:bg-danger-500/30 text-danger-400 border border-danger-500/30 rounded-xl text-sm font-medium transition-colors">
                            Delete Site
                        </button>
                    </div>
                </div>
            </div>
        </div>
    )
}

function NotificationToggle({
    label,
    description,
    defaultChecked
}: {
    label: string
    description: string
    defaultChecked: boolean
}) {
    const [checked, setChecked] = useState(defaultChecked)

    return (
        <div className="flex items-center justify-between">
            <div>
                <div className="text-white font-medium">{label}</div>
                <div className="text-dark-400 text-sm">{description}</div>
            </div>
            <button
                onClick={() => setChecked(!checked)}
                className={`relative w-12 h-6 rounded-full transition-colors ${checked ? 'bg-primary-500' : 'bg-dark-600'
                    }`}
            >
                <div className={`absolute top-1 left-1 w-4 h-4 rounded-full bg-white transition-transform ${checked ? 'translate-x-6' : ''
                    }`} />
            </button>
        </div>
    )
}
