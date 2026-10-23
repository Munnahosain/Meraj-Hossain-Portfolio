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

export function getAllowedAdminEmails() {
  return [
    process.env.ADMIN_EMAIL?.trim().toLowerCase(),
    process.env.VITE_ADMIN_EMAIL?.trim().toLowerCase(),
    process.env.DEV_ADMIN_EMAIL?.trim().toLowerCase(),
    process.env.VITE_DEV_ADMIN_EMAIL?.trim().toLowerCase(),
  ]
    .filter(Boolean)
    .map((email) => String(email).trim().toLowerCase());
}

export function isAuthorizedAdminEmail(email: string) {
  return getAllowedAdminEmails().includes(email.trim().toLowerCase());
}

export async function requireAdminEmail(event: H3Event) {
  const user = await requireAuth(event);
  const allowedEmails = getAllowedAdminEmails();

  if (!allowedEmails.length || !allowedEmails.includes(user.email?.trim().toLowerCase())) {
    throw createError({
      statusCode: 403,
      statusMessage: "Access Denied - Admin email not authorized",
    });
  }

  return user;
}
