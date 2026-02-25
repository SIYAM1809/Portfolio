import { Code, Database, Server, Palette, Terminal, Cpu, Globe, Brain } from 'lucide-react';

export const bioData = {
    name: "Md. Aman Uddin Siyam",
    roles: ["Machine Learning Engineer", "Full Stack Developer"],
    shortBio: "BSc CSE candidate (all coursework completed, available immediately) — I architect production ML pipelines and the full-stack applications that ship them.",
    aboutText: [
        "I am a final-year BSc in Computer Science & Engineering student at IUBAT with a proven track record of publishing peer-reviewed ML benchmarks and architecting end-to-end deep learning systems across computer vision, biomedical signal processing, and time-series forecasting. Past work spans edge-optimized UAV trackers, few-shot crop disease models, and a live Financial RAG Analyst built on LlamaIndex, Qdrant, and Llama 3.",
        "On the engineering side, I specialize in production-ready MERN stack applications — role-based access control, REST APIs, Stripe integrations, Docker containerization, and multi-stage GitHub Actions CI/CD. I bridge the gap between AI research and deployment: from training a calibrated ensemble that hits AUROC 0.976, to containerizing it behind a FastAPI endpoint and shipping it live."
    ],
    stats: [
        { label: 'Key Projects', value: '8+' },
        { label: 'Certifications', value: '8+' },
        { label: 'Publications', value: '4+' },
    ],
    contact: {
        email: "amansiyam44@gmail.com",
        phone: "+8801304054566",
        location: "Dhaka, Bangladesh",
        availability: "Available immediately — open to full-time & internships"
    }
};

export const skillsData = [
    {
        category: "Languages",
        skills: ["Python", "JavaScript", "Java", "C/C++", "SQL"],
        icon: <Code size={24} />
    },
    {
        category: "AI / ML & CV",
        skills: ["TensorFlow/Keras", "PyTorch", "OpenCV", "scikit-learn", "XGBoost", "LightGBM", "CatBoost", "Grad-CAM", "SHAP", "Transfer Learning"],
        icon: <Brain size={24} />
    },
    {
        category: "Signal & Data",
        skills: ["Biomedical Signal Processing", "Feature Extraction", "LSTM", "ARIMA", "Prophet", "PCA", "Survival Analysis", "EDA", "Feature Engineering"],
        icon: <Cpu size={24} />
    },
    {
        category: "Web Dev (MERN)",
        skills: ["React", "Redux Toolkit", "Node.js", "Express.js", "MongoDB", "Mongoose", "FastAPI", "Flask", "REST APIs", "JWT Auth"],
        icon: <Globe size={24} />
    },
    {
        category: "MLOps & DevOps",
        skills: ["Docker", "GitHub Actions", "Weights & Biases (W&B)", "Streamlit", "Vercel", "Render", "Reproducible Pipelines", "Experiment Logging"],
        icon: <Terminal size={24} />
    },
    {
        category: "APIs & Tools",
        skills: ["Stripe API", "Google Maps API", "Nodemailer", "Multer", "LlamaIndex", "Qdrant", "Cloudinary", "Postman", "Git/GitHub", "Google Colab"],
        icon: <Database size={24} />
    }
];

export const publicationsData = [
    {
        title: "Voice-Based Parkinson's Disease Detection using SVM & XGBoost",
        authors: "Md. Aman Uddin Siyam et al.",
        venue: "IEEE",
        link: "https://ieeexplore.ieee.org/document/11172195",
        certificateLink: "",
        status: "Published"
    },
    {
        title: "Clinical vs. Ultrasound for PCOS Detection: A Calibrated, Leakage-Safe, Real-Time Benchmark",
        authors: "Md. Aman Uddin Siyam et al.",
        venue: "ICCIT",
        link: "",
        certificateLink: "",
        status: "Accepted"
    },
    {
        title: "Reproducible Machine Learning Pipeline for Predicting Cosmetic Chemical Carcinogenicity and Reproductive Toxicity Using Molecular Descriptors and Fingerprints",
        authors: "Md. Aman Uddin Siyam et al.",
        venue: "ICCIT",
        link: "",
        certificateLink: "",
        status: "Accepted"
    },
    {
        title: "LENS-Guard: A Lightweight, Hybrid VAE-CNN for High-Recall Detection of Known and Unseen Threats",
        authors: "Md. Aman Uddin Siyam et al.",
        venue: "ICECTE",
        link: "",
        certificateLink: "",
        status: "Accepted"
    }
];

export const certificateCategories = [
    {
        id: "edge",
        title: "EDGE Bangladesh",
        issuer: "EDGE",
        description: "Comprehensive Machine Learning training program.",
        certificates: [
            { title: "Machine Learning with Python", date: "Nov 2024 – May 2025", link: "https://drive.google.com/file/d/1p_7yb_qTT8YCci_mIfAqYthXSkPXM-rR/view?usp=sharing" }
        ]
    },
    {
        id: "kaggle",
        title: "Kaggle Certificates",
        issuer: "Kaggle",
        description: "Advanced ML & Data Science micro-courses. (Links to Certificate Folder)",
        certificates: [
            { title: "Computer Vision", date: "2025", link: "https://drive.google.com/drive/folders/1iIGuBD1dVxfWvuUK3KHNo7llZDzhwogv?usp=sharing" },
            { title: "Intro to Deep Learning", date: "2025", link: "https://drive.google.com/drive/folders/1iIGuBD1dVxfWvuUK3KHNo7llZDzhwogv?usp=sharing" },
            { title: "Intermediate Machine Learning", date: "2025", link: "https://drive.google.com/drive/folders/1iIGuBD1dVxfWvuUK3KHNo7llZDzhwogv?usp=sharing" },
            { title: "Intro to Machine Learning", date: "2025", link: "https://drive.google.com/drive/folders/1iIGuBD1dVxfWvuUK3KHNo7llZDzhwogv?usp=sharing" },
            { title: "Pandas", date: "2025", link: "https://drive.google.com/drive/folders/1iIGuBD1dVxfWvuUK3KHNo7llZDzhwogv?usp=sharing" },
            { title: "Data Visualization", date: "2025", link: "https://drive.google.com/drive/folders/1iIGuBD1dVxfWvuUK3KHNo7llZDzhwogv?usp=sharing" },
            { title: "Python", date: "2025", link: "https://drive.google.com/drive/folders/1iIGuBD1dVxfWvuUK3KHNo7llZDzhwogv?usp=sharing" }
        ]
    },
    {
        id: "google",
        title: "Google Cloud Skills",
        issuer: "Google Cloud",
        description: "Introduction to Generative AI — practical GenAI foundations.",
        certificates: [
            { title: "Introduction to Generative AI", date: "2025", link: "https://drive.google.com/file/d/17e9p6yhOeabV8u8WVm611jFAXcXEUkKu/view?usp=sharing" }
        ]
    },
    {
        id: "badges",
        title: "Industry Badges",
        issuer: "Google Developer Program",
        description: "Recognitions from Google Developer Program and Communities.",
        certificates: [
            { title: "Google Cloud Innovator", date: "2026", link: "https://g.dev/amanuddinsiyam" },
            { title: "Firebase Studio Developer", date: "2026", link: "https://g.dev/amanuddinsiyam" },
            { title: "Google Developer Program Premium", date: "2026", link: "https://g.dev/amanuddinsiyam" },
            { title: "NVIDIA Community Member", date: "2026", link: "https://g.dev/amanuddinsiyam" },
            { title: "Google Maps Platform Innovator", date: "2026", link: "https://g.dev/amanuddinsiyam" }
        ]
    },
    {
        id: "others",
        title: "Other Certifications",
        issuer: "Various",
        description: "Continuous learning across AI/ML and competitive programming.",
        certificates: [
            { title: "AI for Beginners", date: "2025", link: "https://drive.google.com/file/d/1FSnrMeIKWqilYp6UyqLjxNfHzoR7PmDc/view?usp=sharing" },
            { title: "ICPC Dhaka Regional – Participation", date: "2024", link: "https://drive.google.com/file/d/1FSnrMeIKWqilYp6UyqLjxNfHzoR7PmDc/view?usp=sharing" },
            { title: "Solvio AI Hackathon – Phase 2", date: "2025", link: "" }
        ]
    }
];

export const hobbiesData = [
    { name: "Cricket", icon: "🏏" },
    { name: "Fishing", icon: "🎣" },
    { name: "Chess", icon: "♟️" }
];

export const chatbotData = {
    greeting: "Hi! I'm Siyam's AI Assistant. Ask me anything about his skills, projects, or availability!",
    faqs: [
        {
            question: "What is your ML / AI tech stack?",
            answer: "TensorFlow/Keras, PyTorch, OpenCV, scikit-learn, XGBoost, LightGBM, CatBoost — with MLOps tooling: Docker, FastAPI, Weights & Biases (W&B), and reproducible pipeline design. For GenAI/RAG: LlamaIndex, Qdrant, Groq (Llama 3)."
        },
        {
            question: "What is your web dev / full-stack tech stack?",
            answer: "Full MERN stack — React 19 (Vite), Redux Toolkit, Node.js, Express.js, MongoDB/Mongoose. APIs: JWT auth, Stripe, Google Maps, Nodemailer, Cloudinary, Multer. DevOps: Docker, GitHub Actions CI/CD, Vercel & Render deployments."
        },
        {
            question: "Are you available for hire?",
            answer: "Yes! BSc coursework is fully completed and Siyam is available immediately for full-time roles or internships in ML Engineering, MLOps, or Full-Stack Development. Based in Dhaka, Bangladesh."
        },
        {
            question: "What are your research publications?",
            answer: "4 publications: (1) Voice-Based Parkinson's Detection — SVM & XGBoost (Published, IEEE). (2) PCOS Detection Benchmark: Clinical vs. Ultrasound (Accepted, ICCIT). (3) Cosmetic Chemical Carcinogenicity ML Pipeline (Accepted, ICCIT). (4) LENS-Guard — Hybrid VAE-CNN (Accepted, ICECTE)."
        },
        {
            question: "What are your key ML projects?",
            answer: "BAT-Track (39.3 FPS UAV tracker, 60.5% power reduction), Edge-ViT-FSL (73.93% cross-domain plant disease accuracy, <10MB), Financial RAG Analyst (LlamaIndex + Qdrant + Llama 3, live on Streamlit), and a calibrated PCOS detection benchmark (AUROC 0.976)."
        },
        {
            question: "What are your key web projects?",
            answer: "Pet Shop Management System (RBAC + CI/CD + Recharts), Personal Portfolio Platform (full MERN + admin CMS), Real Estate Marketplace (multi-role, Cloudinary, Google Maps, Stripe), and a Vehicle Management System (Google Maps/Weather APIs + Stripe payments)."
        },
        {
            question: "How can I contact you?",
            answer: "Email: amansiyam44@gmail.com | Phone: +8801304054566 | LinkedIn: linkedin.com/in/amansiyam18 | GitHub: github.com/SIYAM1809 | Kaggle: kaggle.com/amansiyam"
        }
    ]
};
