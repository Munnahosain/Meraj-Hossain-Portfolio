import { H3Event } from "h3";
import { verifyToken, extractTokenFromHeader } from "./jwt";

export const DEFAULT_ADMIN_EMAIL = "merajhossain.mcu@gmail.com";
export const DEFAULT_ADMIN_PASSWORD = "Admin@123";

export function resolveAdminCredentials() {
  const configuredEmail = DEFAULT_ADMIN_EMAIL;

  const configuredPassword =
    process.env.ADMIN_PASSWORD ||
    process.env.VITE_ADMIN_PASS ||
    DEFAULT_ADMIN_PASSWORD;

  return {
    email: configuredEmail,
    password: configuredPassword,
  };
}

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

  event.context.user = payload;
  return payload;
}

export function getAllowedAdminEmails() {
  return [DEFAULT_ADMIN_EMAIL];
}

export function isAuthorizedAdminEmail(email?: string) {
  if (!email) return false;
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
