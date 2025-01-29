const mongoose = require("mongoose");

const ClaimSchema = new mongoose.Schema({
    id: { 
        type: String, 
        required: true, 
        unique: true 
    },
    policyId: { 
        type: mongoose.Schema.Types.ObjectId, 
        ref: "Policy", 
        required: true 
    },
    claimAmount: { 
        type: Number, 
        required: true 
    },
    claimDate: { 
        type: Date, 
        required: true 
    },
    status: { 
        type: String, 
        required: true, 
        enum: ["Pending", "Approved", "Rejected"] 
    },
});

module.exports = mongoose.model("Claim", ClaimSchema);
