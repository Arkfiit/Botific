/**
 * Botfic Tracking Script
 * Lightweight client-side tracker for bot detection
 * Target size: < 3KB minified
 */

(function () {
    'use strict';

    // Configuration
    const BOTFIC_API = (window as any).BOTFIC_API_URL || 'https://api.botfic.com/v1/track';
    const config = (window as any).BOTFIC_CONFIG || {};
    const siteId = config.siteId;

    if (!siteId) {
        console.warn('[Botfic] Missing siteId in BOTFIC_CONFIG');
        return;
    }

    // Session management
    const SESSION_KEY = 'botfic_sid';
    let sessionId = sessionStorage.getItem(SESSION_KEY);
    if (!sessionId) {
        sessionId = 'sess_' + Math.random().toString(36).substring(2, 11);
        sessionStorage.setItem(SESSION_KEY, sessionId);
    }

    // Visitor ID (persistent)
    const VISITOR_KEY = 'botfic_vid';
    let visitorId = localStorage.getItem(VISITOR_KEY);
    if (!visitorId) {
        visitorId = 'v_' + Math.random().toString(36).substring(2, 11);
        localStorage.setItem(VISITOR_KEY, visitorId);
    }

    // Signals collection
    const signals = {
        jsEnabled: true,
        webdriver: !!(navigator as any).webdriver,
        hasMouseEvents: false,
        hasScrollEvents: false,
        loadTime: performance.now(),
    };

    // Track mouse movement (with sampling)
    let mouseEventCount = 0;
    document.addEventListener('mousemove', function () {
        if (mouseEventCount++ > 3) {
            signals.hasMouseEvents = true;
        }
    }, { passive: true, once: false });

    // Track scroll
    document.addEventListener('scroll', function () {
        signals.hasScrollEvents = true;
    }, { passive: true, once: true });

    // Send tracking data
    function track(event: string, data?: Record<string, any>) {
        const payload = {
            siteId,
            sessionId,
            visitorId,
            event,
            timestamp: new Date().toISOString(),
            data: {
                url: window.location.href,
                path: window.location.pathname,
                referrer: document.referrer,
                userAgent: navigator.userAgent,
                screenWidth: screen.width,
                screenHeight: screen.height,
                language: navigator.language,
                ...data,
            },
            signals,
        };

        // Use sendBeacon for reliability
        if (navigator.sendBeacon) {
            navigator.sendBeacon(BOTFIC_API, JSON.stringify(payload));
        } else {
            fetch(BOTFIC_API, {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify(payload),
                keepalive: true,
            }).catch(() => { }); // Silently fail
        }
    }

    // Auto-track pageview
    track('pageview');

    // Track session end
    window.addEventListener('beforeunload', function () {
        track('session_end');
    });

    // Expose API
    (window as any).botfic = {
        track,
        getSessionId: () => sessionId,
        getVisitorId: () => visitorId,
    };
})();
