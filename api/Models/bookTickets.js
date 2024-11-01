const mongoose = require('mongoose');
const schema = mongoose.Schema;

const TicketSchema = new schema({
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
    bookedSeats:{
        type:[],
        required: true,
    }
})

const TicketModel = mongoose.model('Ticket',TicketSchema);
module.exports = TicketModel;