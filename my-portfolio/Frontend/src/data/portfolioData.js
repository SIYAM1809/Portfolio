import { Code, Database, Server, Palette, Terminal, Cpu, Globe, Brain } from 'lucide-react';

export const bioData = {
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
};

export const skillsData = [
    {
        category: "Languages",
        skills: ["Python", "JavaScript", "C++", "SQL"],
        icon: <Code size={24} />
    },
    {
        category: "AI & ML",
        skills: ["TensorFlow", "PyTorch", "OpenCV", "Scikit-learn", "XGBoost", "SVM"],
        icon: <Brain size={24} />
    },
    {
        category: "Web Development",
        skills: ["React", "Node.js", "Express", "MongoDB", "FastAPI"],
        icon: <Globe size={24} />
    },
    {
        category: "Tools & DevOps",
        skills: ["Docker", "Git", "GitHub Actions", "Google Colab"],
        icon: <Terminal size={24} />
    }
];

export const publicationsData = [
    {
        title: "Voice-Based Parkinson’s Disease Detection using SVM & XGBoost",
        authors: "Md. Aman Uddin Siyam et al.",
        venue: "IEEE",
        link: "https://ieeexplore.ieee.org/document/11172195",
        status: "Published"
    },
    {
        title: "Clinical vs. Ultrasound for PCOS Detection: A Calibrated, Leakage-Safe, Real-Time Benchmark",
        authors: "Md. Aman Uddin Siyam et al.",
        venue: "ICCIT",
        link: "",
        status: "Accepted"
    },
    {
        title: "Reproducible Machine Learning Pipeline for Predicting Cosmetic Chemical Carcinogenicity and Reproductive Toxicity",
        authors: "Md. Aman Uddin Siyam et al.",
        venue: "ICCIT",
        link: "",
        status: "Accepted"
    },
    {
        title: "LENS-Guard: A Lightweight, Hybrid VAE-CNN for High-Recall Detection of Known and Unseen Threats",
        authors: "Md. Aman Uddin Siyam et al.",
        venue: "ICECTE",
        link: "",
        status: "Accepted"
    }
];

export const certificatesData = [
    {
        title: "Computer Vision",
        issuer: "Kaggle",
        date: "2024",
        link: ""
    },
    {
        title: "Deep Learning",
        issuer: "Kaggle",
        date: "2024",
        link: ""
    },
    {
        title: "Intro to Machine Learning",
        issuer: "Kaggle",
        date: "2024",
        link: ""
    },
    {
        title: "Generative AI",
        issuer: "Google Cloud",
        date: "2024",
        link: ""
    },
    {
        title: "EDGE: Digital Skills",
        issuer: "EDGE",
        date: "2024",
        link: ""
    },
    {
        title: "AI for Beginners",
        issuer: "HP LIFE",
        date: "2024",
        link: ""
    }
];

export const hobbiesData = [
    { name: "Cricket", icon: "🏏" },
    { name: "Fishing", icon: "🎣" },
    { name: "Chess", icon: "♟️" }
];

export const chatbotData = {
    greeting: "Hi! I'm Siyam's AI Assistant. Ask me anything about his work!",
    faqs: [
        {
            question: "What is your tech stack?",
            answer: "Siyam works primarily with Python (PyTorch, TensorFlow) for AI/ML and the MERN stack (MongoDB, Express, React, Node.js) for web development."
        },
        {
            question: "Are you available for hire?",
            answer: "Yes! Siyam is currently looking for full-time opportunities in Machine Learning or Full Stack Development."
        },
        {
            question: "What is your thesis about?",
            answer: "His final year work revolves around advanced Computer Vision and Deep Learning applications, specifically in biomedical and agricultural domains."
        },
        {
            question: "How can I contact you?",
            answer: "You can email him at amansiyam44@gmail.com or use the contact form on this site."
        }
    ]
};
