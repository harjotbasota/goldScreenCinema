const mongoose = require('mongoose');
const schema = mongoose.Schema;

const userSchema = new schema({
    username:{
        type: String,
        unique: true,
        required: true
    },
    email:{
        type: String,
        unique: true,
        required: true
    },
    password:{
        type: String,
        required: true
    },
    refreshToken:{
        type:String,
        default:''
    },
    bookedShows:{
        type: [
            {
                movieID:{
                    type: Number,
                    required: true
                },
                cinemaID:{
                    type: Number,
                    required: true
                },
                showDate:{
                    type: String,
                    required: true
                },
                showTime:{
                    type: String,
                    required: true
                },
                bookedSeats:{
                    type: [],
                    required: true
                }
            }
        ],
        default: []     
    }
})

const userModel = mongoose.model('user',userSchema);
module.exports = userModel;