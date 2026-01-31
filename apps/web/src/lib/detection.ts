
export interface ClassificationResult {
    label: 'human' | 'ai_agent' | 'bad_bot' | 'search_bot'
    confidence: number
    agent?: string // Name of the bot/agent if identified (e.g., "ChatGPT", "Googlebot")
}

export interface VisitorData {
    userAgent: string
    ip: string
    url?: string
    referrer?: string
    screenWidth?: number
    screenHeight?: number
    cookiesEnabled?: boolean
    jsEnabled?: boolean
}

// Known AI Agents (LLMs, Scrapers for training, etc.)
const AI_AGENTS = [
    { pattern: /GPTBot/i, name: 'GPTBot' },
    { pattern: /ChatGPT-User/i, name: 'ChatGPT' },
    { pattern: /ClaudeBot/i, name: 'Claude' },
    { pattern: /Claude-Web/i, name: 'Claude' },
    { pattern: /Google-Extended/i, name: 'Google Gemini' },
    { pattern: /PerplexityBot/i, name: 'Perplexity' },
    { pattern: /FacebookBot/i, name: 'Meta AI' },
    { pattern: /AnthropicAI/i, name: 'Claude' },
    { pattern: /Cohere/i, name: 'Cohere' },
    { pattern: /Bytespider/i, name: 'ByteDance' },
    { pattern: /CCBot/i, name: 'Common Crawl' },
    { pattern: /Diffbot/i, name: 'Diffbot' },
    { pattern: /Imagesift/i, name: 'Imagesift' },
    { pattern: /OAI-SearchBot/i, name: 'OpenAI Search' },
]

// Known Search Engine Bots
const SEARCH_BOTS = [
    { pattern: /Googlebot/i, name: 'Google' },
    { pattern: /Bingbot/i, name: 'Bing' },
    { pattern: /Slurp/i, name: 'Yahoo' },
    { pattern: /DuckDuckBot/i, name: 'DuckDuckGo' },
    { pattern: /Baiduspider/i, name: 'Baidu' },
    { pattern: /YandexBot/i, name: 'Yandex' },
    { pattern: /Sogou/i, name: 'Sogou' },
    { pattern: /Exabot/i, name: 'Exabot' },
]

// Known Bad Bots / Scrapers (Generic)
const BAD_BOTS = [
    { pattern: /python-requests/i, name: 'Python Script' },
    { pattern: /aiohttp/i, name: 'Python Script' },
    { pattern: /httpx/i, name: 'Python Script' },
    { pattern: /curl/i, name: 'Curl' },
    { pattern: /wget/i, name: 'Wget' },
    { pattern: /libwww-perl/i, name: 'Perl Script' },
    { pattern: /scrapy/i, name: 'Scrapy' },
    { pattern: /go-http-client/i, name: 'Go Script' },
    { pattern: /java/i, name: 'Java Script' },
    { pattern: /mj12bot/i, name: 'MJ12Bot' },
    { pattern: /ahrefsbot/i, name: 'Ahrefs' },
    { pattern: /semrushbot/i, name: 'Semrush' },
    { pattern: /dotbot/i, name: 'DotBot' },
    { pattern: /rogue/i, name: 'Rogue Bot' },
]

export function classifyVisitor(data: VisitorData): ClassificationResult {
    const ua = data.userAgent

    // 1. Check for AI Agents
    for (const agent of AI_AGENTS) {
        if (agent.pattern.test(ua)) {
            return {
                label: 'ai_agent',
                confidence: 0.95,
                agent: agent.name
            }
        }
    }

    // 2. Check for Search Bots
    for (const bot of SEARCH_BOTS) {
        if (bot.pattern.test(ua)) {
            return {
                label: 'search_bot',
                confidence: 0.9,
                agent: bot.name
            }
        }
    }

    // 3. Check for Bad Bots / Scrapers
    for (const bot of BAD_BOTS) {
        if (bot.pattern.test(ua)) {
            return {
                label: 'bad_bot',
                confidence: 0.85,
                agent: bot.name
            }
        }
    }

    // 4. Heuristic Checks (for bots pretending to be humans or headless browsers)

    // Check for Headless Chrome
    if (/HeadlessChrome/i.test(ua)) {
        return {
            label: 'bad_bot',
            confidence: 0.8,
            agent: 'Headless Browser'
        }
    }

    // Check for missing basic headers/properties if we had them (simplified for now)
    // If JS is strictly disabled, it MIGHT be a bot, but could be a privacy user.
    // We'll treat JS disabled + generic UA as suspicious if we had more signals.

    // 5. Default to Human
    // In a real system, we'd use IP reputation and more complex fingerprinting.
    return {
        label: 'human',
        confidence: 0.7, // Baseline confidence
        agent: undefined
    }
}

export function getPatternStats() {
    return {
        total: AI_AGENTS.length + SEARCH_BOTS.length + BAD_BOTS.length,
        aiAgents: AI_AGENTS.length,
        searchBots: SEARCH_BOTS.length,
        badBots: BAD_BOTS.length
    }
}
