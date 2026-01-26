import { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import Navbar from '../components/layout/Navbar';
import Footer from '../components/layout/Footer';
import SEO from '../components/utils/SEO';
import api from '../services/api';
import { ArrowRight, Code } from 'lucide-react';
import Reveal from '../components/animations/Reveal';
import { Link } from 'react-router-dom';

const Projects = () => {
    const [projects, setProjects] = useState([]);
    const [loading, setLoading] = useState(true);

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

    return (
        <div className="page-layout">
            <SEO title="All Projects" description="Browse all my projects and case studies." />
            <Navbar />

            <main className="container" style={{ paddingTop: '100px', paddingBottom: '50px' }}>
                <Reveal>
                    <h1 className="section-title" style={{ textAlign: 'center', marginBottom: '3rem' }}>
                        All <span className="text-gradient">Projects</span>
                    </h1>
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
            </main>

            <Footer />
        </div>
    );
};

const ProjectCard = ({ project, index }) => (
    <Reveal delay={index * 0.1}>
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
                        <Link to={`/projects/${project._id}`} className="icon-btn" aria-label="View Details">
                            <ArrowRight size={20} />
                        </Link>
                    </div>
                </div>
            </div>

            <div className="project-content">
                <h3 className="project-title">{project.title}</h3>
                <p className="project-desc">{project.description?.substring(0, 100)}...</p>
                <div className="project-tech-stack">
                    {project.techStack?.slice(0, 4).map(tech => (
                        <span key={tech} className="tech-badge">{tech}</span>
                    ))}
                </div>
            </div>
        </motion.div>
    </Reveal>
);

export default Projects;
