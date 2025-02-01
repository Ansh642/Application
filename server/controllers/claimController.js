const Claim = require('../models/claimModel');

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
        );

        if (!updatedClaim) {
            return res.status(404).json({
                success: false,
                message: "Claim not found.",
            });
        }

        return res.status(200).json({
            success: true,
            message: `Claim ${status} successfully.`,
            data: updatedClaim,
        });

    } catch (error) {
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
