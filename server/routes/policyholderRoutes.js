const express = require('express');
const router = express.Router();

const policyholderController = require('../controllers/policyholderController');
const policyController = require('../controllers/policyController');
const claimController = require('../controllers/claimController');
const authController = require('../controllers/authController');
const {auth} = require('../middleware/middleware');

// Policyholder routes
// router.get('/get-policy', policyholderController.getPolicyholders);
// router.get('/get-policy/:id', policyholderController.getPolicyholderById);
// router.post('/create-policy', policyholderController.createPolicyholder);
// router.put('/update-policy/:id', policyholderController.updatePolicyholder);
// router.delete('/delete-policy/:id', policyholderController.deletePolicyholder);

// Policy routes
router.get('/get-policies', policyController.getPolicies);
router.get('/get-policy/:id', policyController.getPolicyById);
router.post('/create-policy', policyController.createPolicy);
router.put('/policies/:id', policyController.updatePolicy);
router.delete('/policies/:id', policyController.deletePolicy);

// Claim routes
router.get('/claims', claimController.getClaims);
router.get('/claims/:id', claimController.getClaimById);
router.post('/claims', claimController.createClaim);
router.put('/claims/:id', claimController.updateClaim);
router.delete('/claims/:id', claimController.deleteClaim);


//authentication routes
router.post('/login',authController.login);
router.post('/signup',authController.signup);
router.post('/buy-policy/:id',auth,authController.buyPolicy);
router.get('/my-policies',auth,authController.myPolicies);

module.exports = router;
