/**
 * Jest Test Setup
 * Runs before all tests to configure test environment
 */

// Set test environment variables
process.env.NODE_ENV = 'test';
process.env.JWT_SECRET = 'test_jwt_secret_key_for_testing_only_1234567890';
process.env.MONGODB_URI = 'mongodb://localhost:27017/maja_nagpur_test';
process.env.PORT = 5001;

// Increase timeout for async operations
jest.setTimeout(30000);

// Mock console.log in tests to reduce noise
global.console = {
    ...console,
    log: jest.fn(),
    debug: jest.fn(),
    info: jest.fn(),
    warn: jest.fn(),
    // Keep error for debugging
    error: console.error
};

// Clean up after all tests
afterAll(async () => {
    // Close any open connections
    const mongoose = require('mongoose');
    if (mongoose.connection.readyState !== 0) {
        await mongoose.connection.close();
    }
});
