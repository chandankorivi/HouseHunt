
const mongoose = require("mongoose");

const connectMongoDB = async () => {
 try{
    await mongoose.connect("mongodb://localhost:27017/HouseHunt");

    console.log("Database Connected");
 }
 catch {
    console.error(error.message);
    process.exit(1);
 }
};

module.exports =  connectMongoDB;