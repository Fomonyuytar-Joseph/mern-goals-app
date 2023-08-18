const express = require("express");
const {getAllGoals,getGoal,createGoal,deleteGoal,updateGoal}= require('./../controllers/goalController');
const {protect}= require('../middleware/authMiddleware')

const router= express.Router();



router.route('/').get(protect,getAllGoals).post(protect,createGoal);
router.route('/:id').get(protect,getGoal).patch(protect,updateGoal).delete(protect,deleteGoal);


module.exports = router;