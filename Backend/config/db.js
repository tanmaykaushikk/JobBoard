const mongoose = require("mongoose");
const dotenv = require("dotenv");

dotenv.config();

async function connectDb() {
    try {
        await mongoose.connect(process.env.MONGO_URL);
        console.log("Mongo DB connected Successfully");
    }catch(error){
        console.log("Mongo DB connection fail", error);
    }
}

module.exports = connectDb;




