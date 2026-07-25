const mongoose = require("mongoose");
const dns = require('dns');
require("dotenv").config();


dns.setServers(['8.8.8.8']);

async function connectDB() {
    try {
        // mongoose.set('debug', true);
        await mongoose.connect(process.env.MONGO_URI);
        console.log("MongoDB Connected");
    } catch (err) {
        console.log("Mongodb connection err:", err);
    }
}

module.exports = connectDB;