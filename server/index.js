const express = require('express');
const dotenv = require('dotenv');
const cors = require('cors');
const helmet = require('helmet');
const compression = require('compression');
const morgan = require('morgan');
const cookieParser = require('cookie-parser');
const swaggerUi = require('swagger-ui-express');

// Custom modules
const logger = require('./config/logger');
const swaggerSpec = require('./config/swagger');
const performanceTracker = require('./middleware/performanceTracker');

// Load environment variables first
dotenv.config();

// Validate environment variables before starting
const { validateEnv, PORT, isProduction } = require('./config/env');
validateEnv();

// Database connection
const connectDB = require('./config/db');

// Route imports
const authRoutes = require('./routes/auth');
const applicationRoutes = require('./routes/applications');
const complaintRoutes = require('./routes/complaints');
const paymentRoutes = require('./routes/payments');
const aiRoutes = require('./routes/ai');
const documentRoutes = require('./routes/documents');
const profileRoutes = require('./routes/profile');
const statsRoutes = require('./routes/stats');
const adminRoutes = require('./routes/admin');

// Connect to database
connectDB();

const app = express();

// ===================
// Security Middleware
// ===================

// Helmet - Set security HTTP headers
app.use(helmet({
    crossOriginResourcePolicy: { policy: "cross-origin" },
    contentSecurityPolicy: isProduction ? undefined : false
}));

// CORS configuration
const corsOptions = {
    origin: isProduction
        ? process.env.FRONTEND_URL || 'https://majaumred.gov.in'
        : ['http://localhost:3000', 'http://localhost:3001', 'http://127.0.0.1:3000', 'http://localhost:5173'],
    credentials: true,
    methods: ['GET', 'POST', 'PUT', 'PATCH', 'DELETE', 'OPTIONS'],
    allowedHeaders: ['Content-Type', 'Authorization']
};
app.use(cors(corsOptions));

// ===================
// Performance Middleware
// ===================
app.use(performanceTracker);

// Compression
app.use(compression());


// Body parser with size limits
app.use(express.json({ limit: '10mb' }));
app.use(express.urlencoded({ extended: true, limit: '10mb' }));

// Cookie parser for httpOnly auth cookies
app.use(cookieParser());

// HTTP Request Logging with Winston
app.use(morgan(
    isProduction ? 'combined' : 'dev',
    { stream: logger.stream }
));

// ===================
// API Documentation
// ===================
app.use('/api-docs', swaggerUi.serve, swaggerUi.setup(swaggerSpec, {
    customCss: '.swagger-ui .topbar { display: none }',
    customSiteTitle: 'Majha Umred API Documentation'
}));
app.get('/api-docs.json', (req, res) => {
    res.setHeader('Content-Type', 'application/json');
    res.send(swaggerSpec);
});

// ===================
// API Routes
// ===================

app.use('/api/auth', authRoutes);
app.use('/api/applications', applicationRoutes);
app.use('/api/complaints', complaintRoutes);
app.use('/api/payments', paymentRoutes);
app.use('/api/ai', aiRoutes);
app.use('/api/documents', documentRoutes);
app.use('/api/profile', profileRoutes);
app.use('/api/stats', statsRoutes);
app.use('/api/admin', adminRoutes);

// ===================
// Health Check Routes
// ===================

// Basic health check
app.get('/', (req, res) => {
    res.json({
        status: 'running',
        message: 'Majha Umred API Server',
        version: '2.1.0',
        environment: process.env.NODE_ENV || 'development',
        endpoints: {
            auth: '/api/auth',
            applications: '/api/applications',
            complaints: '/api/complaints',
            payments: '/api/payments',
            ai: '/api/ai',
            documents: '/api/documents',
            profile: '/api/profile'
        }
    });
});

// Health check for load balancer
app.get('/health', (req, res) => {
    res.json({ status: 'healthy', timestamp: new Date().toISOString() });
});

// Ready check (includes DB status)
app.get('/health/ready', async (req, res) => {
    const mongoose = require('mongoose');
    const dbStatus = mongoose.connection.readyState === 1 ? 'connected' : 'disconnected';

    if (dbStatus === 'connected') {
        res.json({
            status: 'ready',
            database: dbStatus,
            timestamp: new Date().toISOString()
        });
    } else {
        res.status(503).json({
            status: 'not ready',
            database: dbStatus,
            timestamp: new Date().toISOString()
        });
    }
});

// ===================
// Error Handling
// ===================

// Error handling middleware
app.use((err, req, res, next) => {
    console.error('Error:', err.message);
    if (!isProduction) {
        console.error(err.stack);
    }

    res.status(err.status || 500).json({
        success: false,
        message: err.message || 'Internal Server Error',
        ...(process.env.NODE_ENV === 'development' && { stack: err.stack })
    });
});

// 404 handler
app.use((req, res) => {
    res.status(404).json({
        success: false,
        message: 'Route not found',
        path: req.path
    });
});

// ===================
// Start Server
// ===================

const serverPort = PORT;

app.listen(serverPort, () => {
    console.log('');
    console.log('='.repeat(50));
    console.log('🚀 Majha Umred Server Started Successfully');
    console.log('='.repeat(50));
    console.log(`📡 Environment: ${process.env.NODE_ENV || 'development'}`);
    console.log(`🌐 Server: http://localhost:${serverPort}`);
    console.log(`📍 API: http://localhost:${serverPort}/api`);
    console.log(`❤️  Health: http://localhost:${serverPort}/health`);
    console.log('='.repeat(50));
    console.log('');
});

