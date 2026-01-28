const mongoose = require('mongoose');
const dotenv = require('dotenv');
const User = require('./src/models/User');

dotenv.config();

const updateAdmin = async () => {
    try {
        await mongoose.connect(process.env.MONGO_URI);
        console.log('✅ Connected to DB');

        const admin = await User.findOne({ role: 'admin' });
        if (admin) {
            console.log('Found admin:', admin.email);
            admin.name = 'Md. Aman Uddin Siyam';
            admin.email = 'amansiyam44@gmail.com';
            admin.password = 'password123'; // Triggers pre-save hash if model supports it, otherwise assumes plain/hashed.
            // Note: If User model has pre-save hook for hashing, this works. If not, might need manual hash.
            // Assuming standard auth setup.
            await admin.save();
            console.log('✅ Admin updated successfully!');
        } else {
            console.log('❌ Admin not found, creating...');
            await User.create({
                name: 'Md. Aman Uddin Siyam',
                email: 'amansiyam44@gmail.com',
                password: 'password123',
                role: 'admin'
            });
            console.log('✅ Admin created!');
        }
        process.exit();
    } catch (err) {
        console.error('❌ Error updating admin:', err);
        process.exit(1);
    }
};

updateAdmin();
