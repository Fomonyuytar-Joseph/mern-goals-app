const asyncHandler = require('express-async-handler');
const Goal = require('../model/goalModel')

//@desc Get goals
//@route GET /api/goals
//@access Private

exports.getAllGoals = asyncHandler(async (req,res,next)=>{
    const goals = await Goal.find();
    
    res.status(200).json({
        status:'success',
        results:goals.length,
        message:goals
    })
})


//@desc Get goals
//@route GET /api/goals
//@access Private
exports.getGoal = asyncHandler(async (req, res, next) => {
  res.status(200).json({
    status: "success",
    message: "get single goals",
  });
});



//@desc create goals
//@route POST /api/goals
//@access Private
exports.createGoal = asyncHandler(async (req, res, next) => {
  console.log(req.body);

  if (!req.body.text) {
    res.status(400);

    throw new Error("Please add a text field");
    // res.status(400).json({
    //     status:'fail',
    //     message:'please add text field'
    // })
  }

  const goal = await Goal.create({
    text: req.body.text,
  });
  res.status(200).json({
    status: "success",
    message: "goal created",
    data:{
        goal
    }
  });
});


//@desc update goals
//@route UPDATE /api/goals/:id
//@access Private

exports.updateGoal = asyncHandler (async (req, res, next) => {
 
    const goal = await Goal.findById(req.params.id);

    if(!goal){
        res.status(404);
        throw new Error('Goal not found')
    }

    const updatedGoal = await Goal.findByIdAndUpdate(req.params.id,req.body,{
        new:true
    });
 
 
 
    res.status(200).json({
    status: "success",
    message: `updated goal`,
    data:{
        updatedGoal
    }
  });
});



//@desc delte goal
//@route delete /api/goals
//@access Private
exports.deleteGoal = asyncHandler (async (req, res, next) => {
 const goal = await Goal.findById(req.params.id);

    if(!goal){
        res.status(404);
        throw new Error('Goal not found')
    }

     await Goal.findByIdAndUpdate(req.params.id);
 
    res.status(204).json({
      status: "success",
      message: `delete goal`,
      id: req.params.id,
    });
});