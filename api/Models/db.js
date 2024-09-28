const mongoose = require('mongoose');
const mongo_url = process.env.MONGO_AUTH

const connectToDatabase = async()=>{
    try{
        await mongoose.connect(mongo_url);
        console.log('Database has been connected');
    }catch(err){
        console.log('There was an error connecting to database :', err);
    }
}
connectToDatabase();