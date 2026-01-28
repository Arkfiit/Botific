import {
    ALL_PATTERNS,
    AI_AGENT_PATTERNS,
    SEARCH_BOT_PATTERNS,
    SEO_TOOL_PATTERNS,
    BAD_BOT_PATTERNS,
    BotPattern
} from './patterns'

export type VisitorLabel = 'human' | 'ai_agent' | 'search_bot' | 'bad_bot'

export interface ClassificationResult {
    label: VisitorLabel
    confidence: number  // 0-100
    agent?: string      // Name of detected bot
    company?: string    // Company behind the bot
    category?: string   // Detailed category
    isGoodBot: boolean
    signals: string[]   // What triggered this classification
}

export interface VisitorSignals {
    userAgent: string
    ip?: string
    url?: string
    referrer?: string
    screenWidth?: number
    screenHeight?: number
    cookiesEnabled?: boolean
    jsEnabled?: boolean
}

/**
 * Classify a visitor based on their signals
 */
export function classifyVisitor(signals: VisitorSignals): ClassificationResult {
    const { userAgent } = signals
    const detectedSignals: string[] = []

    // 1. Check for known bot patterns in user agent
    for (const pattern of ALL_PATTERNS) {
        if (pattern.pattern.test(userAgent)) {
            detectedSignals.push(`UA match: ${pattern.name}`)

            // Determine label based on category
            let label: VisitorLabel = 'bad_bot'
            if (pattern.category === 'ai_agent') label = 'ai_agent'
            else if (pattern.category === 'search_bot' || pattern.category === 'seo_tool' || pattern.category === 'monitoring') label = 'search_bot'
            else if (pattern.category === 'bad_bot') label = 'bad_bot'

            return {
                label,
                confidence: 95,
                agent: pattern.name,
                company: pattern.company,
                category: pattern.category,
                isGoodBot: pattern.isGoodBot,
                signals: detectedSignals,
            }
        }
    }

    // 2. Behavioral checks for suspicious patterns
    const behavioralScore = analyzeBehavior(signals, detectedSignals)

    if (behavioralScore.isSuspicious) {
        return {
            label: 'bad_bot',
            confidence: behavioralScore.confidence,
            isGoodBot: false,
            signals: detectedSignals,
        }
    }

    // 3. Default to human if no bot patterns detected
    return {
        label: 'human',
        confidence: 85 - behavioralScore.suspicionLevel * 10, // Higher suspicion = lower confidence
        isGoodBot: true, // Humans are "good" in our context
        signals: detectedSignals,
    }
}

interface BehaviorAnalysis {
    isSuspicious: boolean
    confidence: number
    suspicionLevel: number // 0-5 scale
}

function analyzeBehavior(signals: VisitorSignals, detectedSignals: string[]): BehaviorAnalysis {
    let suspicionLevel = 0

    // Check for empty or missing user agent
    if (!signals.userAgent || signals.userAgent.length < 10) {
        suspicionLevel += 2
        detectedSignals.push('Empty or short user agent')
    }

    // Check for generic/fake user agents
    if (signals.userAgent && (
        signals.userAgent.includes('Mozilla/5.0') &&
        signals.userAgent.length < 50
    )) {
        suspicionLevel += 1
        detectedSignals.push('Suspiciously short UA')
    }

    // No screen dimensions (typical for bots)
    if (signals.screenWidth === undefined || signals.screenHeight === undefined) {
        suspicionLevel += 1
        detectedSignals.push('No screen dimensions')
    }

    // Impossible screen sizes
    if (signals.screenWidth && signals.screenHeight) {
        if (signals.screenWidth < 100 || signals.screenHeight < 100) {
            suspicionLevel += 2
            detectedSignals.push('Invalid screen size')
        }
    }

    // Cookies disabled (often bots)
    if (signals.cookiesEnabled === false) {
        suspicionLevel += 0.5
        detectedSignals.push('Cookies disabled')
    }

    // JavaScript disabled (can't be detected in tracking script)
    // But if we somehow know it's disabled, it's suspicious
    if (signals.jsEnabled === false) {
        suspicionLevel += 2
        detectedSignals.push('JavaScript disabled')
    }

    return {
        isSuspicious: suspicionLevel >= 3,
        confidence: Math.min(90, 50 + suspicionLevel * 10),
        suspicionLevel,
    }
}

/**
 * Quick check if a user agent looks like a known good bot
 */
export function isKnownGoodBot(userAgent: string): boolean {
    const goodPatterns = [
        ...AI_AGENT_PATTERNS,
        ...SEARCH_BOT_PATTERNS,
        ...SEO_TOOL_PATTERNS,
    ]

    for (const pattern of goodPatterns) {
        if (pattern.pattern.test(userAgent)) {
            return true
        }
    }

    return false
}

/**
 * Quick check if a user agent looks like a known bad bot
 */
export function isKnownBadBot(userAgent: string): boolean {
    for (const pattern of BAD_BOT_PATTERNS) {
        if (pattern.pattern.test(userAgent)) {
            return true
        }
    }

    return false
}

/**
 * Get all AI agent patterns for display
 */
export function getAIAgentPatterns(): BotPattern[] {
    return AI_AGENT_PATTERNS
}

/**
 * Get stats about known patterns
 */
export function getPatternStats() {
    return {
        aiAgents: AI_AGENT_PATTERNS.length,
        searchBots: SEARCH_BOT_PATTERNS.length,
        seoTools: SEO_TOOL_PATTERNS.length,
        badBots: BAD_BOT_PATTERNS.length,
        total: ALL_PATTERNS.length,
    }
}
