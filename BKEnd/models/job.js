const mongoose = require('mongoose');

const jobSchema = new mongoose.Schema({
  title: {
    type: String
  },
  company: {
    type: String
  },
  type: 
  { 
    type: String,
     enum: ['Full-time','Part-time','Remote'], 
     default: 'Full-time'
},
  salaryRange: {
    type: String
  },
  description: {
    type: String
  },
  location: {
    type: String
  },
  category: 
  {
    type: String
  },
  postedBy: 
  { type: mongoose.Schema.Types.ObjectId, 
    ref: 'User' 
},
}, { timestamps: true });

const jobs = mongoose.model('Job', jobSchema);
module.exports = jobs;
