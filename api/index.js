const express = require('express');
const app = express();

require('dotenv').config();
const PORT = process.env.PORT || 8000;

app.get('/',(req,res)=>{
    const message = `${req.method} request on ${req.path}`
    console.log(message);
    res.send({'Your Req': message});
});

app.listen(PORT,()=>{
    console.log(`Server is live on port ${PORT}`);
})