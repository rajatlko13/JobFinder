const Recruiter = require('../models/Recruiter');
const Jobs = require('../models/Jobs');
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');

const getList = async (req,res) => {
    try{
        console.log('in getList api');
        const recruiterList = await Recruiter.find();
        res.json(recruiterList);
    }catch(err){
        res.json(err);
    }
}

const get = async (req,res) => {
    try{
        console.log('in get api');
        const recruiter = await Recruiter.findById(req.params.id);
        res.json(recruiter);
    }catch(err){
        res.json(err);
    }
}

const register = async (req,res) => {
    try{
        console.log('in register api');
        console.log(req.body);
        const salt = await bcrypt.genSalt(10);
        const hashPassword = await bcrypt.hash(req.body.password, salt);
        const newRecruiter = new Recruiter({
            company: req.body.company,
            email: req.body.email,
            contact: req.body.contact,
            password: hashPassword
        });
        const recruiter = await newRecruiter.save();
        
        const newJobs = new Jobs({
            recruiterId: recruiter._id
        });
        const jobs = await newJobs.save();
        res.json(recruiter);
    }catch(err){
        console.log(err);
        res.status(400).json({
            error: "Email already registered"
        });
    }
} 

const update = async (req,res) => {
    try{
        console.log('in update api');
        const recruiter = {
            company: req.body.company,
            contact: req.body.contact
        };
        const updatedRecruiter = await Recruiter.findByIdAndUpdate(req.body._id, recruiter);
        res.json(updatedRecruiter);
    }catch(err){
        res.json(err);
    }
}

const remove = async (req,res) => {
    try{
        console.log('in delete api');
        const deletedRecruiter = await Recruiter.findByIdAndDelete(req.params.id);
        res.json(deletedRecruiter);
    }catch(err){
        res.json(err);
    }
}

const login = async (req,res) => {
    try {
        console.log('in login api');
        console.log(req.body);
        const recruiter = await Recruiter.findOne({email: req.body.email});
        if(recruiter){
            const valid = await bcrypt.compare(req.body.password, recruiter.password);
            if(!valid)
                res.status(401).json({             // 401-unauthorised
                    'error': 'Wrong Password'
                });
            
            const token = jwt.sign({ recruiterId: recruiter._id ,email: recruiter.email, role: "recruiter"}, 'TOKEN_SECRET');
            res.status(200).json({"token": token});
        }
        else{
            res.status(404).json({                      
                'error': 'Invalid Details'
            });
        }
    } catch (error) {
        res.status(400).json({                      //400-Bad Request
            'error': 'Unexpected Error'
        });
    }
}

module.exports = { getList, get, register, update, remove, login};