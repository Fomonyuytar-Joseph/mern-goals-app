const fs = require("fs");
const mongoose = require("mongoose");
require("dotenv").config({ path: "../.env" });
const Goal = require("./../model/goalModel");

const express = require("express");

const app = express();


console.log(require("dotenv").config());



mongoose
  .connect(process.env.DATABASE_LOCAL, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
  })
  .then(() => console.log("suceesful"));

const port = process.env.PORT || 5000;
app.listen(port, () => {
  console.log(`app running on port ${port}`);
});

//Read JSon file
const goals = JSON.parse(
  fs.readFileSync(`${__dirname}/goals-data.json`, "utf-8")
);

//import data into database
const importData = async () => {
  try {
    await Goal.create(goals);
    console.log("data suceesful imported");
    process.exit();
  } catch (err) {
    console.log(err);
  }
};

//delete all data from databse

const deleteData = async () => {
  try {
    await Goal.deleteMany();
    console.log("data suceesful deleted");
    process.exit();
  } catch (err) {
    console.log(err);
  }
};

if (process.argv[2] === "--import") {
  importData();
} else if (process.argv[2] === "--delete") {
  deleteData();
}

console.log('asadsadas',require("dotenv").config({path:'../.env'}));


// console.log(dotenv);
// console.log(process.argv);
