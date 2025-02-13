const Policy = require('../models/policyModel');
const path = require('path');
const fs = require('fs');


exports.getPolicies = async (req) => {
    try {
      const policies = await Policy.find();  // Fetch policies from DB
  
      if (!policies || policies.length === 0) {
        return {
          success: false,
          message: 'No policies found.'
        };
      }
  
      return {
        success: true,
        data: policies
      };
    } catch (err) {
      console.error(err);
      return {
        success: false,
        message: "Error fetching policies.",
        error: err.message
      };
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
  try {
    const { policyName, policyDescription, coverageAmount, startDate, endDate,image } = req.body; 


      // Save policy to DB, including the image URL (relative path)
      const newPolicy = await Policy.create({
        policyName,
        policyDescription,
        coverageAmount,
        startDate,
        endDate,
        imageUrl:image
      });

      console.log(newPolicy);

      res.status(201).json({ 
        message: 'Policy created successfully', 
        policy: newPolicy 
    });
    
    
  } catch (error) {
    res.status(500).json({ message: 'Server Error', error: error.message });
  }
};


