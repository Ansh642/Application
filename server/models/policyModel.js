const mongoose = require("mongoose");

const PolicySchema = new mongoose.Schema({
    policyholderId: [{
        userId: { 
            type: mongoose.Schema.Types.ObjectId, 
            ref: "User", 
        },
        gender: { 
            type: String, 
            enum: ['Male', 'Female', 'Other'], 
            required: true 
        },
        age: {
            type: Number,  
            required: true
        },
        medicalHistory: {
            type: String,  
            required: true
        },
        startDate: { 
            type: Date, 
            required: true 
        },
        endDate: { 
            type: Date, 
            required: true 
        }
    }],
    policyName: {
        type: String, 
        required: true,
    },
    policyDescription: {
        type: String, 
        required: true,
    },
    coverageAmount: { 
        type: Number, 
        required: true 
    },
    startDate: { 
        type: Date, 
        required: true 
    },
    endDate: { 
        type: Date, 
        required: true 
    },
    imageUrl: {
        type: String,
        required: true
    }
}, { timestamps: true });

module.exports = mongoose.model("Policy", PolicySchema);
