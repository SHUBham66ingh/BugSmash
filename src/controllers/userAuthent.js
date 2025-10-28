const User = require("../models/user");
const validate = require('../utils/validator');
const bcrypt = require("bcrypt");
const jwt = require('jsonwebtoken');


const register = async (req , res)=>{

    try{
        // validate the data
        User.validate(req.body);
   const {firstName , emailId , password} = req.body;

   req.body.password = await bcrypt.hash(password , 10);
   const user = await  User.create(req.body);
    const token =  jwt.sign({_id:user._id , emailId:emailId} ,process.env.JWT_KEY, {expiresIn : 60*60});
   res.cookie('token' , token , {maxAge: 60*60*1000});
   res.status(201).send("user registered successfully");
    }

    catch(err){
   res.status(400).send("error"+err );
    }
}

const login = async ( req ,res)=>{

     try{
          const {emailId , password } = req.body;

          if(!emailId)
            throw new Error("Invalid credentials");
        if(!password)
            throw new Error("Invalid credentilas");

        const user  = await  User.findOne({emailId});

        const match = bcrypt.compare(password ,  user.password);

         if(!match)
            throw new Error("Invalid credentials");

   const token =  jwt.sign({_id:user._id , emailId:emailId} ,process.env.JWT_KEY, {expiresIn : 60*60});
   res.cookie('token' , token , {maxAge: 60*60*1000});
   res.status(200).send("logged in sucessfully");
     }
     catch(err)
     {
        res.status(401).send("error:" , +err);
     }

}

const logout = asyn( req , res)=>{
     try{
        // validate the token
        // token add kar dunga reddis ke bloklist me
        // cookies ko clear kar dena

     }
     catch(err){


     }
}

module.exports = {register , login , logout};