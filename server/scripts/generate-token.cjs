// generate-token.cjs — prints a JWT for the provided user id and email using .env JWT_SECRET
const jwt = require('jsonwebtoken');
const dotenv = require('dotenv');
const path = require('path');

dotenv.config({ path: path.resolve(process.cwd(), '.env') });
const secret = process.env.JWT_SECRET;
if (!secret) {
  console.error('JWT_SECRET not set');
  process.exit(1);
}

const userId = process.env.DEV_ADMIN_ID || '6a5f57c0c78e7e235c830bbd';
const email = process.env.DEV_ADMIN_EMAIL || process.env.ADMIN_EMAIL || 'munnahosain042@gmail.com';

const token = jwt.sign({ id: userId, email }, secret, { expiresIn: '30d' });
console.log(token);
