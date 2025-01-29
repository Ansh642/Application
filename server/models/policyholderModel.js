const mongoose = require("mongoose");

const PolicyholderSchema = new mongoose.Schema({
    id: { 
    type: String, 
    required: true, 
    unique: true 
    },

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
},{timestamps:true});

module.exports = mongoose.model("Policyholder", PolicyholderSchema);
