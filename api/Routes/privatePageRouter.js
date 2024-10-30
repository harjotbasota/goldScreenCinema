const router = require('express').Router();

router.post('/bookTicket',(req,res)=>{
    console.log('book ticket private route')
})

router.get('/profile',(req,res)=>{
    res.status(200).json({'message':'user profile info here'})
})

module.exports = router;