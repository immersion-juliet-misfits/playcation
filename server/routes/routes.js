import Express from 'express';
import userController from './userController';
const router = Express.Router();

// User Routers
router.route('/user').get(userController.getUser);
// router.route('/user').post(userController.addUser);

module.exports = router;
