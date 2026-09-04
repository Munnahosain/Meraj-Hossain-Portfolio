//#region node_modules/.nitro/vite/services/ssr/assets/admin-api-B-is0sao.js
var AdminApiError = class extends Error {
	status;
	constructor(message, status) {
		super(message);
		this.name = "AdminApiError";
		this.status = status;
	}
};
async function fetchWithAuth(token, url, options = {}) {
	const headers = new Headers(options.headers);
	if (token) headers.set("Authorization", "Bearer " + token);
	if (options.body && !headers.has("Content-Type")) headers.set("Content-Type", "application/json");
	const response = await fetch(url, {
		...options,
		headers
	});
	const result = await response.json().catch(() => ({}));
	if (!response.ok || result && result.success === false) throw new AdminApiError(result && (result.message || result.error || result.statusMessage) || "Request failed", response.status);
	return result;
}
//#endregion
export { fetchWithAuth as t };
