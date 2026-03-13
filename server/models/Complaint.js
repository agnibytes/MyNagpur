const mongoose = require('mongoose');

const complaintSchema = new mongoose.Schema({
    citizenId: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'User',
        required: true
    },
    complaintNumber: {
        type: String,
        unique: true
    },
    type: {
        type: String,
        required: true,
        enum: [
            'road',
            'water_supply',
            'drainage',
            'streetlight',
            'garbage',
            'sanitation',
            'encroachment',
            'noise',
            'pollution',
            'building_violation',
            'other'
        ]
    },
    subType: String,
    description: {
        type: String,
        required: true
    },
    location: {
        address: { type: String, required: true },
        landmark: String,
        lat: Number,
        lng: Number,
        ward: { type: String, required: true },
        ward_number: { type: Number },
        zone: { type: String }
    },
    status: {
        type: String,
        enum: ['registered', 'assigned', 'in_progress', 'resolved', 'closed', 'rejected'],
        default: 'registered'
    },
    priority: {
        type: String,
        enum: ['low', 'medium', 'high', 'critical'],
        default: 'medium'
    },
    aiPriority: {
        score: Number,
        reason: String,
        assignedAt: Date
    },
    images: [{
        url: String,
        caption: String,
        uploadedAt: { type: Date, default: Date.now }
    }],
    assignedTo: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'User'
    },
    department: {
        type: String,
        enum: ['roads', 'water', 'sanitation', 'electrical', 'enforcement', 'general'],
        default: 'general'
    },
    slaDeadline: Date,
    resolution: {
        notes: String,
        resolvedBy: { type: mongoose.Schema.Types.ObjectId, ref: 'User' },
        resolvedAt: Date,
        actionTaken: String,
        citizenFeedback: {
            rating: { type: Number, min: 1, max: 5 },
            comment: String,
            submittedAt: Date
        }
    },
    updates: [{
        status: String,
        notes: String,
        by: { type: mongoose.Schema.Types.ObjectId, ref: 'User' },
        at: { type: Date, default: Date.now }
    }],
    createdAt: {
        type: Date,
        default: Date.now
    },
    updatedAt: {
        type: Date,
        default: Date.now
    }
});

// Auto-generate complaint number
complaintSchema.pre('save', async function () {
    if (!this.complaintNumber) {
        const count = await mongoose.model('Complaint').countDocuments();
        const date = new Date();
        const monthYear = `${String(date.getMonth() + 1).padStart(2, '0')}${date.getFullYear()}`;
        this.complaintNumber = `GRV-${monthYear}-${String(count + 1).padStart(5, '0')}`;
    }
    this.updatedAt = new Date();
});

// Set SLA based on priority
complaintSchema.pre('save', function () {
    if (!this.slaDeadline) {
        const slaDays = {
            'critical': 1,
            'high': 3,
            'medium': 7,
            'low': 15
        };
        const days = slaDays[this.priority] || 7;
        this.slaDeadline = new Date(Date.now() + days * 24 * 60 * 60 * 1000);
    }
});

// Auto-assign department based on type
complaintSchema.pre('save', function () {
    if (!this.department || this.department === 'general') {
        const deptMapping = {
            'road': 'roads',
            'water_supply': 'water',
            'drainage': 'water',
            'streetlight': 'electrical',
            'garbage': 'sanitation',
            'sanitation': 'sanitation',
            'encroachment': 'enforcement',
            'building_violation': 'enforcement'
        };
        this.department = deptMapping[this.type] || 'general';
    }
});

const Complaint = mongoose.model('Complaint', complaintSchema);

module.exports = Complaint;
