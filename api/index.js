const express = require('express');
const app = express();
const bodyparser = require('body-parser');
const cors = require('cors');
const authRouter = require('./Routes/authRouter');
const privateAPIs = require('./Routes/privateAPIs');
const showInfoRouter = require('./Routes/showInfoRouter');
const cookieParser = require('cookie-parser');
const https = require('https'); 
const fs = require('fs')
require('dotenv').config();
require('./Models/db');

const PORT = process.env.PORT || 4000;

app.get('/',(req,res)=>{
    const message = `${req.method} request on ${req.path}`
    console.log(message);
    res.send({'Your Req': message});
});
app.use(cors({
    origin:`https://${process.env.SERVER_IP}`,
    credentials: true,
    exposedHeaders: ['Authorization']
}));
app.use(cookieParser());
app.use(bodyparser.json());
app.use('/auth',authRouter);
app.use('/user',privateAPIs);
app.use('/show',showInfoRouter);

https.createServer(credentials, app).listen(PORT, '0.0.0.0', () => {
    console.log('Server is live');
})