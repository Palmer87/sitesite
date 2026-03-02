const Project = require('../models/Project');

// @desc    Get all projects
// @route   GET /api/projects
// @access  Public
const getProjects = async (req, res) => {
    const projects = await Project.find().sort({ start_date: -1 });
    res.status(200).json(projects);
};

// @desc    Get single project
// @route   GET /api/projects/:slug
// @access  Public
const getProjectBySlug = async (req, res) => {
    const project = await Project.findOne({ slug: req.params.slug });

    if (!project) {
        return res.status(404).json({ message: 'Project not found' });
    }
    res.status(200).json(project);
};

// @desc    Create new project
// @route   POST /api/projects
// @access  Private
const createProject = async (req, res) => {
    if (!req.body.title || !req.body.description || !req.body.slug) {
        return res.status(400).json({ message: 'Please add all required fields' });
    }

    const project = await Project.create(req.body);
    res.status(201).json(project);
};

// @desc    Update project
// @route   PUT /api/projects/:id
// @access  Private
const updateProject = async (req, res) => {
    const project = await Project.findById(req.params.id);

    if (!project) {
        return res.status(404).json({ message: 'Project not found' });
    }

    const updatedProject = await Project.findByIdAndUpdate(req.params.id, req.body, {
        new: true,
    });

    res.status(200).json(updatedProject);
};

// @desc    Delete project
// @route   DELETE /api/projects/:id
// @access  Private
const deleteProject = async (req, res) => {
    const project = await Project.findById(req.params.id);

    if (!project) {
        return res.status(404).json({ message: 'Project not found' });
    }

    await project.deleteOne();
    res.status(200).json({ id: req.params.id });
};

module.exports = {
    getProjects,
    getProjectBySlug,
    createProject,
    updateProject,
    deleteProject
};
