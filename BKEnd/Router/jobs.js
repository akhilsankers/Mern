const express = require('express');
const router = express.Router();
const jobController = require('../Controller/jobController');
const { authMiddleware, requireRole } = require('../middlewares/auth');


router.get('/', jobController.getJobs);
router.get('/:id', jobController.getJob);

router.post('/', authMiddleware, requireRole('employer'), jobController.createJob);
router.put('/:id', authMiddleware, requireRole('employer'), jobController.updateJob);
router.delete('/:id', authMiddleware, requireRole('employer'), jobController.deleteJob);

router.get('/my/jobs', authMiddleware, requireRole('employer'), jobController.getMyJobs);

module.exports = router;
