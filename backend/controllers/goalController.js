const asyncHandler = require('express-async-handler');
//@desc Get goals
//@route GET /api/goals
//@access Private

exports.getAllGoals = asyncHandler(async (req,res,next)=>{
    res.status(200).json({
        status:'success',
        message:'get all goals'
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
  res.status(200).json({
    status: "success",
    message: "create goals",
  });
});


//@desc update goals
//@route UPDATE /api/goals/:id
//@access Private

exports.updateGoal = asyncHandler (async (req, res, next) => {
  res.status(200).json({
    status: "success",
    message: `update goal ${req.params.id}`,
  });
});



//@desc delte goal
//@route delete /api/goals
//@access Private
exports.deleteGoal = asyncHandler ((req, res, next) => {
  res.status(204).json({
    status: "success",
    message: `delete goal ${req.params.id}`,
  });
});