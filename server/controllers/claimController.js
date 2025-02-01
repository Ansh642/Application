const Claim = require('../models/claimModel');
const {mailsend} = require("../utils/mailsend");
/**
 * @swagger
 * /api/claims:
 *   get:
 *     summary: Get all claims
 *     responses:
 *       200:
 *         description: A list of claims
 *       404:
 *         description: No claims found
 *       500:
 *         description: Error fetching claims
 */

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
        const pendingClaims = await Claim.find({ status: "Pending" })
            .populate("claimholderId", "name email")  // Get user details
            .populate("policyId", "policyName imageUrl");      // Get policy details

        return res.status(200).json({
            success: true,
            data: pendingClaims
        });

    } catch (error) {
        return res.status(500).json({
            success: false,
            message: "Internal server error.",
            error: error.message
        });
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