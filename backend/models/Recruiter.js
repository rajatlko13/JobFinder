const mongoose = require('mongoose');

const recruiterSchema = new mongoose.Schema({
    company: {
        type: String
    },
    email: {
        type: String,
        unique: true
    },
    contact: {
        type: Number
    },
    password: {
        type: String
    }
}, {timestamps: true});

module.exports = mongoose.model('Recruiter', recruiterSchema);