const mongoose = require('mongoose');
const dotenv = require('dotenv');
const PortfolioContent = require('./src/models/PortfolioContent');

dotenv.config();

console.log("Loading .env...");
if (!process.env.MONGO_URI) {
    console.error("MONGO_URI is undefined!");
    console.log("Current directory:", process.cwd());
    // Try loading explicitly if standard load fails
    require('dotenv').config({ path: './.env' });
    if (!process.env.MONGO_URI) {
        console.error("Still undefined. Checking parent...");
        require('dotenv').config({ path: '../.env' });
    }
}

const updateCertOrder = async () => {
    try {
        if (!process.env.MONGO_URI) throw new Error("MONGO_URI missing");

        const uri = process.env.MONGO_URI.trim();
        console.log(`URI Check: ${uri.substring(0, 15)}...`);

        await mongoose.connect(uri, {
            useNewUrlParser: true,
            useUnifiedTopology: true
        });
        console.log('MongoDB Connected');

        // Fetch the user's portfolio content
        // Assuming there is only one portfolio document or finding the first one
        const content = await PortfolioContent.findOne();

        if (!content) {
            console.log('No portfolio content found.');
            process.exit(1);
        }

        // Current order in DB (likely): EDGE, Kaggle, Google Cloud, Badges, Others
        // Desired order: EDGE, Kaggle, Badges, Google Cloud, Others

        const categories = content.certificateCategories;

        const badgesIndex = categories.findIndex(c => c.id === 'badges');
        const googleIndex = categories.findIndex(c => c.id === 'google');

        if (badgesIndex === -1 || googleIndex === -1) {
            console.log('Could not find both badges and google categories.');
            // Fallback: If ids are missing, try titles? 
            // Actually, the seed likely worked.
            console.log('Available IDs:', categories.map(c => c.id));
            process.exit(1);
        }

        // Check if already in correct order (Badges < Google)
        if (badgesIndex < googleIndex) {
            console.log('Already in correct order.');
            process.exit(0);
        }

        console.log(`Swapping Badges (index ${badgesIndex}) and Google (index ${googleIndex})...`);

        // Remove badges and google from array
        const badges = categories[badgesIndex];
        const google = categories[googleIndex];

        // Reconstruct array: Keep 0, 1 (Edge, Kaggle), Insert Badges, Insert Google, Keep Rest
        // Assuming Edge=0, Kaggle=1. 
        // Safer way: Filter them out, then insert at specific positions?
        // Or just hard sort based on ID priority?

        const priority = ['edge', 'kaggle', 'badges', 'google', 'others'];

        const sortedCategories = categories.sort((a, b) => {
            const indexA = priority.indexOf(a.id);
            const indexB = priority.indexOf(b.id);
            return (indexA === -1 ? 999 : indexA) - (indexB === -1 ? 999 : indexB);
        });

        content.certificateCategories = sortedCategories;
        await content.save();

        console.log('Certificate categories reordered successfully!');

        // Verify
        const newContent = await PortfolioContent.findOne();
        console.log('New Order:', newContent.certificateCategories.map(c => c.id));

        process.exit(0);

    } catch (error) {
        console.error('Error updating:', error);
        process.exit(1);
    }
};

updateCertOrder();
