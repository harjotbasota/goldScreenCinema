const router = require('express').Router();
const showsController = require('../Controllers/showsController');
const profileInfoController = require('../Controllers/profileInfoController');
const verifyJWT = require('../Middlewares/verifyJWT');

router.post('/bookTickets',verifyJWT.verifyJWT ,showsController.bookTicketController);
router.get('/profile',verifyJWT.verifyJWT,profileInfoController.profileInfoController)

module.exports = router;