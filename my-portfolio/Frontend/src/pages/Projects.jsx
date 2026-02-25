import { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import Navbar from '../components/layout/Navbar';
import Footer from '../components/layout/Footer';
import SEO from '../components/utils/SEO';
import api from '../services/api';
import { ArrowRight, Brain, Globe } from 'lucide-react';
import Reveal from '../components/animations/Reveal';
import { Link, useNavigate } from 'react-router-dom';
import './Projects.css';

const TABS = [
    { label: 'All', value: 'all', icon: null },
    { label: 'ML & AI', value: 'ML & AI', icon: <Brain size={16} /> },
    { label: 'Full Stack', value: 'Full Stack', icon: <Globe size={16} /> },
];

const Projects = () => {
    const [projects, setProjects] = useState([]);
    const [loading, setLoading] = useState(true);
    const [activeTab, setActiveTab] = useState('all');

    useEffect(() => {
        const fetchProjects = async () => {
            try {
                const response = await api.get('/projects');
                setProjects(response.data.data || response.data);
            } catch (error) {
                console.error('Error fetching projects:', error);
            } finally {
                setLoading(false);
            }
        };
        fetchProjects();
    }, []);

    const filtered = activeTab === 'all'
        ? projects
        : projects.filter(p => p.category === activeTab);

    return (
        <div className="page-layout">
            <SEO title="All Projects" description="Browse all my projects and case studies." />
            <Navbar />

            <main className="container" style={{ paddingTop: '100px', paddingBottom: '50px' }}>
                <Reveal>
                    <h1 className="section-title" style={{ textAlign: 'center', marginBottom: '2rem' }}>
                        All <span className="text-gradient">Projects</span>
                    </h1>
                </Reveal>

                {/* Tab Filter */}
                <div className="project-tabs">
                    {TABS.map(tab => (
                        <button
                            key={tab.value}
                            className={`project-tab ${activeTab === tab.value ? 'active' : ''}`}
                            onClick={() => setActiveTab(tab.value)}
                        >
                            {tab.icon && <span className="tab-icon">{tab.icon}</span>}
                            {tab.label}
                            {activeTab === tab.value && (
                                <motion.div
                                    className="tab-underline"
                                    layoutId="tab-underline"
                                    transition={{ type: 'spring', stiffness: 400, damping: 30 }}
                                />
                            )}
                        </button>
                    ))}
                </div>

                {/* Project count */}
                <p className="project-count">
                    Showing <span>{filtered.length}</span> project{filtered.length !== 1 ? 's' : ''}
                    {activeTab !== 'all' && <span className="count-category"> in {activeTab}</span>}
                </p>

                {loading ? (
                    <div className="loading-state">
                        <div className="neon-spinner"></div>
                    </div>
                ) : (
                    <AnimatePresence mode="wait">
                        <motion.div
                            key={activeTab}
                            className="projects-grid"
                            initial={{ opacity: 0, y: 20 }}
                            animate={{ opacity: 1, y: 0 }}
                            exit={{ opacity: 0, y: -20 }}
                            transition={{ duration: 0.3 }}
                        >
                            {filtered.map((project, index) => (
                                <ProjectCard key={project._id} project={project} index={index} />
                            ))}
                        </motion.div>
                    </AnimatePresence>
                )}
            </main>

            <Footer />
        </div>
    );
};

const ProjectCard = ({ project, index }) => {
    const navigate = useNavigate();
    return (
        <Reveal delay={index * 0.08} width="100%">
            <motion.div
                className="project-card-public glass-card cursor-pointer"
                whileHover={{ y: -10 }}
                onClick={(e) => {
                    if (e.target.closest('a') !== null) return;
                    navigate(`/projects/${project._id}`);
                }}
            >
                {/* Category badge */}
                {project.category && (
                    <span className={`project-category-badge ${project.category === 'ML & AI' ? 'badge-ml' : 'badge-fs'}`}>
                        {project.category === 'ML & AI' ? <Brain size={11} /> : <Globe size={11} />}
                        {project.category}
                    </span>
                )}

                <div className="project-image-container">
                    <img
                        src={project.imageUrl || 'https://images.unsplash.com/photo-1555066931-4365d14bab8c?w=800&q=80'}
                        alt={project.title}
                        className="project-img"
                    />
                    <div className="project-overlay">
                        <div className="project-links">
                            <Link to={`/projects/${project._id}`} className="icon-btn" aria-label="View Details">
                                <ArrowRight size={20} />
                            </Link>
                        </div>
                    </div>
                </div>

                <div className="project-content">
                    <h3 className="project-title">{project.title}</h3>
                    <p className="project-desc">{project.description?.substring(0, 110)}...</p>
                    <div className="project-tech-stack">
                        {project.techStack?.slice(0, 4).map(tech => (
                            <span key={tech} className="tech-badge">{tech}</span>
                        ))}
                    </div>
                </div>
            </motion.div>
        </Reveal>
    );
};

export default Projects;
