// routes/policyholderRoutes.js
const express = require('express');
const router = express.Router();
const policyholderController = require('../controllers/policyholderController');

// Define CRUD routes for policyholders
router.get('/', policyholderController.getPolicyholders);
router.get('/:id', policyholderController.getPolicyholderById);
router.post('/', policyholderController.createPolicyholder);
router.put('/:id', policyholderController.updatePolicyholder);
router.delete('/:id', policyholderController.deletePolicyholder);

module.exports = router;
