const express = require('express');
const dontenv = require("dotenv").config();
const {errorHandler} = require('./middleware/errorMiddleware')
const morgan = require("morgan");
const goalRouter = require('./routes/goalRoutes')

const port = process.env.PORT || 5000


const app = express();

app.use(express.json());
app.use(express.urlencoded({extended: false})); 
app.use(morgan("dev"));

app.use('/api/v1/goals',goalRouter)


app.use(errorHandler)

app.listen(port,()=> console.log(`listening on port ${port}`));


