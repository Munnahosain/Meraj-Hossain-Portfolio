import { o as __toESM } from "../_runtime.mjs";
import { u as require_react } from "../_libs/@floating-ui/react-dom+[...].mjs";
import { _ as useNavigate } from "../_libs/@tanstack/react-router+[...].mjs";
import { t as require_jsx_dev_runtime } from "../_libs/react.mjs";
//#region node_modules/.nitro/vite/services/ssr/assets/google-callback-CyCEShUU.js
var import_react = /* @__PURE__ */ __toESM(require_react());
var import_jsx_dev_runtime = require_jsx_dev_runtime();
var _jsxFileName = "E:/Web/creative-canvas-hub-main/creative-canvas-hub-main/src/routes/admin/google-callback.tsx?tsr-split=component";
function GoogleCallback() {
	const navigate = useNavigate();
	const [message, setMessage] = (0, import_react.useState)("Signing you in...");
	(0, import_react.useEffect)(() => {
		const completeLogin = async () => {
			const search = new URLSearchParams(window.location.search);
			const code = search.get("code");
			const oauthError = search.get("error");
			if (oauthError) {
				setMessage(`Google login failed: ${oauthError}`);
				return;
			}
			if (!code) {
				setMessage("Google login failed: missing authorization code.");
				return;
			}
			try {
				const response = await fetch("/api/auth/google-callback", {
					method: "POST",
					headers: { "Content-Type": "application/json" },
					body: JSON.stringify({
						code,
						redirectUri: `${window.location.origin}/admin/google-callback`
					})
				});
				const result = await response.json();
				if (!response.ok || !result.success) {
					setMessage(result.error || "Google login failed.");
					return;
				}
				localStorage.setItem("admin_token", result.token);
				navigate({ to: "/admin" });
			} catch (error) {
				console.error("Google callback error:", error);
				setMessage("Google login failed. Please try again.");
			}
		};
		completeLogin();
	}, [navigate]);
	return /* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)("div", {
		className: "flex min-h-screen items-center justify-center bg-black px-6 text-white",
		children: /* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)("div", {
			className: "w-full max-w-md rounded-lg border border-gray-800 bg-gray-950 p-8 text-center",
			children: [
				/* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)("div", { className: "mx-auto mb-5 h-12 w-12 rounded-full border-4 border-gray-800 border-t-white animate-spin" }, void 0, false, {
					fileName: _jsxFileName,
					lineNumber: 48,
					columnNumber: 9
				}, this),
				/* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)("h1", {
					className: "text-2xl font-bold",
					children: "Google Login"
				}, void 0, false, {
					fileName: _jsxFileName,
					lineNumber: 49,
					columnNumber: 9
				}, this),
				/* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)("p", {
					className: "mt-3 text-sm text-gray-400",
					children: message
				}, void 0, false, {
					fileName: _jsxFileName,
					lineNumber: 50,
					columnNumber: 9
				}, this)
			]
		}, void 0, true, {
			fileName: _jsxFileName,
			lineNumber: 47,
			columnNumber: 7
		}, this)
	}, void 0, false, {
		fileName: _jsxFileName,
		lineNumber: 46,
		columnNumber: 10
	}, this);
}
//#endregion
export { GoogleCallback as component };
