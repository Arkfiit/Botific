import type { Metadata } from 'next'
import './globals.css'

export const metadata: Metadata = {
    title: 'Botfic - Bot-First Analytics Platform',
    description: 'See real human metrics, understand AI agent traffic, and optimize bot traffic instead of blocking it. Stop letting bots pollute your analytics.',
    keywords: ['bot analytics', 'AI agent tracking', 'true metrics', 'bot detection', 'marketing analytics'],
    authors: [{ name: 'Botfic Team' }],
    openGraph: {
        title: 'Botfic - Bot-First Analytics Platform',
        description: 'See real human metrics, understand AI agent traffic, and optimize bot traffic instead of blocking it.',
        type: 'website',
        locale: 'en_US',
        siteName: 'Botfic',
    },
    twitter: {
        card: 'summary_large_image',
        title: 'Botfic - Bot-First Analytics Platform',
        description: 'See real human metrics, understand AI agent traffic, and optimize bot traffic instead of blocking it.',
    },
}

export default function RootLayout({
    children,
}: {
    children: React.ReactNode
}) {
    return (
        <html lang="en" className="dark">
            <head>
                <link rel="preconnect" href="https://fonts.googleapis.com" />
                <link rel="preconnect" href="https://fonts.gstatic.com" crossOrigin="anonymous" />
            </head>
            <body className="min-h-screen">
                {children}
            </body>
        </html>
    )
}
