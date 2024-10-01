const router = require('express').Router();

router.post('/login',(req,res)=>{
    console.log('login successful');
})
router.post('/signup',(req,res)=>{
    console.log('signup Msg');
    console.log(req.body);
    const {username} = req.body;
    if(username == 'harjotbasota'){
        res.status(400).json({message:'Username is not allowed'});
    }
    res.status(200).json({message:'Account has been created'});
})
module.exports = router;
