const mongoose = require('mongoose');

const jobsSchema = new mongoose.Schema({
    recruiterId: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Recruiter'
    },
    jobs: [{
        title: {
            type: String
        },
        description: {
            type: String
        },
        skills: {
            type: String
        },
        lastDate: {
            type: Date
        }
    }]
}, {timestamps: true});

module.exports = mongoose.model('Jobs', jobsSchema);