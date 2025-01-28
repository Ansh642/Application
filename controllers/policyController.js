const Claim = require('../models/claimModel');

exports.getClaims = async (req, res) => {
    try {
        const claims = await Claim.find();
        if (!claims || claims.length === 0) 
        {
            return res.status(404).json({ 
                success: false, 
                message: 'No claims found.' 
            });
        }

        return res.status(200).json({ 
            success: true, 
            claims 
        });
    } 
    catch (err) 
    {
        res.status(500).json({ 
            success: false, 
            message: "Error fetching claims.", 
            error: err.message 
        });
    }
};


exports.getClaimById = async (req, res) => {
    const { id } = req.params;
    try {
        const claim = await Claim.findById(id);

        if (!claim) {
            return res.status(404).json({ 
                success: false, 
                message: "Claim not found." 
            });
        }
        return res.status(200).json({ 
            success: true, 
            claim 
        });
    }

    catch (err) 
    {
        res.status(500).json({ 
            success: false, 
            message: "Error fetching claim.", 
            error: err.message 
        });
    }
};

exports.createClaim = async (req, res) => {
    const { policyholderId, amount, status } = req.body;

    // Basic input validation
    if (!policyholderId || !amount || !status) {
        return res.status(400).json({ 
            success: false, 
            message: 'Policyholder ID, amount, and status are required.' 
        });
    }

    try {
        const newClaim = new Claim(req.body);
        await newClaim.save();

        res.status(201).json({ 
            success: true, 
            message: "Claim created successfully.", 
            data: newClaim 
        });
    } catch (err) 
    {
        res.status(500).json({ 
            success: false, 
            message: "Error creating claim.", 
            error: err.message 
        });
    }
};


exports.updateClaim = async (req, res) => {

    const { policyholderId, amount, status } = req.body;

    // Basic input validation
    if (!policyholderId || !amount || !status)
    {
        return res.status(400).json({ 
            success: false, 
            message: 'Policyholder ID, amount, and status are required.' 
        });
    }

    try {
        const updatedClaim = await Claim.findByIdAndUpdate(req.params.id, req.body, { new: true });

        if (!updatedClaim) 
        {
            return res.status(404).json({ 
                success: false, 
                message: "Claim not found." 
            });
        }
        return res.status(200).json({ 
            success: true, 
            message: "Claim updated successfully.", 
            data: updatedClaim 
        });

    } 
    catch (err) 
    {
        res.status(500).json({ 
            success: false, 
            message: "Error updating claim.", 
            error: err.message });
    }
};


exports.deleteClaim = async (req, res) => {
    try {
        const deletedClaim = await Claim.findByIdAndDelete(req.params.id);

        if (!deletedClaim) 
            {
            return res.status(404).json({ 
                success: false, 
                message: "Claim not found." 
            });
        }

        return res.json({ 
            success: true, 
            message: "Claim deleted successfully." 
        });
        
    } 
    catch (err) 
    {
        res.status(500).json({ 
            success: false, 
            message: "Error deleting claim.", 
            error: err.message 
        });
    }
};

