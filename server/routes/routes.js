const express = require('express');
const router = express.Router();
const userController = require('./userController');
const profileController = require('./profileController');
const searchController = require('./searchController');
const plannerController = require('./plannerController');

// User Routers
router.route('/user').get(userController.getUser);
router.route('/user').post(userController.addUser);

// Profile Routers
router.route('/profile/:id').get(profileController.getProfile);
router.route('/profile').post(profileController.addProfile);
router.route('/profile/:id').patch(profileController.updateProfile);
router.route('/profile/:id').delete(profileController.deleteProfile);

// Search Routers
router.route('/search').get(searchController.getSearch);

// Stack Overflow suggestion to fix patch issue: I see no effect
// router.use(express.json())

// Planner Routers
router.route('/planner/:id').get(plannerController.getPlans);
router.route('/planner').post(plannerController.addPlan);
router.route('/planner/:id/addAct').patch(plannerController.addAct);
router.route('/planner/:id/delAct').patch(plannerController.delAct);
router.route('/planner/:id').delete(plannerController.delPlan);

module.exports = router;
