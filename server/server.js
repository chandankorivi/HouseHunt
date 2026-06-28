
const express = require("express");
require("dotenv").config();
const app = express();
const userRoutes = require("./routes/userRoutes");
const { connectMongoDB } = require("./config/connect");

app.use(express.json());

app.use("/users", userRoutes);

connectMongoDB();

const Port=8000;

app.listen(Port,(req,res)=>{
    console.log(`Server is running on http://localhost:${Port}`);
})
