(function () {
    function generateUUID() { // Simple UUID generator
        return 'xxxxxxxx-xxxx-4xxx-yxxx-xxxxxxxxxxxx'.replace(/[xy]/g, function (c) {
            var r = Math.random() * 16 | 0, v = c == 'x' ? r : (r & 0x3 | 0x8);
            return v.toString(16);
        });
    }

    // Get configuration
    const script = document.currentScript;
    const siteId = script ? script.getAttribute('data-site-id') : null;

    // For MVP demo internal usage, we might default to a test ID if missing, 
    // but in prod we warn.
    if (!siteId) {
        console.warn('Botific: Missing data-site-id');
        // For demo purposes on the landing page itself, we might proceed with a demo ID
    }

    // specific id used for public demo
    const effectiveSiteId = siteId || 'demo-project-id';

    let sessionId = sessionStorage.getItem('botific_session_id');
    if (!sessionId) {
        sessionId = generateUUID();
        sessionStorage.setItem('botific_session_id', sessionId);
    }

    const payload = {
        siteId: effectiveSiteId,
        sessionId: sessionId,
        url: window.location.href,
        referrer: document.referrer,
        userAgent: navigator.userAgent,
        timestamp: Date.now(),
        screenWidth: window.screen.width,
        screenHeight: window.screen.height,
        timezone: Intl.DateTimeFormat().resolvedOptions().timeZone,
        language: navigator.language,
        cookiesEnabled: navigator.cookieEnabled,
        jsEnabled: true
    };

    // Send data
    const endpoint = '/api/ingest';

    fetch(endpoint, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(payload)
    })
        .then(res => res.json())
        .then(data => {
            if (data.classification) {
                console.log('Botific Classification:', data.classification);
                // Dispatch event for UI to react (e.g. show "You are a human" toast)
                window.dispatchEvent(new CustomEvent('botific-classification', { detail: data.classification }));
            }
        })
        .catch(err => console.error('Botific Error:', err));
})();
