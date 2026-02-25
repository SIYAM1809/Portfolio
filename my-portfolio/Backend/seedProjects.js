require('dotenv').config();
const mongoose = require('mongoose');
const Project = require('./src/models/Project');

mongoose.connect(process.env.MONGO_URI || 'mongodb://localhost:27017/portfolio_db')
    .then(() => console.log('✅ MongoDB Connected'))
    .catch(err => { console.log('❌ DB Error:', err); process.exit(1); });

const projects = [
    // ─── ML / AI Projects ───────────────────────────────────────────────────
    {
        title: "BAT-Track: Energy-Efficient Visual Tracking for UAVs",
        description: "A lightweight computer vision pipeline for real-time object tracking on resource-constrained UAVs, achieving 39.3 FPS during rapid aerial maneuvers. Implemented and optimized state-of-the-art trackers (OSTrack, SiamAPN++) using an adaptive switching mechanism, reducing power consumption by 60.5% while maintaining 64.2% tracking accuracy (IoU).",
        techStack: ["Python", "PyTorch", "OpenCV", "OSTrack", "SiamAPN++", "UAV", "Computer Vision", "Edge AI"],
        githubLink: "https://github.com/SIYAM1809/BAT-Track-Energy--Efficient-Visual-Tracking-for-UAVs",
        liveLink: "https://www.youtube.com/watch?v=fJssBVbzK2k&list=PL1P_EUgZHtr8kFKtBGO_jtpbcaViNsh85&index=2",
        isFeatured: true,
        markdown: `## Overview
BAT-Track is an energy-efficient visual tracking system designed for resource-constrained UAVs. It solves the core challenge of maintaining high tracking accuracy while dramatically reducing power consumption — critical for extending drone flight time in real-world deployments.

## Key Results
- **39.3 FPS** real-time performance during rapid aerial maneuvers
- **60.5% reduction** in power consumption via adaptive tracker switching
- **64.2% tracking accuracy** (IoU) maintained under energy constraints

## Technical Approach
- Implemented and benchmarked two state-of-the-art trackers: **OSTrack** (high accuracy) and **SiamAPN++** (lightweight)
- Designed an **adaptive switching mechanism** that dynamically selects the appropriate tracker based on computational budget and motion complexity
- Optimized inference pipeline for edge hardware with limited GPU memory`
    },
    {
        title: "Edge-ViT-FSL: Few-Shot Plant Disease Diagnosis on IoT Devices",
        description: "A CPU-optimized, cross-domain crop disease diagnosis system operating under 10MB and achieving 22.13 FPS. Integrates a lightweight MobileViT-XS backbone with a custom Saliency-Guided Attention Module (SGAM), achieving 73.93% cross-domain accuracy using only 5 training images per class.",
        techStack: ["Python", "PyTorch", "MobileViT", "Few-Shot Learning", "Computer Vision", "Streamlit", "IoT", "Transfer Learning"],
        githubLink: "https://github.com/SIYAM1809/Edge-vit-disease-detect",
        liveLink: "https://siyam1809-edge-vit-disease-detect-app-xr57lq.streamlit.app/",
        isFeatured: true,
        markdown: `## Overview
Edge-ViT-FSL is a few-shot learning system for cross-domain plant disease diagnosis, designed to run on IoT edge devices with severe memory and compute constraints. The system can identify plant pathologies in real-world environments using as few as 5 training images per disease class.

## Key Results
- **<10MB** total model size — deployable on IoT and mobile devices
- **22.13 FPS** inference on CPU — no GPU required
- **73.93% cross-domain accuracy** using only 5 training samples per class

## Technical Approach
- **MobileViT-XS backbone** for lightweight vision transformer inference
- **Saliency-Guided Attention Module (SGAM)** — a custom attention layer that focuses on disease-relevant leaf regions
- **Prototypical few-shot learning** framework for cross-domain generalization
- Deployed as a live Streamlit app for real-world demonstration`
    },
    {
        title: "Financial RAG Analyst",
        description: "A production-grade RAG pipeline using LlamaIndex, Qdrant, and Llama 3 (via Groq) to ingest, compare, and analyze multi-hundred-page SEC 10-K filings for Apple, Microsoft, and Google. Features an AI Observability dashboard to monitor latency, flag hallucinations, and capture RLHF feedback. Containerized via Docker with automated GitHub Actions CI/CD deployment to Streamlit Cloud.",
        techStack: ["Python", "LlamaIndex", "Qdrant", "Llama 3", "Groq", "LlamaParse", "Docker", "GitHub Actions", "Streamlit", "RAG", "GenAI"],
        githubLink: "https://github.com/SIYAM1809/Financial-RAG-Analyst",
        liveLink: "https://financial-rag-analyst-sam.streamlit.app/",
        isFeatured: true,
        markdown: `## Overview
Financial RAG Analyst is a production-grade Retrieval-Augmented Generation system built to ingest, index, and analyze SEC 10-K annual filings for major tech companies (Apple, Microsoft, Google). It enables natural language financial analysis across hundreds of pages of regulatory documents.

## Key Features
- **Multi-document RAG** — ingests and cross-references SEC 10-K filings from multiple companies
- **LlamaParse** for complex financial table extraction from PDFs
- **AI Observability dashboard** — monitors system latency, flags hallucinations, and captures RLHF user feedback
- **Qdrant** vector database for efficient semantic retrieval
- **Docker containerization** + **GitHub Actions CI/CD** for automated Streamlit Cloud deployment

## Technical Stack
LlamaIndex · Qdrant · Llama 3 (Groq API) · LlamaParse · Docker · GitHub Actions · Streamlit`
    },
    {
        title: "PCOS Detection: Clinical vs. Ultrasound Benchmark",
        description: "A unified, leakage-safe ML benchmark comparing a clinical soft-voting ensemble (XGBoost+LightGBM+CatBoost) against a ConvNeXt-Small ultrasound image pipeline for PCOS detection. The calibrated clinical ensemble achieved AUROC 0.976 vs. 0.814 for the image model, with 2.6x higher batch throughput. Trained under identical 5-fold out-of-fold protocol across 541 clinical records and 3,200 ultrasound images. Accepted at ICCIT.",
        techStack: ["Python", "XGBoost", "LightGBM", "CatBoost", "ConvNeXt", "scikit-learn", "SHAP", "Grad-CAM", "Medical AI", "Benchmarking"],
        githubLink: "https://github.com/SIYAM1809/Ultrasound-image-PCOS",
        liveLink: "",
        isFeatured: true,
        markdown: `## Overview
A rigorous, reproducible benchmark study comparing two fundamentally different approaches to PCOS (Polycystic Ovary Syndrome) detection: a clinical tabular ensemble vs. a deep learning ultrasound image pipeline. Accepted at **ICCIT 2025**.

## Key Results
- Clinical ensemble **AUROC: 0.976** vs. Image model **AUROC: 0.814**
- **2.6x higher batch throughput** for the clinical ensemble
- Evaluated on **541 clinical records** + **3,200 ultrasound images**
- Leakage-safe **5-fold out-of-fold** validation protocol

## Technical Approach
- **Clinical pipeline**: Explicitly calibrated soft-voting ensemble — XGBoost + LightGBM + CatBoost with SHAP explainability
- **Image pipeline**: ConvNeXt-Small fine-tuned on ultrasound images with Grad-CAM visualization
- Both pipelines trained under identical cross-validation to ensure fair comparison
- Tabular GitHub: https://github.com/SIYAM1809/Tabuler-PCOS`
    },

    // ─── Full Stack Projects ─────────────────────────────────────────────────
    {
        title: "Pet Shop Management System",
        description: "A secure full-stack operations platform with role-based access control (Admin/Staff), JWT authentication, bcrypt password hashing, and a dynamic analytics dashboard with real-time tracking across pets, customers, orders, and appointments. Features Recharts data visualization, Nodemailer automated notifications, and a multi-stage CI/CD pipeline (3 GitHub Actions workflows) with Docker containerization.",
        techStack: ["React", "Node.js", "Express.js", "MongoDB", "JWT", "bcryptjs", "Recharts", "Nodemailer", "Docker", "GitHub Actions", "Vercel", "Render"],
        githubLink: "https://github.com/SIYAM1809/Pet-Shop-Management-System",
        liveLink: "https://siyams-praniseba.vercel.app",
        isFeatured: true,
        markdown: `## Overview
A production-grade pet shop operations platform built for professional business use. Designed with a clear separation between Admin and Staff roles, with full CRUD operations across all business entities.

## Key Features
- **Role-Based Access Control** — Admin-only staff account creation, Staff-only data entry
- **Analytics Dashboard** — real-time metrics across pets, customers, orders, and appointments powered by Recharts
- **Automated Notifications** — Nodemailer email triggers for appointments and order updates
- **CI/CD Pipeline** — 3 GitHub Actions workflows: CI, Code Quality, Docker Publish
- **Containerized** via Docker, deployed on Vercel (React/Vite) + Render (Express/MongoDB)

## Architecture
MERN Stack · JWT Auth · bcrypt · Recharts · Nodemailer · Docker · GitHub Actions`
    },
    {
        title: "Personal Portfolio Website",
        description: "A full-stack portfolio platform built with React 19 (Vite), TailwindCSS 4, and Framer Motion for animated UI. Backed by an Express.js REST API with JWT authentication and bcryptjs-secured admin CMS. Features a dynamic project management system with full CRUD capabilities and admin-controlled content updates. Deployed with decoupled architecture on Vercel + Render.",
        techStack: ["React 19", "Vite", "TailwindCSS 4", "Framer Motion", "Node.js", "Express.js", "MongoDB", "JWT", "bcryptjs", "Vercel", "Render"],
        githubLink: "https://github.com/SIYAM1809/Portfolio",
        liveLink: "https://aman-uddin-siyam-portfolio.vercel.app",
        isFeatured: false,
        markdown: `## Overview
This portfolio itself — a full-stack application showcasing dual expertise in ML/AI and Full Stack development. Built with a decoupled architecture: React 19 frontend on Vercel, Express.js backend on Render.

## Key Features
- **Admin CMS** — JWT-protected dashboard for content management (projects, bio, skills, publications)
- **Animated UI** — Framer Motion scroll animations, 3D hero card, cursor spotlight
- **Dynamic Projects** — full CRUD via protected admin panel
- **Performance Optimized** — React.lazy() code splitting, static fallback data for instant first paint

## Architecture
React 19 (Vite) · TailwindCSS 4 · Framer Motion · Express.js REST API · MongoDB/Mongoose · JWT · Vercel + Render`
    },
    {
        title: "Real Estate Management System",
        description: "A multi-role MERN marketplace (Buyer, Seller, Admin) with JWT auth, bcrypt hashing, a role-based middleware layer, and a security audit log that records unauthorized access attempts with IP tracking. Features an end-to-end content moderation pipeline, interactive Google Maps integration, dual-mode inquiry system, Cloudinary image uploads, and a Redux Toolkit + Framer Motion UI.",
        techStack: ["React", "Redux Toolkit", "Node.js", "Express.js", "MongoDB", "JWT", "Cloudinary", "Google Maps API", "Nodemailer", "Framer Motion", "Vercel", "Render"],
        githubLink: "https://github.com/SIYAM1809/Real-Estate-Management-System",
        liveLink: "https://syntaxestate.vercel.app",
        isFeatured: true,
        markdown: `## Overview
A full-featured real estate marketplace with three distinct user roles (Buyer, Seller, Admin), complete content moderation workflows, and enterprise-grade security logging.

## Key Features
- **Multi-role Architecture** — Buyer, Seller, Admin with role-specific dashboards and permissions
- **Security Audit Log** — records ALL unauthorized access attempts with IP tracking
- **Content Moderation Pipeline** — Sellers submit listings → Admin approves; Buyers submit reviews → Admin moderates
- **Google Maps Integration** — interactive location-based property viewing
- **Dual Inquiry System** — direct messaging OR appointment scheduling per property
- **Cloudinary Uploads** — optimized cloud image storage for property photos
- **Admin Control Panel** — user management (view/delete Buyers/Sellers), Forgot/Reset Password flow via Nodemailer

## Architecture
React · Redux Toolkit · Framer Motion · Express.js · MongoDB · JWT · Cloudinary · Google Maps API · Vercel + Render`
    }
];

const seedProjects = async () => {
    try {
        await Project.deleteMany({});
        console.log('🗑️  Cleared existing projects');

        const inserted = await Project.insertMany(projects);
        console.log(`✅ Seeded ${inserted.length} projects:`);
        inserted.forEach(p => console.log(`   • ${p.title}`));

        process.exit();
    } catch (err) {
        console.error('❌ Seeding failed:', err.message);
        process.exit(1);
    }
};

seedProjects();
