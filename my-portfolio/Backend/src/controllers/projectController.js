const Project = require('../models/Project');

// GET all projects
exports.getAllProjects = async (req, res, next) => {
    try {
        const projects = await Project.find().sort('-isFeatured -createdAt');
        res.status(200).json({
            status: 'success',
            results: projects.length,
            data: projects
        });
    } catch (err) {
        next(err);
    }
};

// GET single project by ID
exports.getProject = async (req, res, next) => {
    try {
        const project = await Project.findById(req.params.id);

        if (!project) {
            return res.status(404).json({
                status: 'fail',
                message: 'Project not found'
            });
        }

        res.status(200).json({
            status: 'success',
            data: project
        });
    } catch (err) {
        next(err);
    }
};

// CREATE a project
exports.createProject = async (req, res, next) => {
    try {
        const newProject = await Project.create(req.body);
        res.status(201).json({
            status: 'success',
            data: newProject
        });
    } catch (err) {
        next(err);
    }
};

// UPDATE a project
exports.updateProject = async (req, res, next) => {
    try {
        const updatedProject = await Project.findByIdAndUpdate(
            req.params.id,
            req.body,
            {
                new: true, // Return updated document
                runValidators: true // Run schema validators
            }
        );

        if (!updatedProject) {
            return res.status(404).json({
                status: 'fail',
                message: 'Project not found'
            });
        }

        res.status(200).json({
            status: 'success',
            data: updatedProject
        });
    } catch (err) {
        next(err);
    }
};

// DELETE a project
exports.deleteProject = async (req, res, next) => {
    try {
        const project = await Project.findByIdAndDelete(req.params.id);

        if (!project) {
            return res.status(404).json({
                status: 'fail',
                message: 'Project not found'
            });
        }

        res.status(204).json({
            status: 'success',
            data: null
        });
    } catch (err) {
        next(err);
    }
};

// SEED Projects (Remote)
exports.seedProjects = async (req, res, next) => {
    try {
        const projects = [
            {
                title: "Financial RAG Analyst",
                description: "Engineered a production-grade RAG pipeline to analyze SEC 10-K filings using LlamaIndex, Qdrant (Vector DB), and Llama 3 (via Groq). Integrated LlamaParse for complex table extraction, containerized the application with Docker, and implemented automated testing pipelines via GitHub Actions CI/CD.",
                techStack: ["Python", "LlamaIndex", "Qdrant", "Docker", "CI/CD", "Groq API"],
                imageUrl: "/rag-project.png",
                isFeatured: true,
                liveLink: "",
                githubLink: "https://github.com/SIYAM1809"
            },
            {
                title: "BAT-Track: UAV Visual Tracking",
                description: "Developed a lightweight computer vision pipeline for real-time object tracking on resource-constrained UAVs. Implemented state-of-the-art trackers (OSTrack, SiamAPN++) optimized for edge deployment, significantly reducing computational latency and power consumption.",
                techStack: ["Python", "PyTorch", "OpenCV", "Computer Vision", "Edge AI"],
                imageUrl: "https://images.unsplash.com/photo-1473968512647-3e447244af8f?ixlib=rb-4.0.3&auto=format&fit=crop&w=1000&q=80",
                isFeatured: true,
                liveLink: "",
                githubLink: "https://github.com/SIYAM1809"
            },
            {
                title: "Edge-ViT-FSL: Plant Disease Diagnosis",
                description: "CPU-optimized, cross-domain crop disease diagnosis system using a lightweight MobileViT backbone and saliency-guided few-shot learning to identify plant pathologies in 'wild' environments with minimal training data.",
                techStack: ["Python", "TensorFlow", "MobileViT", "Few-Shot Learning", "IoT"],
                imageUrl: "https://images.unsplash.com/photo-1530836369250-ef72a3f5cda8?ixlib=rb-4.0.3&auto=format&fit=crop&w=1000&q=80",
                isFeatured: true,
                liveLink: "",
                githubLink: "https://github.com/SIYAM1809"
            },
            {
                title: "Automated PCOS Detection",
                description: "Engineered a Deep Learning pipeline to detect PCOS in ultrasound imaging automatically. Utilized Transfer Learning with Convolutional Neural Networks.",
                techStack: ["Python", "Deep Learning", "CNN", "Transfer Learning", "Medical Imaging"],
                imageUrl: "https://images.unsplash.com/photo-1579684385127-1ef15d508118?ixlib=rb-4.0.3&auto=format&fit=crop&w=1000&q=80",
                isFeatured: false,
                liveLink: "",
                githubLink: "https://github.com/SIYAM1809"
            },
            {
                title: "Real Estate Management System",
                description: "Built a full-stack MERN Real Estate Management System with Buyer/Seller/Admin roles and an admin approval pipeline. Implemented property CRUD, map integration, and email notifications. Deployed on Vercel and Render.",
                techStack: ["React", "Node.js", "Express", "MongoDB", "Vite"],
                imageUrl: "https://images.unsplash.com/photo-1560518883-ce09059eeffa?ixlib=rb-4.0.3&auto=format&fit=crop&w=1000&q=80",
                isFeatured: false,
                liveLink: "",
                githubLink: "https://github.com/SIYAM1809"
            }
        ];

        // Clear existing
        await Project.deleteMany({});

        // Insert new
        await Project.insertMany(projects);

        res.status(200).json({
            status: 'success',
            message: 'Database seeded successfully with ' + projects.length + ' projects.'
        });
    } catch (err) {
        next(err);
    }
};
