const mongoose = require("mongoose");

const connectDB = async () => {
  try {
    const uri = process.env.MONGO_URI;

    console.log("Trying to connect DB...");

    await mongoose.connect(uri);

    console.log("MongoDB Connected ✅");
  } catch (error) {
    console.log("DB ERROR:", error.message);
    process.exit(1);
  }
};

module.exports = connectDB;