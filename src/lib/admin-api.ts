export class AdminApiError extends Error {
  status: number;

  constructor(message: string, status: number) {
    super(message);
    this.name = "AdminApiError";
    this.status = status;
  }
}

export async function fetchWithAuth<T = unknown>(
  token: string,
  url: string,
  options: RequestInit = {},
): Promise<T> {
  const headers = new Headers(options.headers);
  // Attach Bearer token when provided
  if (token) {
    headers.set("Authorization", "Bearer " + token);
  }

  if (options.body && !(options.body instanceof FormData) && !headers.has("Content-Type")) {
    headers.set("Content-Type", "application/json");
  }

  const response = await fetch(url, { ...options, headers });
  const parsedResult: unknown = await response.json().catch(() => ({}));
  const result =
    parsedResult && typeof parsedResult === "object" && !Array.isArray(parsedResult)
      ? (parsedResult as Record<string, unknown>)
      : {};

  if (!response.ok || result.success === false) {
    const message = [result.message, result.error, result.statusMessage].find(
      (value): value is string => typeof value === "string",
    );
    throw new AdminApiError(message || "Request failed", response.status);
  }

  return result as T;
}
