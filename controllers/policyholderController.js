const policyholders = require('../models/policyholderModel');


exports.getPolicyholders = (req, res) => {
    res.json(policyholders);
};


exports.getPolicyholderById = (req, res) => {
    const policyholder = policyholders.find((ph) => ph.id === req.params.id);
    if (!policyholder) {
        return res.status(404).json({ message: "Policyholder not found." });
    }
    res.json(policyholder);
};


exports.createPolicyholder = (req, res) => {
    const existing = policyholders.find((ph) => ph.id === req.body.id);
    if (existing) {
        return res.status(400).json({ message: "Policyholder ID already exists." });
    }
    policyholders.push(req.body);
    res.status(201).json({ message: "Policyholder created successfully." });
};


exports.updatePolicyholder = (req, res) => {
    const index = policyholders.findIndex((ph) => ph.id === req.params.id);
    if (index === -1) 
    {
        return res.status(404).json({ 
            message: "Policyholder not found." 
        });
    }

    policyholders[index] = { ...policyholders[index], ...req.body };
    res.json({ message: "Policyholder updated successfully." });
};

exports.deletePolicyholder = (req, res) => {
    const index = policyholders.findIndex((ph) => ph.id === req.params.id);
    if (index === -1) {
        return res.status(404).json({ message: "Policyholder not found." });
    }
    policyholders.splice(index, 1);
    res.json({ message: "Policyholder deleted successfully." });
};
