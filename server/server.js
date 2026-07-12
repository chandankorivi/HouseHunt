const dns = require("dns");
dns.setServers(["8.8.8.8", "1.1.1.1"]);
const express = require("express");
require("dotenv").config();
const cors = require("cors");
const app = express();

app.use(cors());
app.use(express.json({ limit: "50mb" }));
app.use(express.urlencoded({ limit: "50mb", extended: true }));

const userRoutes = require("./routes/userRoutes");
const  connectMongoDB  = require("./config/connect");

const ownerRoutes = require("./routes/ownerRoutes");

const adminRoutes = require("./routes/adminRoutes");

const bookingRoutes = require("./routes/bookingRoutes");


app.use("/api/user", userRoutes);

app.use("/api/owner", ownerRoutes);

app.use("/api/admin", adminRoutes);

app.use("/api/booking", bookingRoutes);

connectMongoDB();

const Port=8000;

app.listen(Port,(req,res)=>{
    console.log(`Server is running on http://localhost:${Port}`);
})
