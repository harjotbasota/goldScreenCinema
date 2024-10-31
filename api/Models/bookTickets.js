const mongoose = require('mongoose');
const schema = mongoose.Schema;

const TicketsSchema = new schema({
    movieID:{
        type:Number,
        required: true
    },
    cinemaID:{
        type:Number,
        required: true
    },
    showDate:{
        type:String,
        required: true
    },
    showTime:{
        required:true,
        type: String
    },
    bookedTickets:{
        type:[],
        required: true,
    }
})

const TicketsModel = mongoose.model('Tickets',TicketsSchema);
module.exports = TicketsModel;