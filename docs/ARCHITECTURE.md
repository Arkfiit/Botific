# 🏗️ Botfic System Architecture

> **Version:** 1.0 | **Purpose:** Technical architecture for MVP

---

## 📐 High-Level Overview

```
Customer Website → Tracking Script → Ingestion API → Detection Engine → Database → Dashboard
```

**Components:**
1. **Tracking Script** - Lightweight JS (~3KB) collects visitor signals
2. **Ingestion API** - Receives events, applies detection
3. **Detection Engine** - Classifies visitors as Human/AI/Bot
4. **Database** - PostgreSQL stores sessions, events, metrics
5. **Dashboard** - Next.js app for visualization

---

## 🗂️ Monorepo Structure

```
botfic/
├── apps/
│   ├── web/                 # Next.js Dashboard
│   │   ├── src/app/         # App Router pages
│   │   ├── src/components/  # UI components
│   │   └── src/lib/         # Utilities
│   └── api/                 # Express API Server
│       ├── src/routes/      # API endpoints
│       └── src/services/    # Business logic
├── packages/
│   ├── detection/          # Bot Detection Engine
│   ├── tracker/            # Client Tracking Script
│   ├── database/           # Prisma schema & client
│   └── shared/             # Shared types
├── docs/                   # Documentation
└── scripts/                # Utility scripts
```

---

## 🔌 Core API Endpoints

| Method | Endpoint | Purpose |
|--------|----------|---------|
| POST | `/api/v1/track` | Receive tracking events |
| GET | `/api/v1/stats/overview` | Dashboard overview |
| GET | `/api/v1/stats/true-metrics` | Human-only metrics |
| GET | `/api/v1/ai-agents` | AI agent traffic data |
| GET | `/api/v1/sessions` | Session list with filters |
| GET | `/api/v1/recommendations` | Optimization suggestions |

---

## 💾 Database Schema (Core Tables)

**Organizations & Users**
- `Organization` - Customer accounts
- `User` - Team members
- `Site` - Tracked websites

**Tracking Data**
- `Session` - Visitor sessions with classification
- `Event` - Individual page views/actions

**Aggregations**
- `DailyMetrics` - Pre-calculated daily stats

**Key Fields on Session:**
```
- label: HUMAN | AI_AGENT | SEARCH_BOT | BAD_BOT
- confidence: 0-100
- botName: "ChatGPT", "Perplexity", etc.
- riskLevel: LOW | MEDIUM | HIGH
```

---

## 🚀 Deployment (MVP)

| Layer | Service |
|-------|---------|
| Frontend | Vercel (Next.js) |
| Database | Railway (PostgreSQL) |
| Tracker CDN | Vercel Edge |

Simple, cost-effective, scalable to 100K MAU.
