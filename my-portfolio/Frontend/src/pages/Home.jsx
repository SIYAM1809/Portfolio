
import { motion, useMotionValue, useTransform, useSpring } from 'framer-motion';
import { useInView } from 'framer-motion';
import { useRef, useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import Navbar from '../components/layout/Navbar';
import Footer from '../components/layout/Footer';
import Reveal from '../components/animations/Reveal';
import SEO from '../components/utils/SEO';
import api from '../services/api';
import { ArrowRight, Download, Code, Palette, Server, Database, Mail, MapPin } from 'lucide-react';
import profileImage from '../assets/My-profile.jpeg';
import './Home.css';
import PublicationSection from '../components/PublicationSection';
import CertificateSection from '../components/CertificateSection';
import SkillSection from '../components/SkillSection';
import HobbySection from '../components/HobbySection';
import Chatbot from '../components/Chatbot';
import { bioData } from '../data/portfolioData';

const Home = () => {
    return (
        <div className="home-layout">
            <SEO
                title="Home"
                description={bioData.shortBio}
            />
            <Navbar />

            <main>
                <HeroSection />
                <AboutSection />
                <SkillSection />
                <CertificateSection />
                <PublicationSection />
                <FeaturedProjects />
                <HobbySection />
                <ContactSection />
            </main>

            <Footer />
            <Chatbot />
        </div>
    );
};

const HeroSection = () => {
    return (
        <section className="hero-section" id="home">
            <div className="container hero-container">
                {/* ... (hero content remains unchanged) */}
                <div className="hero-content">
                    <Reveal>
                        <h4 className="hero-subtitle">Hi there, I'm</h4>
                    </Reveal>
                    <Reveal delay={0.1}>
                        <h1 className="hero-title">
                            {bioData.name.split(' ').slice(0, -1).join(' ')} <span className="text-gradient">{bioData.name.split(' ').slice(-1)}</span>
                        </h1>
                    </Reveal>
                    <Reveal delay={0.2}>
                        <h2 className="hero-role">
                            {bioData.roles[0].split(' ').slice(0, -1).join(' ')} <span className="highlight">{bioData.roles[0].split(' ').slice(-1)}</span> & <br />
                            {bioData.roles[1].split(' ').slice(0, -1).join(' ')} <span className="highlight">{bioData.roles[1].split(' ').slice(-1)}</span>
                        </h2>
                    </Reveal>
                    <Reveal delay={0.3}>
                        <p className="hero-bio">
                            {bioData.shortBio}
                        </p>
                    </Reveal>

                    <Reveal delay={0.4}>
                        <div className="hero-cta">
                            <a href="#projects" className="btn btn-primary">
                                View Projects <ArrowRight size={18} />
                            </a>
                            <a href="/CV_ML.pdf" target="_blank" className="btn btn-outline">
                                Download CV <Download size={18} />
                            </a>
                        </div>
                    </Reveal>
                </div>

                <HeroImage3D />
            </div>

            <div className="scroll-indicator">
                <span>Scroll Down</span>
                <div className="mouse"></div>
            </div>
        </section>
    );
};

const HeroImage3D = () => {
    const x = useMotionValue(0);
    const y = useMotionValue(0);

    const mouseX = useSpring(x, { stiffness: 150, damping: 15 });
    const mouseY = useSpring(y, { stiffness: 150, damping: 15 });

    const rotateX = useTransform(mouseY, [-0.5, 0.5], ["15deg", "-15deg"]);
    const rotateY = useTransform(mouseX, [-0.5, 0.5], ["-15deg", "15deg"]);

    // Glare effect
    const glareX = useTransform(mouseX, [-0.5, 0.5], ["0%", "100%"]);
    const glareY = useTransform(mouseY, [-0.5, 0.5], ["0%", "100%"]);

    const handleMouseMove = (e) => {
        const rect = e.currentTarget.getBoundingClientRect();
        const width = rect.width;
        const height = rect.height;
        const mouseXVal = e.clientX - rect.left;
        const mouseYVal = e.clientY - rect.top;
        const xPct = mouseXVal / width - 0.5;
        const yPct = mouseYVal / height - 0.5;
        x.set(xPct);
        y.set(yPct);
    };

    const handleMouseLeave = () => {
        x.set(0);
        y.set(0);
    };

    return (
        <motion.div
            initial={{ opacity: 0, x: 50 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.8, delay: 0.5 }}
            className="hero-image-wrapper"
            style={{ perspective: 1000 }}
        >
            <motion.div
                className="hero-image-card 3d-card"
                onMouseMove={handleMouseMove}
                onMouseLeave={handleMouseLeave}
                style={{
                    rotateX,
                    rotateY,
                    transformStyle: "preserve-3d",
                }}
                animate={{
                    y: [0, -20, 0],
                }}
                transition={{
                    y: {
                        duration: 6,
                        repeat: Infinity,
                        ease: "easeInOut"
                    }
                }}
            >
                {/* Glare Overlay */}
                <motion.div
                    className="card-glare"
                    style={{
                        background: `radial-gradient(circle at ${glareX} ${glareY}, rgba(255,255,255,0.3) 0%, transparent 60%)`,
                        position: 'absolute',
                        top: 0,
                        left: 0,
                        right: 0,
                        bottom: 0,
                        zIndex: 10,
                        pointerEvents: 'none',
                        mixBlendMode: 'overlay'
                    }}
                />

                <div className="image-overlay"></div>
                <img
                    src={profileImage}
                    alt="Md. Aman Uddin Siyam"
                    className="hero-img"
                    style={{ transform: "translateZ(50px)" }}
                />

                <motion.div
                    className="floating-badge badge-top"
                    style={{ z: 75 }}
                    animate={{ y: [0, -15, 0] }}
                    transition={{
                        duration: 4,
                        repeat: Infinity,
                        ease: "easeInOut"
                    }}
                >
                    <Code size={20} />
                    <span>AI Researcher</span>
                </motion.div>

                <motion.div
                    className="floating-badge badge-bottom"
                    style={{ z: 75 }}
                    animate={{ y: [0, -15, 0] }}
                    transition={{
                        duration: 4,
                        repeat: Infinity,
                        ease: "easeInOut",
                        delay: 2
                    }}
                >
                    <Palette size={20} />
                    <span>Full Stack</span>
                </motion.div>
            </motion.div>
            <div className="hero-glow"></div>
        </motion.div>
    );
};

const AboutSection = () => {
    return (
        <section className="about-section" id="about">
            <div className="container">
                <Reveal>
                    <h2 className="section-title">About <span className="text-gradient">Me</span></h2>
                </Reveal>

                <div className="about-grid" style={{ gridTemplateColumns: '1fr' }}>
                    <div className="about-content">
                        <Reveal delay={0.2}>
                            {bioData.aboutText.map((paragraph, idx) => (
                                <p key={idx} className="about-text mb-4">
                                    {paragraph}
                                </p>
                            ))}
                        </Reveal>

                        <Reveal delay={0.4}>
                            <div className="stats-container mt-8">
                                {bioData.stats.map((stat, index) => (
                                    <div key={index} className="stat-item">
                                        <h3>{stat.value}</h3>
                                        <p>{stat.label}</p>
                                    </div>
                                ))}
                            </div>
                        </Reveal>
                    </div>
                </div>
            </div>
        </section>
    );
};



const FeaturedProjects = () => {
    const [projects, setProjects] = useState([]);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        const fetchProjects = async () => {
            try {
                const response = await api.get('/projects');
                // Filter only featured projects
                const featured = (response.data.data || response.data).filter(p => p.isFeatured);
                setProjects(featured.length > 0 ? featured : (response.data.data || response.data).slice(0, 3));
            } catch (error) {
                console.error('Error fetching projects:', error);
            } finally {
                setLoading(false);
            }
        };
        fetchProjects();
    }, []);

    return (
        <section id="projects" className="projects-section">
            <div className="container">
                <Reveal>
                    <h2 className="section-title">Featured <span className="text-gradient">Projects</span></h2>
                </Reveal>

                {loading ? (
                    <div className="loading-state">
                        <div className="neon-spinner"></div>
                    </div>
                ) : (
                    <div className="projects-grid">
                        {projects.map((project, index) => (
                            <ProjectCard key={project._id} project={project} index={index} />
                        ))}
                    </div>
                )}

                <Reveal delay={0.4}>
                    <div className="see-more-container">
                        <Link to="/projects" className="btn btn-outline">
                            View All Projects <ArrowRight size={16} />
                        </Link>
                    </div>
                </Reveal>
            </div>
        </section>
    );
};

const ProjectCard = ({ project, index }) => (
    <Reveal delay={index * 0.2}>
        <motion.div
            className="project-card-public glass-card"
            whileHover={{ y: -10 }}
        >
            <div className="project-image-container">
                <img
                    src={project.imageUrl || 'https://via.placeholder.com/600x400/1a0a2e/00d9ff?text=Project+Preview'}
                    alt={project.title}
                    className="project-img"
                />
                <div className="project-overlay">
                    <div className="project-links">
                        {project.githubLink && (
                            <a href={project.githubLink} target="_blank" rel="noreferrer" className="icon-btn" aria-label="GitHub">
                                <Code size={20} />
                            </a>
                        )}
                        {project.liveLink && (
                            <a href={project.liveLink} target="_blank" rel="noreferrer" className="icon-btn" aria-label="Live Demo">
                                <ArrowRight size={20} />
                            </a>
                        )}
                    </div>
                </div>
            </div>

            <div className="project-content">
                <h3 className="project-title">{project.title}</h3>
                <p className="project-desc">{project.description}</p>
                <div className="project-tech-stack">
                    {project.techStack?.slice(0, 4).map(tech => (
                        <span key={tech} className="tech-badge">{tech}</span>
                    ))}
                </div>
            </div>
        </motion.div>
    </Reveal>
);

const ContactSection = () => {
    const [formData, setFormData] = useState({ name: '', email: '', message: '' });
    const [status, setStatus] = useState('idle'); // idle, loading, success, error

    const handleSubmit = async (e) => {
        e.preventDefault();
        setStatus('loading');

        try {
            await api.post('/messages', formData);
            setStatus('success');
            setFormData({ name: '', email: '', message: '' });
            setTimeout(() => setStatus('idle'), 5000);
        } catch (error) {
            console.error('Error sending message:', error);
            setStatus('error');
        }
    };

    const handleChange = (e) => setFormData(prev => ({ ...prev, [e.target.name]: e.target.value }));

    return (
        <section id="contact" className="contact-section">
            <div className="container">
                <Reveal>
                    <h2 className="section-title">Get In <span className="text-gradient">Touch</span></h2>
                </Reveal>

                <div className="contact-container glass-card">
                    <div className="contact-info">
                        <h3>Let's work together!</h3>
                        <p>
                            {bioData.contact.availability} If you have a project that needs some creative injection or a research collaboration, let's chat.
                        </p>
                        <div className="contact-details">
                            <div className="contact-item">
                                <Mail className="contact-icon" />
                                <span>{bioData.contact.email}</span>
                            </div>
                            <div className="contact-item">
                                <MapPin className="contact-icon" />
                                <span>{bioData.contact.location}</span>
                            </div>
                        </div>
                    </div>

                    <form onSubmit={handleSubmit} className="contact-form">
                        <div className="form-group">
                            <input
                                type="text"
                                name="name"
                                value={formData.name}
                                onChange={handleChange}
                                placeholder="Your Name"
                                required
                                className="input-field"
                            />
                        </div>
                        <div className="form-group">
                            <input
                                type="email"
                                name="email"
                                value={formData.email}
                                onChange={handleChange}
                                placeholder="Your Email"
                                required
                                className="input-field"
                            />
                        </div>
                        <div className="form-group">
                            <textarea
                                name="message"
                                value={formData.message}
                                onChange={handleChange}
                                placeholder="Your Message"
                                rows={5}
                                required
                                className="input-field"
                            />
                        </div>

                        <button
                            type="submit"
                            className="btn btn-primary submit-btn"
                            disabled={status === 'loading'}
                        >
                            {status === 'loading' ? 'Sending...' : status === 'success' ? 'Message Sent!' : 'Send Message'}
                        </button>

                        {status === 'error' && (
                            <p className="error-msg">Something went wrong. Please try again.</p>
                        )}
                        {status === 'success' && (
                            <p className="success-msg">Thanks! I'll get back to you soon.</p>
                        )}
                    </form>
                </div>
            </div>
        </section>
    );
};

export default Home;
