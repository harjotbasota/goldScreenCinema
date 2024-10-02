const router = require('express').Router();

router.post('/signup',(req,res)=>{
    console.log('signup Msg');
    console.log(req.body);
    const {username} = req.body;
    if(username == 'harjotbasota'){
        res.status(400).json({message:'Username is not allowed'});
    }
    res.status(200).json({message:'Account has been created'});
})

router.post('/login', (req,res)=>{
    console.log('Login message');
    console.log(req.body);
    res.status(200).json(req.body);
})
module.exports = router;
