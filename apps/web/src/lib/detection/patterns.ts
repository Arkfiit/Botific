// Bot detection patterns database

export interface BotPattern {
    name: string
    pattern: RegExp
    category: 'ai_agent' | 'search_bot' | 'seo_tool' | 'bad_bot' | 'monitoring'
    company?: string
    isGoodBot: boolean
}

// AI Agents - The opportunity
export const AI_AGENT_PATTERNS: BotPattern[] = [
    // OpenAI
    { name: 'GPTBot', pattern: /GPTBot/i, category: 'ai_agent', company: 'OpenAI', isGoodBot: true },
    { name: 'ChatGPT-User', pattern: /ChatGPT-User/i, category: 'ai_agent', company: 'OpenAI', isGoodBot: true },
    { name: 'OAI-SearchBot', pattern: /OAI-SearchBot/i, category: 'ai_agent', company: 'OpenAI', isGoodBot: true },

    // Anthropic
    { name: 'Claude-Web', pattern: /Claude-Web/i, category: 'ai_agent', company: 'Anthropic', isGoodBot: true },
    { name: 'ClaudeBot', pattern: /ClaudeBot/i, category: 'ai_agent', company: 'Anthropic', isGoodBot: true },
    { name: 'anthropic-ai', pattern: /anthropic-ai/i, category: 'ai_agent', company: 'Anthropic', isGoodBot: true },

    // Perplexity
    { name: 'PerplexityBot', pattern: /PerplexityBot/i, category: 'ai_agent', company: 'Perplexity', isGoodBot: true },

    // Google
    { name: 'Google-Extended', pattern: /Google-Extended/i, category: 'ai_agent', company: 'Google', isGoodBot: true },
    { name: 'Gemini', pattern: /Gemini/i, category: 'ai_agent', company: 'Google', isGoodBot: true },

    // Microsoft
    { name: 'Copilot', pattern: /Copilot/i, category: 'ai_agent', company: 'Microsoft', isGoodBot: true },

    // Meta
    { name: 'FacebookBot', pattern: /FacebookBot/i, category: 'ai_agent', company: 'Meta', isGoodBot: true },
    { name: 'Meta-ExternalAgent', pattern: /Meta-ExternalAgent/i, category: 'ai_agent', company: 'Meta', isGoodBot: true },

    // Cohere
    { name: 'cohere-ai', pattern: /cohere-ai/i, category: 'ai_agent', company: 'Cohere', isGoodBot: true },

    // You.com
    { name: 'YouBot', pattern: /YouBot/i, category: 'ai_agent', company: 'You.com', isGoodBot: true },

    // Amazon
    { name: 'Amazonbot', pattern: /Amazonbot/i, category: 'ai_agent', company: 'Amazon', isGoodBot: true },

    // Apple
    { name: 'Applebot-Extended', pattern: /Applebot-Extended/i, category: 'ai_agent', company: 'Apple', isGoodBot: true },
]

// Search Engine Bots - Need for SEO
export const SEARCH_BOT_PATTERNS: BotPattern[] = [
    // Google
    { name: 'Googlebot', pattern: /Googlebot/i, category: 'search_bot', company: 'Google', isGoodBot: true },
    { name: 'Googlebot-Image', pattern: /Googlebot-Image/i, category: 'search_bot', company: 'Google', isGoodBot: true },
    { name: 'Googlebot-Mobile', pattern: /Googlebot-Mobile/i, category: 'search_bot', company: 'Google', isGoodBot: true },
    { name: 'Googlebot-News', pattern: /Googlebot-News/i, category: 'search_bot', company: 'Google', isGoodBot: true },
    { name: 'Googlebot-Video', pattern: /Googlebot-Video/i, category: 'search_bot', company: 'Google', isGoodBot: true },
    { name: 'Google-InspectionTool', pattern: /Google-InspectionTool/i, category: 'search_bot', company: 'Google', isGoodBot: true },

    // Bing
    { name: 'Bingbot', pattern: /bingbot/i, category: 'search_bot', company: 'Microsoft', isGoodBot: true },
    { name: 'msnbot', pattern: /msnbot/i, category: 'search_bot', company: 'Microsoft', isGoodBot: true },
    { name: 'BingPreview', pattern: /BingPreview/i, category: 'search_bot', company: 'Microsoft', isGoodBot: true },

    // Yahoo
    { name: 'Slurp', pattern: /Slurp/i, category: 'search_bot', company: 'Yahoo', isGoodBot: true },

    // DuckDuckGo
    { name: 'DuckDuckBot', pattern: /DuckDuckBot/i, category: 'search_bot', company: 'DuckDuckGo', isGoodBot: true },

    // Yandex
    { name: 'YandexBot', pattern: /YandexBot/i, category: 'search_bot', company: 'Yandex', isGoodBot: true },

    // Baidu
    { name: 'Baiduspider', pattern: /Baiduspider/i, category: 'search_bot', company: 'Baidu', isGoodBot: true },
]

// SEO Tools - Monitor but allow
export const SEO_TOOL_PATTERNS: BotPattern[] = [
    { name: 'AhrefsBot', pattern: /AhrefsBot/i, category: 'seo_tool', company: 'Ahrefs', isGoodBot: true },
    { name: 'SemrushBot', pattern: /SemrushBot/i, category: 'seo_tool', company: 'Semrush', isGoodBot: true },
    { name: 'MJ12bot', pattern: /MJ12bot/i, category: 'seo_tool', company: 'Majestic', isGoodBot: true },
    { name: 'DotBot', pattern: /DotBot/i, category: 'seo_tool', company: 'Moz', isGoodBot: true },
    { name: 'Screaming Frog', pattern: /Screaming Frog/i, category: 'seo_tool', company: 'Screaming Frog', isGoodBot: true },
]

// Monitoring Bots - Allow
export const MONITORING_PATTERNS: BotPattern[] = [
    { name: 'UptimeRobot', pattern: /UptimeRobot/i, category: 'monitoring', company: 'UptimeRobot', isGoodBot: true },
    { name: 'Pingdom', pattern: /Pingdom/i, category: 'monitoring', company: 'Pingdom', isGoodBot: true },
    { name: 'StatusCake', pattern: /StatusCake/i, category: 'monitoring', company: 'StatusCake', isGoodBot: true },
    { name: 'Site24x7', pattern: /Site24x7/i, category: 'monitoring', company: 'Site24x7', isGoodBot: true },
]

// Bad Bots - Block these
export const BAD_BOT_PATTERNS: BotPattern[] = [
    // Known scrapers
    { name: 'DataForSeoBot', pattern: /DataForSeoBot/i, category: 'bad_bot', isGoodBot: false },
    { name: 'CommonCrawl', pattern: /CCBot/i, category: 'bad_bot', isGoodBot: false },
    { name: 'Bytespider', pattern: /Bytespider/i, category: 'bad_bot', company: 'ByteDance', isGoodBot: false },
    { name: 'PetalBot', pattern: /PetalBot/i, category: 'bad_bot', isGoodBot: false },
    { name: 'MegaIndex', pattern: /MegaIndex/i, category: 'bad_bot', isGoodBot: false },
    { name: 'BLEXBot', pattern: /BLEXBot/i, category: 'bad_bot', isGoodBot: false },

    // Spam bots
    { name: 'Twitterbot', pattern: /Twitterbot/i, category: 'bad_bot', isGoodBot: false },

    // Generic bad indicators
    { name: 'python-requests', pattern: /python-requests/i, category: 'bad_bot', isGoodBot: false },
    { name: 'curl', pattern: /^curl\//i, category: 'bad_bot', isGoodBot: false },
    { name: 'wget', pattern: /^Wget\//i, category: 'bad_bot', isGoodBot: false },
    { name: 'scrapy', pattern: /Scrapy/i, category: 'bad_bot', isGoodBot: false },
    { name: 'libwww-perl', pattern: /libwww-perl/i, category: 'bad_bot', isGoodBot: false },
    { name: 'Go-http-client', pattern: /Go-http-client/i, category: 'bad_bot', isGoodBot: false },
    { name: 'Java', pattern: /^Java\//i, category: 'bad_bot', isGoodBot: false },
    { name: 'Apache-HttpClient', pattern: /Apache-HttpClient/i, category: 'bad_bot', isGoodBot: false },
    { name: 'okhttp', pattern: /okhttp/i, category: 'bad_bot', isGoodBot: false },

    // Headless browsers (often scrapers)
    { name: 'HeadlessChrome', pattern: /HeadlessChrome/i, category: 'bad_bot', isGoodBot: false },
    { name: 'PhantomJS', pattern: /PhantomJS/i, category: 'bad_bot', isGoodBot: false },
]

// All patterns combined
export const ALL_PATTERNS: BotPattern[] = [
    ...AI_AGENT_PATTERNS,
    ...SEARCH_BOT_PATTERNS,
    ...SEO_TOOL_PATTERNS,
    ...MONITORING_PATTERNS,
    ...BAD_BOT_PATTERNS,
]
