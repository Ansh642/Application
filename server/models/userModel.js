const mongoose = require('mongoose');

const userSchema = new mongoose.Schema({
    name: {
        type: String,
        required: true,
    },
    email: {
        type: String,
        required: true,
    },
    password: {
        type: String,
        required: true,
    },
    image:{
        type:String,
        required: true,
    },
    policies:[{
        type: mongoose.Schema.Types.ObjectId, 
        ref: "Policy",
    }],
    claims:[{
        type: mongoose.Schema.Types.ObjectId, 
        ref: "Claim",
    }],
    role:{
        type:Number,
        default:0
    }
});

const User = mongoose.model('User', userSchema);

module.exports = User;
