const User = require('../models/userModel');
const JWT = require('jsonwebtoken');

// Login controller
exports.signup = async(req,res)=>{
    try{
       const {name,email,password,confirmPassword} = req.body;

       if(!name || !email || !password || !confirmPassword)
       {
        return res.status(400).json({
           success: false,
           message: 'Please enter all required fields',
        });
       }

       if(password !== confirmPassword)
       {
        return res.status(400).json({
            success: false,
            message: 'Please enter correct password',
        });
       }

       const userDetails = await User.findOne({email});

       if(userDetails)
       {
        return res.status(400).json({
            success: false,
            message: 'User already exists',
        });
       }

       const hashedPassword = await bcrypt.hash(password,10);
       
     // create a new entry in db;
     const newUser= await User.create({
        name,
        email,
        password : hashedPassword,
        image : `https://api.dicebear.com/5.x/initials/svg?seed=${name}`,
    });

    return res.status(200).json({
        success : true,
        message : 'User added successfully',
        newUser,
    });
  }
    catch(err)
    {
        return res.status(500).json({
            success : false,
            message : err.message
        });
    }
}


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
