/**
 * Winston Logger Configuration
 * Centralized structured logging for the application
 */

const winston = require('winston');
const path = require('path');

// Define log levels
const levels = {
    error: 0,
    warn: 1,
    info: 2,
    http: 3,
    debug: 4,
};

// Define colors for each level
const colors = {
    error: 'red',
    warn: 'yellow',
    info: 'green',
    http: 'magenta',
    debug: 'blue',
};

winston.addColors(colors);

// Define log format
const format = winston.format.combine(
    winston.format.timestamp({ format: 'YYYY-MM-DD HH:mm:ss:ms' }),
    winston.format.errors({ stack: true }),
    winston.format.printf(({ timestamp, level, message, stack, ...meta }) => {
        let log = `${timestamp} [${level.toUpperCase()}]: ${message}`;
        if (Object.keys(meta).length > 0) {
            log += ` ${JSON.stringify(meta)}`;
        }
        if (stack) {
            log += `\n${stack}`;
        }
        return log;
    })
);

// Console format with colors
const consoleFormat = winston.format.combine(
    winston.format.colorize({ all: true }),
    winston.format.timestamp({ format: 'YYYY-MM-DD HH:mm:ss' }),
    winston.format.printf(({ timestamp, level, message, ...meta }) => {
        let log = `${timestamp} ${level}: ${message}`;
        if (Object.keys(meta).length > 0 && process.env.NODE_ENV === 'development') {
            log += ` ${JSON.stringify(meta, null, 2)}`;
        }
        return log;
    })
);

// Define transports
const transports = [
    // Console transport
    new winston.transports.Console({
        format: consoleFormat,
    }),
];

// Add file transports in all environments for "View Logs" feature
// if (process.env.NODE_ENV === 'production') {
transports.push(
    // Error logs
    new winston.transports.File({
        filename: path.join(__dirname, '../../logs/error.log'),
        level: 'error',
        format,
        maxsize: 5242880, // 5MB
        maxFiles: 5,
    }),
    // Combined logs
    new winston.transports.File({
        filename: path.join(__dirname, '../../logs/combined.log'),
        format,
        maxsize: 5242880, // 5MB
        maxFiles: 5,
    })
);
// }

// Create logger instance
const logger = winston.createLogger({
    level: process.env.NODE_ENV === 'production' ? 'info' : 'debug',
    levels,
    format,
    transports,
    exitOnError: false,
});

// Stream for Morgan HTTP logging
logger.stream = {
    write: (message) => {
        logger.http(message.trim());
    },
};

// Helper methods for structured logging
logger.logRequest = (req, responseTime) => {
    logger.http('HTTP Request', {
        method: req.method,
        url: req.originalUrl,
        ip: req.ip,
        userAgent: req.get('User-Agent'),
        responseTime: `${responseTime}ms`,
        userId: req.user?._id,
    });
};

logger.logError = (error, req = null) => {
    const errorData = {
        message: error.message,
        stack: error.stack,
        code: error.code,
    };

    if (req) {
        errorData.method = req.method;
        errorData.url = req.originalUrl;
        errorData.userId = req.user?._id;
    }

    logger.error('Application Error', errorData);
};

logger.logAuth = (event, userId, success, details = {}) => {
    logger.info(`Auth: ${event}`, {
        userId,
        success,
        ...details,
    });
};

logger.logPayment = (transactionId, type, amount, status) => {
    logger.info('Payment', {
        transactionId,
        type,
        amount,
        status,
    });
};

logger.logComplaint = (complaintId, action, userId) => {
    logger.info('Complaint', {
        complaintId,
        action,
        userId,
    });
};

module.exports = logger;
