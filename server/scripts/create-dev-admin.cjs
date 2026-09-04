// One-off script to create or update a dev admin user (CommonJS)
// Usage: node server/scripts/create-dev-admin.cjs

const mongoose = require('mongoose');
const bcrypt = require('bcryptjs');
const dotenv = require('dotenv');
const path = require('path');

dotenv.config({ path: path.resolve(process.cwd(), '.env') });

const MONGODB_URI = process.env.MONGODB_URI;
const ADMIN_EMAIL = process.env.ADMIN_EMAIL || 'munnahosain042@gmail.com';
const ADMIN_PASSWORD = process.env.DEV_ADMIN_PASSWORD || 'Password123!';

if (!MONGODB_URI) {
  console.error('MONGODB_URI is not set in .env');
  process.exit(1);
}

async function main() {
  await mongoose.connect(MONGODB_URI, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
  });

  console.log('Connected to MongoDB');

  const userSchema = new mongoose.Schema({
    email: { type: String, required: true, unique: true, lowercase: true },
    googleId: { type: String },
    passwordHash: String,
    name: { type: String, required: true },
    picture: String,
    lastLogin: Date,
  }, { timestamps: true });

  const User = mongoose.models.User || mongoose.model('User', userSchema);

  const passwordHash = await bcrypt.hash(ADMIN_PASSWORD, 10);

  const existing = await User.findOne({ email: ADMIN_EMAIL.toLowerCase() });
  if (existing) {
    existing.passwordHash = passwordHash;
    existing.name = existing.name || 'Dev Admin';
    await existing.save();
    console.log(`Updated existing user ${ADMIN_EMAIL} with new password.`);
  } else {
    await User.create({
      email: ADMIN_EMAIL.toLowerCase(),
      passwordHash,
      name: 'Dev Admin',
      lastLogin: new Date(),
    });
    console.log(`Created new admin user: ${ADMIN_EMAIL}`);
  }

  await mongoose.disconnect();
  console.log('Done');
}

main().catch((err) => {
  console.error('Error creating admin:', err);
  process.exit(1);
});
