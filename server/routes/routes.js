const express = require('express');
const router = express.Router();
const userController = require('./userController');
const profileController = require('./profileController');
const searchController = require('./searchController');

// User Routers
router.route('/user').get(userController.getUser);
router.route('/user').post(userController.addUser);

// Profile Routers
router.route('/profile').get(profileController.getProfile);
router.route('/profile').post(profileController.addProfile);
router.route('/profile').put(profileController.updateProfile);
router.route('/profile').delete(profileController.deleteProfile);

// Search Routers
router.route('/search').get(searchController.getSearch);


module.exports = router;
