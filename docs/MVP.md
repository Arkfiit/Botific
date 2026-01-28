# 🧠 Botfic MVP Specification

> **Version:** 1.0  
> **Last Updated:** January 2026  
> **Target Launch:** 3 Weeks from Start

---

## 🎯 Core Value Proposition

**"See real human metrics, understand AI agent traffic, and optimize bot traffic instead of blocking it."**

### The Market Reality
- 51% of all web traffic is now automated
- Bot traffic has surpassed human traffic for the first time
- Bad bot activity is up for the 6th consecutive year (now 37% of all traffic)
- Traditional analytics are fundamentally broken

### Our Angle
- Don't just block bots — **understand them**
- Don't show polluted metrics — **show truth**
- Don't ignore AI agents — **optimize for them**

---

## 🔹 MVP Features Specification

### 1️⃣ Bot Detection Engine

**Purpose:** Identify bot vs human traffic accurately

**Data Sources:**
- Server logs (Apache/Nginx)
- JavaScript tracking snippet
- API integrations (future)

**Detection Methods:**

| Method | Description | Confidence |
|--------|-------------|------------|
| User-Agent Analysis | Pattern matching against known bot signatures | High |
| Request Behavior | Frequency, timing, path patterns | Medium |
| Known Signatures | AI agent identifiers, crawler tokens | High |
| JavaScript Execution | Bots often don't execute JS | High |
| Mouse/Scroll Events | Presence of human interaction signals | Medium |

**Bot Categories:**

```
1. AI Agents
   - ChatGPT (OAI-SearchBot, ChatGPT-User)
   - Perplexity (PerplexityBot)
   - Claude (ClaudeBot, Anthropic)
   - Gemini (Google-Extended)
   - Copilot (Copilot)

2. Search Bots
   - Google (Googlebot, Googlebot-Mobile)
   - Bing (Bingbot)
   - Others (DuckDuckBot, YandexBot)

3. Monitoring Bots
   - Uptime monitors
   - SEO tools (Ahrefs, Semrush)

4. Bad Bots
   - Scrapers
   - Spam bots
   - Credential stuffers
```

**Output:**
Every visit tagged as: `Human | AI Agent | Search Bot | Bad Bot`

---

### 2️⃣ Traffic Labeling System

**Purpose:** Make data instantly understandable

**Labels:**
| Icon | Label | Description |
|------|-------|-------------|
| 👤 | Human | Verified real visitor |
| 🤖 | AI Agent | Known AI assistant/crawler |
| 🔍 | Search Engine | Search engine crawler |
| ⚠️ | Bad Bot | Suspicious/malicious traffic |
| ❓ | Unknown | Unclassified (needs review) |

**Session Properties:**

```typescript
interface Session {
  id: string;
  timestamp: Date;
  
  // Classification
  label: 'human' | 'ai_agent' | 'search_bot' | 'bad_bot' | 'unknown';
  confidence: number; // 0-100
  detectionMethod: string[];
  
  // Traffic data
  userAgent: string;
  ip: string;
  country: string;
  
  // Behavior
  pageViews: number;
  duration: number;
  pages: string[];
  
  // Bot-specific
  botName?: string;
  botCategory?: string;
}
```

---

### 3️⃣ True Metrics Dashboard (KEY SELLING POINT)

**Purpose:** Fix broken marketing metrics

**Display Two Metric Views:**

| Metric | ❌ Default (All Traffic) | ✅ True (Humans Only) |
|--------|-------------------------|----------------------|
| Total Sessions | Shows all visits | Only human visits |
| Conversion Rate | Diluted by bots | Actual human conversion |
| Bounce Rate | Inflated by bots | Real user bounce |
| Avg. Session Duration | Skewed low | True engagement |
| Pages per Session | Often 1 for bots | Real browsing depth |

**Key Insights Generated:**
- "Your actual conversion rate is **3.8%**, not 1.4%"
- "**58%** of your traffic last week was non-human"
- "Your bounce rate improves by **27 points** when excluding bots"

**Dashboard Components:**

```
┌─────────────────────────────────────────────────────┐
│  TRUE METRICS OVERVIEW                              │
├─────────────────────────────────────────────────────┤
│                                                     │
│  ┌─────────────┐  ┌─────────────┐  ┌─────────────┐ │
│  │ SESSIONS    │  │ CONV. RATE  │  │ BOUNCE RATE │ │
│  │ 4,287       │  │ 3.8%        │  │ 45%         │ │
│  │ ↑ vs 10,203 │  │ ↑ vs 1.4%   │  │ ↓ vs 72%    │ │
│  │ (humans)    │  │ (real)      │  │ (real)      │ │
│  └─────────────┘  └─────────────┘  └─────────────┘ │
│                                                     │
│  ┌─────────────────────────────────────────────┐   │
│  │ Traffic Composition                          │   │
│  │ ████████████░░░░░░░░ 42% Human              │   │
│  │ ██████░░░░░░░░░░░░░░ 28% AI Agents          │   │
│  │ ████░░░░░░░░░░░░░░░░ 18% Search Bots        │   │
│  │ ███░░░░░░░░░░░░░░░░░ 12% Bad Bots           │   │
│  └─────────────────────────────────────────────┘   │
└─────────────────────────────────────────────────────┘
```

---

### 4️⃣ AI Agent Traffic View

**Purpose:** Reveal invisible opportunity

**Metrics Shown:**
- % of total traffic from AI agents
- Individual agent breakdown
- Pages accessed most by AI
- Frequency trends (daily/weekly)
- AI Visibility Score

**AI Visibility Score Formula (v1 - Simple):**

```javascript
// Score out of 100
function calculateAIVisibilityScore(siteData) {
  let score = 0;
  
  // 1. AI Agent Traffic Volume (0-30 points)
  const aiTrafficPercent = (siteData.aiAgentVisits / siteData.totalVisits) * 100;
  score += Math.min(aiTrafficPercent * 2, 30);
  
  // 2. Agent Diversity (0-20 points)
  const uniqueAgents = siteData.uniqueAIAgents.length;
  score += Math.min(uniqueAgents * 5, 20);
  
  // 3. Content Accessibility (0-25 points)
  // Based on pages successfully crawled
  const crawlSuccessRate = siteData.successfulCrawls / siteData.totalCrawlAttempts;
  score += crawlSuccessRate * 25;
  
  // 4. Repeat Visits (0-25 points)
  const repeatVisitRate = siteData.repeatAIVisits / siteData.totalAIVisits;
  score += repeatVisitRate * 25;
  
  return Math.round(score);
}
```

**Agent Detail View:**

| Agent | Visits | Top Pages | Trend |
|-------|--------|-----------|-------|
| ChatGPT | 1,234 | /pricing, /features | ↑ 23% |
| Perplexity | 856 | /blog/*, /docs/* | ↑ 45% |
| Claude | 432 | /api-docs, /pricing | → 0% |

---

### 5️⃣ Bot Traffic Optimization (Recommendations Only)

**Purpose:** Actionable insights, not automation

**Recommendation Types:**

```typescript
type Recommendation = {
  id: string;
  priority: 'high' | 'medium' | 'low';
  type: 'allow' | 'block' | 'optimize' | 'investigate';
  title: string;
  description: string;
  impact: string;
  action: string;
};
```

**Example Recommendations:**

| Priority | Recommendation |
|----------|---------------|
| 🔴 High | "Block `SemrushBot` - consuming 15% of bandwidth with no value" |
| 🟡 Medium | "Allow `ChatGPT-User` - potential customer traffic source" |
| 🟢 Low | "Optimize `/pricing` for AI readability - frequently accessed" |

**Not in MVP:**
- ❌ Auto-blocking
- ❌ robots.txt generator
- ❌ CDN integration

---

## 🚫 What We're NOT Building (MVP Scope Control)

| Feature | Why Not |
|---------|---------|
| Advanced fraud prevention | Complex, different market |
| Heatmaps | Commodity feature, not core |
| Ad attribution | Separate product opportunity |
| AI monetization | Future feature |
| Complex permissions | Team features later |
| Real-time blocking | Legal complexity, MVP = insights |

---

## 🖥️ Dashboard Structure

### Sidebar Navigation

```
┌─────────────────────┐
│ 🤖 Botfic           │
├─────────────────────┤
│ 📊 Overview         │
│ 📈 True Metrics     │
│ 🤖 Bot Traffic      │
│ 🧠 AI Agents        │
│ ⚡ Optimization     │
├─────────────────────┤
│ ⚙️ Settings         │
│ 📚 Documentation    │
│ 💬 Support          │
└─────────────────────┘
```

### Page Breakdown

**1. Overview Page**
- Total visits (with breakdown)
- % Human / AI / Search / Bad
- Quick trend charts
- Top recommendations

**2. True Metrics Page**
- Side-by-side comparison
- Detailed metrics breakdown
- Export capability

**3. Bot Traffic Page**
- All bot sessions
- Filtering by type
- Search and sort

**4. AI Agents Page**
- Agent list with stats
- Individual agent detail
- Page access patterns

**5. Optimization Page**
- Recommendation list
- Priority sorting
- Action tracking

---

## 🔧 Technical Architecture

### Data Flow

```
[Visitor] → [Website with Tracker]
                    ↓
            [Tracking API]
                    ↓
            [Detection Engine]
                    ↓
            [PostgreSQL DB]
                    ↓
            [Dashboard API]
                    ↓
            [Next.js Dashboard]
```

### System Components

```
┌─────────────────────────────────────────────────────┐
│                    BOTFIC SYSTEM                    │
├─────────────────────────────────────────────────────┤
│                                                     │
│  ┌─────────────┐    ┌─────────────┐                │
│  │  Tracker    │───▶│  API        │                │
│  │  (JS/Logs)  │    │  Server     │                │
│  └─────────────┘    └──────┬──────┘                │
│                            │                        │
│                    ┌───────▼───────┐               │
│                    │   Detection   │               │
│                    │   Engine      │               │
│                    └───────┬───────┘               │
│                            │                        │
│  ┌─────────────┐    ┌──────▼──────┐                │
│  │  Dashboard  │◀───│  Database   │                │
│  │  (Next.js)  │    │  (Postgres) │                │
│  └─────────────┘    └─────────────┘                │
│                                                     │
└─────────────────────────────────────────────────────┘
```

---

## ⏱️ Build Timeline

### Week 1: Foundation
- [ ] Project scaffolding
- [ ] Database schema
- [ ] Tracking script MVP
- [ ] Basic API endpoints
- [ ] Bot detection rules (v1)

### Week 2: Dashboard
- [ ] Dashboard UI (all pages)
- [ ] True metrics calculations
- [ ] AI agent view
- [ ] Charts and visualizations

### Week 3: Polish & Launch
- [ ] Optimization recommendations
- [ ] AI Visibility Score
- [ ] Stripe integration
- [ ] Landing page
- [ ] Documentation

**Target: 3 weeks = sellable product**

---

## 💰 Pricing Strategy

| Tier | Price | Sessions/mo | Features |
|------|-------|-------------|----------|
| **Starter** | $29/mo | 10,000 | Basic detection, True metrics |
| **Growth** | $79/mo | 100,000 | + AI insights, Recommendations |
| **Scale** | $199/mo | 1,000,000 | + API access, Priority support |
| **Enterprise** | Custom | Unlimited | + White-label, SLA |

---

## 📣 Go-to-Market Messaging

**Primary:**
> "Google Analytics shows traffic. We show who actually matters."

**Secondary:**
> "Stop blocking bots. Start understanding them."

**Stats to Lead With:**
> "51% of your traffic isn't human. Are your metrics lying to you?"

---

## ✅ Success Criteria

MVP is successful if:

1. **Technical**
   - Detection accuracy > 90%
   - Dashboard loads < 2s
   - Tracking script < 5KB

2. **Product**
   - Users understand value in < 30s
   - "True metrics" creates "aha moment"
   - AI agent view reveals something new

3. **Business**
   - 10 paying customers in first month
   - NPS > 40
   - < 20% churn in first 90 days
