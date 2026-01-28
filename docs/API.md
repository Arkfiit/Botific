# 📡 Botfic API Documentation

> **Version:** 1.0 | **Base URL:** `https://api.botfic.com/v1`

---

## 🔐 Authentication

All API requests require authentication via API key in the header:

```
Authorization: Bearer YOUR_API_KEY
```

---

## 📥 Ingestion Endpoints

### Track Event
`POST /track`

Receives tracking events from the client-side script.

**Request Body:**
```json
{
  "siteId": "site_abc123",
  "sessionId": "sess_xyz789",
  "visitorId": "v_def456",
  "event": "pageview",
  "timestamp": "2026-01-26T12:00:00Z",
  "data": {
    "url": "https://example.com/pricing",
    "path": "/pricing",
    "referrer": "https://google.com",
    "userAgent": "Mozilla/5.0...",
    "screenWidth": 1920,
    "screenHeight": 1080
  },
  "signals": {
    "jsEnabled": true,
    "webdriver": false,
    "hasMouseEvents": true,
    "hasScrollEvents": true,
    "loadTime": 1234
  }
}
```

**Response:**
```json
{
  "success": true,
  "eventId": "evt_abc123",
  "classification": {
    "label": "human",
    "confidence": 92
  }
}
```

---

## 📊 Dashboard Endpoints

### Get Overview
`GET /stats/overview`

**Query Params:**
- `siteId` (required) - Site identifier
- `period` - Time period: `7d`, `30d`, `90d` (default: `7d`)

**Response:**
```json
{
  "totalVisits": 10234,
  "breakdown": {
    "human": { "count": 4287, "percent": 41.9 },
    "aiAgent": { "count": 2856, "percent": 27.9 },
    "searchBot": { "count": 1842, "percent": 18.0 },
    "badBot": { "count": 1249, "percent": 12.2 }
  },
  "trueMetrics": {
    "sessions": 4287,
    "conversionRate": 3.8,
    "bounceRate": 45,
    "avgSessionDuration": 187
  },
  "pollutedMetrics": {
    "sessions": 10234,
    "conversionRate": 1.4,
    "bounceRate": 72,
    "avgSessionDuration": 34
  }
}
```

### Get True Metrics
`GET /stats/true-metrics`

Returns only human-verified metrics.

### Get AI Agents
`GET /ai-agents`

**Response:**
```json
{
  "totalAIVisits": 2856,
  "percentOfTotal": 27.9,
  "aiVisibilityScore": 62,
  "agents": [
    {
      "name": "ChatGPT",
      "company": "OpenAI",
      "visits": 1234,
      "topPages": ["/pricing", "/features"],
      "trend": "+23%"
    }
  ]
}
```

### Get Sessions
`GET /sessions`

**Query Params:**
- `siteId` (required)
- `label` - Filter by: `human`, `ai_agent`, `search_bot`, `bad_bot`
- `page` - Page number (default: 1)
- `limit` - Results per page (default: 50)

### Get Recommendations
`GET /recommendations`

Returns optimization recommendations based on traffic patterns.

---

## 🔧 Management Endpoints

### Sites
- `GET /sites` - List all sites
- `POST /sites` - Create new site
- `GET /sites/:id` - Get site details
- `PUT /sites/:id` - Update site
- `DELETE /sites/:id` - Delete site

### Export
- `GET /export/csv` - Export data as CSV
- `GET /export/json` - Export data as JSON

---

## ⚠️ Error Codes

| Code | Meaning |
|------|---------|
| 400 | Bad Request - Invalid parameters |
| 401 | Unauthorized - Invalid API key |
| 403 | Forbidden - Insufficient permissions |
| 404 | Not Found - Resource doesn't exist |
| 429 | Rate Limited - Too many requests |
| 500 | Server Error |

---

## 📈 Rate Limits

| Plan | Requests/min |
|------|-------------|
| Starter | 100 |
| Growth | 500 |
| Scale | 2000 |
| Enterprise | Unlimited |
