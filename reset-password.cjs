const mongoose = require("mongoose");
const bcrypt = require("bcryptjs");
require("dotenv").config();

const userSchema = new mongoose.Schema(
  {
    email: { type: String, required: true, unique: true, lowercase: true },
    googleId: { type: String, unique: true, sparse: true },
    passwordHash: String,
    name: { type: String, required: true },
    picture: String,
    lastLogin: { type: Date, default: Date.now },
  },
  { timestamps: true },
);

const User = mongoose.model("User", userSchema);
const NEW_PASS = "admin1234";

mongoose
  .connect(process.env.MONGODB_URI)
  .then(async () => {
    const hash = await bcrypt.hash(NEW_PASS, 10);
    await User.findOneAndUpdate(
      { email: process.env.ADMIN_EMAIL.toLowerCase() },
      { $set: { passwordHash: hash } },
    );
    console.log("Password reset done!");
    console.log("New password:", NEW_PASS);
    await mongoose.disconnect();
    process.exit(0);
  })
  .catch((e) => {
    console.error(e.message);
    process.exit(1);
  });
