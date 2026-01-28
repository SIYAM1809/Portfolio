const mongoose = require('mongoose');
const dotenv = require('dotenv');
const User = require('./src/models/User');

dotenv.config();

const seedAdmin = async () => {
    try {
        await mongoose.connect(process.env.MONGO_URI);
        console.log('✅ Connected to DB');

        // Check if admin exists
        const admin = await User.findOne({ role: 'admin' });
        if (admin) {
            console.log('⚠️ Admin already exists:', admin.email);
            process.exit();
        }

        // Create Admin
        await User.create({
            name: 'Md. Aman Uddin Siyam',
            email: 'amansiyam44@gmail.com',
            password: 'password123', // Keeping simple for dev/demo, user should change
            role: 'admin'
        });

        console.log('🎉 Admin created successfully!');
        console.log('Email: admin@example.com');
        console.log('Password: password123');
        process.exit();
    } catch (err) {
        console.log('❌ Error seeding admin:');
        console.log(err.message);
        console.log(JSON.stringify(err, null, 2));
        process.exit(1);
    }
};

seedAdmin();
