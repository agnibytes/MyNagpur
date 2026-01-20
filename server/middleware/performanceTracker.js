const performance = require('../utils/performance');
const logger = require('../config/logger');

const performanceTracker = (req, res, next) => {
    const start = Date.now();

    // Hook into response finish to calculate duration
    res.on('finish', () => {
        const duration = Date.now() - start;
        performance.recordRequest(req.method, req.originalUrl, duration, res.statusCode);

        // specific logging for recent activity
        // Filter out high-frequency polling endpoints from business logs if needed,
        // but for now we log everything and filter on retrieval to keep "raw" logs complete.
        // Or we can just rely on the existing morgan logs if they are sufficient?
        // Morgan logs format doesn't easily includereq.user unless configured.
        // Let's add a custom log for meaningful actions.

        const user = req.user?.email || req.user?.name || req.headers['x-forwarded-for'] || req.socket.remoteAddress || 'System';

        // We only want to log "Business Actions" explicitly if we want to parse them easily.
        // But let's just log "Request completed" with metadata.
        // Actually, morgan is already logging [HTTP].
        // Let's verify if we can just append user info to morgan? No, morgan is separate.

        // Let's add a "Audit" log entry.
        // Only log non-static/non-polling for clarity?
        // No, let's log everything but maybe mark it [ACTIVITY]
        // to separate from generic [HTTP] logs.

        if (!req.originalUrl.includes('/stats') && !req.originalUrl.includes('/performance')) {
            logger.info(`[ACTIVITY] ${req.method} ${req.originalUrl} by ${user} - ${res.statusCode}`);
        }
    });

    next();
};

module.exports = performanceTracker;
