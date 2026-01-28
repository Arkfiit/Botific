// Botfic Shared Types

// ============ LABELS ============

export type VisitorLabel = 'human' | 'ai_agent' | 'search_bot' | 'seo_tool' | 'bad_bot' | 'unknown';

export type RiskLevel = 'low' | 'medium' | 'high' | 'critical';

export type Recommendation = 'allow' | 'monitor' | 'throttle' | 'block';

// ============ SESSIONS ============

export interface Session {
    id: string;
    siteId: string;
    visitorId: string;

    // Classification
    label: VisitorLabel;
    confidence: number;
    botName: string | null;
    botCategory: string | null;
    riskLevel: RiskLevel;

    // Session data
    startedAt: Date;
    endedAt: Date | null;
    duration: number | null;
    pageViews: number;

    // Source
    userAgent: string;
    ip: string | null;
    country: string | null;
    referrer: string | null;
}

// ============ EVENTS ============

export interface TrackingEvent {
    siteId: string;
    sessionId: string;
    event: string;
    timestamp: string;
    data: {
        url: string;
        referrer?: string;
        userAgent: string;
        screenWidth?: number;
        screenHeight?: number;
    };
    signals: {
        jsEnabled: boolean;
        webdriver: boolean;
        hasMouseEvents: boolean;
        hasScrollEvents: boolean;
        loadTime?: number;
    };
}

// ============ DETECTION ============

export interface DetectionResult {
    label: VisitorLabel;
    confidence: number;
    method: string;
    botName: string | null;
    botCategory: string | null;
    riskLevel: RiskLevel;
    recommendation: Recommendation;
}

export interface BotPattern {
    patterns: string[];
    category: VisitorLabel;
    company?: string;
    risk: RiskLevel;
    recommendation: Recommendation;
}

// ============ METRICS ============

export interface OverviewStats {
    totalVisits: number;
    breakdown: {
        human: { count: number; percent: number };
        aiAgent: { count: number; percent: number };
        searchBot: { count: number; percent: number };
        badBot: { count: number; percent: number };
    };
    trueMetrics: MetricsSet;
    pollutedMetrics: MetricsSet;
}

export interface MetricsSet {
    sessions: number;
    conversionRate: number;
    bounceRate: number;
    avgSessionDuration: number;
}

export interface AIAgentStats {
    totalAIVisits: number;
    percentOfTotal: number;
    aiVisibilityScore: number;
    agents: AIAgentDetail[];
}

export interface AIAgentDetail {
    name: string;
    company: string;
    visits: number;
    topPages: string[];
    trend: string;
}

// ============ RECOMMENDATIONS ============

export interface OptimizationRecommendation {
    id: string;
    priority: 'high' | 'medium' | 'low';
    type: 'allow' | 'block' | 'optimize' | 'investigate';
    title: string;
    description: string;
    impact: string;
    action: string;
}
