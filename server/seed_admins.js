const mongoose = require("mongoose");
const bcrypt = require("bcrypt");
const User = require("./models/UserSchema");
require("dotenv").config();

async function seedAdmins() {
    try {
        await mongoose.connect(process.env.MONGO_URI);
        console.log("Connected to MongoDB");

        const admins = [
            {
                name: "Chandan",
                email: "CH@gmail.com",
                mobile: "9876543210",
                password: await bcrypt.hash("psw-12", 10),
                role: "admin",
                grantStatus: "granted"
            },
            {
                name: "Prem",
                email: "PS@gmail.com",
                mobile: "8976543210",
                password: await bcrypt.hash("PS@gmail.com", 10),
                role: "admin",
                grantStatus: "granted"
            }
        ];

        for (const admin of admins) {
            const existingUser = await User.findOne({ email: admin.email });
            if (existingUser) {
                console.log(`Admin ${admin.email} already exists, updating...`);
                await User.updateOne({ email: admin.email }, admin);
            } else {
                await User.create(admin);
                console.log(`Created admin ${admin.email}`);
            }
        }
        
        console.log("Seeding complete!");
        process.exit(0);
    } catch (err) {
        console.error("Error seeding admins:", err);
        process.exit(1);
    }
}

seedAdmins();
