
const express = require("express");
const app = express();

app.get("/",(req,res)=>{
    res.send("Welcome");
});

app.get("/about",(req,res)=>{
    res.send("About HouseHunt");
});

app.get("/contact",(req,res)=>{
    res.json({
  "email": "support@househunt.com",
  "phone": "9876543210"
});
});

const userRoutes = require("./routes/userRoutes");

app.use("/users", userRoutes);

app.listen(5000,(req,res)=>{
    console.log("Server is running on http://localhost:5000");
})
