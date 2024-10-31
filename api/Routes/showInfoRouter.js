const showsController = require('../Controllers/showsController');
const router = require('express').Router();

router.get('/bookedTickets',showsController.bookedTicketsController);
router.post('/bookTickets',showsController.bookTicketController);

module.exports = router;