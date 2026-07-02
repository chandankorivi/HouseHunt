
const express = require("express");
require("dotenv").config();
const app = express();
const userRoutes = require("./routes/userRoutes");
const  connectMongoDB  = require("./config/connect");

const ownerRoutes = require("./routes/ownerRoutes");

const adminRoutes = require("./routes/adminRoutes");

app.use(express.json());

app.use("/api/user", userRoutes);

app.use("/api/owner", ownerRoutes);

app.use("/api/admin", adminRoutes);

connectMongoDB();

const Port=8000;

app.listen(Port,(req,res)=>{
    console.log(`Server is running on http://localhost:${Port}`);
})
