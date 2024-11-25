const express = require('express');
const app = express();
const bodyparser = require('body-parser');
const cors = require('cors');
const authRouter = require('./Routes/authRouter');
const privateAPIs = require('./Routes/privateAPIs');
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
app.use(cors({
    origin:'http://localhost:3000',
    credentials: true,
    exposedHeaders: ['Authorization']
}));
app.use(cookieParser());
app.use(bodyparser.json());
app.use('/auth',authRouter);
app.use('/user',privateAPIs);
app.use('/show',showInfoRouter);

app.listen(PORT,'0.0.0.0',()=>{
    console.log(`Server is live on port ${PORT}`);
})