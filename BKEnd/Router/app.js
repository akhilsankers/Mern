const express = require('express');
const router = express.Router();
const upload = require('../middlewares/upload');
const { authMiddleware, requireRole } = require('../middlewares/auth');
const { applyForJob, getApplicationsByJob, getMyApplications, updateApplicationStatus } = require('../Controller/applicationcontroller');

// Apply for job
router.post('/apply',authMiddleware,requireRole('jobseeker'),upload.single('resume'),applyForJob);

//  Employer: Get all applications for a specific job they posted
router.get('/job/:jobId',authMiddleware,requireRole('employer'),getApplicationsByJob);

// Jobseeker View all applications made by the logged-in user
router.get('/my',authMiddleware,requireRole('jobseeker'),getMyApplications);

// routes/applicationRoutes.js
router.put('/:id/status', authMiddleware, requireRole('employer'), updateApplicationStatus);


module.exports = router;
