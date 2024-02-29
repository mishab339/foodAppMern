const express = require('express');
const router = express.Router();

const User = require('../models/user');
const { body ,validationResult} = require('express-validator');
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
const jwtSecret = "MuhammedMishab"

router.post('/createUser',[
    body('email').isEmail(),
    body('password','incorrect password').isLength({min:5}),
    body('name').isLength({min:5})
]
,async (req,res)=>{
    console.log(req.body.name,
        req.body.password,
        req.body.email,
        req.body.location)
    const error = validationResult(req)
    if(!error.isEmpty()){
        return res.status(400).json({error:error.array()});
    }
    const salt = await bcrypt.genSalt(10);
    const secPassword = await bcrypt.hash(req.body.password,salt);
    try{
        await User.create({
           name:req.body.name,
           password:secPassword,
           email:req.body.email,
           location:req.body.location
        }).then(res.json({success:true}))
        
    }catch (error){
        console.log(error);
        res.json({success:false});
    }
})
router.post('/loginUser',[
    body('email').isEmail(),
    body('password','incorrect password').isLength({min:5}),
],async (req,res)=>{
    const error = validationResult(req)
    if(!error.isEmpty()){
        return res.status(400).json({error:error.array()});
    }
    let email = req.body.email;
    try{
     let userData = await User.findOne({email});
     console.log(userData)
     if(!userData){
        return res.status(400).json({error:'Try login with correct credentials'})
     }
     const pwdCompare = await bcrypt.compare(req.body.password,userData.password);
     if(!pwdCompare){
        return res.status(400).json({error:'Try login with correct credentialskkk'})
     }
     const data = {
        user:{
            id:userData.id
        }
     }
     const authToken = jwt.sign(data,jwtSecret)
     return res.json({success:true,authToken:authToken});
    }catch (error){
        console.log(error);
        res.json({success:false});
    }
})
module.exports = router;
