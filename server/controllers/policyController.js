const Policy = require('../models/policyModel');


exports.getPolicies = async (req, res) => {
    try {
        
        const policies = await Policy.find();

        if (!policies || policies.length === 0) {
            return res.status(404).json({
                success: false,
                message: 'No policies found.'
            });
        }

        return res.status(200).json({
            success: true,
            data:policies
        });
    } catch (err) {
        return res.status(500).json({
            success: false,
            message: "Error fetching policies.",
            error: err.message
        });
    }
};

exports.getPolicyById = async (req, res) => {
    const { id } = req.params;
    try {
        const policy = await Policy.findById(id);

        if (!policy) {
            return res.status(404).json({
                success: false,
                message: "Policy not found."
            });
        }

        return res.status(200).json({
            success: true,
            data:policy
        });
    } catch (err) {
        return res.status(500).json({
            success: false,
            message: "Error fetching policy.",
            error: err.message
        });
    }
};

exports.createPolicy = async (req, res) => {

    const { 
        policyName, 
        policyDescription, 
        coverageAmount, 
        startDate, 
        endDate,
        imageUrl
    } = req.body;


    if (!policyName || !policyDescription || !coverageAmount || !startDate || !endDate) 
        {
        return res.status(400).json({
            success: false,
            message: "All fields (policyName, policyDesription, coverageAmount, startDate, endDate) are required."
        });
    }

    try {
        const newPolicy = new Policy({ 
            policyName, 
            policyDescription, 
            coverageAmount, 
            startDate, 
            endDate,
            imageUrl
        });

        await newPolicy.save();

        return res.status(201).json({
            success: true,
            message: "Policy created successfully.",
            newPolicy
        });
    } catch (err) {
        return res.status(500).json({
            success: false,
            message: "Error creating policy.",
            error: err.message
        });
    }
};


exports.updatePolicy = async (req, res) => {
    const { name, description } = req.body;

    // Basic input validation
    if (!name || !description) {
        return res.status(400).json({
            success: false,
            message: 'Name and description are required.'
        });
    }

    try {
        const updatedPolicy = await Policy.findByIdAndUpdate(req.params.id, req.body, { new: true });

        if (!updatedPolicy) {
            return res.status(404).json({
                success: false,
                message: "Policy not found."
            });
        }

        return res.status(200).json({
            success: true,
            message: "Policy updated successfully.",
            data: updatedPolicy
        });
    } catch (err) {
        return res.status(500).json({
            success: false,
            message: "Error updating policy.",
            error: err.message
        });
    }
};

exports.deletePolicy = async (req, res) => {
    try {
        const deletedPolicy = await Policy.findByIdAndDelete(req.params.id);

        if (!deletedPolicy) {
            return res.status(404).json({
                success: false,
                message: "Policy not found."
            });
        }

        return res.status(200).json({
            success: true,
            message: "Policy deleted successfully."
        });
    } catch (err) {
        return res.status(500).json({
            success: false,
            message: "Error deleting policy.",
            error: err.message
        });
    }
};
