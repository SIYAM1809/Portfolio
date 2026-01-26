import { useState, useEffect } from 'react';
import { useParams, Link, useNavigate } from 'react-router-dom';
import ReactMarkdown from 'react-markdown';
import { motion } from 'framer-motion';
import { ArrowLeft, Github, ExternalLink, Calendar, Code2 } from 'lucide-react';
import api from '../services/api';
import Navbar from '../components/layout/Navbar';
import Footer from '../components/layout/Footer';
import SEO from '../components/utils/SEO';
import './ProjectDetails.css';

const ProjectDetails = () => {
    const { id } = useParams();
    const navigate = useNavigate();
    const [project, setProject] = useState(null);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);

    useEffect(() => {
        const fetchProject = async () => {
            try {
                const response = await api.get(`/projects/${id}`);
                setProject(response.data.data);
            } catch (err) {
                console.error('Error fetching project:', err);
                setError('Project not found or failed to load.');
            } finally {
                setLoading(false);
            }
        };
        fetchProject();
    }, [id]);

    if (loading) {
        return (
            <div className="details-loading">
                <div className="neon-spinner"></div>
            </div>
        );
    }

    if (error || !project) {
        return (
            <div className="details-error">
                <h2>oops!</h2>
                <p>{error}</p>
                <Link to="/#projects" className="btn btn-outline">
                    <ArrowLeft size={16} /> Back to Projects
                </Link>
            </div>
        );
    }

    return (
        <div className="project-details-page">
            <SEO
                title={project.title}
                description={project.description}
                image={project.imageUrl}
            />
            <Navbar />

            <motion.main
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ duration: 0.5 }}
                className="details-container container"
            >
                <Link to="/#projects" className="back-link">
                    <ArrowLeft size={18} /> Back to Projects
                </Link>

                {/* Header Section */}
                <section className="details-header">
                    <motion.h1
                        initial={{ y: 20, opacity: 0 }}
                        animate={{ y: 0, opacity: 1 }}
                        transition={{ delay: 0.1 }}
                        className="details-title"
                    >
                        {project.title}
                    </motion.h1>

                    <div className="details-meta">
                        <span className="meta-item">
                            <Calendar size={16} />
                            {new Date(project.createdAt).toLocaleDateString('en-US', { month: 'long', year: 'numeric' })}
                        </span>
                        <div className="tech-tags">
                            {project.techStack?.map(tech => (
                                <span key={tech} className="tech-tag-sm">{tech}</span>
                            ))}
                        </div>
                    </div>
                </section>

                {/* Hero Image */}
                {project.imageUrl && (
                    <motion.div
                        initial={{ scale: 0.95, opacity: 0 }}
                        animate={{ scale: 1, opacity: 1 }}
                        transition={{ delay: 0.2 }}
                        className="details-hero-image"
                    >
                        <img src={project.imageUrl} alt={project.title} />
                        <div className="image-glow"></div>
                    </motion.div>
                )}

                {/* Content Layout */}
                <div className="details-grid">
                    {/* Left Column: Markdown Content */}
                    <div className="details-content glass-card">
                        <ReactMarkdown className="markdown-body">
                            {project.markdown || project.description || 'No additional details provided.'}
                        </ReactMarkdown>
                    </div>

                    {/* Right Column: Sidebar Info */}
                    <aside className="details-sidebar">
                        <div className="glass-card sidebar-card">
                            <h3>Project Links</h3>
                            <div className="sidebar-actions">
                                {project.liveLink && (
                                    <a href={project.liveLink} target="_blank" rel="noopener noreferrer" className="btn btn-primary full-width">
                                        Visit Live Site <ExternalLink size={16} />
                                    </a>
                                )}
                                {project.githubLink && (
                                    <a href={project.githubLink} target="_blank" rel="noopener noreferrer" className="btn btn-outline full-width">
                                        View Code <Github size={16} />
                                    </a>
                                )}
                            </div>
                        </div>

                        <div className="glass-card sidebar-card">
                            <h3>Tech Stack</h3>
                            <ul className="tech-list">
                                {project.techStack?.map(tech => (
                                    <li key={tech}>
                                        <Code2 size={16} className="tech-list-icon" /> {tech}
                                    </li>
                                ))}
                            </ul>
                        </div>
                    </aside>
                </div>
            </motion.main>

            <Footer />
        </div>
    );
};

export default ProjectDetails;
