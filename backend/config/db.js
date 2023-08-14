const mongoose = require('mongoose');
const dotenv = require("dotenv").config();

// dotenv.config({ path: "./config.env" });

const connectDB= async ()=>{
// console.log(process.env.PORT);
// console.log(require("dotenv").config());
    try{


        const conn = await mongoose.connect(process.env.DATABASE_LOCAL);
        console.log(`mongoose connnected to ${conn.connection.host}`);

    }catch(err){

        console.log(err);
        process.exit(1);

    }
}

module.exports  = connectDB