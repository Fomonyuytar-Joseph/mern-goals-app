const mongoose = require('mongoose');


const userSchema = mongoose.Schema(
   {
     
        user:{
   type:mongoose.Schema.Types.ObjectId,
   required:true,
   ref:'User'
        },
    name:{
        type:String,
        required:[true,'Please add a name field']
    },
    
      email:{
        type:String,
        required:[true,'Please add an email field'],
        // unique:true
    },
    
    
      password:{
        type:String,
        required:[true,'Please add a password field'],
    },

    
        
     
   }
    
    )


    module.exports = mongoose.model('User',userSchema)

