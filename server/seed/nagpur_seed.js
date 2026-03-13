const mongoose = require('mongoose');
const dotenv = require('dotenv');
const path = require('path');
const User = require('../models/User');
const Complaint = require('../models/Complaint');

// Load env vars from root .env
dotenv.config({ path: path.join(__dirname, '../../.env') });

const seedData = async () => {
    try {
        const uri = process.env.MONGODB_URI || 'mongodb://localhost:27017/maja_nagpur_db';
        console.log(`Connecting to: ${uri}`);
        await mongoose.connect(uri);
        console.log('Connected to MongoDB for seeding...');

        // Clear existing data
        await User.deleteMany({});
        await Complaint.deleteMany({});
        console.log('Cleared existing User and Complaint data.');

        // Create Admin User
        const admin = new User({
            name: 'NMC Admin',
            email: 'admin@nagpur.gov.in',
            password: 'admin123',
            role: 'admin',
            idProofType: 'PAN',
            idProofNumber: 'ABCDE1234F',
            ward: 'Admin',
            profileCompleted: true
        });
        await admin.save();
        console.log('Admin user created (admin@nagpur.gov.in / admin123).');

        // Create some sample complaints for different Nagpur zones
        const complaintsData = [
            {
                type: 'water_supply',
                description: 'The water pressure has been very low for the past 3 days in our area. Possible leak in main line.',
                location: {
                    address: 'Plot 45, Near IT Park, Laxmi Nagar',
                    ward: 'Ward 75',
                    ward_number: 75,
                    zone: 'Laxmi Nagar Zone',
                    lat: 21.1219,
                    lng: 79.0519
                },
                status: 'registered',
                priority: 'high',
                citizenId: admin._id
            },
            {
                type: 'road',
                description: 'Large pothole causing traffic issues near Dharampeth college. Needs immediate attention.',
                location: {
                    address: 'North Ambazari Road, Dharampeth',
                    ward: 'Ward 12',
                    ward_number: 12,
                    zone: 'Dharampeth Zone',
                    lat: 21.1415,
                    lng: 79.0681
                },
                status: 'in_progress',
                priority: 'critical',
                citizenId: admin._id
            },
            {
                type: 'streetlight',
                description: 'Three street lights near the Metro station are non-functional since yesterday.',
                location: {
                    address: 'Sitabuldi Metro Station',
                    ward: 'Ward 1',
                    ward_number: 1,
                    zone: 'Dhantoli Zone',
                    lat: 21.1470,
                    lng: 79.0815
                },
                status: 'registered',
                priority: 'medium',
                citizenId: admin._id
            },
            {
                type: 'garbage',
                description: 'Waste collection bins are overflowing and causing foul smell in the market area.',
                location: {
                    address: 'Gandhibagh Market Entrance',
                    ward: 'Ward 45',
                    ward_number: 45,
                    zone: 'Gandhibagh Zone',
                    lat: 21.1550,
                    lng: 79.0950
                },
                status: 'resolved',
                priority: 'high',
                citizenId: admin._id
            }
        ];

        // Save individually to trigger pre-save hooks (for complaintNumber generation)
        for (const data of complaintsData) {
            const complaint = new Complaint(data);
            await complaint.save();
        }
        
        console.log(`Seeded ${complaintsData.length} sample complaints with unique IDs.`);

        console.log('Seeding completed successfully!');
        process.exit(0);
    } catch (error) {
        console.error('Seeding error:', error);
        process.exit(1);
    }
};

seedData();
