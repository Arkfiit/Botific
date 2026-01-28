# Botfic - Bot-First Analytics Platform

> Real Metrics. Clear Traffic. Real Opportunities.

Botfic helps you understand your **true website performance** by filtering out bot traffic, **identifying AI agents** visiting your site, and showing you **optimization opportunities** you're missing.

## 🎯 Core Value Proposition

1. **Real Metrics** — See your actual conversion rate, bounce rate, and engagement (human-only)
2. **Traffic Clarity** — Know exactly who visits: Human, AI Agent, Search Bot, or Bad Bot
3. **Opportunity Gaps** — AI agents like ChatGPT are your new customers. Optimize for them.

## 🚀 Quick Start

```bash
# Install dependencies
cd apps/web && npm install

# Start the development server
npm run dev

# Open http://localhost:3000
```

## � Project Structure

```
Bot IQ/
├── apps/
│   └── web/                    # Next.js web application
│       ├── public/
│       │   └── tracker.js      # Client-side tracking script
│       └── src/
│           ├── app/
│           │   ├── api/
│           │   │   ├── ingest/     # Traffic ingestion endpoint
│           │   │   ├── dashboard/  # Dashboard data API
│           │   │   └── detect/     # Bot detection test API
│           │   ├── dashboard/      # Dashboard pages
│           │   │   ├── page.tsx            # Overview
│           │   │   ├── true-metrics/       # True Metrics
│           │   │   ├── bot-traffic/        # Bot Traffic
│           │   │   ├── ai-agents/          # AI Agents
│           │   │   ├── optimization/       # Optimization
│           │   │   └── settings/           # Settings
│           │   ├── demo/           # Interactive bot detection demo
│           │   ├── login/          # Login page
│           │   ├── signup/         # Signup page
│           │   └── page.tsx        # Landing page
│           └── lib/
│               └── detection/      # Bot detection engine
│                   ├── patterns.ts     # Bot patterns database
│                   └── classifier.ts   # Classification logic
├── packages/
│   ├── database/               # Prisma database schema
│   ├── detection/              # Shared detection logic
│   └── shared/                 # Shared types
└── docs/
    ├── MVP.md                  # MVP specification
    ├── ARCHITECTURE.md         # System architecture
    ├── DETECTION_RULES.md      # Bot detection rules
    └── API.md                  # API documentation
```

## ✨ MVP Features

### 1. Bot Detection Engine
- Detects AI agents (ChatGPT, Perplexity, Claude, Gemini)
- Identifies search bots (Google, Bing)
- Flags bad bots (scrapers, fraud)
- User-agent pattern matching + behavioral analysis

### 2. Traffic Labeling System
- 👤 Human
- 🤖 AI Agent
- 🔍 Search Bot
- ⚠️ Bad Bot

### 3. True Metrics Dashboard
Shows side-by-side comparison:
- ❌ **Bot-Polluted**: What Google Analytics shows
- ✅ **True Metrics**: Humans only

### 4. AI Agent Intelligence
- AI Visibility Score (0-100)
- Which AI agents visit your site
- Pages they access most
- Optimization recommendations

### 5. Optimization Suggestions
- Rules-based recommendations
- "Allow this AI agent (high value)"
- "Block this bot (scraper)"
- Action checklist

## � Tech Stack

| Layer | Technology |
|-------|------------|
| Framework | Next.js 14 (App Router) |
| Styling | Tailwind CSS |
| Language | TypeScript |
| Database | PostgreSQL + Prisma |
| Animations | Framer Motion |
| Icons | Lucide React |

## 📡 API Endpoints

### POST /api/ingest
Ingests visitor data from tracking script.

```json
{
  "siteId": "site_abc123",
  "sessionId": "sid_xyz789",
  "url": "https://example.com/pricing",
  "userAgent": "...",
  "timestamp": 1706789012345
}
```

### GET /api/dashboard?type=overview
Returns dashboard data. Types: `overview`, `true-metrics`, `bot-traffic`, `ai-agents`, `optimization`

### POST /api/detect
Test bot detection with any user agent.

```json
{
  "userAgent": "Mozilla/5.0 (compatible; GPTBot/1.0)"
}
```

## 🛠️ Development

```bash
# Start dev server
npm run dev

# Build for production
npm run build

# Run linting
npm run lint
```

## 📊 Dashboard Pages

| Page | Description |
|------|-------------|
| **Overview** | Traffic at a glance, AI visibility score, quick stats |
| **True Metrics** | Bot-polluted vs real metrics comparison |
| **Bot Traffic** | Traffic breakdown by type, bot identification |
| **AI Agents** | AI agent tracking, page access frequency |
| **Optimization** | Recommendations, bot access rules |
| **Settings** | Account, site, tracking code, billing |

## 🤖 Detected Bots

Botfic can detect 50+ different bots including:

**AI Agents (Good)**
- ChatGPT (GPTBot)
- Claude (ClaudeBot)
- Perplexity
- Gemini
- Copilot

**Search Bots (Good)**
- Googlebot
- Bingbot
- DuckDuckBot
- YandexBot

**Bad Bots**
- DataForSeo
- Bytespider
- Scrapers
- Headless browsers

## 📈 Roadmap

- [x] Landing page with opportunity messaging
- [x] Dashboard UI with all pages
- [x] Bot detection engine
- [x] Tracking script
- [x] API endpoints
- [ ] Database integration
- [ ] User authentication
- [ ] Stripe billing
- [ ] Real-time updates
- [ ] Email reports

## 💰 Pricing

| Plan | Price | Sessions |
|------|-------|----------|
| Starter | $29/mo | 10,000 |
| Growth | $79/mo | 100,000 |
| Scale | $199/mo | 1,000,000 |

---

Built with ❤️ for the bot-first era.
