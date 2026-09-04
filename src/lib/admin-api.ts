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
    headers.set("Authorization", 'Bearer ' + token);
  }

  if (options.body && !headers.has("Content-Type")) {
    headers.set("Content-Type", "application/json");
  }

  const response = await fetch(url, { ...options, headers });
  const result = await response.json().catch(() => ({}));

  if (!response.ok || (result && (result as any).success === false)) {
    throw new AdminApiError(
      (result && ((result as any).message || (result as any).error || (result as any).statusMessage)) || "Request failed",
      response.status,
    );
  }

  return result as T;
}
