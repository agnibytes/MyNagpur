/**
 * Swagger/OpenAPI Documentation Configuration
 */

const swaggerJsdoc = require('swagger-jsdoc');

const options = {
    definition: {
        openapi: '3.0.0',
        info: {
            title: 'Majha Nagpur API',
            version: '2.1.0',
            description: 'National-Scale E-Governance Platform for Urban India - API Documentation',
            contact: {
                name: 'Majha Nagpur Support',
                email: 'contact@nagpurnp.gov.in',
            },
            license: {
                name: 'Government of Maharashtra',
            },
        },
        servers: [
            {
                url: 'http://localhost:5000',
                description: 'Development server',
            },
            {
                url: 'https://api.majanagpur.gov.in',
                description: 'Production server',
            },
        ],
        tags: [
            { name: 'Auth', description: 'Authentication endpoints' },
            { name: 'Profile', description: 'User profile management' },
            { name: 'Complaints', description: 'Grievance and complaint management' },
            { name: 'Applications', description: 'Service applications' },
            { name: 'Payments', description: 'Tax and bill payments' },
            { name: 'Documents', description: 'Document verification and upload' },
            { name: 'AI', description: 'AI chatbot and assistance' },
        ],
        components: {
            securitySchemes: {
                bearerAuth: {
                    type: 'http',
                    scheme: 'bearer',
                    bearerFormat: 'JWT',
                    description: 'Enter JWT token',
                },
            },
            schemas: {
                User: {
                    type: 'object',
                    properties: {
                        _id: { type: 'string', example: '507f1f77bcf86cd799439011' },
                        name: { type: 'string', example: 'John Doe' },
                        email: { type: 'string', example: 'john@example.com' },
                        role: { type: 'string', enum: ['citizen', 'official', 'admin'] },
                        ward: { type: 'string', example: 'Ward 1' },
                        profileCompleted: { type: 'boolean' },
                    },
                },
                Error: {
                    type: 'object',
                    properties: {
                        success: { type: 'boolean', example: false },
                        message: { type: 'string' },
                        errors: {
                            type: 'array',
                            items: {
                                type: 'object',
                                properties: {
                                    field: { type: 'string' },
                                    message: { type: 'string' },
                                },
                            },
                        },
                    },
                },
                LoginRequest: {
                    type: 'object',
                    required: ['email', 'password'],
                    properties: {
                        email: { type: 'string', format: 'email' },
                        password: { type: 'string', format: 'password' },
                    },
                },
                RegisterRequest: {
                    type: 'object',
                    required: ['name', 'email', 'password', 'idProofType', 'idProofNumber'],
                    properties: {
                        name: { type: 'string', minLength: 2, maxLength: 100 },
                        email: { type: 'string', format: 'email' },
                        password: { type: 'string', minLength: 8 },
                        ward: { type: 'string' },
                        idProofType: {
                            type: 'string',
                            enum: ['Aadhar Card', 'Voter ID', 'Driving License', 'Passport', 'PAN Card']
                        },
                        idProofNumber: { type: 'string' },
                        phone: { type: 'string', pattern: '^[6-9]\\d{9}$' },
                    },
                },
                AuthResponse: {
                    type: 'object',
                    properties: {
                        success: { type: 'boolean' },
                        message: { type: 'string' },
                        user: { $ref: '#/components/schemas/User' },
                        token: { type: 'string' },
                    },
                },
                Complaint: {
                    type: 'object',
                    properties: {
                        _id: { type: 'string' },
                        type: {
                            type: 'string',
                            enum: ['water_supply', 'drainage', 'streetlight', 'road', 'garbage', 'sanitation', 'other']
                        },
                        description: { type: 'string' },
                        status: {
                            type: 'string',
                            enum: ['submitted', 'assigned', 'in_progress', 'resolved', 'closed']
                        },
                        priority: {
                            type: 'string',
                            enum: ['low', 'medium', 'high', 'critical']
                        },
                        location: {
                            type: 'object',
                            properties: {
                                address: { type: 'string' },
                                ward: { type: 'string' },
                            },
                        },
                        createdAt: { type: 'string', format: 'date-time' },
                    },
                },
                Payment: {
                    type: 'object',
                    properties: {
                        transactionId: { type: 'string' },
                        type: { type: 'string', enum: ['property_tax', 'water_bill', 'trade_license'] },
                        amount: { type: 'number' },
                        status: { type: 'string', enum: ['pending', 'success', 'failed'] },
                        receiptNumber: { type: 'string' },
                    },
                },
            },
            responses: {
                UnauthorizedError: {
                    description: 'Access token is missing or invalid',
                    content: {
                        'application/json': {
                            schema: { $ref: '#/components/schemas/Error' },
                        },
                    },
                },
                ValidationError: {
                    description: 'Validation failed',
                    content: {
                        'application/json': {
                            schema: { $ref: '#/components/schemas/Error' },
                        },
                    },
                },
            },
        },
        security: [{ bearerAuth: [] }],
    },
    apis: ['./server/routes/*.js'],
};

const swaggerSpec = swaggerJsdoc(options);

module.exports = swaggerSpec;
