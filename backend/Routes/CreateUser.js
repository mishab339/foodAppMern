const express = require('express');
const router = express.Router();

const User = require('../models/user');
const { body ,validationResult} = require('express-validator');

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
    try{
        await User.create({
           name:req.body.name,
           password:req.body.password,
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
     if(req.body.password !== userData.password){
        return res.status(400).json({error:'Try login with correct credentials'})
     }
     return res.json({success:true});
    }catch (error){
        console.log(error);
        res.json({success:false});
    }
})
module.exports = router;
