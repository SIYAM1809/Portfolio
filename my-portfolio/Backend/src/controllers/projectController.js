const Project = require('../models/Project');

// GET all projects
exports.getAllProjects = async (req, res, next) => {
    try {
        const projects = await Project.find().sort('-isFeatured -createdAt');
        res.status(200).json({
            status: 'success',
            results: projects.length,
            data: projects
        });
    } catch (err) {
        next(err);
    }
};

// GET single project by ID
exports.getProject = async (req, res, next) => {
    try {
        const project = await Project.findById(req.params.id);

        if (!project) {
            return res.status(404).json({
                status: 'fail',
                message: 'Project not found'
            });
        }

        res.status(200).json({
            status: 'success',
            data: project
        });
    } catch (err) {
        next(err);
    }
};

// CREATE a project
exports.createProject = async (req, res, next) => {
    try {
        const newProject = await Project.create(req.body);
        res.status(201).json({
            status: 'success',
            data: newProject
        });
    } catch (err) {
        next(err);
    }
};

// UPDATE a project
exports.updateProject = async (req, res, next) => {
    try {
        const updatedProject = await Project.findByIdAndUpdate(
            req.params.id,
            req.body,
            {
                new: true, // Return updated document
                runValidators: true // Run schema validators
            }
        );

        if (!updatedProject) {
            return res.status(404).json({
                status: 'fail',
                message: 'Project not found'
            });
        }

        res.status(200).json({
            status: 'success',
            data: updatedProject
        });
    } catch (err) {
        next(err);
    }
};

// DELETE a project
exports.deleteProject = async (req, res, next) => {
    try {
        const project = await Project.findByIdAndDelete(req.params.id);

        if (!project) {
            return res.status(404).json({
                status: 'fail',
                message: 'Project not found'
            });
        }

        res.status(204).json({
            status: 'success',
            data: null
        });
    } catch (err) {
        next(err);
    }
};
