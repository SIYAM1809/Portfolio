// ─── Pure Keyword-Based Chatbot Controller ───────────────────────────────────
// No external API — works 100% reliably, zero cost, zero quota.

// ─── Knowledge Base ───────────────────────────────────────────────────────────
const KB = {

    greeting: `Hi! 👋 I'm Siyam's AI assistant. I can answer questions about his skills, projects, publications, experience, and how to contact him. What would you like to know?`,

    identity: `I'm an AI assistant built into Siyam's portfolio website. Ask me about his skills, projects, research publications, availability for hire, or how to contact him!`,

    personal: `**Md. Aman Uddin Siyam** is a Software Engineer & ML Researcher based in **Dhaka, Bangladesh**.\n📧 amansiyam44@gmail.com\n📞 +8801304054566\n🔗 LinkedIn: linkedin.com/in/amansiyam18\n🐙 GitHub: github.com/SIYAM1809\n📊 Kaggle: kaggle.com/amansiyam\n🌐 Portfolio: Portfolio/Siyam18`,

    contact: `You can reach Siyam through:\n📧 **Email:** amansiyam44@gmail.com\n📞 **Phone:** +8801304054566\n💼 **LinkedIn:** linkedin.com/in/amansiyam18\n🐙 **GitHub:** github.com/SIYAM1809\n📊 **Kaggle:** kaggle.com/amansiyam`,

    availability: `✅ Siyam is **available immediately** — his BSc coursework is fully completed (graduating 2026).\n\nHe is open to:\n- Full-time roles (Full-Stack / Backend / ML Engineering)\n- Internships (Junior Developer / MLOps)\n\n📍 Based in Dhaka, Bangladesh. Contact: amansiyam44@gmail.com`,

    education: `🎓 **BSc in Computer Science & Engineering**\nInternational University of Business Agriculture and Technology (IUBAT)\n📅 2022 – 2026 | Dhaka, Bangladesh | CGPA: 3.24\n\nAll coursework is completed. Siyam is available immediately for professional roles.`,

    fsSummary: `Siyam is a **Full-Stack Software Engineer** specializing in production-ready MERN stack applications (React, Node.js/Express, MongoDB) with role-based access control, REST APIs, JWT auth, and third-party integrations (Stripe, Google Maps, Cloudinary).\n\nCurrently seeking a Junior Full-Stack / Backend Engineer role or internship.`,

    mlSummary: `Siyam is an **ML Researcher & Engineer** with expertise in end-to-end deep learning pipelines and peer-reviewed publications. Focus: computer vision, biomedical signal processing, and time-series forecasting — with strong MLOps and edge-device optimization skills.\n\nSeeking a Machine Learning Engineering or MLOps Internship.`,

    skillsAll: `**Siyam's Full Skill Set:**\n\n**Languages:** JavaScript, TypeScript, Python, Java, C/C++\n**Frontend:** React 19, Next.js 14, Redux Toolkit, Tailwind CSS, Framer Motion, Vite\n**Backend & DBs:** Node.js, Express.js, Socket.IO, MongoDB, Mongoose\n**ML / AI / CV:** TensorFlow/Keras, PyTorch, OpenCV, scikit-learn, XGBoost, LightGBM, CatBoost, Transfer Learning, Grad-CAM, SHAP\n**Signal & Time-Series:** Biomedical Signal Processing, ARIMA, Prophet, LSTM, PCA, Survival Analysis\n**MLOps & DevOps:** Docker, GitHub Actions CI/CD, Weights & Biases (W&B), FastAPI, Flask, Vercel, Render\n**APIs & Tools:** REST APIs, WebSockets, JWT, Stripe, Google Maps, Nodemailer, Multer, LlamaIndex, Qdrant, Cloudinary, Gemini LLM\n**Research:** EDA, Feature Engineering, Cross-Validation, SHAP, Jupyter, Google Colab, Kaggle, Postman`,

    skillsFE: `**Frontend Skills:**\nReact 19, Next.js 14 (App Router), Redux Toolkit, Tailwind CSS 4, Framer Motion, Vite, TypeScript`,

    skillsBE: `**Backend Skills:**\nNode.js, Express.js, Socket.IO, MongoDB, Mongoose, REST APIs, WebSockets, JWT Authentication, bcrypt, FastAPI, Flask`,

    skillsML: `**ML / AI Skills:**\nPython, TensorFlow/Keras, PyTorch, OpenCV, scikit-learn, XGBoost, LightGBM, CatBoost, Transfer Learning, Grad-CAM, SHAP, NumPy, Pandas, Matplotlib, MobileViT, ConvNeXt`,

    skillsDevOps: `**DevOps / MLOps Skills:**\nDocker, GitHub Actions CI/CD, Weights & Biases (W&B), Vercel, Render, Streamlit Cloud, Reproducible ML Pipelines, Experiment Logging, FastAPI deployment`,

    skillsAPIs: `**APIs & Integrations:**\nStripe API, Google Maps API, Google Weather API, Google Gemini (LLM), Nodemailer, Multer, Cloudinary, LlamaIndex, Qdrant (Vector DB), Groq (Llama 3), LlamaParse`,

    projectsAll: `**Siyam's Key Projects:**\n\n🐾 **Pet Shop Management System** — MERN, RBAC, JWT, CI/CD, Docker, Recharts\n⚖️ **DebateArena** — Real-time Socket.IO debates + AI judging via Gemini, Next.js 14\n🌐 **Personal Portfolio** — React 19, Express REST API, Admin CMS, JWT auth\n🏠 **Real Estate Marketplace** — Multi-role MERN, Stripe, Google Maps, Cloudinary\n🚗 **Vehicle Management System** — Google Maps/Weather APIs, Stripe, PDF Generation\n🚁 **BAT-Track** — UAV visual tracking @ 39.3 FPS, 60.5% power reduction\n🌿 **Edge-ViT-FSL** — Few-shot crop disease detection, <10MB, 73.93% accuracy\n💰 **Financial RAG Analyst** — LlamaIndex + Qdrant + Llama 3, SEC 10-K analysis\n🔬 **PCOS Detection Benchmark** — Clinical vs. Ultrasound ML, AUROC 0.976\n\nAsk me about any specific project for details!`,

    projectPetShop: `🐾 **Pet Shop Management System** (Full-Stack)\n\n- Secure RBAC platform (Admin/Staff) with **JWT**, bcrypt, centralized Express.js error handling\n- Dynamic analytics dashboard tracking pets, customers, orders & appointments with **Recharts** visualization\n- Automated email notifications via **Nodemailer**\n- Multi-stage CI/CD with **GitHub Actions** (3 workflows: CI, Code Quality, Docker Publish)\n- Containerized with **Docker**, deployed on **Vercel** (React/Vite) + **Render** (Express/MongoDB)\n\n🔗 GitHub & Live Website available`,

    projectDebate: `⚖️ **DebateArena — AI-Judged Real-Time Debate Platform** (Full-Stack)\n\n- Real-time debates via **Socket.IO** with full matchmaking queue + turn-based lifecycle (WAITING → ONGOING → COMPLETED)\n- **Solo Practice Mode** — users debate an AI bot (no live opponent needed)\n- **Google Gemini** integration: counter-argument generation (4-message history) + argument quality scoring (1–100) graded on logic, evidence, relevance, clarity\n- Graceful fallback chain to curated canned-arguments on API failure\n- **TypeScript monorepo**: Next.js 14 App Router + Express.js, JWT auth, bcrypt, MongoDB/Mongoose, environment-aware rate limiting\n\n🔗 GitHub & Live Website available`,

    projectPortfolio: `🌐 **Personal Portfolio Website** (Full-Stack)\n\n- **React 19 + Vite** with TailwindCSS 4 and **Framer Motion** for animated UI\n- **Express.js REST API** with JWT auth and bcryptjs-secured admin access\n- Full CRUD project management via a **protected admin dashboard**\n- **MongoDB/Mongoose** persistent data layer\n- Decoupled: React frontend on **Vercel**, Node.js/Express on **Render**, CORS-configured\n\n🔗 GitHub & Live Website available`,

    projectRealEstate: `🏠 **Real Estate Management System** (Full-Stack)\n\n- Multi-role MERN marketplace (Buyer, Seller, Admin) with JWT auth, bcrypt, role-based middleware\n- **Security audit log** recording unauthorized access attempts with IP tracking\n- Content moderation: Sellers submit listings → Admin approves; Buyers submit reviews → Admin moderates\n- Admin Control Panel: user management + Forgot/Reset Password via **Nodemailer**\n- Property pages with **Google Maps** integration, dual inquiry system (message/appointment)\n- **Cloudinary** image uploads, Redux Toolkit + **Framer Motion** UI\n- Deployed: Vercel (React/Vite) + Render (Express/MongoDB)\n\n🔗 GitHub & Live Website available`,

    projectVehicle: `🚗 **Vehicle Management System** (Full-Stack)\n\n- **Google Maps API** + **Google Weather API** for real-time locational & environmental fleet data\n- Secure payments via **Stripe API**\n- Automated **PDF generation** for instant billing and reporting\n\n🔗 GitHub & Live Website available`,

    projectBATTrack: `🚁 **BAT-Track: Energy-Efficient Visual Tracking for UAVs** (ML/CV)\n\n- Lightweight CV pipeline for real-time object tracking on resource-constrained UAVs\n- Achieves **39.3 FPS** during rapid aerial maneuvers\n- Implemented **OSTrack & SiamAPN++** with an adaptive switching mechanism\n- **60.5% power reduction** while maintaining 64.2% tracking accuracy (IoU)\n\n🔗 GitHub: BAT-Track | Live Tracking available`,

    projectEdgeViT: `🌿 **Edge-ViT-FSL: Few-Shot Plant Disease Detection** (ML/CV)\n\n- CPU-optimized, cross-domain crop disease diagnosis for **IoT/edge devices**\n- Operates **under 10MB** at **22.13 FPS**\n- **MobileViT-XS** backbone + custom Saliency-Guided Attention Module (SGAM)\n- **73.93% cross-domain accuracy** using only **5 training images per class**\n\n🔗 GitHub: Edge-vit-disease-detect | Live App available`,

    projectRAG: `💰 **Financial RAG Analyst** (ML/GenAI)\n\n- Production RAG pipeline: **LlamaIndex + Qdrant + Llama 3** (via Groq) analyzing SEC 10-K filings for Apple, Microsoft & Google\n- **AI Observability dashboard**: monitors latency, flags hallucinations, captures RLHF feedback\n- **LlamaParse** for complex financial table extraction\n- Containerized with **Docker**, deployed to Streamlit Cloud via **GitHub Actions CI/CD**\n\n🔗 GitHub: Financial-RAG-Analyst | Live App available`,

    projectPCOS: `🔬 **PCOS Detection Benchmark: Clinical vs. Ultrasound** (ML Research)\n\n- Leakage-safe benchmark: clinical soft-voting ensemble vs. **ConvNeXt-Small** image pipeline\n- Trained on 541 clinical records + 3,200 ultrasound images using 5-fold out-of-fold protocol\n- Calibrated clinical ensemble (**XGBoost + LightGBM + CatBoost**) outperformed image model:\n  - **AUROC: 0.976** (clinical) vs. 0.814 (ultrasound)\n  - **2.6x higher batch throughput**\n- Accepted at **ICCIT**\n\n🔗 GitHub: Ultrasound-PCOS & Tabular-PCOS`,

    publications: `**Siyam's Research Publications (4):**\n\n1. 📄 **Voice-Based Parkinson's Disease Detection using SVM & XGBoost** — *Published, IEEE*\n\n2. 📄 **Clinical vs. Ultrasound for PCOS Detection: A Calibrated, Leakage-Safe, Real-Time Benchmark** — *Accepted, ICCIT*\n\n3. 📄 **Reproducible ML Pipeline for Predicting Cosmetic Chemical Carcinogenicity and Reproductive Toxicity Using Molecular Descriptors and Fingerprints** — *Accepted, ICCIT*\n\n4. 📄 **LENS-Guard: A Lightweight, Hybrid VAE-CNN for High-Recall Detection of Known and Unseen Threats** — *Accepted, ICECTE*`,

    certifications: `**Siyam's Certifications (8+):**\n\n🏆 **EDGE Bangladesh** — Machine Learning with Python (Nov 2024 – May 2025)\n☁️ **Google Cloud** — Introduction to Generative AI (2025)\n📊 **Kaggle** — Computer Vision, Intro to Deep Learning, Intermediate ML, Intro to ML, Pandas, Data Visualization, Python (2025)\n🔵 **Google Developer Program** — Google Cloud Innovator, Firebase Studio Developer, Premium Member, Google Maps Platform Innovator\n🟢 **NVIDIA** — Community Member\n🏅 **AI for Beginners** (2025)`,

    competitions: `**Achievements & Competitions:**\n\n🏆 **ICPC Dhaka Regional Preliminary Contest (2024)** — Algorithmic programming & data structures\n🤖 **Solvio AI Hackathon (2025)** — Advanced to Phase 2\n🔬 **CollabCircle (Co-Founder)** — Leads collaborative ML/DL research, coordinates experiments, mentors contributors, manages roadmaps`,

    hobbies: `Outside of work, Siyam enjoys:\n🏏 **Cricket**\n🎣 **Fishing**\n♟️ **Chess**`,

    unknown: `I'm not sure about that! Here's what I can help with:\n\n• 💼 Skills & tech stack\n• 🚀 Projects (Pet Shop, DebateArena, Portfolio, Real Estate, Vehicle, BAT-Track, Edge-ViT-FSL, RAG Analyst, PCOS)\n• 📄 Research publications (IEEE, ICCIT, ICECTE)\n• 🏅 Certifications & education\n• ✅ Availability & hiring\n• 📞 How to contact Siyam\n\nFor anything else: 📧 **amansiyam44@gmail.com**`,
};

// ─── Priority Matcher ─────────────────────────────────────────────────────────
function getReply(message) {
    const m = message.toLowerCase().trim();

    // ── Greetings / Identity ──
    if (/^(hi|hello|hey|howdy|yo|sup|greetings|good\s(morning|afternoon|evening))[\s!?.]*$/.test(m)
        || m.includes('who are you') || m.includes('what are you') || m.includes('what can you do') || m.includes('help me'))
        return KB.greeting;

    if (m.includes('who are you') || m.includes('introduce yourself') || m.includes('what do you do'))
        return KB.identity;

    // ── Contact ──
    if (m.includes('contact') || m.includes('reach') || m.includes('email') || m.includes('phone') || m.includes('linkedin') || m.includes('github') || m.includes('kaggle') || m.includes('social media') || m.includes('get in touch'))
        return KB.contact;

    // ── About / Who ──
    if ((m.includes('who') && m.includes('siyam')) || m.includes('about him') || m.includes('about siyam') || m.includes('tell me about') || (m.includes('portfolio') && m.includes('owner')))
        return KB.personal;

    // ── Hire / Availability ──
    if (m.includes('hire') || m.includes('available') || m.includes('availability') || m.includes('internship') || m.includes('job') || m.includes('open to work') || m.includes('looking for') || m.includes('recruit') || m.includes('opportunity') || m.includes('full-time') || m.includes('full time') || m.includes('work with'))
        return KB.availability;

    // ── Education ──
    if (m.includes('education') || m.includes('university') || m.includes('iubat') || m.includes('bsc') || m.includes('bachelor') || m.includes('cgpa') || m.includes('gpa') || m.includes('degree') || m.includes('student') || m.includes('graduating') || m.includes('study'))
        return KB.education;

    // ── Summary ──
    if ((m.includes('summary') || m.includes('overview') || m.includes('background')) && (m.includes('ml') || m.includes('machine') || m.includes('research')))
        return KB.mlSummary;
    if (m.includes('summary') || m.includes('overview') || m.includes('background') || m.includes('career') || m.includes('about'))
        return KB.fsSummary;

    // ── Skills — Specific First ──
    if (m.includes('frontend') || m.includes('front-end') || m.includes('react') || m.includes('next.js') || m.includes('nextjs') || m.includes('tailwind') || m.includes('framer motion') || m.includes('vite') || m.includes('redux'))
        return KB.skillsFE;

    if (m.includes('backend') || m.includes('back-end') || m.includes('node') || m.includes('express') || m.includes('socket.io') || m.includes('mongoose') || m.includes('mongodb') || m.includes('fastapi') || m.includes('flask') || m.includes('rest api'))
        return KB.skillsBE;

    if (m.includes('devops') || m.includes('mlops') || m.includes('docker') || m.includes('github action') || m.includes('ci/cd') || m.includes('cicd') || m.includes('vercel') || m.includes('render') || m.includes('wandb') || m.includes('w&b') || m.includes('weights and biases') || m.includes('streamlit'))
        return KB.skillsDevOps;

    if (m.includes('stripe') || m.includes('google maps') || m.includes('nodemailer') || m.includes('cloudinary') || m.includes('multer') || m.includes('qdrant') || m.includes('llamaindex') || m.includes('llama index') || m.includes('groq') || m.includes('llm') || m.includes('integration') || m.includes('third party') || m.includes('third-party'))
        return KB.skillsAPIs;

    if (m.includes('machine learning') || m.includes('deep learning') || m.includes('tensorflow') || m.includes('pytorch') || m.includes('opencv') || m.includes('scikit') || m.includes('xgboost') || m.includes('lightgbm') || m.includes('catboost') || m.includes('grad-cam') || m.includes('gradcam') || m.includes('shap') || m.includes('transfer learning') || (m.includes('ml') && m.includes('skill')) || m.includes('neural network') || m.includes('ai skill'))
        return KB.skillsML;

    if (m.includes('skill') || m.includes('tech stack') || m.includes('technology') || m.includes('languages') || m.includes('proficient') || m.includes('expertise') || m.includes('tools') || m.includes('framework') || m.includes('what can') || m.includes('what do you know'))
        return KB.skillsAll;

    // ── Specific Projects — Most Specific First ──
    if (m.includes('bat-track') || m.includes('bat track') || (m.includes('bat') && (m.includes('track') || m.includes('uav') || m.includes('drone'))) || m.includes('ostrack') || m.includes('siamap'))
        return KB.projectBATTrack;

    if (m.includes('edge-vit') || m.includes('edge vit') || m.includes('fsl') || m.includes('few-shot') || m.includes('few shot') || m.includes('mobilevit') || m.includes('sgam') || m.includes('plant disease') || m.includes('crop disease') || m.includes('iot device'))
        return KB.projectEdgeViT;

    if (m.includes('rag') || m.includes('financial rag') || m.includes('llamaindex') || m.includes('llama index') || m.includes('qdrant') || m.includes('10-k') || m.includes('10k filing') || m.includes('sec filing') || (m.includes('financial') && m.includes('ai')) || m.includes('groq') || m.includes('llama 3') || m.includes('llamaparse') || m.includes('hallucination'))
        return KB.projectRAG;

    if (m.includes('pcos') || m.includes('polycystic') || m.includes('ultrasound') || (m.includes('clinical') && m.includes('benchmark')) || m.includes('auroc') || m.includes('convnext') || (m.includes('medical') && m.includes('ml')) || m.includes('leakage-safe') || m.includes('leakage safe'))
        return KB.projectPCOS;

    if (m.includes('debate') || m.includes('arena') || m.includes('debatearena') || m.includes('debate arena') || m.includes('matchmaking') || m.includes('judg') || (m.includes('socket') && m.includes('debate')) || (m.includes('ai') && m.includes('judge')))
        return KB.projectDebate;

    if (m.includes('pet shop') || m.includes('petshop') || (m.includes('pet') && (m.includes('manage') || m.includes('system') || m.includes('staff') || m.includes('admin'))))
        return KB.projectPetShop;

    if (m.includes('real estate') || m.includes('realestate') || m.includes('property') || m.includes('listing') || (m.includes('marketplace') && !m.includes('pet')))
        return KB.projectRealEstate;

    if (m.includes('vehicle') || m.includes('fleet') || (m.includes('management') && m.includes('vehicle')) || (m.includes('car') && m.includes('system')))
        return KB.projectVehicle;

    if ((m.includes('portfolio') && (m.includes('website') || m.includes('site') || m.includes('cms') || m.includes('admin') || m.includes('crud'))))
        return KB.projectPortfolio;

    // ── Projects — General ──
    if (m.includes('project') || m.includes('built') || m.includes('developed') || m.includes('application') || m.includes('what have you') || m.includes('show me'))
        return KB.projectsAll;

    // ── Computer Vision / UAV / Aerial ──
    if (m.includes('uav') || m.includes('drone') || m.includes('aerial') || m.includes('tracking') || m.includes('computer vision') || m.includes('object detection') || m.includes('object track'))
        return KB.projectBATTrack;

    // ── Signal / Time-series ──
    if (m.includes('signal') || m.includes('biomedical') || m.includes('arima') || m.includes('prophet') || m.includes('lstm') || m.includes('time series') || m.includes('time-series') || m.includes('forecast') || m.includes('pca') || m.includes('survival analysis'))
        return KB.skillsML;

    // ── GenAI / RAG / LLM ──
    if (m.includes('genai') || m.includes('generative') || m.includes('gen ai') || m.includes('large language') || m.includes('llm') || m.includes('langchain') || m.includes('vector') || m.includes('embedding') || m.includes('retrieval'))
        return KB.projectRAG;

    // ── Publications ──
    if (m.includes('publication') || m.includes('paper') || m.includes('research') || m.includes('publish') || m.includes('ieee') || m.includes('iccit') || m.includes('icecte') || m.includes('parkinson') || m.includes('lens-guard') || m.includes('lensguard') || m.includes('cosmetic') || m.includes('carcinogen') || m.includes('journal') || m.includes('conference'))
        return KB.publications;

    // ── Certifications ──
    if (m.includes('certificate') || m.includes('certification') || m.includes('kaggle') || m.includes('edge bangladesh') || m.includes('google cloud') || m.includes('credential') || m.includes('badge') || m.includes('nvidia') || m.includes('course') || m.includes('training') || m.includes('firebase') || m.includes('google developer'))
        return KB.certifications;

    // ── Competitions / Achievements ──
    if (m.includes('icpc') || m.includes('hackathon') || m.includes('competition') || m.includes('solvio') || m.includes('achievement') || m.includes('contest') || m.includes('competitive') || m.includes('collab') || m.includes('collabcircle') || m.includes('award') || m.includes('winner'))
        return KB.competitions;

    // ── Hobbies ──
    if (m.includes('hobby') || m.includes('hobbies') || m.includes('interest') || m.includes('cricket') || m.includes('fishing') || m.includes('chess') || m.includes('outside work') || m.includes('personal life') || m.includes('besides') || m.includes('free time'))
        return KB.hobbies;

    return KB.unknown;
}

// ─── Controller ───────────────────────────────────────────────────────────────
exports.chat = async (req, res, next) => {
    try {
        const { message } = req.body;

        if (!message || typeof message !== 'string' || message.trim() === '') {
            return res.status(400).json({ status: 'fail', message: 'Message is required.' });
        }

        const reply = getReply(message);

        return res.status(200).json({
            status: 'success',
            data: { reply, source: 'keyword' }
        });

    } catch (err) {
        next(err);
    }
};
