const router = require('express').Router();
const authController= require('../Controllers/userController');

router.post('/signup',authController.signUpUserController);
router.post('/login',authController.logInUserController);


module.exports = router;
