import bcrypt from 'bcryptjs';
import { connectDB } from '~/server/utils/db';
import { User } from '~/server/models/User';
import { generateToken } from '~/server/utils/jwt';

export default defineEventHandler(async (event) => {
  try {
    await connectDB();

    const body = await readBody(event);
    const email = String(body.email || '').trim().toLowerCase();
    const password = String(body.password || '');

    if (!email || !password) {
      throw createError({
        statusCode: 400,
        statusMessage: 'Email and password are required',
      });
    }

    const allowedEmail = process.env.ADMIN_EMAIL?.trim().toLowerCase();
    if (!allowedEmail || email !== allowedEmail) {
      throw createError({
        statusCode: 403,
        statusMessage: 'Access Denied. This email is not authorized to access the admin panel.',
      });
    }

    const user = await User.findOne({ email });

    if (!user || !user.passwordHash) {
      throw createError({
        statusCode: 401,
        statusMessage: 'Invalid email or password',
      });
    }

    const isValidPassword = await bcrypt.compare(password, user.passwordHash);

    if (!isValidPassword) {
      throw createError({
        statusCode: 401,
        statusMessage: 'Invalid email or password',
      });
    }

    // Fire-and-forget — don't block the login response for a non-critical update
    user.lastLogin = new Date();
    user.save().catch((e: Error) => console.error('lastLogin save error:', e.message));

    const token = generateToken({
      id: user._id.toString(),
      email: user.email,
    });

    return {
      success: true,
      token,
      user: {
        id: user._id,
        email: user.email,
        name: user.name,
        picture: user.picture,
      },
    };
  } catch (error) {
    if (error.statusCode) throw error;
    console.error('Login error:', error);
    throw createError({
      statusCode: 500,
      statusMessage: 'Login failed',
    });
  }
});
