/**
 * Performance Metrics Store
 * Stores in-memory statistics for API performance
 */

const metrics = {
    totalRequests: 0,
    totalTime: 0,
    successCount: 0,
    errorCount: 0,
    requestsToday: 0,
    startTime: Date.now(),
    endpoints: {} // Map: "METHOD /path" -> { calls, totalTime, statusCodes: {} }
};

// Reset daily stats at midnight (basic implementation)
setInterval(() => {
    metrics.requestsToday = 0;
}, 24 * 60 * 60 * 1000);

const recordRequest = (method, path, duration, status) => {
    metrics.totalRequests++;
    metrics.requestsToday++;
    metrics.totalTime += duration;

    if (status >= 200 && status < 400) {
        metrics.successCount++;
    } else {
        metrics.errorCount++;
    }

    // Normalize path (remove query params, ID placeholders if possible)
    // Simple normalization: just remove query string
    const cleanPath = path.split('?')[0];
    const key = `${method} ${cleanPath}`; // e.g., "GET /api/users"

    // Initialize endpoint stats if needed
    if (!metrics.endpoints[key]) {
        metrics.endpoints[key] = {
            calls: 0,
            totalTime: 0,
            statusCodes: {}
        };
    }

    // Update endpoint stats
    const endpoint = metrics.endpoints[key];
    endpoint.calls++;
    endpoint.totalTime += duration;
    endpoint.statusCodes[status] = (endpoint.statusCodes[status] || 0) + 1;
};

const getStats = () => {
    const avgTime = metrics.totalRequests > 0
        ? Math.round(metrics.totalTime / metrics.totalRequests)
        : 0;

    const successRate = metrics.totalRequests > 0
        ? ((metrics.successCount / metrics.totalRequests) * 100).toFixed(1)
        : 100;

    // Format top endpoints
    const endpointList = Object.entries(metrics.endpoints)
        .map(([key, data]) => ({
            path: key.split(' ')[1], // show path
            method: key.split(' ')[0],
            calls: data.calls,
            avgTime: Math.round(data.totalTime / data.calls),
            status: (data.statusCodes[200] || 0) + (data.statusCodes[201] || 0) > 0 ? 'healthy' : 'warning' // simplified
        }))
        .sort((a, b) => b.calls - a.calls)
        .slice(0, 10); // Top 10

    return {
        totalRequests: {
            today: metrics.requestsToday,
            week: metrics.totalRequests, // approximations
            month: metrics.totalRequests
        },
        avgResponseTime: `${avgTime}ms`,
        successRate: parseFloat(successRate),
        endpoints: endpointList
    };
};

module.exports = {
    recordRequest,
    getStats
};
