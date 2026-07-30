/**
 * Admin User Setup Script
 * Run: node setup-admin.cjs
 *
 * This creates the admin user in MongoDB with a password.
 */

const mongoose = require("mongoose");
const bcrypt = require("bcryptjs");
require("dotenv").config();

const MONGODB_URI = process.env.MONGODB_URI;
const ADMIN_EMAIL = process.env.ADMIN_EMAIL;

if (!MONGODB_URI) {
  console.error("❌ MONGODB_URI not found in .env");
  process.exit(1);
}

if (!ADMIN_EMAIL) {
  console.error("❌ ADMIN_EMAIL not found in .env");
  process.exit(1);
}

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

const User = mongoose.models.User || mongoose.model("User", userSchema);

// Change this password to whatever you want
const ADMIN_PASSWORD = "Admin@123";

async function setupAdmin() {
  try {
    console.log("🔌 Connecting to MongoDB...");
    await mongoose.connect(MONGODB_URI);
    console.log("✅ Connected to MongoDB");

    const passwordHash = await bcrypt.hash(ADMIN_PASSWORD, 10);

    // Upsert: create or update the admin user
    const result = await User.findOneAndUpdate(
      { email: ADMIN_EMAIL.toLowerCase() },
      {
        $set: {
          email: ADMIN_EMAIL.toLowerCase(),
          name: "Admin",
          passwordHash,
          lastLogin: new Date(),
        },
      },
      { upsert: true, new: true },
    );

    console.log("\n✅ Admin user created/updated successfully!");
    console.log("━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━");
    console.log(`📧 Email   : ${ADMIN_EMAIL}`);
    console.log(`🔑 Password: ${ADMIN_PASSWORD}`);
    console.log("━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━");
    console.log("\n👉 Now go to /admin/login and sign in with these credentials.");

    await mongoose.disconnect();
    process.exit(0);
  } catch (error) {
    console.error("❌ Setup failed:", error.message);
    await mongoose.disconnect();
    process.exit(1);
  }
}

setupAdmin();
