const Job = require('../models/job');

// Create Job 
const createJob = async (req, res) => {
  try {
    const { title, description, type, location, company, salaryRange, category } = req.body;

    if (!title || !description || !location || !company) {
      return res.status(400).json({ message: 'Please provide all required fields' });
    }

    const newJob = new Job({
      title,
      description,
      type,
      location,
      company,
      salaryRange,
      category,
      postedBy: req.user._id
    });

    await newJob.save();
    res.status(201).json({ success: true, message: 'Job created successfully', data: newJob });
  } catch (err) {
    console.error(err);
    res.status(500).json({ message: 'Server error' });
  }
};

// Update Job 
const updateJob = async (req, res) => {
  try {
    const job = await Job.findById(req.params.id);
    if (!job) return res.status(404).json({ message: 'Job not found' });

    if (String(job.postedBy) !== String(req.user._id)) {
      return res.status(403).json({ message: 'Not allowed' });
    }

    const updated = await Job.findByIdAndUpdate(req.params.id, req.body, { new: true });
    res.json({ success: true, data: updated });
  } catch (err) {
    console.error(err);
    res.status(500).json({ message: 'Server error' });
  }
};

//  Delete Job 
const deleteJob = async (req, res) => {
  try {
    const job = await Job.findById(req.params.id);
    if (!job) return res.status(404).json({ message: 'Job not found' });

    if (String(job.postedBy) !== String(req.user._id)) {
      return res.status(403).json({ message: 'Not allowed' });
    }

    await job.deleteOne();
    res.json({ success: true, message: 'Job deleted successfully' });
  } catch (err) {
    console.error(err);
    res.status(500).json({ message: 'Server error' });
  }
};

//  Get All Jobs 
const getJobs = async (req, res) => {
  try {
    const { q, type, location, category, page = 1, limit = 20 } = req.query;
    const filter = {};

    if (q) {
      const regex = new RegExp(q, 'i');
      filter.$or = [{ title: regex }, { company: regex }, { description: regex }];
    }
    if (type) filter.type = type;
    if (location) filter.location = new RegExp(location, 'i');
    if (category) filter.category = category;

    const skip = (Math.max(1, Number(page)) - 1) * Number(limit);
    const jobs = await Job.find(filter).sort({ createdAt: -1 }).skip(skip).limit(Number(limit));
    const total = await Job.countDocuments(filter);

    res.json({ success: true, count: jobs.length, total, data: jobs });
  } catch (err) {
    console.error(err);
    res.status(500).json({ message: 'Server error' });
  }
};

//  Get Single Job
const getJob = async (req, res) => {
  try {
    const job = await Job.findById(req.params.id).populate('postedBy', 'name email company');
    if (!job) return res.status(404).json({ message: 'Job not found' });
    res.json({ success: true, data: job });
  } catch (err) {
    console.error(err);
    res.status(500).json({ message: 'Server error' });
  }
};

// Get Jobs Posted by  Employer
const getMyJobs = async (req, res) => {
  try {
    const jobs = await Job.find({ postedBy: req.user._id }).sort({ createdAt: -1 });
    res.json({ success: true, count: jobs.length, data: jobs });
  } catch (err) {
    console.error(err);
    res.status(500).json({ message: 'Server error' });
  }
};

module.exports = {
  createJob,
  updateJob,
  deleteJob,
  getJobs,
  getJob,
  getMyJobs
};
