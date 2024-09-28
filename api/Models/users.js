const mongoose = require('mongoose');
const schema = mongoose.schema;

const userSchema = new schema({
    username:{
        type: String,
        unique: true,
        required: true
    },
    password:{
        type: String,
        required: true
    }
})

const userModel = mongoose.model('user',userSchema);
module.exports = userModel;