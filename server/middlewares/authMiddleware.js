const jwt = require("jsonwebtoken");
const User = require("../models/UserSchema");

const authMiddleware = async (req, res, next) => {

    const token = req.headers.authorization;

    if (!token) {
        return res.status(401).json({
            message: "No token provided"
        });
    }

    try {

        const decoded = jwt.verify(
            token,
            process.env.JWT_SECRET
        );

        const user = await User.findById(decoded.id);

        if (!user) {
            return res.status(404).json({
                message: "User not found"
            });
        }

        req.user = user;

        next();

    } catch (error) {

        return res.status(401).json({
            message: "Invalid or expired token"
        });

    }

};

const authorizeRoles = (...roles) =>{

    return (req,res,next) => {
        if(!roles.includes(req.user.role)){
            return res.status(403).json({
                message : "Access denied"
            });
        }
    next();
    };

};

module.exports = {authMiddleware,authorizeRoles};