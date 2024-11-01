const showsController = require('../Controllers/showsController');
const router = require('express').Router();

router.get('/bookedTickets',showsController.bookedTicketsController);

module.exports = router;