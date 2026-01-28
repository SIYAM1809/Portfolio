const mongoose = require('mongoose');

const PortfolioContentSchema = new mongoose.Schema({
    bioData: {
        name: { type: String, default: "Md. Aman Uddin Siyam" },
        roles: [{ type: String }],
        shortBio: { type: String },
        aboutText: [{ type: String }],
        stats: [{
            label: String,
            value: String
        }],
        contact: {
            email: String,
            location: String,
            availability: String
        }
    },
    skillsData: [{
        category: String,
        skills: [String],
        icon: String // Storing icon name for now, will handle mapping on frontend
    }],
    publicationsData: [{
        title: String,
        authors: String,
        venue: String,
        link: String,
        certificateLink: String,
        status: String
    }],
    certificateCategories: [{
        id: String,
        title: String,
        issuer: String,
        description: String,
        certificates: [{
            title: String,
            date: String,
            link: String
        }]
    }],
    hobbiesData: [{
        name: String,
        icon: String // Icon emoji or name
    }],
    chatbotData: {
        greeting: String,
        faqs: [{
            question: String,
            answer: String
        }]
    }
}, { timestamps: true });

module.exports = mongoose.model('PortfolioContent', PortfolioContentSchema);
