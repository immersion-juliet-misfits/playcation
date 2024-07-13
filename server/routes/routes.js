const express = require('express');
const userController = require('./userController');
const profileController = require('./profileController');
const router = express.Router();

// User Routers
router.route('/user').get(userController.getUser);
router.route('/user').post(userController.addUser);

// Profile Routers
router.route('/profile').get(profileController.getProfile);
router.route('/profile').post(profileController.addProfile);
router.route('/profile').put(profileController.updateProfile);
router.route('/profile').delete(profileController.deleteProfile);

module.exports = router;
