const mongoose = require("mongoose");

const PolicyholderSchema = new mongoose.Schema({
    name: { 
        type: String, 
        required: true 
    },
    email: { 
        type: String, 
        required: true, 
        unique: true 
    },
    phone: { 
        type: String, 
        required: true, 
        unique: true 
    },
    users:[{
        type: mongoose.Schema.Types.ObjectId, 
        ref: "User",
    }]
}, { timestamps: true });

module.exports = mongoose.model("Policyholder", PolicyholderSchema);
