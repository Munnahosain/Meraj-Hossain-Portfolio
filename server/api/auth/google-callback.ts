import { connectDB } from "~/server/utils/db";
import { User } from "~/server/models/User";
import { generateToken } from "~/server/utils/jwt";
import { OAuth2Client } from "google-auth-library";

export default defineEventHandler(async (event) => {
  try {
    const clientId = process.env.GOOGLE_CLIENT_ID;
    const clientSecret = process.env.GOOGLE_CLIENT_SECRET;

    if (!clientId || !clientSecret) {
      throw createError({
        statusCode: 500,
        statusMessage: "Google OAuth is not configured",
      });
    }

    await connectDB();

    const body = await readBody(event).catch(() => ({}));
    const query = getQuery(event);
    const code = body.code || query.code;
    const redirectUri = body.redirectUri || query.redirectUri;

    if (!code || !redirectUri) {
      throw createError({
        statusCode: 400,
        statusMessage: "Missing Google authorization code",
      });
    }

    const oauthClient = new OAuth2Client(clientId, clientSecret, redirectUri);
    const { tokens } = await oauthClient.getToken(String(code));

    if (!tokens.id_token) {
      throw createError({
        statusCode: 401,
        statusMessage: "Google did not return an ID token",
      });
    }

    const ticket = await oauthClient.verifyIdToken({
      idToken: tokens.id_token,
      audience: clientId,
    });

    const payload = ticket.getPayload();
    const googleId = payload?.sub;
    const email = payload?.email;
    const name = payload?.name;
    const picture = payload?.picture;

    if (!googleId || !email) {
      throw createError({
        statusCode: 401,
        statusMessage: "Google profile is missing required fields",
      });
    }

    const allowedEmail = process.env.ADMIN_EMAIL?.trim().toLowerCase();
    if (!allowedEmail || email.trim().toLowerCase() !== allowedEmail) {
      throw createError({
        statusCode: 403,
        statusMessage: "Access Denied. This email is not authorized to access the admin panel.",
      });
    }

    let user = await User.findOne({ googleId });

    if (!user) {
      user = await User.create({
        googleId,
        email,
        name: name || email.split("@")[0],
        picture,
      });
    } else {
      user.email = email;
      user.name = name || user.name;
      user.picture = picture || user.picture;
      user.lastLogin = new Date();
      await user.save();
    }

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
    console.error("Auth error:", error);
    const statusCode = error?.statusCode || 500;
    setResponseStatus(event, statusCode);

    return {
      success: false,
      error: error?.statusMessage || "Authentication failed",
    };
  }
});
