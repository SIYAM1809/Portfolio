import { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import {
    LayoutDashboard,
    FolderKanban,
    Mail,
    LogOut,
    Plus,
    Edit2,
    Trash2,
    ExternalLink,
    Github,
    Star,
    Eye,
    Search,
    Filter,
    RefreshCw
} from 'lucide-react';
import ProjectForm from './ProjectForm';
import api from '../../services/api';
import './DashboardLayout.css';

const DashboardLayout = () => {
    const [activeTab, setActiveTab] = useState('projects'); // 'projects' | 'messages' | 'overview'
    const [projects, setProjects] = useState([]);
    const [messages, setMessages] = useState([]);
    const [showProjectForm, setShowProjectForm] = useState(false);
    const [editingProject, setEditingProject] = useState(null);
    const [loading, setLoading] = useState(true);
    const [searchQuery, setSearchQuery] = useState('');
    const [filterTech, setFilterTech] = useState('all');

    useEffect(() => {
        fetchData();
    }, [activeTab]);

    const fetchData = async () => {
        setLoading(true);
        try {
            if (activeTab === 'projects') {
                const response = await api.get('/projects');
                // Handle different response structures: data.projects or data.data.projects
                const data = response.data.data || response.data;
                setProjects(Array.isArray(data) ? data : (data.projects || []));
            } else if (activeTab === 'messages') {
                const response = await api.get('/messages');
                const data = response.data.data || response.data;
                setMessages(Array.isArray(data) ? data : (data.messages || []));
            }
        } catch (error) {
            console.error('Error fetching data:', error);
            // On error, keep empty arrays to prevent crashes
            setProjects([]);
            setMessages([]);
        } finally {
            setLoading(false);
        }
    };

    const handleDeleteProject = async (projectId) => {
        if (!window.confirm('Are you sure you want to delete this project?')) return;

        try {
            await api.delete(`/projects/${projectId}`);
            setProjects(projects.filter(p => p._id !== projectId));
        } catch (error) {
            console.error('Error deleting project:', error);
            alert('Failed to delete project');
        }
    };

    const handleEditProject = (project) => {
        setEditingProject(project);
        setShowProjectForm(true);
    };

    const handleFormSuccess = () => {
        setShowProjectForm(false);
        setEditingProject(null);
        fetchData();
    };

    const handleLogout = () => {
        localStorage.removeItem('token');
        window.location.href = '/login';
    };

    const handleDeleteMessage = async (messageId) => {
        if (!window.confirm('Delete this message?')) return;

        try {
            await api.delete(`/messages/${messageId}`);
            setMessages(messages.filter(m => m._id !== messageId));
        } catch (error) {
            console.error('Error deleting message:', error);
        }
    };

    const handleResetDb = async () => {
        if (!window.confirm('⚠️ WARNING: This will delete ALL existing projects and reset them to the default portfolio data. Are you sure?')) return;

        setLoading(true);
        try {
            await api.post('/projects/seed'); // Uses the token from api interceptor
            alert('Database reset successfully!');
            fetchData(); // Refresh list
        } catch (error) {
            console.error('Error seeding database:', error);
            alert('Failed to reset database: ' + (error.response?.data?.message || error.message));
        } finally {
            setLoading(false);
        }
    };

    // Get unique tech stacks for filtering
    const allTechStacks = [...new Set(projects.flatMap(p => p.techStack || []))];

    // Filter projects
    const filteredProjects = projects.filter(project => {
        const matchesSearch = project.title?.toLowerCase().includes(searchQuery.toLowerCase()) ||
            project.description?.toLowerCase().includes(searchQuery.toLowerCase());
        const matchesTech = filterTech === 'all' || project.techStack?.includes(filterTech);
        return matchesSearch && matchesTech;
    });

    return (
        <div className="dashboard-container">
            {/* Sidebar Navigation */}
            <aside className="dashboard-sidebar">
                <div className="sidebar-header">
                    <div className="logo">
                        <LayoutDashboard className="logo-icon" />
                        <span className="logo-text">Admin Panel</span>
                    </div>
                </div>

                <nav className="sidebar-nav">
                    <button
                        onClick={() => setActiveTab('overview')}
                        className={`nav-item ${activeTab === 'overview' ? 'active' : ''}`}
                    >
                        <LayoutDashboard size={20} />
                        <span>Overview</span>
                    </button>

                    <button
                        onClick={() => setActiveTab('projects')}
                        className={`nav-item ${activeTab === 'projects' ? 'active' : ''}`}
                    >
                        <FolderKanban size={20} />
                        <span>Projects</span>
                        <span className="badge">{projects.length}</span>
                    </button>

                    <button
                        onClick={() => setActiveTab('messages')}
                        className={`nav-item ${activeTab === 'messages' ? 'active' : ''}`}
                    >
                        <Mail size={20} />
                        <span>Messages</span>
                        {messages.length > 0 && (
                            <span className="badge pulse">{messages.length}</span>
                        )}
                    </button>
                </nav>

                <div className="sidebar-footer">
                    <button onClick={handleLogout} className="logout-btn">
                        <LogOut size={20} />
                        <span>Logout</span>
                    </button>
                </div>
            </aside>

            {/* Main Content Area */}
            <main className="dashboard-main">
                <AnimatePresence mode="wait">
                    {showProjectForm ? (
                        <ProjectForm
                            projectToEdit={editingProject}
                            onSuccess={handleFormSuccess}
                            onCancel={() => {
                                setShowProjectForm(false);
                                setEditingProject(null);
                            }}
                        />
                    ) : (
                        <motion.div
                            key={activeTab}
                            initial={{ opacity: 0, y: 20 }}
                            animate={{ opacity: 1, y: 0 }}
                            exit={{ opacity: 0, y: -20 }}
                            transition={{ duration: 0.3 }}
                        >
                            {/* Overview Tab */}
                            {activeTab === 'overview' && (
                                <div className="overview-section">
                                    <h1 className="section-title">Dashboard Overview</h1>
                                    <div className="stats-grid">
                                        <StatCard
                                            icon={<FolderKanban />}
                                            title="Total Projects"
                                            value={projects.length}
                                            color="#00D9FF"
                                        />
                                        <StatCard
                                            icon={<Star />}
                                            title="Featured"
                                            value={projects.filter(p => p.isFeatured).length}
                                            color="#FFD700"
                                        />
                                        <StatCard
                                            icon={<Mail />}
                                            title="Messages"
                                            value={messages.length}
                                            color="#7B2FFF"
                                        />
                                        <StatCard
                                            icon={<Eye />}
                                            title="Tech Stacks"
                                            value={allTechStacks.length}
                                            color="#00FF88"
                                        />
                                    </div>

                                    <div className="quick-actions">
                                        <h2>Quick Actions</h2>
                                        <div className="action-buttons-grid" style={{ display: 'flex', gap: '1rem', flexWrap: 'wrap' }}>
                                            <button
                                                onClick={() => {
                                                    setEditingProject(null);
                                                    setShowProjectForm(true);
                                                }}
                                                className="quick-action-btn"
                                            >
                                                <Plus />
                                                Create New Project
                                            </button>

                                            <button
                                                onClick={handleResetDb}
                                                className="quick-action-btn warning"
                                                style={{
                                                    background: 'rgba(255, 77, 77, 0.1)',
                                                    color: '#ff4d4d',
                                                    border: '1px solid rgba(255, 77, 77, 0.2)'
                                                }}
                                            >
                                                <RefreshCw size={20} />
                                                Reset Database Data
                                            </button>
                                        </div>
                                    </div>
                                </div>
                            )}

                            {/* Projects Tab */}
                            {activeTab === 'projects' && (
                                <div className="projects-section">
                                    <div className="section-header">
                                        <h1 className="section-title">Manage Projects</h1>
                                        <button
                                            onClick={() => {
                                                setEditingProject(null);
                                                setShowProjectForm(true);
                                            }}
                                            className="add-project-btn"
                                        >
                                            <Plus size={20} />
                                            New Project
                                        </button>
                                    </div>

                                    {/* Search and Filter */}
                                    <div className="filter-bar">
                                        <div className="search-box">
                                            <Search size={20} />
                                            <input
                                                type="text"
                                                placeholder="Search projects..."
                                                value={searchQuery}
                                                onChange={(e) => setSearchQuery(e.target.value)}
                                            />
                                        </div>

                                        <div className="filter-dropdown">
                                            <Filter size={18} />
                                            <select
                                                value={filterTech}
                                                onChange={(e) => setFilterTech(e.target.value)}
                                            >
                                                <option value="all">All Tech Stacks</option>
                                                {allTechStacks.map(tech => (
                                                    <option key={tech} value={tech}>{tech}</option>
                                                ))}
                                            </select>
                                        </div>
                                    </div>

                                    {/* Projects Grid */}
                                    {loading ? (
                                        <div className="loading-state">Loading projects...</div>
                                    ) : filteredProjects.length === 0 ? (
                                        <div className="empty-state">
                                            <FolderKanban size={60} />
                                            <h3>No projects found</h3>
                                            <p>Create your first project to get started</p>
                                        </div>
                                    ) : (
                                        <div className="projects-grid">
                                            {filteredProjects.map((project) => (
                                                <ProjectCard
                                                    key={project._id}
                                                    project={project}
                                                    onEdit={() => handleEditProject(project)}
                                                    onDelete={() => handleDeleteProject(project._id)}
                                                />
                                            ))}
                                        </div>
                                    )}
                                </div>
                            )}

                            {/* Messages Tab */}
                            {activeTab === 'messages' && (
                                <div className="messages-section">
                                    <h1 className="section-title">Contact Messages</h1>

                                    {loading ? (
                                        <div className="loading-state">Loading messages...</div>
                                    ) : messages.length === 0 ? (
                                        <div className="empty-state">
                                            <Mail size={60} />
                                            <h3>No messages yet</h3>
                                            <p>Messages from your contact form will appear here</p>
                                        </div>
                                    ) : (
                                        <div className="messages-list">
                                            {messages.map((message) => (
                                                <MessageCard
                                                    key={message._id}
                                                    message={message}
                                                    onDelete={() => handleDeleteMessage(message._id)}
                                                />
                                            ))}
                                        </div>
                                    )}
                                </div>
                            )}
                        </motion.div>
                    )}
                </AnimatePresence>
            </main>
        </div>
    );
};

// Stat Card Component
const StatCard = ({ icon, title, value, color }) => (
    <motion.div
        className="stat-card"
        whileHover={{ scale: 1.03 }}
        style={{ '--stat-color': color }}
    >
        <div className="stat-icon">{icon}</div>
        <div className="stat-content">
            <h3 className="stat-value">{value}</h3>
            <p className="stat-title">{title}</p>
        </div>
    </motion.div>
);

// Project Card Component
const ProjectCard = ({ project, onEdit, onDelete }) => (
    <motion.div
        className="project-card"
        initial={{ opacity: 0, scale: 0.9 }}
        animate={{ opacity: 1, scale: 1 }}
        whileHover={{ y: -5 }}
    >
        {project.isFeatured && (
            <div className="featured-badge">
                <Star size={14} /> Featured
            </div>
        )}

        {project.imageUrl && (
            <div className="project-image">
                <img src={project.imageUrl} alt={project.title} />
            </div>
        )}

        <div className="project-content">
            <h3 className="project-title">{project.title}</h3>
            <p className="project-description">{project.description}</p>

            <div className="project-tech">
                {project.techStack?.slice(0, 3).map((tech) => (
                    <span key={tech} className="tech-badge">{tech}</span>
                ))}
                {project.techStack?.length > 3 && (
                    <span className="tech-badge more">+{project.techStack.length - 3}</span>
                )}
            </div>

            <div className="project-links">
                {project.liveLink && (
                    <a href={project.liveLink} target="_blank" rel="noopener noreferrer" className="link-btn">
                        <ExternalLink size={16} />
                    </a>
                )}
                {project.githubLink && (
                    <a href={project.githubLink} target="_blank" rel="noopener noreferrer" className="link-btn">
                        <Github size={16} />
                    </a>
                )}
            </div>
        </div>

        <div className="project-actions">
            <button onClick={onEdit} className="action-btn edit-btn">
                <Edit2 size={16} /> Edit
            </button>
            <button onClick={onDelete} className="action-btn delete-btn">
                <Trash2 size={16} /> Delete
            </button>
        </div>
    </motion.div>
);

// Message Card Component
const MessageCard = ({ message, onDelete }) => (
    <motion.div
        className="message-card"
        initial={{ opacity: 0, x: -20 }}
        animate={{ opacity: 1, x: 0 }}
    >
        <div className="message-header">
            <div className="message-sender">
                <h4>{message.name}</h4>
                <a href={`mailto:${message.email}`} className="message-email">
                    {message.email}
                </a>
            </div>
            <button onClick={onDelete} className="delete-message-btn">
                <Trash2 size={18} />
            </button>
        </div>

        <div className="message-body">
            <p>{message.message}</p>
        </div>

        <div className="message-footer">
            <span className="message-date">
                {new Date(message.createdAt || message.date).toLocaleDateString('en-US', {
                    year: 'numeric',
                    month: 'short',
                    day: 'numeric',
                    hour: '2-digit',
                    minute: '2-digit'
                })}
            </span>
        </div>
    </motion.div>
);

export default DashboardLayout;
