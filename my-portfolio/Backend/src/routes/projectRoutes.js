const express = require('express');
const projectController = require('../controllers/projectController');
const { protect } = require('../middleware/authMiddleware');

const router = express.Router();

router
    .route('/')
    .get(projectController.getAllProjects)
    .post(protect, projectController.createProject);

// Seed Projects (Protected)
router.post('/seed', protect, projectController.seedProjects);

router
    .route('/:id')
    .get(projectController.getProject)
    .put(protect, projectController.updateProject)
    .delete(protect, projectController.deleteProject);

module.exports = router;