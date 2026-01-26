const mongoose = require('mongoose');
const dotenv = require('dotenv');
const Project = require('./src/models/Project');

dotenv.config();

const projects = [
    {
        title: "Financial RAG Analyst",
        description: "Engineered a production-grade RAG pipeline to analyze SEC 10-K filings using LlamaIndex, Qdrant (Vector DB), and Llama 3 (via Groq). Integrated LlamaParse for complex table extraction, containerized the application with Docker, and implemented automated testing pipelines via GitHub Actions CI/CD.",
        techStack: ["Python", "LlamaIndex", "Qdrant", "Docker", "CI/CD", "Groq API"],
        liveLink: "", // Not provided in text, user can update
        githubLink: "https://github.com/SIYAM1809", // Generic link, user to update specific repo
        imageUrl: "/rag-project.png",
        isFeatured: true,
        markdown: `
## Overview
Engineered a production-grade RAG pipeline to analyze SEC 10-K filings using LlamaIndex, Qdrant (Vector DB), and Llama 3 (via Groq).

### Key Features
- **Complex Information Extraction**: Integrated LlamaParse for complex table extraction from financial documents.
- **Containerization**: Containerized the application with Docker for consistent deployment.
- **CI/CD**: Implemented automated testing pipelines via GitHub Actions.

### Tech Stack
- **AI/ML**: LlamaIndex, Llama 3, Qdrant
- **DevOps**: Docker, GitHub Actions
    `
    },
    {
        title: "BAT-Track: UAV Visual Tracking",
        description: "Developed a lightweight computer vision pipeline for real-time object tracking on resource-constrained UAVs. Implemented state-of-the-art trackers (OSTrack, SiamAPN++) optimized for edge deployment, significantly reducing computational latency and power consumption.",
        techStack: ["Python", "PyTorch", "OpenCV", "Computer Vision", "Edge AI"],
        liveLink: "",
        githubLink: "https://github.com/SIYAM1809",
        imageUrl: "https://images.unsplash.com/photo-1473968512647-3e447244af8f?ixlib=rb-4.0.3&auto=format&fit=crop&w=1000&q=80",
        isFeatured: true,
        markdown: `
## Overview
Developed a lightweight computer vision pipeline for real-time object tracking on resource-constrained UAVs.

### Methodology
- Implemented state-of-the-art trackers (OSTrack, SiamAPN++)
- Optimized for edge deployment to reduce latency and power consumption.
- maintained high tracking accuracy during rapid aerial maneuvers.
    `
    },
    {
        title: "Edge-ViT-FSL: Plant Disease Diagnosis",
        description: "CPU-optimized, cross-domain crop disease diagnosis system using a lightweight MobileViT backbone and saliency-guided few-shot learning to identify plant pathologies in 'wild' environments with minimal training data.",
        techStack: ["Python", "TensorFlow", "MobileViT", "Few-Shot Learning", "IoT"],
        liveLink: "",
        githubLink: "https://github.com/SIYAM1809",
        imageUrl: "https://images.unsplash.com/photo-1530836369250-ef72a3f5cda8?ixlib=rb-4.0.3&auto=format&fit=crop&w=1000&q=80",
        isFeatured: true,
        markdown: `
## Overview
CPU-optimized, cross-domain crop disease diagnosis system tailored for IoT devices.

### Approach
- **Backbone**: Lightweight MobileViT.
- **Method**: Saliency-guided few-shot learning.
- **Goal**: Identify plant pathologies in unstructured environments with minimal data.
    `
    },
    {
        title: "Automated PCOS Detection",
        description: "Engineered a Deep Learning pipeline to detect PCOS in ultrasound imaging automatically. Utilized Transfer Learning with Convolutional Neural Networks.",
        techStack: ["Python", "Deep Learning", "CNN", "Transfer Learning", "Medical Imaging"],
        liveLink: "",
        githubLink: "https://github.com/SIYAM1809",
        imageUrl: "https://images.unsplash.com/photo-1579684385127-1ef15d508118?ixlib=rb-4.0.3&auto=format&fit=crop&w=1000&q=80",
        isFeatured: false,
        markdown: `
## Project Detail
Engineered a Deep Learning pipeline to detect PCOS in ultrasound imaging automatically.
    `
    },
    {
        title: "Real Estate Management System",
        description: "Built a full-stack MERN Real Estate Management System with Buyer/Seller/Admin roles and an admin approval pipeline. Implemented property CRUD, map integration, and email notifications. Deployed on Vercel and Render.",
        techStack: ["React", "Node.js", "Express", "MongoDB", "Vite"],
        liveLink: "",
        githubLink: "https://github.com/SIYAM1809",
        imageUrl: "https://images.unsplash.com/photo-1560518883-ce09059eeffa?ixlib=rb-4.0.3&auto=format&fit=crop&w=1000&q=80",
        isFeatured: false,
        markdown: `
## Overview
Full-stack MERN Real Estate Management System.

### Features
- **Roles**: Buyer, Seller, Admin
- **Pipelines**: Admin approval for listings.
- **Modules**: Property CRUD, Map integration, Favorites, Inquiries.
- **Deployment**: Vercel (Frontend) + Render (Backend).
    `
    }
];

const seedProjects = async () => {
    try {
        await mongoose.connect(process.env.MONGO_URI);
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
