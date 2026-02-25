import { useState, useEffect, useRef } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { X, Plus, Upload, Image as ImageIcon, Sparkles, Trash2 } from 'lucide-react';
import api from '../../services/api';
import './ProjectForm.css';

const TECH_STACK_OPTIONS = [
    'React', 'Vue', 'Angular', 'Next.js', 'Nuxt.js',
    'Node.js', 'Express', 'MongoDB', 'PostgreSQL', 'MySQL',
    'TypeScript', 'JavaScript', 'Python', 'Java', 'C#',
    'TailwindCSS', 'SASS', 'CSS3', 'HTML5', 'Bootstrap',
    'Redux', 'Zustand', 'GraphQL', 'REST API', 'Socket.io',
    'Firebase', 'AWS', 'Docker', 'Kubernetes', 'Git',
    'Figma', 'Framer Motion', 'Three.js', 'D3.js', 'Chart.js'
];

const ProjectForm = ({ projectToEdit = null, onSuccess, onCancel }) => {
    const [formData, setFormData] = useState({
        title: '',
        description: '',
        techStack: [],
        imageUrl: '',
        liveLink: '',
        videoLink: '',
        githubLink: '',
        isFeatured: false,
        markdown: '' // For detailed case study
    });

    const [customTech, setCustomTech] = useState('');
    const [showTechDropdown, setShowTechDropdown] = useState(false);
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState('');
    const [imagePreview, setImagePreview] = useState('');
    const [dragActive, setDragActive] = useState(false);
    const [uploadingImage, setUploadingImage] = useState(false);
    const fileInputRef = useRef(null);

    // Populate form if editing
    useEffect(() => {
        if (projectToEdit) {
            setFormData({
                title: projectToEdit.title || '',
                description: projectToEdit.description || '',
                techStack: projectToEdit.techStack || [],
                imageUrl: projectToEdit.imageUrl || '',
                liveLink: projectToEdit.liveLink || '',
                videoLink: projectToEdit.videoLink || '',
                githubLink: projectToEdit.githubLink || '',
                isFeatured: projectToEdit.isFeatured || false,
                markdown: projectToEdit.markdown || ''
            });
            setImagePreview(projectToEdit.imageUrl || '');
        }
    }, [projectToEdit]);

    const handleInputChange = (e) => {
        const { name, value, type, checked } = e.target;
        setFormData(prev => ({
            ...prev,
            [name]: type === 'checkbox' ? checked : value
        }));
    };

    const handleImageUrlChange = (url) => {
        setFormData(prev => ({ ...prev, imageUrl: url }));
        setImagePreview(url);
    };

    const addTechTag = (tech) => {
        if (tech && !formData.techStack.includes(tech)) {
            setFormData(prev => ({
                ...prev,
                techStack: [...prev.techStack, tech]
            }));
        }
        setCustomTech('');
        setShowTechDropdown(false);
    };

    const removeTechTag = (techToRemove) => {
        setFormData(prev => ({
            ...prev,
            techStack: prev.techStack.filter(t => t !== techToRemove)
        }));
    };

    const handleCustomTechAdd = (e) => {
        if (e.key === 'Enter' && customTech.trim()) {
            e.preventDefault();
            addTechTag(customTech.trim());
        }
    };

    const handleDrag = (e) => {
        e.preventDefault();
        e.stopPropagation();
        if (e.type === "dragenter" || e.type === "dragover") {
            setDragActive(true);
        } else if (e.type === "dragleave") {
            setDragActive(false);
        }
    };

    // Read an image File object and set it as the preview + formData.imageUrl
    const processImageFile = (file) => {
        if (!file || !file.type.startsWith('image/')) {
            setError('Please select a valid image file (JPG, PNG, WebP, GIF).');
            return;
        }
        if (file.size > 5 * 1024 * 1024) {
            setError('Image must be smaller than 5 MB.');
            return;
        }
        setError('');
        setUploadingImage(true);
        const reader = new FileReader();
        reader.onloadend = () => {
            const dataUrl = reader.result;
            setImagePreview(dataUrl);
            setFormData(prev => ({ ...prev, imageUrl: dataUrl }));
            setUploadingImage(false);
        };
        reader.onerror = () => {
            setError('Failed to read image file.');
            setUploadingImage(false);
        };
        reader.readAsDataURL(file);
    };

    const handleDrop = (e) => {
        e.preventDefault();
        e.stopPropagation();
        setDragActive(false);
        if (e.dataTransfer.files && e.dataTransfer.files[0]) {
            processImageFile(e.dataTransfer.files[0]);
        }
    };

    const handleFileInputChange = (e) => {
        if (e.target.files && e.target.files[0]) {
            processImageFile(e.target.files[0]);
        }
        // Reset input so same file can be re-selected
        e.target.value = '';
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        setLoading(true);
        setError('');

        try {
            if (projectToEdit) {
                // Update existing project
                await api.put(`/projects/${projectToEdit._id}`, formData);
            } else {
                // Create new project
                await api.post('/projects', formData);
            }

            if (onSuccess) onSuccess();
        } catch (err) {
            setError(err.response?.data?.message || 'Failed to save project');
            console.error('Error saving project:', err);
        } finally {
            setLoading(false);
        }
    };

    const getTechColor = (tech) => {
        const colors = {
            'React': '#61DAFB',
            'Vue': '#42B883',
            'Angular': '#DD0031',
            'Node.js': '#339933',
            'MongoDB': '#47A248',
            'TypeScript': '#3178C6',
            'JavaScript': '#F7DF1E',
            'Python': '#3776AB',
            'TailwindCSS': '#06B6D4',
            'Next.js': '#000000',
            'Express': '#000000',
        };
        return colors[tech] || '#00D9FF'; // Default neon cyan
    };

    return (
        <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -20 }}
            className="project-form-container"
        >
            <div className="project-form-header">
                <h2 className="neon-text">
                    <Sparkles className="inline-icon" />
                    {projectToEdit ? 'Edit Project' : 'Create New Project'}
                </h2>
                {onCancel && (
                    <button onClick={onCancel} className="close-btn">
                        <X size={24} />
                    </button>
                )}
            </div>

            {error && (
                <motion.div
                    initial={{ opacity: 0, x: -20 }}
                    animate={{ opacity: 1, x: 0 }}
                    className="error-banner"
                >
                    {error}
                </motion.div>
            )}

            <form onSubmit={handleSubmit} className="project-form">
                {/* Title Input */}
                <div className="form-group">
                    <label htmlFor="title" className="form-label">
                        Project Title *
                    </label>
                    <input
                        type="text"
                        id="title"
                        name="title"
                        value={formData.title}
                        onChange={handleInputChange}
                        required
                        className="neon-input"
                        placeholder="Enter project title..."
                    />
                </div>

                {/* Description Textarea */}
                <div className="form-group">
                    <label htmlFor="description" className="form-label">
                        Short Description *
                    </label>
                    <textarea
                        id="description"
                        name="description"
                        value={formData.description}
                        onChange={handleInputChange}
                        required
                        rows={3}
                        className="neon-input"
                        placeholder="A brief overview of your project..."
                    />
                </div>

                {/* Image Upload Section */}
                <div className="form-group">
                    <label className="form-label">
                        <ImageIcon className="inline-icon" />
                        Project Image
                    </label>

                    {/* Hidden native file input — triggered by clicking the dropzone */}
                    <input
                        ref={fileInputRef}
                        type="file"
                        accept="image/jpeg,image/png,image/webp,image/gif"
                        style={{ display: 'none' }}
                        onChange={handleFileInputChange}
                    />

                    <div
                        className={`image-dropzone ${dragActive ? 'drag-active' : ''}`}
                        onDragEnter={handleDrag}
                        onDragLeave={handleDrag}
                        onDragOver={handleDrag}
                        onDrop={handleDrop}
                        onClick={() => !imagePreview && fileInputRef.current?.click()}
                        style={{ cursor: imagePreview ? 'default' : 'pointer' }}
                    >
                        {uploadingImage ? (
                            <div className="dropzone-content">
                                <div style={{ width: 36, height: 36, border: '3px solid rgba(0,217,255,0.2)', borderTop: '3px solid #00D9FF', borderRadius: '50%', animation: 'spin 0.8s linear infinite' }} />
                                <p>Reading image...</p>
                            </div>
                        ) : imagePreview ? (
                            <div className="image-preview-container">
                                <img src={imagePreview} alt="Preview" className="image-preview" />
                                <button
                                    type="button"
                                    onClick={(e) => {
                                        e.stopPropagation();
                                        setImagePreview('');
                                        setFormData(prev => ({ ...prev, imageUrl: '' }));
                                    }}
                                    className="remove-image-btn"
                                >
                                    <Trash2 size={16} />
                                </button>
                            </div>
                        ) : (
                            <div className="dropzone-content">
                                <Upload size={40} />
                                <p>Click to select or drag & drop an image</p>
                                <span className="dropzone-hint">Supports: JPG, PNG, WebP · Max 5 MB</span>
                            </div>
                        )}
                    </div>

                    <input
                        type="url"
                        name="imageUrl"
                        value={formData.imageUrl}
                        onChange={(e) => handleImageUrlChange(e.target.value)}
                        className="neon-input mt-2"
                        placeholder="Or paste image URL..."
                    />
                </div>

                {/* Tech Stack Tags */}
                <div className="form-group">
                    <label className="form-label">
                        Tech Stack *
                    </label>

                    <div className="tech-tags-container">
                        <AnimatePresence>
                            {formData.techStack.map((tech) => (
                                <motion.span
                                    key={tech}
                                    initial={{ scale: 0, opacity: 0 }}
                                    animate={{ scale: 1, opacity: 1 }}
                                    exit={{ scale: 0, opacity: 0 }}
                                    className="tech-tag"
                                    style={{
                                        '--tech-color': getTechColor(tech),
                                        borderColor: getTechColor(tech),
                                        boxShadow: `0 0 10px ${getTechColor(tech)}40`
                                    }}
                                >
                                    {tech}
                                    <button
                                        type="button"
                                        onClick={() => removeTechTag(tech)}
                                        className="remove-tag-btn"
                                    >
                                        <X size={14} />
                                    </button>
                                </motion.span>
                            ))}
                        </AnimatePresence>
                    </div>

                    <div className="tech-input-wrapper">
                        <input
                            type="text"
                            value={customTech}
                            onChange={(e) => setCustomTech(e.target.value)}
                            onKeyDown={handleCustomTechAdd}
                            onFocus={() => setShowTechDropdown(true)}
                            className="neon-input"
                            placeholder="Type or select technologies..."
                        />
                        <button
                            type="button"
                            onClick={() => customTech.trim() && addTechTag(customTech.trim())}
                            className="add-tech-btn"
                        >
                            <Plus size={20} />
                        </button>
                    </div>

                    <AnimatePresence>
                        {showTechDropdown && (
                            <motion.div
                                initial={{ opacity: 0, y: -10 }}
                                animate={{ opacity: 1, y: 0 }}
                                exit={{ opacity: 0, y: -10 }}
                                className="tech-dropdown"
                            >
                                {TECH_STACK_OPTIONS
                                    .filter(tech =>
                                        !formData.techStack.includes(tech) &&
                                        tech.toLowerCase().includes(customTech.toLowerCase())
                                    )
                                    .slice(0, 10)
                                    .map(tech => (
                                        <button
                                            key={tech}
                                            type="button"
                                            onClick={() => addTechTag(tech)}
                                            className="tech-dropdown-item"
                                            style={{ '--tech-color': getTechColor(tech) }}
                                        >
                                            {tech}
                                        </button>
                                    ))}
                            </motion.div>
                        )}
                    </AnimatePresence>
                </div>

                {/* Links */}
                <div className="form-row">
                    <div className="form-group">
                        <label htmlFor="liveLink" className="form-label">
                            Live Demo URL
                        </label>
                        <input
                            type="url"
                            id="liveLink"
                            name="liveLink"
                            value={formData.liveLink}
                            onChange={handleInputChange}
                            className="neon-input"
                            placeholder="https://..."
                        />
                    </div>

                    <div className="form-group">
                        <label htmlFor="githubLink" className="form-label">
                            GitHub Repository
                        </label>
                        <input
                            type="url"
                            id="githubLink"
                            name="githubLink"
                            value={formData.githubLink}
                            onChange={handleInputChange}
                            className="neon-input"
                            placeholder="https://github.com/..."
                        />
                    </div>

                    <div className="form-group">
                        <label htmlFor="videoLink" className="form-label">
                            Video Link (YouTube/Vimeo)
                        </label>
                        <input
                            type="url"
                            id="videoLink"
                            name="videoLink"
                            value={formData.videoLink}
                            onChange={handleInputChange}
                            className="neon-input"
                            placeholder="https://youtube.com/..."
                        />
                    </div>
                </div>

                {/* Markdown Case Study */}
                <div className="form-group">
                    <label htmlFor="markdown" className="form-label">
                        Detailed Case Study (Markdown)
                    </label>
                    <textarea
                        id="markdown"
                        name="markdown"
                        value={formData.markdown}
                        onChange={handleInputChange}
                        rows={8}
                        className="neon-input markdown-editor"
                        placeholder="## Problem&#10;Describe the challenge...&#10;&#10;## Solution&#10;Explain your approach...&#10;&#10;## Results&#10;Share the impact..."
                    />
                    <span className="markdown-hint">
                        Supports Markdown: **bold**, *italic*, `code`, ## Headers, etc.
                    </span>
                </div>

                {/* Featured Toggle */}
                <div className="form-group">
                    <label className="checkbox-label">
                        <input
                            type="checkbox"
                            name="isFeatured"
                            checked={formData.isFeatured}
                            onChange={handleInputChange}
                            className="neon-checkbox"
                        />
                        <span className="checkbox-text">
                            ⭐ Feature this project on homepage
                        </span>
                    </label>
                </div>

                {/* Submit Buttons */}
                <div className="form-actions">
                    {onCancel && (
                        <button
                            type="button"
                            onClick={onCancel}
                            className="btn-secondary"
                            disabled={loading}
                        >
                            Cancel
                        </button>
                    )}
                    <button
                        type="submit"
                        className="btn-primary"
                        disabled={loading}
                    >
                        {loading ? (
                            <span className="loading-spinner">Saving...</span>
                        ) : (
                            <>
                                <Sparkles size={18} />
                                {projectToEdit ? 'Update Project' : 'Create Project'}
                            </>
                        )}
                    </button>
                </div>
            </form>
        </motion.div>
    );
};

export default ProjectForm;
