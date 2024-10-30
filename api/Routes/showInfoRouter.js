const router = require('express').Router();

router.get('/myshow',()=>{
    console.log('for show booked seats');
})

module.exports = router;