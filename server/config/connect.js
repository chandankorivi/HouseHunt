
const mongoose = require("mongoose");

const connectMongoDB = async () => {
    await mongoose.connect("mongodb://localhost:27017/HouseHunt");

    console.log("Database Connected");
};

module.exports = {
   connectMongoDB
};