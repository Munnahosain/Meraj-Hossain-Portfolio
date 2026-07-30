import { H3Event } from "h3";
import { verifyToken, extractTokenFromHeader } from "./jwt";

export async function requireAuth(event: H3Event) {
  const authHeader = getHeader(event, "authorization");
  const token = extractTokenFromHeader(authHeader);

  if (!token) {
    throw createError({
      statusCode: 401,
      statusMessage: "Unauthorized - No token provided",
    });
  }

  const payload = verifyToken(token);
  if (!payload) {
    throw createError({
      statusCode: 401,
      statusMessage: "Unauthorized - Invalid token",
    });
  }

  // Store user in event context for later use
  event.context.user = payload;
  return payload;
}

export async function requireAdminEmail(event: H3Event) {
  const user = await requireAuth(event);
  const allowedEmail = process.env.ADMIN_EMAIL?.trim().toLowerCase();

  if (!allowedEmail || user.email?.trim().toLowerCase() !== allowedEmail) {
    throw createError({
      statusCode: 403,
      statusMessage: "Access Denied - Admin email not authorized",
    });
  }

  return user;
}
