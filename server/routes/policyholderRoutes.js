const express = require('express');
const router = express.Router();
const NodeCache = require('node-cache');
const policyController = require('../controllers/policyController');
const claimController = require('../controllers/claimController');
const authController = require('../controllers/authController');
const { auth, isAdmin } = require('../middleware/middleware');
const run = require('../geminiApi');
const policyCache = new NodeCache({ stdTTL: 3600, checkperiod: 600 }); 


// policy routes
router.get('/get-policies', async (req, res) => {
  const cachedPolicies = policyCache.get('policies');

  if (cachedPolicies) {
    
    console.log("Data fetched from cache");
    return res.status(200).json({
      success: true,
      message: 'Fetched from cache',
      data: cachedPolicies
    });
  } 
  else {
    console.log("Cache miss, fetching from database...");
    
    try {
      const policies = await policyController.getPolicies(req);
      
      policyCache.set('policies', policies.data, 3600); // 3600 means 1 hr
      console.log("Data fetched from database and cached");
      
      return res.status(200).json(policies);
    } 
    catch (err) {
      return res.status(500).json({
        success: false,
        message: 'Error fetching policies',
        error: err.message 
      });
    }
  }
});

router.get('/get-policy/:id', policyController.getPolicyById);
router.post('/create-policy', auth, isAdmin, policyController.createPolicy);

// Authentication routes
router.post('/login', authController.login);
router.post('/signup', authController.signup);
router.post('/forgot-password', authController.forgotPassword);
router.post('/buy-policy/:id', auth, authController.buyPolicy);
router.get('/my-policies', auth, authController.myPolicies);
router.post('/buy-claim', auth, authController.buyClaim);
router.get('/my-claims', auth, authController.myClaims);


router.get("/user-auth", auth, (req, res) => {
  res.status(200).send({ ok: true });
});

// Admin routes
router.get("/admin-auth", auth, isAdmin, (req, res) => {
  res.status(200).send({ ok: true });
});


// Claim routes
/**
 * @swagger
 * /api/pending-claims:
 *   get:
 *     summary: Get all pending claims
 *     description: Retrieve a list of all claims that are currently pending. Requires admin authentication.
 *     security:
 *       - bearerAuth: []
 *     responses:
 *       200:
 *         description: A list of pending claims with user details.
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 success:
 *                   type: boolean
 *                   example: true
 *                 claims:
 *                   type: array
 *                   items:
 *                     type: object
 *                     properties:
 *                       _id:
 *                         type: string
 *                         example: "64f1b2b3c9e77b001a8e8e8e"
 *                       claimholderId:
 *                         type: string
 *                         example: "64f1b2b3c9e77b001a8e8e8e"
 *                       policyId:
 *                         type: string
 *                         example: "64f1b2b3c9e77b001a8e8e8e"
 *                       status:
 *                         type: string
 *                         example: "Pending"
 *                       createdAt:
 *                         type: string
 *                         format: date-time
 *                         example: "2023-09-01T12:00:00Z"
 *                       updatedAt:
 *                         type: string
 *                         format: date-time
 *                         example: "2023-09-01T12:00:00Z"
 *                 userDetails:
 *                   type: array
 *                   items:
 *                     type: object
 *                     properties:
 *                       age:
 *                         type: string
 *                         example: "30"
 *                       gender:
 *                         type: string
 *                         example: "Male"
 *                       medicalHistory:
 *                         type: string
 *                         example: "None"
 *                       startDate:
 *                         type: string
 *                         example: "2023-01-01"
 *                       endDate:
 *                         type: string
 *                         example: "2023-12-31"
 *                       userId:
 *                         type: string
 *                         example: "64f1b2b3c9e77b001a8e8e8e"
 *       401:
 *         description: Unauthorized. Admin authentication required.
 *       404:
 *         description: No pending claims found.
 *       500:
 *         description: Internal server error.
 */
router.get("/pending-claims", auth, isAdmin, claimController.getPendingClaims);

/**
 * @swagger
 * /api/update-claim-status:
 *   post:
 *     summary: Update the status of a claim
 *     description: Update the status of a claim to either "Approved" or "Rejected". Requires admin authentication.
 *     security:
 *       - bearerAuth: []
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               claimId:
 *                 type: string
 *                 example: "64f1b2b3c9e77b001a8e8e8e"
 *               status:
 *                 type: string
 *                 enum: [Approved, Rejected]
 *                 example: "Approved"
 *     responses:
 *       200:
 *         description: Claim status updated successfully.
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 success:
 *                   type: boolean
 *                   example: true
 *                 message:
 *                   type: string
 *                   example: "Claim Approved successfully. Email sent to user."
 *                 data:
 *                   type: object
 *                   properties:
 *                     _id:
 *                       type: string
 *                       example: "64f1b2b3c9e77b001a8e8e8e"
 *                     claimholderId:
 *                       type: string
 *                       example: "64f1b2b3c9e77b001a8e8e8e"
 *                     policyId:
 *                       type: string
 *                       example: "64f1b2b3c9e77b001a8e8e8e"
 *                     status:
 *                       type: string
 *                       example: "Approved"
 *                     createdAt:
 *                       type: string
 *                       format: date-time
 *                       example: "2023-09-01T12:00:00Z"
 *                     updatedAt:
 *                       type: string
 *                       format: date-time
 *                       example: "2023-09-01T12:00:00Z"
 *       400:
 *         description: Invalid status value.
 *       401:
 *         description: Unauthorized. Admin authentication required.
 *       404:
 *         description: Claim not found.
 *       500:
 *         description: Internal server error.
 */
router.post("/update-claim-status", auth, isAdmin, claimController.updateClaimStatus);

/**
 * @swagger
 * /api/get-users:
 *   get:
 *     summary: Get all users
 *     description: Retrieve a list of all users. Requires admin authentication.
 *     security:
 *       - bearerAuth: []
 *     responses:
 *       200:
 *         description: A list of users.
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 data:
 *                   type: array
 *                   items:
 *                     type: object
 *                     properties:
 *                       _id:
 *                         type: string
 *                         example: "64f1b2b3c9e77b001a8e8e8e"
 *                       name:
 *                         type: string
 *                         example: "John Doe"
 *                       email:
 *                         type: string
 *                         example: "john.doe@example.com"
 *                       createdAt:
 *                         type: string
 *                         format: date-time
 *                         example: "2023-09-01T12:00:00Z"
 *                       updatedAt:
 *                         type: string
 *                         format: date-time
 *                         example: "2023-09-01T12:00:00Z"
 *       401:
 *         description: Unauthorized. Admin authentication required.
 *       500:
 *         description: Internal server error.
 */
router.get("/get-users", auth, isAdmin, claimController.getAllUsers);



// ai routes
router.post('/ask-ai', async(req, res) => {
  try{
    const {prompt} = req.body;
    const response = await run(prompt);

    return res.status(200).json({
      data : response
    });

  }
  catch(err){
    return res.status(500).json({
      success: false,
      error: err.message
    })
  }

});

module.exports = router;



