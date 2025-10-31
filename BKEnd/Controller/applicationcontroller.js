const Application = require('../models/Application');
const Job = require('../models/job');

//  Apply for a Job (Job Seeker)
const applyForJob = async (req, res) => {
  try {
    const { jobId, name, email, message } = req.body;

    if (!jobId || !name || !email) {
      return res.status(400).json({ message: 'Please provide all required fields' });
    }

    const job = await Job.findById(jobId);
    if (!job) {
      return res.status(404).json({ message: 'Job not found' });
    }

    // Resume upload 
    const resumeUrl = req.file ? `/uploads/resumes/${req.file.filename}` : null;

    const application = new Application({
      job: job._id,
      applicant: req.user ? req.user._id : null,
      name,
      email,
      message,
      resumeUrl
    });

    await application.save();

    res.status(201).json({
      success: true,
      message: 'Application submitted successfully',
      data: application
    });
  } catch (err) {
    console.error(err);
    res.status(500).json({ message: 'Server Error' });
  }
};

// Employer: Get Applications for a Specific Job
const getApplicationsByJob = async (req, res) => {
  try {
    const { jobId } = req.params;

    const job = await Job.findById(jobId);
    if (!job) {
      return res.status(404).json({ message: 'Job not found' });
    }

    // Only job owner  can view applications
    if (String(job.postedBy) !== String(req.user._id) && req.user.role !== 'admin') {
      return res.status(403).json({ message: 'Not allowed' });
    }

    const applications = await Application.find({ job: jobId })
      .sort({ createdAt: -1 })
      

    res.status(200).json({
      success: true,
      count: applications.length,
      data: applications
    });
  } catch (err) {
    console.error(err);
    res.status(500).json({ message: 'Server Error' });
  }
};

// Job Seeker: Get My Applications
const getMyApplications = async (req, res) => {
  try {
    //  FIX: populate the correct field name ('job', not 'jobId')
    const applications = await Application.find({ applicant: req.user._id })
      .populate('job', 'title company location');

    res.status(200).json({
      success: true,
      count: applications.length,
      data: applications
    });
  } catch (err) {
    console.error(err);
    res.status(500).json({ message: 'Server Error' });
  }
};

const updateApplicationStatus = async (req, res) => {
  try {
    const { id } = req.params;
    const { status } = req.body;

    if (!['accepted', 'rejected'].includes(status)) {
      return res.status(400).json({ message: 'Invalid status' });
    }

    const application = await Application.findById(id).populate('job');

    if (!application) {
      return res.status(404).json({ message: 'Application not found' });
    }

    // Only job owner can update status
    if (String(application.job.postedBy) !== String(req.user._id) && req.user.role !== 'admin') {
      return res.status(403).json({ message: 'Not allowed' });
    }

    application.status = status;
    await application.save();

    res.status(200).json({ success: true, message: `Application ${status} successfully` });
  } catch (err) {
    console.error(err);
    res.status(500).json({ message: 'Server Error' });
  }
};

module.exports = {
  applyForJob,
  getApplicationsByJob,
  getMyApplications,
  updateApplicationStatus
};
