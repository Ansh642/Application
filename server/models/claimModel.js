const mongoose = require("mongoose");

const ClaimSchema = new mongoose.Schema({

    policyholderId: { 
        type: mongoose.Schema.Types.ObjectId, 
        ref: "User", 
        required: true 
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
        required: true, 
        default: Date.now 
    }, 
    status: { 
        type: String, 
        required: true, 
        enum: ["Pending", "Approved", "Rejected"], 
        default: "Pending" 
    }
}, { timestamps: true });


module.exports = mongoose.model("Claim", ClaimSchema);

