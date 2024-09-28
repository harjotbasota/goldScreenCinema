const router = require('express').Router();

router.post('/login',(req,res)=>{
    console.log('login successful');
})
router.post('/signup',(req,res)=>{
    console.log('signup')
})
module.exports = router;
