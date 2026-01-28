# 🔍 Bot Detection Rules & Logic

> **Version:** 1.0  
> **Purpose:** Define the rules and algorithms for bot detection

---

## 🎯 Detection Overview

Our detection engine uses a **multi-signal approach** combining:
1. User-Agent pattern matching
2. Behavioral analysis
3. JavaScript execution checks
4. Known bot signature databases
5. Request pattern analysis

---

## 📋 User-Agent Pattern Database

### AI Agents

```javascript
const AI_AGENT_PATTERNS = {
  // OpenAI / ChatGPT
  chatgpt: {
    patterns: [
      'ChatGPT-User',
      'OAI-SearchBot',
      'GPTBot'
    ],
    category: 'ai_agent',
    company: 'OpenAI',
    risk: 'low',
    recommendation: 'allow'
  },
  
  // Anthropic / Claude
  claude: {
    patterns: [
      'ClaudeBot',
      'Claude-Web',
      'anthropic-ai'
    ],
    category: 'ai_agent',
    company: 'Anthropic',
    risk: 'low',
    recommendation: 'allow'
  },
  
  // Google / Gemini
  gemini: {
    patterns: [
      'Google-Extended',
      'Gemini',
      'Google-InspectionTool'
    ],
    category: 'ai_agent',
    company: 'Google',
    risk: 'low',
    recommendation: 'allow'
  },
  
  // Perplexity
  perplexity: {
    patterns: [
      'PerplexityBot',
      'Perplexity-User'
    ],
    category: 'ai_agent',
    company: 'Perplexity',
    risk: 'low',
    recommendation: 'allow'
  },
  
  // Microsoft / Copilot
  copilot: {
    patterns: [
      'Copilot',
      'bingbot/copilot'
    ],
    category: 'ai_agent',
    company: 'Microsoft',
    risk: 'low',
    recommendation: 'allow'
  },
  
  // You.com
  you: {
    patterns: [
      'YouBot'
    ],
    category: 'ai_agent',
    company: 'You.com',
    risk: 'low',
    recommendation: 'allow'
  }
};
```

### Search Engine Bots

```javascript
const SEARCH_BOT_PATTERNS = {
  google: {
    patterns: [
      'Googlebot',
      'Googlebot-Mobile',
      'Googlebot-Image',
      'Googlebot-News',
      'Googlebot-Video',
      'AdsBot-Google',
      'Mediapartners-Google'
    ],
    category: 'search_bot',
    company: 'Google',
    risk: 'low',
    recommendation: 'allow'
  },
  
  bing: {
    patterns: [
      'bingbot',
      'msnbot',
      'BingPreview'
    ],
    category: 'search_bot',
    company: 'Microsoft',
    risk: 'low',
    recommendation: 'allow'
  },
  
  duckduckgo: {
    patterns: [
      'DuckDuckBot',
      'DuckDuckGo-Favicons-Bot'
    ],
    category: 'search_bot',
    company: 'DuckDuckGo',
    risk: 'low',
    recommendation: 'allow'
  },
  
  yahoo: {
    patterns: [
      'Slurp'
    ],
    category: 'search_bot',
    company: 'Yahoo',
    risk: 'low',
    recommendation: 'allow'
  },
  
  yandex: {
    patterns: [
      'YandexBot',
      'YandexImages',
      'YandexMobileBot'
    ],
    category: 'search_bot',
    company: 'Yandex',
    risk: 'low',
    recommendation: 'allow'
  },
  
  baidu: {
    patterns: [
      'Baiduspider',
      'Baiduspider-image'
    ],
    category: 'search_bot',
    company: 'Baidu',
    risk: 'medium',
    recommendation: 'monitor'
  }
};
```

### SEO & Monitoring Tools

```javascript
const SEO_TOOL_PATTERNS = {
  ahrefs: {
    patterns: ['AhrefsBot', 'AhrefsSiteAudit'],
    category: 'seo_tool',
    risk: 'medium',
    recommendation: 'throttle'
  },
  
  semrush: {
    patterns: ['SemrushBot', 'SemrushBot-SA'],
    category: 'seo_tool',
    risk: 'medium',
    recommendation: 'throttle'
  },
  
  moz: {
    patterns: ['rogerbot', 'DotBot'],
    category: 'seo_tool',
    risk: 'low',
    recommendation: 'allow'
  },
  
  majestic: {
    patterns: ['MJ12bot'],
    category: 'seo_tool',
    risk: 'medium',
    recommendation: 'throttle'
  },
  
  screaming_frog: {
    patterns: ['Screaming Frog SEO Spider'],
    category: 'seo_tool',
    risk: 'low',
    recommendation: 'allow'
  }
};
```

### Known Bad Bots

```javascript
const BAD_BOT_PATTERNS = {
  scrapers: {
    patterns: [
      'Scrapy',
      'python-requests',
      'Java/',
      'HttpClient',
      'Go-http-client',
      'curl/',
      'wget/',
      'libwww-perl'
    ],
    category: 'bad_bot',
    risk: 'high',
    recommendation: 'block'
  },
  
  spam_bots: {
    patterns: [
      'Xenu Link Sleuth',
      'MegaIndex',
      'BLEXBot',
      'DataForSeoBot'
    ],
    category: 'bad_bot',
    risk: 'high',
    recommendation: 'block'
  },
  
  credential_stuffers: {
    patterns: [
      'Gh0st',
      'CherryPicker',
      'EmailCollector'
    ],
    category: 'bad_bot',
    risk: 'critical',
    recommendation: 'block'
  }
};
```

---

## 🧠 Behavioral Detection Rules

### Request Frequency Analysis

```javascript
const FREQUENCY_RULES = {
  // Requests per minute thresholds
  human: {
    maxRequestsPerMinute: 20,
    typicalRange: [1, 10]
  },
  
  suspicious: {
    requestsPerMinute: [20, 60],
    action: 'flag_for_review'
  },
  
  bot: {
    requestsPerMinute: 60,
    action: 'classify_as_bot'
  }
};
```

### Session Duration Analysis

```javascript
const SESSION_RULES = {
  // Too short = likely bot
  suspiciouslyShort: {
    duration: 500,  // ms
    pageViews: 1,
    classification: 'likely_bot'
  },
  
  // Impossible read speed
  impossibleSpeed: {
    pagesPerSecond: 2,
    classification: 'definitely_bot'
  },
  
  // No idle time
  noIdleTime: {
    consecutive_requests_gap: 100,  // ms
    classification: 'likely_bot'
  }
};
```

### Path Pattern Analysis

```javascript
const PATH_RULES = {
  // Sequential path access (alphabetical, numerical)
  sequentialAccess: {
    pattern: 'sequential',
    examples: ['/page-1', '/page-2', '/page-3'],
    classification: 'bot'
  },
  
  // Access to common bot targets
  botTargetPaths: [
    '/robots.txt',
    '/sitemap.xml',
    '/.env',
    '/wp-admin',
    '/xmlrpc.php',
    '/admin',
    '/.git'
  ],
  
  // Depth-first crawling pattern
  depthFirstCrawl: {
    pattern: 'hierarchical',
    classification: 'search_bot'
  }
};
```

---

## 🔧 JavaScript Signal Detection

### Client-Side Checks

```javascript
// Signals collected by tracking script
const JS_SIGNALS = {
  // Browser APIs that bots often don't support
  browserAPIs: {
    webgl: 'WebGLRenderingContext' in window,
    canvas: !!document.createElement('canvas').getContext,
    webrtc: 'RTCPeerConnection' in window,
    notification: 'Notification' in window
  },
  
  // Mouse/touch events
  interaction: {
    hasMouseMoved: false,  // Set on event
    hasClicked: false,
    hasScrolled: false,
    hasTouched: false
  },
  
  // Timing checks
  timing: {
    jsLoadTime: performance.now(),
    domContentLoaded: null,  // Set on event
    timeToFirstInteraction: null
  },
  
  // Automation detection
  automation: {
    webdriver: navigator.webdriver,
    phantom: 'callPhantom' in window || '_phantom' in window,
    nightmare: 'nightmare' in window,
    selenium: document.documentElement.getAttribute('selenium') !== null
  }
};
```

### Bot Score Calculation

```javascript
function calculateBotScore(signals) {
  let score = 0;  // 0 = definitely human, 100 = definitely bot
  
  // Automation markers (+50 each, max 100)
  if (signals.automation.webdriver) score += 50;
  if (signals.automation.phantom) score += 50;
  if (signals.automation.selenium) score += 50;
  
  // No interactions after 5 seconds (+30)
  if (!signals.interaction.hasMouseMoved && 
      !signals.interaction.hasScrolled &&
      signals.timing.jsLoadTime > 5000) {
    score += 30;
  }
  
  // Missing browser APIs (+10 each)
  if (!signals.browserAPIs.webgl) score += 10;
  if (!signals.browserAPIs.canvas) score += 10;
  if (!signals.browserAPIs.webrtc) score += 10;
  
  // Suspiciously fast JS execution (+20)
  if (signals.timing.domContentLoaded < 100) score += 20;
  
  return Math.min(score, 100);
}
```

---

## 📊 Classification Algorithm

### Final Classification Logic

```javascript
function classifyVisitor(data) {
  const {
    userAgent,
    behaviorScore,
    jsScore,
    ipReputation,
    requestPattern
  } = data;
  
  // Step 1: Check known patterns
  const uaMatch = matchUserAgent(userAgent);
  if (uaMatch) {
    return {
      label: uaMatch.category,
      botName: uaMatch.name,
      confidence: 95,
      method: 'user_agent_match'
    };
  }
  
  // Step 2: Check automation signals
  if (jsScore >= 80) {
    return {
      label: 'bad_bot',
      botName: 'Automated Browser',
      confidence: jsScore,
      method: 'automation_detection'
    };
  }
  
  // Step 3: Behavioral analysis
  if (behaviorScore >= 70) {
    return {
      label: 'unknown_bot',
      botName: null,
      confidence: behaviorScore,
      method: 'behavioral_analysis'
    };
  }
  
  // Step 4: IP reputation (if available)
  if (ipReputation?.isDatacenter) {
    return {
      label: 'likely_bot',
      botName: null,
      confidence: 60,
      method: 'ip_analysis'
    };
  }
  
  // Step 5: Default to human
  return {
    label: 'human',
    botName: null,
    confidence: Math.max(100 - behaviorScore - jsScore, 50),
    method: 'default'
  };
}
```

---

## 📁 Detection Data Structures

### Session Record

```typescript
interface DetectionResult {
  // Classification
  label: 'human' | 'ai_agent' | 'search_bot' | 'seo_tool' | 'bad_bot' | 'unknown';
  confidence: number;  // 0-100
  method: string;
  
  // Bot identification (if applicable)
  botName: string | null;
  botCategory: string | null;
  botCompany: string | null;
  
  // Risk assessment
  riskLevel: 'low' | 'medium' | 'high' | 'critical';
  recommendation: 'allow' | 'monitor' | 'throttle' | 'block';
  
  // Raw signals
  signals: {
    userAgent: string;
    behaviorScore: number;
    jsScore: number;
    ipReputation: IpReputation | null;
  };
}
```

---

## 🔄 Continuous Improvement

### Feedback Loop

1. **Manual Review Queue** - Unknown bots flagged for human review
2. **Pattern Learning** - New patterns added from reviews
3. **Accuracy Tracking** - Monitor false positive/negative rates
4. **Community Database** - Share patterns across customers (anonymized)

### Accuracy Targets

| Metric | Target | Acceptable |
|--------|--------|------------|
| True Positive (Bot) | >95% | >90% |
| True Negative (Human) | >98% | >95% |
| False Positive | <2% | <5% |
| False Negative | <5% | <10% |

---

## 🚀 Future Enhancements (Post-MVP)

1. **Machine Learning Model**
   - Train on labeled data
   - Anomaly detection
   - Real-time adaptation

2. **IP Intelligence**
   - Datacenter detection
   - VPN/Proxy identification
   - Geo-anomaly detection

3. **Device Fingerprinting**
   - Canvas fingerprint
   - Audio fingerprint
   - WebGL fingerprint
   
4. **CAPTCHA Integration**
   - Challenge suspicious visitors
   - Validate classifications
