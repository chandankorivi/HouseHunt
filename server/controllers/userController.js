
const User = require("../models/UserSchema");

const bcrypt = require("bcrypt");

const jwt = require("jsonwebtoken");

const registerUser = async (req,res)=>{

    const {name,email,password,role} = req.body;

    const existingUser = await User.findOne({ email });

if (existingUser) {
    return res.status(400).json({
        message: "Email already exists"
    });
}

const hashedPassword = await bcrypt.hash(password, 10);

    const user = await User.create({
        name,
        email,
        password:hashedPassword,
        role
    });

    res.json({
        message:"User created",
        user
    });

};

const loginUser = async (req,res) => {
    const { email, password } = req.body;
    const user = await User.findOne({ email });

    if(!user) {
        return res.status(400).json({
            message : "Invalid Email or password"
        });
    }

const isMatch = await bcrypt.compare(password,user.password);
     if(!isMatch){
        return res.status(400).json({
            message : "Invalid Email or password "
        });
     }

     const token = jwt.sign(
    { id: user._id },
    process.env.JWT_SECRET,
    {
        expiresIn:"7d"
    }
);

res.json({
    message:"Login successful",
    token
});

};

module.exports = {
    registerUser,loginUser
};