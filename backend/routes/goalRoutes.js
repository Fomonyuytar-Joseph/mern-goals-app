const express = require("express");
const {getAllGoals,getGoal,createGoal,deleteGoal,updateGoal}= require('./../controllers/goalController')

const router= express.Router();



router.route('/').get(getAllGoals).post(createGoal);
router.route('/:id').get(getGoal).patch(updateGoal).delete(deleteGoal);


module.exports = router;