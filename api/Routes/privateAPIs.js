const router = require('express').Router();
const showsController = require('../Controllers/showsController');
const verifyJWT = require('../Middlewares/verifyJWT');

router.post('/bookTickets',verifyJWT.verifyJWT ,showsController.bookTicketController);

router.get('/profile',(req,res)=>{
    res.status(200).json({'message':'user profile info here'})
})

module.exports = router;