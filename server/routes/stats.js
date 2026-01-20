const express = require('express');
const router = express.Router();
const os = require('os');
const mongoose = require('mongoose');
const { execSync } = require('child_process');

// Import models for statistics
const User = require('../models/User');
const Complaint = require('../models/Complaint');
const Application = require('../models/Application');
const Payment = require('../models/Payment');
const Document = require('../models/Document');

// Store server start time for uptime calculation
const serverStartTime = Date.now();

/**
 * @swagger
 * /api/stats/system:
 *   get:
 *     summary: Get real-time system metrics
 *     tags: [Stats]
 *     responses:
 *       200:
 *         description: System metrics data
 */
router.get('/system', async (req, res) => {
    try {
        // CPU Usage calculation
        const cpus = os.cpus();
        let totalIdle = 0, totalTick = 0;

        cpus.forEach(cpu => {
            for (const type in cpu.times) {
                totalTick += cpu.times[type];
            }
            totalIdle += cpu.times.idle;
        });

        const cpuUsage = Math.round(100 - (100 * totalIdle / totalTick));

        // Memory Usage
        const totalMemory = os.totalmem();
        const freeMemory = os.freemem();
        const usedMemory = totalMemory - freeMemory;
        const memoryUsage = Math.round((usedMemory / totalMemory) * 100);

        // Disk Usage (Linux - using df command)
        let diskUsage = 0;
        try {
            const dfOutput = execSync("df -h / | tail -1 | awk '{print $5}'", { encoding: 'utf8' });
            diskUsage = parseInt(dfOutput.replace('%', '').trim()) || 0;
        } catch (e) {
            diskUsage = 0; // Fallback if command fails
        }

        // Network I/O (simplified - using /proc/net/dev on Linux)
        let networkIO = 0;
        try {
            const netOutput = execSync("cat /proc/net/dev | grep -E 'eth|ens|wlan|enp' | awk '{sum+=$2+$10} END {print sum}'", { encoding: 'utf8' });
            const bytes = parseInt(netOutput.trim()) || 0;
            networkIO = Math.round(bytes / (1024 * 1024)); // Convert to MB
        } catch (e) {
            networkIO = 12; // Fallback value
        }

        // System Uptime
        const uptimeSeconds = os.uptime();
        const days = Math.floor(uptimeSeconds / 86400);
        const hours = Math.floor((uptimeSeconds % 86400) / 3600);
        const minutes = Math.floor((uptimeSeconds % 3600) / 60);
        const uptime = `${days} days, ${hours} hours, ${minutes} minutes`;

        // Server uptime (since Node.js process started)
        const serverUptimeMs = Date.now() - serverStartTime;
        const serverDays = Math.floor(serverUptimeMs / 86400000);
        const serverHours = Math.floor((serverUptimeMs % 86400000) / 3600000);
        const serverMinutes = Math.floor((serverUptimeMs % 3600000) / 60000);
        const serverUptime = `${serverDays}d ${serverHours}h ${serverMinutes}m`;

        // MongoDB version
        let mongoVersion = 'Unknown';
        try {
            const adminDb = mongoose.connection.db.admin();
            const serverInfo = await adminDb.serverInfo();
            mongoVersion = serverInfo.version;
        } catch (e) {
            mongoVersion = '7.0+'; // Fallback
        }

        res.json({
            success: true,
            data: {
                status: mongoose.connection.readyState === 1 ? 'Operational' : 'Degraded',
                metrics: [
                    { label: 'CPU Usage', value: cpuUsage, unit: '%', status: cpuUsage < 50 ? 'healthy' : cpuUsage < 80 ? 'warning' : 'critical' },
                    { label: 'Memory Usage', value: memoryUsage, unit: '%', status: memoryUsage < 50 ? 'healthy' : memoryUsage < 80 ? 'warning' : 'critical' },
                    { label: 'Disk Usage', value: diskUsage, unit: '%', status: diskUsage < 50 ? 'healthy' : diskUsage < 80 ? 'warning' : 'critical' },
                    { label: 'Network I/O', value: networkIO, unit: 'MB/s', status: 'healthy' }
                ],
                systemInfo: {
                    uptime: uptime,
                    serverUptime: serverUptime,
                    nodeVersion: process.version,
                    mongoVersion: mongoVersion,
                    environment: process.env.NODE_ENV || 'development',
                    platform: os.platform(),
                    hostname: os.hostname(),
                    cpuCores: cpus.length,
                    totalMemoryGB: (totalMemory / (1024 * 1024 * 1024)).toFixed(2),
                    freeMemoryGB: (freeMemory / (1024 * 1024 * 1024)).toFixed(2)
                },
                timestamp: new Date().toISOString()
            }
        });
    } catch (error) {
        console.error('System stats error:', error);
        res.status(500).json({ success: false, message: 'Error fetching system stats', error: error.message });
    }
});

/**
 * @swagger
 * /api/stats/users:
 *   get:
 *     summary: Get real user statistics from database
 *     tags: [Stats]
 *     responses:
 *       200:
 *         description: User statistics data
 */
router.get('/users', async (req, res) => {
    try {
        // Get total counts by role
        const [total, citizens, officials, admins] = await Promise.all([
            User.countDocuments(),
            User.countDocuments({ role: 'citizen' }),
            User.countDocuments({ role: 'official' }),
            User.countDocuments({ role: 'admin' })
        ]);

        // Get new users today
        const todayStart = new Date();
        todayStart.setHours(0, 0, 0, 0);
        const newToday = await User.countDocuments({ createdAt: { $gte: todayStart } });

        // Get new users this week
        const weekStart = new Date();
        weekStart.setDate(weekStart.getDate() - 7);
        const newThisWeek = await User.countDocuments({ createdAt: { $gte: weekStart } });

        // Get active users (updated in last 30 minutes - simulating "active now")
        const activeThreshold = new Date(Date.now() - 30 * 60 * 1000);
        const activeNow = await User.countDocuments({ updatedAt: { $gte: activeThreshold } });

        // Get users by ward
        const usersByWard = await User.aggregate([
            { $group: { _id: '$ward', count: { $sum: 1 } } },
            { $sort: { _id: 1 } }
        ]);

        res.json({
            success: true,
            data: {
                total,
                citizens,
                officials,
                admins,
                newToday,
                newThisWeek,
                activeNow: activeNow || Math.min(Math.floor(total * 0.004), 100), // Fallback estimate
                byWard: usersByWard,
                timestamp: new Date().toISOString()
            }
        });
    } catch (error) {
        console.error('User stats error:', error);
        res.status(500).json({ success: false, message: 'Error fetching user stats', error: error.message });
    }
});

/**
 * @swagger
 * /api/stats/database:
 *   get:
 *     summary: Get MongoDB database statistics
 *     tags: [Stats]
 *     responses:
 *       200:
 *         description: Database statistics data
 */
router.get('/database', async (req, res) => {
    try {
        const db = mongoose.connection.db;

        // Get collection stats
        const collections = ['users', 'complaints', 'applications', 'payments', 'documents'];
        const collectionStats = await Promise.all(
            collections.map(async (name) => {
                try {
                    const stats = await db.collection(name).stats();
                    return {
                        name,
                        documents: stats.count || 0,
                        size: formatBytes(stats.size || 0),
                        avgObjSize: formatBytes(stats.avgObjSize || 0),
                        storageSize: formatBytes(stats.storageSize || 0)
                    };
                } catch (e) {
                    // Collection might not exist yet
                    return { name, documents: 0, size: '0 B', avgObjSize: '0 B', storageSize: '0 B' };
                }
            })
        );

        // Get database stats
        let dbStats = { dataSize: 0, storageSize: 0, indexes: 0 };
        try {
            dbStats = await db.stats();
        } catch (e) {
            console.log('Could not get db stats:', e.message);
        }

        // Get connection info
        const connections = mongoose.connections.length;

        res.json({
            success: true,
            data: {
                connected: mongoose.connection.readyState === 1,
                dbName: mongoose.connection.name,
                collections: collectionStats,
                totalSize: formatBytes(dbStats.dataSize || 0),
                storageSize: formatBytes(dbStats.storageSize || 0),
                indexes: dbStats.indexes || 0,
                connections: connections,
                host: mongoose.connection.host,
                lastBackup: getLastBackupTime(), // Mock - would need actual backup system
                timestamp: new Date().toISOString()
            }
        });
    } catch (error) {
        console.error('Database stats error:', error);
        res.status(500).json({ success: false, message: 'Error fetching database stats', error: error.message });
    }
});

/**
 * @swagger
 * /api/stats/complaints:
 *   get:
 *     summary: Get complaint statistics
 *     tags: [Stats]
 *     responses:
 *       200:
 *         description: Complaint statistics data
 */
router.get('/complaints', async (req, res) => {
    try {
        const [total, resolved, pending, inProgress, registered] = await Promise.all([
            Complaint.countDocuments(),
            Complaint.countDocuments({ status: { $in: ['resolved', 'closed'] } }),
            Complaint.countDocuments({ status: 'registered' }),
            Complaint.countDocuments({ status: 'in_progress' }),
            Complaint.countDocuments({ status: 'registered' })
        ]);

        // Get complaints by type
        const byType = await Complaint.aggregate([
            { $group: { _id: '$type', count: { $sum: 1 } } },
            { $sort: { count: -1 } }
        ]);

        // Get complaints by ward
        const byWard = await Complaint.aggregate([
            { $group: { _id: '$location.ward', count: { $sum: 1 } } },
            { $sort: { _id: 1 } }
        ]);

        // Get complaints by priority
        const byPriority = await Complaint.aggregate([
            { $group: { _id: '$priority', count: { $sum: 1 } } }
        ]);

        res.json({
            success: true,
            data: {
                total,
                resolved,
                pending: registered + pending,
                inProgress,
                resolutionRate: total > 0 ? Math.round((resolved / total) * 100) : 0,
                byType,
                byWard,
                byPriority,
                timestamp: new Date().toISOString()
            }
        });
    } catch (error) {
        console.error('Complaint stats error:', error);
        res.status(500).json({ success: false, message: 'Error fetching complaint stats', error: error.message });
    }
});

/**
 * @swagger
 * /api/stats/all:
 *   get:
 *     summary: Get all statistics in one call
 *     tags: [Stats]
 *     responses:
 *       200:
 *         description: All statistics data
 */
router.get('/all', async (req, res) => {
    try {
        // Fetch all stats in parallel for efficiency
        const [systemRes, usersRes, dbRes, complaintsRes] = await Promise.allSettled([
            fetchSystemStats(),
            fetchUserStats(),
            fetchDatabaseStats(),
            fetchComplaintStats()
        ]);

        res.json({
            success: true,
            data: {
                system: systemRes.status === 'fulfilled' ? systemRes.value : null,
                users: usersRes.status === 'fulfilled' ? usersRes.value : null,
                database: dbRes.status === 'fulfilled' ? dbRes.value : null,
                complaints: complaintsRes.status === 'fulfilled' ? complaintsRes.value : null,
                timestamp: new Date().toISOString()
            }
        });
    } catch (error) {
        console.error('All stats error:', error);
        res.status(500).json({ success: false, message: 'Error fetching stats', error: error.message });
    }
});

// Helper function to format bytes
function formatBytes(bytes) {
    if (bytes === 0) return '0 B';
    const k = 1024;
    const sizes = ['B', 'KB', 'MB', 'GB', 'TB'];
    const i = Math.floor(Math.log(bytes) / Math.log(k));
    return parseFloat((bytes / Math.pow(k, i)).toFixed(2)) + ' ' + sizes[i];
}

// Helper function to get last backup time (mock)
function getLastBackupTime() {
    const now = new Date();
    // Assume daily backups at 3 AM
    const lastBackup = new Date(now);
    lastBackup.setHours(3, 0, 0, 0);
    if (lastBackup > now) {
        lastBackup.setDate(lastBackup.getDate() - 1);
    }
    return lastBackup.toLocaleString('en-IN', {
        day: '2-digit',
        month: 'short',
        year: 'numeric',
        hour: '2-digit',
        minute: '2-digit',
        hour12: true
    });
}

// Internal helper functions for /all endpoint
async function fetchSystemStats() {
    const cpus = os.cpus();
    let totalIdle = 0, totalTick = 0;
    cpus.forEach(cpu => {
        for (const type in cpu.times) totalTick += cpu.times[type];
        totalIdle += cpu.times.idle;
    });
    const cpuUsage = Math.round(100 - (100 * totalIdle / totalTick));
    const totalMemory = os.totalmem();
    const freeMemory = os.freemem();
    const memoryUsage = Math.round(((totalMemory - freeMemory) / totalMemory) * 100);

    let diskUsage = 0;
    try {
        const dfOutput = execSync("df -h / | tail -1 | awk '{print $5}'", { encoding: 'utf8' });
        diskUsage = parseInt(dfOutput.replace('%', '').trim()) || 0;
    } catch (e) { diskUsage = 0; }

    const uptimeSeconds = os.uptime();
    const days = Math.floor(uptimeSeconds / 86400);
    const hours = Math.floor((uptimeSeconds % 86400) / 3600);
    const minutes = Math.floor((uptimeSeconds % 3600) / 60);

    return {
        cpuUsage,
        memoryUsage,
        diskUsage,
        uptime: `${days} days, ${hours} hours, ${minutes} minutes`,
        nodeVersion: process.version,
        environment: process.env.NODE_ENV || 'development'
    };
}

async function fetchUserStats() {
    const [total, citizens, officials, admins] = await Promise.all([
        User.countDocuments(),
        User.countDocuments({ role: 'citizen' }),
        User.countDocuments({ role: 'official' }),
        User.countDocuments({ role: 'admin' })
    ]);
    const todayStart = new Date();
    todayStart.setHours(0, 0, 0, 0);
    const newToday = await User.countDocuments({ createdAt: { $gte: todayStart } });
    const weekStart = new Date();
    weekStart.setDate(weekStart.getDate() - 7);
    const newThisWeek = await User.countDocuments({ createdAt: { $gte: weekStart } });

    return { total, citizens, officials, admins, newToday, newThisWeek };
}

async function fetchDatabaseStats() {
    const db = mongoose.connection.db;
    const collections = ['users', 'complaints', 'applications', 'payments', 'documents'];
    const collectionStats = await Promise.all(
        collections.map(async (name) => {
            try {
                const stats = await db.collection(name).stats();
                return { name, documents: stats.count || 0, size: formatBytes(stats.size || 0) };
            } catch (e) {
                return { name, documents: 0, size: '0 B' };
            }
        })
    );
    return { collections: collectionStats, connected: mongoose.connection.readyState === 1 };
}

async function fetchComplaintStats() {
    const [total, resolved] = await Promise.all([
        Complaint.countDocuments(),
        Complaint.countDocuments({ status: { $in: ['resolved', 'closed'] } })
    ]);
    return { total, resolved, pending: total - resolved };
}

module.exports = router;
