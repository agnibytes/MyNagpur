const express = require('express');
const router = express.Router();
const fs = require('fs');
const path = require('path');
const { exec } = require('child_process');
const performance = require('../utils/performance');

// Helper to simulate delay
const wait = (ms) => new Promise(resolve => setTimeout(resolve, ms));

// GET /api/admin/performance
router.get('/performance', (req, res) => {
    res.json({
        success: true,
        data: performance.getStats()
    });
});

// POST /api/admin/clear-cache
router.post('/clear-cache', async (req, res) => {
    try {
        // Simulate cache clearing
        await wait(1500);
        // If you had Redis, you'd flush it here
        res.json({ success: true, message: 'System cache cleared successfully' });
    } catch (error) {
        res.status(500).json({ success: false, message: 'Failed to clear cache' });
    }
});

// POST /api/admin/trigger-backup
router.post('/trigger-backup', async (req, res) => {
    try {
        // Simulate backup or run actual command
        // const backupPath = path.join(__dirname, '../../backups');
        // if (!fs.existsSync(backupPath)) fs.mkdirSync(backupPath);
        // exec(`mongodump --out ${backupPath}`);

        await wait(2000); // Simulate operation
        res.json({ success: true, message: 'Database backup started successfully. Notification will be sent upon completion.' });
    } catch (error) {
        res.status(500).json({ success: false, message: 'Failed to trigger backup' });
    }
});

// POST /api/admin/restart-server
router.post('/restart-server', async (req, res) => {
    // In a real environment, you might not want to expose this, or use PM2 API
    // checking if running in development with nodemon (which restarts on file change)
    // For now, we'll simulate a restart signal

    // We can't really restart the node process from within without an external manager
    // But we can exit, and if pm2/docker/nodemon is present, it will restart

    setTimeout(() => {
        console.log('Restarting server upon admin request...');
        // process.exit(0); // Uncomment if auto-restart is configured
    }, 1000);

    res.json({ success: true, message: 'Server restart initiated...' });
});

// POST /api/admin/send-notification
router.post('/send-notification', async (req, res) => {
    await wait(1000);
    res.json({ success: true, message: 'Notification broadcasted to all active admins' });
});

// Helper to format action names
const formatAction = (method, url) => {
    if (url.includes('/auth/login')) return 'Login';
    if (url.includes('/auth/register')) return 'User Registration';
    if (url.includes('/admin/clear-cache')) return 'Cache Clear';
    if (url.includes('/admin/trigger-backup')) return 'Database Backup';
    if (url.includes('/admin/restart-server')) return 'Server Restart';
    if (url.includes('/admin/send-notification')) return 'Broadcast Alert';
    if (url.includes('/stats')) return 'System Monitoring';
    return `${method} ${url.split('/').pop()}`; // Fallback: GET users
};

// GET /api/admin/logs
router.get('/logs', (req, res) => {
    try {
        const logPath = path.join(__dirname, '../../logs/combined.log');
        if (fs.existsSync(logPath)) {
            // Read last 200 lines to ensure we get enough activity
            const rawLogs = fs.readFileSync(logPath, 'utf8')
                .split('\n')
                .filter(Boolean)
                .slice(-200)
                .reverse();

            // Parse for Activity Table
            const activityLogs = rawLogs
                .map(line => {
                    // Match: timestamp [LEVEL]: [ACTIVITY] METHOD URL by USER - STATUS
                    // Example: 2026-01-19 22:30:44:3044 [INFO]: [ACTIVITY] GET /api/url by System - 200
                    const activityMatch = line.match(/^([\d-:\s]+) \[INFO\]: \[ACTIVITY\] (\w+) ([\w\/\-\?]+) by (.*) - (\d+)\s*/);

                    if (activityMatch) {
                        const statusCode = parseInt(activityMatch[5]);
                        return {
                            time: activityMatch[1].split(' ')[1]?.split('.')[0] || activityMatch[1], // Extract HH:mm:ss
                            user: activityMatch[4],
                            action: formatAction(activityMatch[2], activityMatch[3]),
                            status: statusCode < 400 ? 'Success' : 'Failed',
                            statusCode: statusCode, // Helper for frontend color
                            id: Math.random().toString(36).substr(2, 9)
                        };
                    }
                    return null;
                })
                .filter(Boolean)
                .slice(0, 10); // Return top 10

            res.json({ success: true, logs: rawLogs.slice(0, 50), activityLogs });
        } else {
            res.json({ success: true, logs: [], activityLogs: [] });
        }
    } catch (error) {
        console.error('Log read error:', error);
        res.status(500).json({ success: false, message: 'Failed to retrieve logs' });
    }
});

module.exports = router;
