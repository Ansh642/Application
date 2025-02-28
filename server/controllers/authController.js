const User = require('../models/userModel');
const JWT = require('jsonwebtoken');
const bcrypt = require('bcrypt');
const Policy = require('../models/policyModel');
const {mailsend} = require("../utils/mailsend");
const Claim = require('../models/claimModel');

exports.signup = async (req, res) => {
    try {
        const { name, email, password, confirmPassword } = req.body;

        // Validate input fields
        if (!name || !email || !password || !confirmPassword) {
            return res.status(400).json({
                success: false,
                message: "Please enter all required fields",
            });
        }

        if (password !== confirmPassword) {
            return res.status(400).json({
                success: false,
                message: "Passwords do not match",
            });
        }

        // Check if the user already exists
        const existingUser = await User.findOne({ email });

        if (existingUser) {
            return res.status(400).json({
                success: false,
                message: "User already exists",
            });
        }

        const hashedPassword = await bcrypt.hash(password, 10);

        // Create the new user
        const newUser = new User({
            name,
            email,
            password: hashedPassword,
            image: `https://api.dicebear.com/5.x/initials/svg?seed=${name}`,
        });

        // Save the user to the database
        await newUser.save();

        return res.status(201).json({
            success: true,
            message: "User registered successfully",
            newUser
        });
    } catch (err) {
        return res.status(500).json({
            success: false,
            message: "Internal Server Error",
            error: err.message, 
        });
    }
};

exports.login = async (req, res) => {
    try {
        const { email, password } = req.body;

        if (!email || !password) {
            return res.status(400).json({
                success: false,
                message: "Please enter complete details",
            });
        }

        let userDetails = await User.findOne({ email });

        if (!userDetails) {
            return res.status(400).json({
                success: false,
                message: "User not found",
            });
        }

        const isPasswordValid = await bcrypt.compare(password, userDetails.password);

        if (isPasswordValid) {
            const payload = {
                email: userDetails.email,
                id: userDetails._id,
                role: userDetails.role
            };

            const token = JWT.sign(payload, process.env.JWT_SECRET, {
                expiresIn: "1d",
            });

            return res.status(200).json({
                success: true,
                message: "Logged in successfully",
                userDetails,
                token
            });

        } else {
            return res.status(401).json({
                success: false,
                message: "Password is incorrect",
            });
        }
    } catch (err) {
        return res.status(500).json({
            success: false,
            message: err.message
        });
    }
};


exports.forgotPassword = async (req, res) => {
    try {
        const { email, password, newPassword } = req.body;
        console.log(email, password, newPassword);

        // Check if all fields are provided
        if (!email || !password || !newPassword) {
            return res.status(400).json({ message: "All fields are required" });
        }

        // Find user by email
        const user = await User.findOne({ email });
        if (!user) {
            return res.status(404).json({ message: "User not found" });
        }

        // Hash new password
        const hashedPassword = await bcrypt.hash(password, 10);

        // Update user password
        user.password = hashedPassword;
        await user.save();

        return res.status(200).json({ 
            success: true,
            message: "Password updated successfully" 
        });
    } 
    catch (error) {
        console.error(error);
        res.status(500).json({ message: "Server error" });
    }
};


exports.buyPolicy = async (req, res) => {
    try {
        const { id } = req.params;
        const userId = req.user.id;
        
        // Get additional details from the request body
        const { age, gender, medicalHistory, startDate, endDate } = req.body;

        // Validation: Age should be between 18 and 70
        if (age < 18 || age > 70) {
            return res.status(400).json({
                success: false,
                message: "Age should be between 18 and 70 years old to purchase the policy.",
            });
        }

        const today = new Date();
        const start = new Date(startDate);
        const end = new Date(endDate);

        if (start < today) {
            return res.status(400).json({
                success: false,
                message: "Start date cannot be before today's date.",
            });
        }

        if(start > end)
        {
            return res.status(400).json({
                success: false,
                message: "Start date cannot be after end date.",
            });
        }

        // Find the policy
        const policy = await Policy.findById(id);
        if (!policy) {
            return res.status(404).json({
                success: false,
                message: "Policy not found",
            });
        }

        // Find the user
        const user = await User.findById(userId);
        if (!user) {
            return res.status(404).json({
                success: false,
                message: "User not found",
            });
        }

        // Check if the user already owns the policy
        if (user.policies.includes(id)) {
            return res.status(400).json({
                success: false,
                message: "User already owns this policy",
            });
        }

        // Add the policy to the user's list of policies
        user.policies.push(id);

        // Add the user to the policyholderId array in the policy model, along with additional details
        policy.policyholderId.push({
            userId,
            age,
            gender,
            medicalHistory,
            startDate,
            endDate
        });

        // Save the user and policy
        await user.save();
        await policy.save();

        // Send confirmation email
        const emailBody = `
        <div style="font-family: Arial, sans-serif; line-height: 1.5;">
            <h2 style="color: #333;">Policy Purchase Confirmation</h2>
            <p style="font-size: 16px; color: #555;">
            Dear ${user.email},
            </p>
            <p style="font-size: 16px; color: #555;">
            Congratulations! Your policy has been successfully purchased.
            </p>
            <p style="font-size: 16px; color: #555;">
            <strong>Policy Name:</strong> ${policy.policyName}<br>
            <strong>Coverage Amount:</strong> Rs. ${policy.coverageAmount.toLocaleString()}/-<br> <br>
            <strong>Your Details: </strong><br>
            <strong>Age:</strong> ${age}<br>
            <strong>Gender:</strong> ${gender}<br>
            <strong>Medical History:</strong> ${medicalHistory}<br>
            <strong>Start Date of Policy:</strong> ${startDate}<br>
            <strong>End Date of Policy:</strong> ${endDate}
            </p>
            <p style="font-size: 16px; color: #555;">
            Thank you for choosing us for your insurance needs. We are here to provide you with the best service.
            </p>
            <p style="font-size: 16px; color: #555;">
            If you have any questions or need further assistance, feel free to contact us.
            </p>
            <p style="font-size: 16px; color: #555;">
            Best regards,<br>
            The LumiClaim Team
            </p>
        </div>
        `;

        // Send the email
        mailsend(user.email, 'Policy Purchase Confirmation - Your Policy Details', emailBody)
            .catch(err => console.error("Error sending email:", err));

        // Respond with a success message
        return res.status(200).json({
            success: true,
            message: "Policy purchased successfully",
            data: { user, policy },
        });

    } catch (error) {
        console.error("Error in buyPolicy:", error);
        return res.status(500).json({
            success: false,
            message: "Internal Server Error",
            error: error.message,
        });
    }
};


exports.myPolicies = async (req, res) => {
    try {
        const userId = req.user.id;
        
        const userDetails = await User.findById(userId).populate("policies");

        if (!userDetails || !userDetails.policies || userDetails.policies.length === 0) {
            return res.status(404).json({
                success: false,
                message: "No policies bought yet.",
            });
        }
        

        return res.status(200).json({
            success: true,
            message: "Policies fetched successfully.",
            data: userDetails.policies,  // Since we populated it, policies data is available
        });
    } catch (error) {
        return res.status(500).json({
            success: false,
            message: error.message,
        });
    }
};


exports.buyClaim = async (req, res) => {
    try {
        const userId = req.user.id; 
        const { policyId,claimReason } = req.body;

        console.log(claimReason);

        // Check if policy exists
        const policy = await Policy.findById(policyId);
        if (!policy) {
            return res.status(404).json({
                success: false,
                message: "Policy not found.",
            });
        }

        // Check if user exists
        const user = await User.findById(userId);
        if (!user) {
            return res.status(404).json({
                success: false,
                message: "User not found.",
            });
        }

        // ✅ Create the claim
        const newClaim = await Claim.create({
            claimholderId: userId,
            policyId: policyId,
            claimAmount: policy.coverageAmount,
            claimReason,
        });
        
        user.claims.push(newClaim._id);

        // ✅ Remove the policy from the user's policies array
        user.policies = user.policies.filter(
            (policy) => policy.toString() !== policyId.toString()
        );


        // ✅ Save updates to user and policy
        await user.save();
        await policy.save();

        return res.status(200).json({
            success: true,
            message: "Claim request submitted successfully. The policy has been removed from your policies and added to your claims.",
            data: newClaim,
        });

    } catch (error) {
        console.error("Error in buyClaim:", error); // Debugging log
        return res.status(500).json({
            success: false,
            message: "Internal server error.",
            error: error.message,
        });
    }
};


exports.myClaims = async (req, res) => {
    try {
      const userId = req.user.id;
  
      const userClaims = await Claim.find({ claimholderId: userId })
      .populate("policyId", "policyName imageUrl policyDescription")
        .sort({ createdAt: -1 });
  
      res.status(200).json({
        success: true,
        message: "User claims fetched successfully",
        data: userClaims,
      });
    } 
    catch (error) 
    {
      res.status(500).json({
        success: false,
        message: "Something went wrong while fetching claims",
      });
    }
};

