const express = require('express');
const router = express.Router();

const policyController = require('../controllers/policyController');
const claimController = require('../controllers/claimController');
const authController = require('../controllers/authController');
const {auth, isAdmin} = require('../middleware/middleware');


// Policy routes
router.get('/get-policies', policyController.getPolicies);
router.get('/get-policy/:id', policyController.getPolicyById);
router.post('/create-policy', policyController.createPolicy);
router.put('/policies/:id', policyController.updatePolicy);
router.delete('/policies/:id', policyController.deletePolicy);

// Claim routes
// router.get('/claims', claimController.getClaims);
// router.get('/claims/:id', claimController.getClaimById);
// router.put('/claims/:id', claimController.updateClaim);
// router.delete('/claims/:id', claimController.deleteClaim);


//authentication routes
router.post('/login',authController.login);
router.post('/signup',authController.signup);
router.post('/buy-policy/:id',auth,authController.buyPolicy);
router.get('/my-policies',auth,authController.myPolicies);
router.post('/buy-claim', auth,authController.buyClaim);
router.get('/my-claims',auth,authController.myClaims);
router.get("/user-auth", auth, (req, res) => {res.status(200).send({ ok: true });});


//Admin routes
router.get("/admin-auth", auth,isAdmin, (req, res) => {res.status(200).send({ ok: true });});
router.get("/pending-claims",auth,isAdmin,claimController.getPendingClaims);
router.post("/update-claim-status",auth,isAdmin,claimController.updateClaimStatus);
module.exports = router;
