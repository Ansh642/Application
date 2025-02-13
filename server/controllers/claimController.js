const Claim = require('../models/claimModel');
const {mailsend} = require("../utils/mailsend");
const User = require('../models/userModel'); 
const Policy = require('../models/policyModel');


// for admin only
exports.updateClaimStatus = async (req, res) => {
    try {
        const { claimId, status } = req.body;

        // Validate status
        if (!["Approved", "Rejected"].includes(status)) {
            return res.status(400).json({
                success: false,
                message: "Invalid status value.",
            });
        }

        // Find claim and update status
        const updatedClaim = await Claim.findByIdAndUpdate(
            claimId,
            { status },
            { new: true }
        ).populate("claimholderId", "email name");

        if (!updatedClaim) {
            return res.status(404).json({
                success: false,
                message: "Claim not found.",
            });
        }

        
        const userEmail = updatedClaim.claimholderId.email;
        const userName = updatedClaim.claimholderId.name;

        await mailsend(userEmail, "Claim Status Update", getEmailBody(userName, status));

        return res.status(200).json({
            success: true,
            message: `Claim ${status} successfully. Email sent to user.`,
            data: updatedClaim,
        });

    } catch (error) {
        console.error("Error in updateClaimStatus:", error); // Debugging log
        return res.status(500).json({
            success: false,
            message: "Internal server error.",
            error: error.message,
        });
    }
};

exports.getPendingClaims = async (req, res) => {
    try {
        // Fetch claims that are still pending
        const pendingClaims = await Claim.find({ status: "Pending" })
            .populate("claimholderId", "name email")  
            .populate("policyId", "policyName imageUrl policyholderId");  

        // Fetch user details from the policyholderId array
        const userDetails = await Promise.all(pendingClaims.map(async (claim) => {
            const policy = await Policy.findById(claim.policyId._id); // Find policy
            const policyholder = policy.policyholderId.find(ph => ph.userId.toString() === claim.claimholderId._id.toString());

            return {
                age: policyholder ? policyholder.age : "Not Provided",
                gender: policyholder ? policyholder.gender : "Not Provided",
                medicalHistory: policyholder ? policyholder.medicalHistory : "Not Provided",
                startDate: policyholder ? policyholder.startDate : "Not Provided",
                endDate: policyholder ? policyholder.endDate : "Not Provided",
                userId: claim.claimholderId._id, // Attach the user ID for later use in frontend
            };
        }));

        return res.status(200).json({
            success: true,
            claims: pendingClaims,
            userDetails: userDetails, // Send user details in a separate field
        });
        
    } catch (error) {
        return res.status(500).json({
            success: false,
            message: "Internal server error.",
            error: error.message,
        });
    }
};



exports.getAllUsers = async (req, res) => {
  try {
    const users = await User.find();
    res.status(200).json({
        data: users
    });
  } catch (error) {
    res.status(500).json({ message: "Error fetching users", error });
  }
};


const getEmailBody = (userName, status) => {
    return `
        <div style="font-family: Arial, sans-serif; padding: 20px; background-color: #f4f4f4; color: #333;">
            <div style="max-width: 600px; background: white; padding: 20px; border-radius: 10px; box-shadow: 0px 0px 10px rgba(0, 0, 0, 0.1);">
                <h2 style="color: #4CAF50; text-align: center;">Claim Status Update</h2>
                <p>Dear <b>${userName}</b>,</p>
                <p>Your insurance claim request has been <b style="color: ${status === "Approved" ? "#4CAF50" : "#FF5733"};">${status}</b> by our company.</p>
                ${
                    status === "Approved"
                        ? `<p>Congratulations! Your claim has been approved, and the necessary process will begin shortly.</p>`
                        : `<p>Unfortunately, your claim has been rejected. If you have any concerns, please contact our support team.</p>`
                }
                <p>If you have any questions, feel free to reach out to us.</p>
                <br>
                <p>Best Regards,</p>
                <p><b>LumiClaim Support Team</b></p>
            </div>
        </div>
    `;
};