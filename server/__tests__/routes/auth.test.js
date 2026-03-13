/**
 * Authentication Routes Tests
 * Tests for /api/auth endpoints
 */

const request = require('supertest');
const mongoose = require('mongoose');
const express = require('express');
const User = require('../../models/User');

// Create test app
const createTestApp = () => {
    const app = express();
    app.use(express.json());

    // Mock rate limiter for tests
    jest.mock('../../middleware/rateLimit', () => ({
        authLimiter: (req, res, next) => next(),
        generalLimiter: (req, res, next) => next()
    }));

    const authRoutes = require('../../routes/auth');
    app.use('/api/auth', authRoutes);

    return app;
};

describe('Auth Routes', () => {
    let app;

    beforeAll(async () => {
        // Connect to test database
        await mongoose.connect(process.env.MONGODB_URI || 'mongodb://localhost:27017/maja_nagpur_test');
        app = createTestApp();
    });

    afterAll(async () => {
        // Clean up test data
        await User.deleteMany({ email: /@test\.com$/ });
        await mongoose.connection.close();
    });

    beforeEach(async () => {
        // Clean up before each test
        await User.deleteMany({ email: /@test\.com$/ });
    });

    describe('POST /api/auth/register', () => {
        const validUser = {
            name: 'Test User',
            email: 'testuser@test.com',
            password: 'StrongPass123!@#',
            idProofType: 'Aadhar Card',
            idProofNumber: '123456789012'
        };

        it('should register a new user with valid data', async () => {
            const res = await request(app)
                .post('/api/auth/register')
                .send(validUser)
                .expect('Content-Type', /json/)
                .expect(201);

            expect(res.body.success).toBe(true);
            expect(res.body.user.email).toBe(validUser.email);
            expect(res.body.token).toBeDefined();
        });

        it('should reject registration with weak password', async () => {
            const res = await request(app)
                .post('/api/auth/register')
                .send({ ...validUser, password: 'weak' })
                .expect(400);

            expect(res.body.success).toBe(false);
        });

        it('should reject duplicate email registration', async () => {
            // Register first user
            await request(app)
                .post('/api/auth/register')
                .send(validUser);

            // Try to register with same email
            const res = await request(app)
                .post('/api/auth/register')
                .send(validUser)
                .expect(400);

            expect(res.body.success).toBe(false);
            expect(res.body.message).toContain('already exists');
        });

        it('should reject registration without required fields', async () => {
            const res = await request(app)
                .post('/api/auth/register')
                .send({ email: 'test@test.com' })
                .expect(400);

            expect(res.body.success).toBe(false);
            expect(res.body.errors).toBeDefined();
        });
    });

    describe('POST /api/auth/login', () => {
        const testUser = {
            name: 'Login Test User',
            email: 'logintest@test.com',
            password: 'StrongPass123!@#',
            idProofType: 'Aadhar Card',
            idProofNumber: '123456789012'
        };

        beforeEach(async () => {
            // Create user for login tests
            await request(app)
                .post('/api/auth/register')
                .send(testUser);
        });

        it('should login with valid credentials', async () => {
            const res = await request(app)
                .post('/api/auth/login')
                .send({
                    email: testUser.email,
                    password: testUser.password
                })
                .expect(200);

            expect(res.body.success).toBe(true);
            expect(res.body.token).toBeDefined();
            expect(res.body.user.email).toBe(testUser.email);
        });

        it('should reject login with wrong password', async () => {
            const res = await request(app)
                .post('/api/auth/login')
                .send({
                    email: testUser.email,
                    password: 'wrongpassword123!'
                })
                .expect(401);

            expect(res.body.success).toBe(false);
            expect(res.body.message).toBe('Invalid email or password');
        });

        it('should reject login with non-existent email', async () => {
            const res = await request(app)
                .post('/api/auth/login')
                .send({
                    email: 'nonexistent@test.com',
                    password: 'anypassword123!'
                })
                .expect(401);

            expect(res.body.success).toBe(false);
        });
    });

    describe('POST /api/auth/check-password-strength', () => {
        it('should return weak for simple passwords', async () => {
            const res = await request(app)
                .post('/api/auth/check-password-strength')
                .send({ password: '12345' })
                .expect(200);

            expect(res.body.strength).toBe('weak');
        });

        it('should return strong for complex passwords', async () => {
            const res = await request(app)
                .post('/api/auth/check-password-strength')
                .send({ password: 'MyStr0ngP@ssword!2024' })
                .expect(200);

            expect(res.body.strength).toBe('strong');
        });
    });
});
