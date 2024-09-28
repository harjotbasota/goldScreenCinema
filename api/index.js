const express = require('express');
const app = express();
const bodyparser = require('body-parser');
const cors = require('cors');
const authRouter = require('./Routes/authRouter');
require('dotenv').config();
require('./Models/db');

const PORT = process.env.PORT || 8000;

app.get('/',(req,res)=>{
    const message = `${req.method} request on ${req.path}`
    console.log(message);
    res.send({'Your Req': message});
});
app.use(bodyparser.json());
app.use(cors());
app.use('/auth',authRouter);

app.listen(PORT,()=>{
    console.log(`Server is live on port ${PORT}`);
})