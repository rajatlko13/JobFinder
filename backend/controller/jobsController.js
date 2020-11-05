const Jobs = require('../models/Jobs');

const getJobList = async (req,res) => {
    try {
        console.log("in getJobList api");
        const jobs = await Jobs.find();
        res.json(jobs);
    } catch (error) {
        res.json(error);
    }
}

const getJob = async (req,res) => {
    try{
        console.log('in getJob api');
        const job = await Jobs.findOne({recruiterId: req.params.recruiterId});
        res.json(job);
    }catch(error){
        res.json(error);
    }
}

const getSingleJob = async (req,res) => {
    try{
        console.log('in getSingleJob api');
        const job = await Jobs.findOne({ 'recruiterId': req.params.recruiterId })
                            .select({ 'jobs': { $elemMatch: { '_id': req.params.jobId }} });
        console.log(job);
        res.json(job);
    }catch(err){
        res.json(err);
    }
}

const addJob = async (req,res) => {
    try{
        console.log('in add api');
        console.log(req.body);
        const newJob = {
            title: req.body.title,
            description: req.body.description,
            skills: req.body.skills,
            lastDate: req.body.lastDate
        }
        const job = await Jobs.findOneAndUpdate(
            { recruiterId: req.params.recruiterId },
            { $push: { jobs: newJob }}
        );
        res.json(job);
    }catch(error){
        res.json(error);
    }
} 

const updateJob = async (req,res) => {
    try{
        console.log('in updateJob api');
        const updatedJob = await Jobs.findOneAndUpdate(
            { 'jobs.recruiterId': req.params.recruiterId, 'jobs._id': req.params.jobId },
            { $set: {
                'jobs.$.title': req.body.title,
                'jobs.$.description': req.body.description,
                'jobs.$.skills': req.body.skills,
                'jobs.$.lastDate': req.body.lastDate,
            } }
        );
        res.json(updatedJob);
    }catch(err){
        res.json(err);
    }
}

const removeJob = async (req,res) => {
    try{
        console.log('in removeJob api');
        const deletedJob = await Jobs.findOneAndRemove({
            'recruiterId': req.params.recruiterId,
            'jobs._id': req.params.jobId
        });
        res.json(deletedJob);
    }catch(err){
        res.json(err);
    }
}

module.exports = { getJobList, getJob, getSingleJob, addJob, updateJob, removeJob };