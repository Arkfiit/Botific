// Bot Detection Classifier

import type { DetectionResult, VisitorLabel, RiskLevel, Recommendation } from '@botfic/shared';
import { ALL_PATTERNS } from './patterns';

interface ClassificationInput {
    userAgent: string;
    behaviorScore?: number;
    jsSignals?: {
        webdriver: boolean;
        hasMouseEvents: boolean;
        hasScrollEvents: boolean;
        loadTime?: number;
    };
}

/**
 * Match user agent against known bot patterns
 */
function matchUserAgent(userAgent: string): DetectionResult | null {
    const ua = userAgent.toLowerCase();

    for (const [botId, pattern] of Object.entries(ALL_PATTERNS)) {
        for (const p of pattern.patterns) {
            if (ua.includes(p.toLowerCase())) {
                return {
                    label: pattern.category,
                    confidence: 95,
                    method: 'user_agent_match',
                    botName: botId,
                    botCategory: pattern.category,
                    riskLevel: pattern.risk,
                    recommendation: pattern.recommendation,
                };
            }
        }
    }

    return null;
}

/**
 * Calculate behavior-based bot score
 */
function calculateBehaviorScore(signals?: ClassificationInput['jsSignals']): number {
    if (!signals) return 0;

    let score = 0;

    // Automation detection
    if (signals.webdriver) score += 50;

    // No human interactions
    if (!signals.hasMouseEvents && !signals.hasScrollEvents) score += 30;

    // Suspiciously fast load time
    if (signals.loadTime && signals.loadTime < 100) score += 20;

    return Math.min(score, 100);
}

/**
 * Main classifier function
 */
export function classifyVisitor(input: ClassificationInput): DetectionResult {
    const { userAgent, jsSignals } = input;

    // Step 1: Check known patterns
    const uaMatch = matchUserAgent(userAgent);
    if (uaMatch) {
        return uaMatch;
    }

    // Step 2: Behavioral analysis
    const behaviorScore = calculateBehaviorScore(jsSignals);

    if (behaviorScore >= 80) {
        return {
            label: 'bad_bot',
            confidence: behaviorScore,
            method: 'automation_detection',
            botName: 'Automated Browser',
            botCategory: 'bad_bot',
            riskLevel: 'high',
            recommendation: 'block',
        };
    }

    if (behaviorScore >= 50) {
        return {
            label: 'unknown',
            confidence: behaviorScore,
            method: 'behavioral_analysis',
            botName: null,
            botCategory: null,
            riskLevel: 'medium',
            recommendation: 'monitor',
        };
    }

    // Step 3: Default to human
    return {
        label: 'human',
        confidence: Math.max(100 - behaviorScore, 70),
        method: 'default',
        botName: null,
        botCategory: null,
        riskLevel: 'low',
        recommendation: 'allow',
    };
}

export default classifyVisitor;
