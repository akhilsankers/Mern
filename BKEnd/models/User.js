const mongoose = require('mongoose');

const userSchema = new mongoose.Schema({
    username: {
        type : String,
        required : true
    },

    email: {
        type : String,
        required : true,
        unique : true
    },
    password: {
        type : String,
        required : true,
    },
    role : {
        type : String,
        enum : ['jobseeker', 'employer', 'admin'],
        default : 'jobseeker',
    },
    phone : {
        type : String,
    },
    location : {
        type : String
    },
    company: { type: String }
}, {timestamps: true});

const User = mongoose.model('User', userSchema);
module.exports = User;