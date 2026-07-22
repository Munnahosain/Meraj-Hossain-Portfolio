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
  headers.set("Authorization", `Bearer ${token}`);
  if (options.body && !headers.has("Content-Type")) {
    headers.set("Content-Type", "application/json");
  }

  const response = await fetch(url, { ...options, headers });
  const result = await response.json().catch(() => ({}));

  if (!response.ok || result.success === false) {
    throw new AdminApiError(
      result.message || result.error || result.statusMessage || "Request failed",
      response.status,
    );
  }

  return result as T;
}
