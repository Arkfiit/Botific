// Bot Detection Patterns Database

import type { BotPattern, VisitorLabel } from '@botfic/shared';

// AI Agents
export const AI_AGENT_PATTERNS: Record<string, BotPattern> = {
    chatgpt: {
        patterns: ['ChatGPT-User', 'OAI-SearchBot', 'GPTBot'],
        category: 'ai_agent',
        company: 'OpenAI',
        risk: 'low',
        recommendation: 'allow',
    },
    claude: {
        patterns: ['ClaudeBot', 'Claude-Web', 'anthropic-ai'],
        category: 'ai_agent',
        company: 'Anthropic',
        risk: 'low',
        recommendation: 'allow',
    },
    gemini: {
        patterns: ['Google-Extended', 'Gemini'],
        category: 'ai_agent',
        company: 'Google',
        risk: 'low',
        recommendation: 'allow',
    },
    perplexity: {
        patterns: ['PerplexityBot', 'Perplexity-User'],
        category: 'ai_agent',
        company: 'Perplexity',
        risk: 'low',
        recommendation: 'allow',
    },
    copilot: {
        patterns: ['Copilot', 'bingbot/copilot'],
        category: 'ai_agent',
        company: 'Microsoft',
        risk: 'low',
        recommendation: 'allow',
    },
};

// Search Bots
export const SEARCH_BOT_PATTERNS: Record<string, BotPattern> = {
    google: {
        patterns: ['Googlebot', 'Googlebot-Mobile', 'Googlebot-Image', 'AdsBot-Google'],
        category: 'search_bot',
        company: 'Google',
        risk: 'low',
        recommendation: 'allow',
    },
    bing: {
        patterns: ['bingbot', 'msnbot', 'BingPreview'],
        category: 'search_bot',
        company: 'Microsoft',
        risk: 'low',
        recommendation: 'allow',
    },
    duckduckgo: {
        patterns: ['DuckDuckBot'],
        category: 'search_bot',
        company: 'DuckDuckGo',
        risk: 'low',
        recommendation: 'allow',
    },
    yandex: {
        patterns: ['YandexBot', 'YandexImages'],
        category: 'search_bot',
        company: 'Yandex',
        risk: 'low',
        recommendation: 'allow',
    },
};

// SEO Tools
export const SEO_TOOL_PATTERNS: Record<string, BotPattern> = {
    ahrefs: {
        patterns: ['AhrefsBot', 'AhrefsSiteAudit'],
        category: 'seo_tool',
        company: 'Ahrefs',
        risk: 'medium',
        recommendation: 'throttle',
    },
    semrush: {
        patterns: ['SemrushBot'],
        category: 'seo_tool',
        company: 'Semrush',
        risk: 'medium',
        recommendation: 'throttle',
    },
    moz: {
        patterns: ['rogerbot', 'DotBot'],
        category: 'seo_tool',
        company: 'Moz',
        risk: 'low',
        recommendation: 'allow',
    },
};

// Bad Bots
export const BAD_BOT_PATTERNS: Record<string, BotPattern> = {
    scrapers: {
        patterns: ['Scrapy', 'python-requests', 'HttpClient', 'Go-http-client', 'curl/', 'wget/'],
        category: 'bad_bot',
        risk: 'high',
        recommendation: 'block',
    },
    spam: {
        patterns: ['MegaIndex', 'BLEXBot', 'DataForSeoBot'],
        category: 'bad_bot',
        risk: 'high',
        recommendation: 'block',
    },
};

// All patterns combined
export const ALL_PATTERNS = {
    ...AI_AGENT_PATTERNS,
    ...SEARCH_BOT_PATTERNS,
    ...SEO_TOOL_PATTERNS,
    ...BAD_BOT_PATTERNS,
};
