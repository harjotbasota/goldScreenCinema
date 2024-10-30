const express = require('express');
const app = express();
const bodyparser = require('body-parser');
const cors = require('cors');
const authRouter = require('./Routes/authRouter');
const privatePageRouter = require('./Routes/privatePageRouter');
const showInfoRouter = require('./Routes/showInfoRouter');
const cookieParser = require('cookie-parser');

require('dotenv').config();
require('./Models/db');

const PORT = process.env.PORT || 8000;

app.get('/',(req,res)=>{
    const message = `${req.method} request on ${req.path}`
    console.log(message);
    res.send({'Your Req': message});
});
app.use(cookieParser());
app.use(bodyparser.json());
app.use(cors({
    origin:'http://localhost:3000',
    credentials: true
}));
app.use('/auth',authRouter);
app.use('/user',privatePageRouter);
app.use('/show',showInfoRouter);

app.listen(PORT,()=>{
    console.log(`Server is live on port ${PORT}`);
})