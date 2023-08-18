const jwt = require('jsonwebtoken');
const asyncHandler = require("express-async-handler");
const User = require("../model/userModel");
const bcrypt = require('bcrypt')  
const dotenv = require("dotenv").config({ path: "../.env" }); 
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

     //registration process
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
        
       },
       token:generateToken(user._id)
  
     });
}else{
    res.status(400)
    throw new Error('Invalid user data')
}


})


exports.loginUser = asyncHandler(async (req,res,next)=>{
    const {email,password} = req.body
    //check for user email
    const user = await User.findOne({email})

    if (user && (await bcrypt.compare(password, user.password))) {
      res.status(200).json({
        status: "success",
        data: {
          user,
        },
        token: generateToken(user._id),
      });
    } else {
      res.status(400);
      throw new Error("Invalid credentials");
    }
    // res.status(200).json({
    //     status:'success',
    //     message:'login User'
    // })
})


//@route GET /api.users/me
//@access Private
exports.getMe = asyncHandler(async(req,res,next)=>{
    const {_id,name ,email}= await User.findById(req.user.id)
    // console.log(req.user);
    res.status(200).json({
        status:'success',
       data:{
        id:_id,
        name,
        email
       }
    })
})



const generateToken =(id)=>{
    return jwt.sign({id},process.env.JWT_SECRET,{
        expiresIn:'30d'
    })
}



