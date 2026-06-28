const User = require("../models/User");

const registerUser = async (req,res)=>{

    const {name,email,password,role} = req.body;

    const user = await User.create({
        name,
        email,
        password,
        role
    });

    res.json({
        message:"User created",
        user
    });

};

module.exports = {
    registerUser
};