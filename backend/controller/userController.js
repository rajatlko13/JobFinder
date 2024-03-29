const User = require('../models/User');
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');

// getting the list of users
const getList = async (req,res) => {
    try{
        console.log('in getList api');
        const userList = await User.find();
        res.json(userList);
    }catch(err){
        console.log("Error: ",err);
        res.json(err);
    }
}

const get = async (req,res) => {
    try{
        console.log('in get api');
        const user = await User.findById(req.params.id);
        res.json(user);
    }catch(err){
        console.log("Error: ", error);
        res.json(err);
    }
}

const register = async (req,res) => {
    try{
        console.log('in add api');
        console.log(req.body);
        const salt = await bcrypt.genSalt(10);
        const hashPassword = await bcrypt.hash(req.body.password, salt);
        const newUser = new User({
            name: req.body.name,
            dob: req.body.dob,
            email: req.body.email,
            password: hashPassword
        });
        const user = await newUser.save();
        res.json(user);
    }catch(err){
        console.log("Error: ",error);
        res.status(400).json({
            error: "Email already registered"
        });
    }
} 

const update = async (req,res) => {
    try{
        console.log('in update api');
        const user = {
            name: req.body.name,
            dob: req.body.dob
        };
        const updatedUser = await User.findByIdAndUpdate(req.body._id, user);
        res.json(updatedUser);
    }catch(err){
        console.log("Error: ",err);
        res.json(err);
    }
}

const remove = async (req,res) => {
    try{
        console.log('in delete api');
        const deletedUser = await User.findByIdAndDelete(req.params.id);
        res.json(deletedUser);
    }catch(err){
        console.log("Error: ",err);
        res.json(err);
    }
}

const login = async (req,res) => {
    try {
        console.log('in login api');
        console.log(req.body);
        const user = await User.findOne({email: req.body.email});
        if(user){
            const valid = await bcrypt.compare(req.body.password, user.password);
            if(!valid)
                res.status(401).json({             // 401-unauthorised
                    'error': 'Wrong Password'
                });
            
            const token = jwt.sign({email: user.email, role: "user"}, 'TOKEN_SECRET');
            res.status(200).json({"token": token});
        }
        else{
            res.status(404).json({                      
                'error': 'Invalid Details'
            });
        }
    } catch (error) {
        console.log("Error: ",error);
        res.status(400).json({                      //400-Bad Request
            'error': 'Unexpected Error'
        });
    }
}

module.exports = { getList, get, register, update, remove, login};
