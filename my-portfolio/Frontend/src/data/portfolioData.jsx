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
        certificateLink: "", // Add link if available
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
        title: "Reproducible Machine Learning Pipeline for Predicting Cosmetic Chemical Carcinogenicity and Reproductive Toxicity",
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
            { title: "Machine Learning with Python", date: "Nov 2024 - May 2025", link: "https://drive.google.com/file/d/1p_7yb_qTT8YCci_mIfAqYthXSkPXM-rR/view?usp=sharing" }
        ]
    },
    {
        id: "kaggle",
        title: "Kaggle Certificates",
        issuer: "Kaggle",
        description: "Specialized courses in Data Science and Machine Learning. (Links to Certificate Folder)",
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
        description: "Expertise in Generative AI.",
        certificates: [
            { title: "Introduction to Generative AI", date: "2025", link: "https://drive.google.com/file/d/17e9p6yhOeabV8u8WVm611jFAXcXEUkKu/view?usp=sharing" }
        ]
    },
    {
        id: "badges",
        title: "Industry Badges",
        issuer: "Google Dev",
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
        description: "Continuous learning across diverse AI/ML domains.",
        certificates: [
            { title: "AI for Beginners", issuer: "HP LIFE", date: "2025", link: "https://drive.google.com/file/d/1FSnrMeIKWqilYp6UyqLjxNfHzoR7PmDc/view?usp=sharing" },
            { title: "ICPC Participation", issuer: "ICPC", date: "2024", link: "https://drive.google.com/file/d/1FSnrMeIKWqilYp6UyqLjxNfHzoR7PmDc/view?usp=sharing" }
        ]
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
