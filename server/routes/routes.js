const express = require('express');
const userController = require('./userController');
const router = express.Router();

// User Routers
router.route('/user').get(userController.getUser);
router.route('/user').post(userController.addUser);


module.exports = router;
