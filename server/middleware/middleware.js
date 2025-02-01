const jwt= require('jsonwebtoken');
require("dotenv").config();


exports.auth = async (req, res, next) => {
    try {
        // Check if Authorization header exists
        if (!req.headers.authorization) {
            return res.status(401).json({
                success: false,
                message: "JWT token is missing",
            });
        }

        // Extract token from Authorization header
        const token = req.headers.authorization.split(' ')[1]; 
               
        const decoded = jwt.verify(token, process.env.JWT_SECRET);
      
        // Attach decoded user data to request object
        req.user = decoded;

        next();
    } catch (error) {
        console.log(error);
        return res.status(401).json({
            success: false,
            message: "Invalid JWT token",
        });
    }
};

exports.isAdmin=(req, res,next)=>{
    try
    {
        const role = req.user.role;
        if(role !== 1)
        {
            return res.status(401).send({
                success: false,
                message: "This is protected route for admin"
            });
        }
        
    }
    catch(err){
        return res.status(500).send({
            success: false,
            message: "Error while authenticating",
        });
    }
    next();
}


