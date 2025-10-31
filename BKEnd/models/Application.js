const mongoose = require('mongoose');

const applicationSchema = new mongoose.Schema({
  job:
   { type: mongoose.Schema.Types.ObjectId, 
    ref: 'Job' },
  applicant: 
  { type: mongoose.Schema.Types.ObjectId,
     ref: 'User' },
  name:{
    type: String
  },
  email: {
    type: String
  },
  resumeUrl: {
    type: String
  },
  message: {
    type: String
  },
  status: {
    type: String,
    enum: ['pending', 'accepted', 'rejected'],
    default: 'pending',
  },
}, { timestamps: true });

module.exports = mongoose.model('Application', applicationSchema);
