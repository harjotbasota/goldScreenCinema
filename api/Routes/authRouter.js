const router = require('express').Router();
const authController= require('../Controllers/userController');

router.post('/signup',authController.signUpUserController);
router.post('/login',authController.logInUserController);
router.post('/logout',authController.logOutUserController);


module.exports = router;
