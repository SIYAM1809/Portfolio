const mongoose = require('mongoose');

const projectSchema = new mongoose.Schema({
    title: {
        type: String,
        required: [true, 'A project must have a title'],
        unique: true,
        trim: true
    },
    description: { type: String, required: [true, 'A project must have a description'] },
    markdown: { type: String }, // For detailed case studies
    techStack: [{ type: String }], // e.g., ["React", "Tailwind", "Node"]
    imageUrl: { type: String },
    liveLink: { type: String },
    githubLink: { type: String },
    category: { type: String, enum: ['ML & AI', 'Full Stack'], default: 'Full Stack' },
    isFeatured: { type: Boolean, default: false },
    createdAt: { type: Date, default: Date.now }
});

module.exports = mongoose.model('Project', projectSchema);