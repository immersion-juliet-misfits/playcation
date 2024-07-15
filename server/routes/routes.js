const express = require('express');
const router = express.Router();
const userController = require('./userController');
const profileController = require('./profileController');
const searchController = require('./searchController');
const plannerController = require('./plannerController');

router.route('/user').get(userController.getUser);
router.route('/user').post(userController.addUser);

router.route('/profile/:id').get(profileController.getProfile);
router.route('/profile').post(profileController.addProfile);
router.route('/profile/:id').patch(profileController.updateProfile);
router.route('/profile/:id').delete(profileController.deleteProfile);

router.route('/search').get(searchController.getSearch);

router.route('/planner/:id').get(plannerController.getPlans);
router.route('/planner').post(plannerController.addPlan);
router.route('/planner/:id/addAct').patch(plannerController.addAct);
router.route('/planner/:id/delAct').patch(plannerController.delAct);
router.route('/planner/:id').delete(plannerController.delPlan);
router.route('/planner/:id/updateNote').patch(plannerController.updateNote);

module.exports = router;
