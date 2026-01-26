import api from './api';

export const projectService = {
    // Get all projects
    getAllProjects: async () => {
        try {
            const response = await api.get('/projects');
            return response.data;
        } catch (error) {
            console.error('Error fetching projects:', error);
            throw error;
        }
    },

    // Get a single project by ID
    getProjectById: async (id) => {
        try {
            const response = await api.get(`/projects/${id}`);
            return response.data;
        } catch (error) {
            console.error(`Error fetching project ${id}:`, error);
            throw error;
        }
    },

    // Create a new project
    createProject: async (projectData) => {
        try {
            const response = await api.post('/projects', projectData);
            return response.data;
        } catch (error) {
            console.error('Error creating project:', error);
            throw error;
        }
    },

    // Update a project
    updateProject: async (id, projectData) => {
        try {
            const response = await api.put(`/projects/${id}`, projectData);
            return response.data;
        } catch (error) {
            console.error(`Error updating project ${id}:`, error);
            throw error;
        }
    },

    // Delete a project
    deleteProject: async (id) => {
        try {
            const response = await api.delete(`/projects/${id}`);
            return response.data;
        } catch (error) {
            console.error(`Error deleting project ${id}:`, error);
            throw error;
        }
    },

    // Get featured projects
    getFeaturedProjects: async () => {
        try {
            const response = await api.get('/projects/featured');
            return response.data;
        } catch (error) {
            console.error('Error fetching featured projects:', error);
            throw error;
        }
    },
};

export default projectService;
