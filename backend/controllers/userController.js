const jwt = require('jsonwebtoken');
const asyncHandler = require("express-async-handler");
const User = require("../model/userModel");
const bcrypt = require('bcrypt')   
//@desc Authenticate new user
//@route POST /api/users/login
// @access Public

exports.registerUser = asyncHandler( async (req,res,next)=>{
    const {name,email,password}= req.body


    console.log(req.body);

    if(!name || !email || !password){
     res.status(400);
     throw new Error('Please add all fields')   
    }


    //check if user exisits
    const userExists = await User.findOne({email})

    if(userExists){
         res.status(400);
         throw new Error("user already exists");  

    }


    const salt = await  bcrypt.genSalt(10);
    const hashedPassword= await bcrypt.hash(password ,salt );
   
    const user = await User.create({
        name,
        email,
        password:hashedPassword
    })

if(user){
     res.status(201).json({
       status: "success",
       data:{
       user
        
       }
  
     });
}else{
    res.status(400)
    throw new Error('Invalid user data')
}


})


exports.loginUser = asyncHandler((req,res,next)=>{
    res.status(200).json({
        status:'success',
        message:'login User'
    })
})




exports.getMe = asyncHandler((req,res,next)=>{
    res.status(200).json({
        status:'success',
        message:'get a User'
    })
})



