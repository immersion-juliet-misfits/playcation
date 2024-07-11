const express = require('express');
const router = express.Router();
const userController = require('./userController');
const searchController = require('./searchController');

// User Routers
router.route('/user').get(userController.getUser);
router.route('/user').post(userController.addUser);

// Search Routers
router.route('/search').get(searchController.getSearch);


module.exports = router;
