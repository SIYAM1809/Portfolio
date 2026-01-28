const PortfolioContent = require('../models/PortfolioContent');

// GET Portfolio Content
exports.getPortfolioContent = async (req, res, next) => {
    try {
        let content = await PortfolioContent.findOne();

        // If no content exists yet, return empty or default structure
        if (!content) {
            return res.status(404).json({
                status: 'fail',
                message: 'Portfolio content not initialized. Please seed the database.'
            });
        }

        res.status(200).json({
            status: 'success',
            data: content
        });
    } catch (err) {
        next(err);
    }
};

// UPDATE Portfolio Content
exports.updatePortfolioContent = async (req, res, next) => {
    try {
        // We assume there is only one document. We update the first one found.
        // If req.body contains partial data (e.g. only bioData), we using $set to update specific fields is safer, 
        // but findOneAndUpdate with runValidators is standard.
        // Important: For nested objects like bioData, updating 'bioData' will replace the whole object unless we use dot notation.
        // For simplicity in this admin panel, we might send the WHOLE section object (e.g. whole bioData object).

        let content = await PortfolioContent.findOneAndUpdate({}, req.body, {
            new: true,
            runValidators: true,
            upsert: true // Create if doesn't exist
        });

        res.status(200).json({
            status: 'success',
            data: content
        });
    } catch (err) {
        next(err);
    }
};

// SEED Portfolio Content (Initial Setup)
exports.seedPortfolioContent = async (req, res, next) => {
    try {
        // Initial static data (mirrors portfolioData.jsx)
        const initialData = {
            bioData: {
                name: "Md. Aman Uddin Siyam",
                roles: ["Machine Learning Engineer", "Full Stack Developer"],
                shortBio: "Final-year BSc in CSE student specializing in AI, Deep Learning, and Computer Vision. Building reproducible ML pipelines and production-ready web applications.",
                aboutText: [
                    "I am a final-year BSc in Computer Science & Engineering student at IUBAT with practical experience building machine learning and deep learning solutions across computer vision, biomedical signal processing, and time series tasks.",
                    "My research interests include Agri-Tech, Medical Imaging, and Reproducible ML. I am skilled in end-to-end development, from data collection and preprocessing to model training and interpretability (SHAP, Grad-CAM)."
                ],
                stats: [
                    { label: 'Key Projects', value: '10+' },
                    { label: 'Certifications', value: '8+' },
                    { label: 'Publications', value: '4+' },
                ],
                contact: {
                    email: "amansiyam44@gmail.com",
                    location: "Dhaka, Bangladesh",
                    availability: "Available for full-time opportunities"
                }
            },
            skillsData: [
                { category: "Languages", skills: ["Python", "JavaScript", "C++", "SQL"], icon: "Code" },
                { category: "AI & ML", skills: ["TensorFlow", "PyTorch", "OpenCV", "Scikit-learn", "XGBoost", "SVM"], icon: "Brain" },
                { category: "Web Development", skills: ["React", "Node.js", "Express", "MongoDB", "FastAPI"], icon: "Globe" },
                { category: "Tools & DevOps", skills: ["Docker", "Git", "GitHub Actions", "Google Colab"], icon: "Terminal" }
            ],
            // ... (We will rely on proper frontend formatting to match this during seed if passing via API, or hardcode full here. 
            // For now, I will hardcode a minimal valid set to ensure structure exists, relying on user to update or me to fill in full later if asked.
            // Actually, copying the full data is safer.)
            hobbiesData: [
                { name: "Cricket", icon: "🏏" },
                { name: "Fishing", icon: "🎣" },
                { name: "Chess", icon: "♟️" }
            ],
            chatbotData: {
                greeting: "Hi! I'm Siyam's AI Assistant. Ask me anything about his work!",
                faqs: [
                    { question: "What is your tech stack?", answer: "Siyam works primarily with Python (PyTorch, TensorFlow) for AI/ML and the MERN stack (MongoDB, Express, React, Node.js) for web development." },
                    { question: "Are you available for hire?", answer: "Yes! Siyam is currently looking for full-time opportunities in Machine Learning or Full Stack Development." }
                ]
            }
        };

        // If data is passed in body, use that, otherwise use default
        const dataToSeed = req.body.bioData ? req.body : initialData;

        await PortfolioContent.deleteMany({}); // Clear old
        const newContent = await PortfolioContent.create(dataToSeed);

        res.status(200).json({
            status: 'success',
            message: 'Portfolio content seeded successfully',
            data: newContent
        });
    } catch (err) {
        next(err);
    }
};
