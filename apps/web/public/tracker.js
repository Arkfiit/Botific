/**
 * Botfic Tracking Script
 * Lightweight visitor tracking for bot detection
 * 
 * Usage:
 * <script src="https://cdn.botfic.com/tracker.js" data-site="YOUR_SITE_ID"></script>
 */

(function () {
    'use strict';

    // Configuration
    const ENDPOINT = 'https://api.botfic.com/api/ingest';
    const VERSION = '1.0.0';

    // Get site ID from script tag
    function getSiteId() {
        const scripts = document.getElementsByTagName('script');
        for (let i = 0; i < scripts.length; i++) {
            const script = scripts[i];
            if (script.src && script.src.includes('tracker.js')) {
                return script.getAttribute('data-site');
            }
        }
        return null;
    }

    // Generate or retrieve session ID
    function getSessionId() {
        let sessionId = sessionStorage.getItem('_botfic_sid');
        if (!sessionId) {
            sessionId = 'sid_' + Math.random().toString(36).substring(2) + Date.now().toString(36);
            sessionStorage.setItem('_botfic_sid', sessionId);
        }
        return sessionId;
    }

    // Collect visitor signals
    function collectSignals() {
        return {
            // Screen info
            screenWidth: window.screen ? window.screen.width : undefined,
            screenHeight: window.screen ? window.screen.height : undefined,
            viewportWidth: window.innerWidth,
            viewportHeight: window.innerHeight,

            // Browser info
            timezone: Intl.DateTimeFormat().resolvedOptions().timeZone,
            language: navigator.language || navigator.userLanguage,
            platform: navigator.platform,
            cookiesEnabled: navigator.cookieEnabled,

            // Performance signals
            jsEnabled: true,

            // Touch support (mobile detection)
            touchSupport: 'ontouchstart' in window || navigator.maxTouchPoints > 0,

            // Device pixel ratio (retina detection)
            devicePixelRatio: window.devicePixelRatio || 1,
        };
    }

    // Send tracking data
    function track(eventType, additionalData = {}) {
        const siteId = getSiteId();
        if (!siteId) {
            console.warn('[Botfic] No site ID found. Add data-site attribute to script tag.');
            return;
        }

        const signals = collectSignals();

        const payload = {
            v: VERSION,
            siteId: siteId,
            sessionId: getSessionId(),
            eventType: eventType,
            url: window.location.href,
            path: window.location.pathname,
            referrer: document.referrer || undefined,
            title: document.title,
            userAgent: navigator.userAgent,
            timestamp: Date.now(),
            ...signals,
            ...additionalData,
        };

        // Use sendBeacon for reliability, fall back to fetch
        const data = JSON.stringify(payload);

        if (navigator.sendBeacon) {
            navigator.sendBeacon(ENDPOINT, data);
        } else {
            fetch(ENDPOINT, {
                method: 'POST',
                body: data,
                headers: { 'Content-Type': 'application/json' },
                keepalive: true,
            }).catch(() => { });
        }
    }

    // Track page view
    function trackPageView() {
        track('pageview');
    }

    // Track time on page
    let startTime = Date.now();

    function trackUnload() {
        const timeOnPage = Math.round((Date.now() - startTime) / 1000);
        track('unload', { timeOnPage });
    }

    // Track scroll depth
    let maxScrollDepth = 0;

    function trackScroll() {
        const scrollHeight = document.documentElement.scrollHeight - window.innerHeight;
        if (scrollHeight > 0) {
            const currentDepth = Math.round((window.scrollY / scrollHeight) * 100);
            maxScrollDepth = Math.max(maxScrollDepth, currentDepth);
        }
    }

    // Initialize
    function init() {
        // Track initial page view
        if (document.readyState === 'complete') {
            trackPageView();
        } else {
            window.addEventListener('load', trackPageView);
        }

        // Track scroll depth
        window.addEventListener('scroll', trackScroll, { passive: true });

        // Track page unload
        window.addEventListener('beforeunload', function () {
            track('scroll', { maxScrollDepth });
            trackUnload();
        });

        // Track SPA navigation (for Next.js, React Router, etc.)
        if (window.history && window.history.pushState) {
            const originalPushState = window.history.pushState;
            window.history.pushState = function () {
                originalPushState.apply(this, arguments);
                trackPageView();
                startTime = Date.now();
                maxScrollDepth = 0;
            };

            window.addEventListener('popstate', function () {
                trackPageView();
                startTime = Date.now();
                maxScrollDepth = 0;
            });
        }
    }

    // Expose global API
    window.botfic = {
        track: track,
        identify: function (userId, traits = {}) {
            track('identify', { userId, traits });
        },
        trackEvent: function (eventName, properties = {}) {
            track('event', { eventName, properties });
        },
    };

    // Start tracking
    init();

})();
