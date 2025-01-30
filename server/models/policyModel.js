const mongoose = require("mongoose");

const PolicySchema = new mongoose.Schema({

    policyholderId: { 
        type: mongoose.Schema.Types.ObjectId, 
        ref: "Policyholder", 
        required: true 
    },
    policyNumber: { 
        type: String, 
        required: true, 
        unique: true 
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
}, { timestamps: true });

module.exports = mongoose.model("Policy", PolicySchema);

