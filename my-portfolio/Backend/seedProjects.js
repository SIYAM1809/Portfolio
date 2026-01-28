const mongoose = require('mongoose');
const dotenv = require('dotenv');
const Project = require('./src/models/Project');

dotenv.config();

const projects = [
    {
        title: "Financial RAG Analyst",
        description: "Engineered a production-grade RAG pipeline to analyze SEC 10-K filings using LlamaIndex, Qdrant (Vector DB), and Llama 3 (via Groq). Integrated LlamaParse for complex table extraction, containerized the application with Docker, and implemented automated testing pipelines via GitHub Actions CI/CD.",
        techStack: ["Python", "LlamaIndex", "Qdrant", "Docker", "CI/CD", "Groq API"],
        imageUrl: "/rag-project.png",
        isFeatured: true,
        liveLink: "https://financial-rag-analyst-sam.streamlit.app/",
        githubLink: "https://github.com/SIYAM1809/Financial-RAG-Analyst",
        markdown: `...`
    },
    {
        title: "BAT-Track: UAV Visual Tracking",
        description: "Developed a lightweight computer vision pipeline for real-time object tracking on resource-constrained UAVs. Implemented state-of-the-art trackers (OSTrack, SiamAPN++) optimized for edge deployment, significantly reducing computational latency and power consumption.",
        techStack: ["Python", "PyTorch", "OpenCV", "Computer Vision", "Edge AI"],
        imageUrl: "https://images.unsplash.com/photo-1473968512647-3e447244af8f?ixlib=rb-4.0.3&auto=format&fit=crop&w=1000&q=80",
        isFeatured: true,
        liveLink: "",
        githubLink: "https://github.com/SIYAM1809/BAT-Track-Energy--Efficient-Visual-Tracking-for-UAVs",
        markdown: `...`
    },
    {
        title: "Edge-ViT-FSL: Plant Disease Diagnosis",
        description: "CPU-optimized, cross-domain crop disease diagnosis system using a lightweight MobileViT backbone and saliency-guided few-shot learning to identify plant pathologies in 'wild' environments with minimal training data.",
        techStack: ["Python", "TensorFlow", "MobileViT", "Few-Shot Learning", "IoT"],
        imageUrl: "https://images.unsplash.com/photo-1530836369250-ef72a3f5cda8?ixlib=rb-4.0.3&auto=format&fit=crop&w=1000&q=80",
        isFeatured: true,
        liveLink: "https://siyam1809-edge-vit-disease-detect-app-xr57lq.streamlit.app/",
        githubLink: "https://github.com/SIYAM1809/Edge-vit-disease-detect",
        markdown: `...`
    },
    {
        title: "PCOS Detection (Ultrasound)",
        description: "Automated PCOS detection from ultrasound images using Deep Learning pipelines. Utilized Transfer Learning with Convolutional Neural Networks.",
        techStack: ["Python", "Deep Learning", "CNN", "Transfer Learning", "Medical Imaging"],
        imageUrl: "https://images.unsplash.com/photo-1579684385127-1ef15d508118?ixlib=rb-4.0.3&auto=format&fit=crop&w=1000&q=80",
        isFeatured: false,
        liveLink: "",
        githubLink: "https://github.com/SIYAM1809/Ultrasound-image-PCOS",
        markdown: `...`
    },
    {
        title: "PCOS Detection (Tabular)",
        description: "Machine Learning model for PCOS detection using tabular clinical data. Comparative analysis of various classifiers to determine the most effective diagnostic markers.",
        techStack: ["Python", "Sklearn", "Pandas", "Machine Learning", "Data Analysis"],
        imageUrl: "https://images.unsplash.com/photo-1576091160399-112ba8d25d1d?ixlib=rb-4.0.3&auto=format&fit=crop&w=1000&q=80",
        isFeatured: false,
        liveLink: "",
        githubLink: "https://github.com/SIYAM1809/Tabuler-PCOS",
        markdown: `...`
    },
    {
        title: "Heart Failure Prediction",
        description: "Predictive model for heart failure risk assessment using advanced machine learning techniques on clinical datasets.",
        techStack: ["Python", "Machine Learning", "Data Science", "Healthcare AI"],
        imageUrl: "https://images.unsplash.com/photo-1505751172876-fa1923c5c528?ixlib=rb-4.0.3&auto=format&fit=crop&w=1000&q=80",
        isFeatured: false,
        liveLink: "",
        githubLink: "https://github.com/SIYAM1809/Heart-Failure-Prediction-using-Machine-Learning",
        markdown: `...`
    },
    {
        title: "Real Estate Management System",
        description: "Full-stack MERN Real Estate Management System with Buyer/Seller/Admin roles. Implemented property CRUD, map integration, and email notifications.",
        techStack: ["React", "Node.js", "Express", "MongoDB", "Vite"],
        imageUrl: "https://images.unsplash.com/photo-1560518883-ce09059eeffa?ixlib=rb-4.0.3&auto=format&fit=crop&w=1000&q=80",
        isFeatured: true,
        liveLink: "https://syntaxestate.vercel.app",
        githubLink: "https://github.com/SIYAM1809/Real-Estate-Management-System",
        markdown: `...`
    }
];

const seedProjects = async () => {
    try {
        const dbUri = process.argv[2] || process.env.MONGO_URI;
        await mongoose.connect(dbUri);
        console.log(`✅ Connecting to DB: ${dbUri.includes('localhost') ? 'Local' : 'Remote'}...`);
        console.log('✅ Connected to MongoDB');

        // Clear existing projects to avoid duplicates
        await Project.deleteMany({});
        console.log('🗑️  Cleared existing projects');

        // Insert new projects
        await Project.insertMany(projects);
        console.log('🎉 Successfully seeded CV projects!');

        process.exit();
    } catch (error) {
        console.error('❌ Error seeding projects:', error);
        process.exit(1);
    }
};

seedProjects();
