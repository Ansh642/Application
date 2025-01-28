const Policyholder = require('../models/policyholderModel');

exports.getPolicyholders = async (req, res) => {
    try {
        const policyholders = await Policyholder.find();

        if (!policyholders || policyholders.length === 0)
        {
            return res.status(404).json({ success: false, message: 'No policyholders found.' });
        }
        return res.json({ 
            success: true, 
            policyholders 
        });
    } 
    catch (err) {
        res.status(500).json({ success: false, message: "Error fetching policyholders.", error: err.message });
    }
};

exports.getPolicyholderById = async (req, res) => {
    const { id } = req.params;

    try {
        const policyholder = await Policyholder.findById(id);

        if (!policyholder) 
            {
            return res.status(404).json({ 
                success: false, 
                message: "Policyholder not found." 
            });
        }
        res.json({ 
            success: true, 
            message: "Policyholder found successfully.", 
            policyholder 
        });
    } 
    catch (err) {
        res.status(500).json({ 
            success: false,  
            error: err.message 
        });
    }
};


exports.createPolicyholder = async (req, res) => {
    const { id, name, email, phone } = req.body;

    if (!id || !name || !email || !phone) {
        return res.status(400).json({ success: false, message: 'All fields are required (id, name, email, phone).' });
    }

    try {
        const existingPolicyholder = await Policyholder.findOne({ id });
        if (existingPolicyholder) {
            return res.status(400).json({ success: false, message: "Policyholder ID already exists." });
        }

        const newPolicyholder = new Policyholder(req.body);
        await newPolicyholder.save();

        res.status(201).json({ 
            success: true, 
            message: "Policyholder created successfully.", 
            data: newPolicyholder 
        });
    } 
    catch (err) {
        res.status(500).json({ success: false, message: "Error creating policyholder.", error: err.message });
    }
};


exports.updatePolicyholder = async (req, res) => {

    const { id, name, email, phone } = req.body;

    if (!id || !name || !email || !phone) {
        return res.status(400).json({ success: false, message: 'All fields are required (id, name, email, phone).' });
    }

    try {
        const updatedPolicyholder = await Policyholder.findByIdAndUpdate(req.params.id, req.body, { new: true });
        if (!updatedPolicyholder) 
        {
            return res.status(404).json({ 
                success: false, 
                message: "Policyholder not found." 
            });
        }
        res.json({ 
            success: true, 
            message: "Policyholder updated successfully.", 
            data: updatedPolicyholder });
    } 
    catch (err) {
        res.status(500).json({ 
            success: false, 
            message: "Error updating policyholder.", 
            error: err.message });
    }
};


exports.deletePolicyholder = async (req, res) => {
    try {
        const deletedPolicyholder = await Policyholder.findByIdAndDelete(req.params.id);

        if (!deletedPolicyholder) 
            {
            return res.status(404).json({ 
                success: false, 
                message: "Policyholder not found." 
            });
        }
        res.json({ 
            success: true, 
            message: "Policyholder deleted successfully." 
        });
    } 
    catch (err) {
        res.status(500).json({ success: false, message: "Error deleting policyholder.", error: err.message });
    }
};
