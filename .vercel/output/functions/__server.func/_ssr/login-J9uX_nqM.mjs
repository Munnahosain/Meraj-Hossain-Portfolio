import { o as __toESM } from "../_runtime.mjs";
import { u as require_react } from "../_libs/@floating-ui/react-dom+[...].mjs";
import { t as useLocalStorage } from "./use-local-storage-DfBBwPrj.mjs";
import { _ as useNavigate } from "../_libs/@tanstack/react-router+[...].mjs";
import { t as require_jsx_dev_runtime } from "../_libs/react.mjs";
//#region node_modules/.nitro/vite/services/ssr/assets/login-J9uX_nqM.js
var import_react = /* @__PURE__ */ __toESM(require_react());
var import_jsx_dev_runtime = require_jsx_dev_runtime();
var _jsxFileName = "E:/Web/creative-canvas-hub-main/creative-canvas-hub-main/src/routes/admin/login.tsx?tsr-split=component";
var demoEmail = "merajhossain.mcu@gmail.com";
var demoPassword = "Admin@123";
function AdminLogin() {
	const navigate = useNavigate();
	const [token, setToken] = useLocalStorage("admin_token", "");
	const [mode, setMode] = (0, import_react.useState)("signin");
	const [name, setName] = (0, import_react.useState)("Admin");
	const [email, setEmail] = (0, import_react.useState)(demoEmail);
	const [password, setPassword] = (0, import_react.useState)(demoPassword);
	const [error, setError] = (0, import_react.useState)("");
	const [info, setInfo] = (0, import_react.useState)("");
	const [isSubmitting, setIsSubmitting] = (0, import_react.useState)(false);
	const hasGoogleLogin = Boolean(void 0);
	(0, import_react.useEffect)(() => {
		if (token) navigate({ to: "/admin" });
	}, [token, navigate]);
	const handleGoogleLogin = async () => {
		try {
			setError("Google Client ID missing. Add VITE_GOOGLE_CLIENT_ID to your .env file.");
			return;
		} catch (error) {
			console.error("Login error:", error);
			setError("Unable to start Google login. Please try again.");
		}
	};
	const handlePasswordLogin = async (event) => {
		event.preventDefault();
		setError("");
		setInfo("");
		setIsSubmitting(true);
		const controller = new AbortController();
		const timeoutId = setTimeout(() => controller.abort(), 15e3);
		try {
			const response = await fetch(mode === "signup" ? "/api/auth/signup" : "/api/auth/login", {
				method: "POST",
				headers: { "Content-Type": "application/json" },
				body: JSON.stringify(mode === "signup" ? {
					name,
					email,
					password
				} : {
					email,
					password
				}),
				signal: controller.signal
			});
			clearTimeout(timeoutId);
			const result = await response.json();
			if (!response.ok || !result.success) {
				setError(result.message || result.error || "Unable to complete this request.");
				return;
			}
			if (mode === "signup") {
				setInfo("Account created successfully. You can sign in now.");
				setMode("signin");
				setPassword("");
				setEmail(result.user?.email || email);
				return;
			}
			setToken(result.token);
			navigate({ to: "/admin" });
		} catch (error) {
			clearTimeout(timeoutId);
			if (error instanceof Error && error.name === "AbortError") setError("Request timed out. Server is taking too long — please try again.");
			else {
				console.error("Password login error:", error);
				setError("Unable to complete the request. Please try again.");
			}
		} finally {
			setIsSubmitting(false);
		}
	};
	const handleForgotPassword = () => {
		setError("");
		setInfo("Contact the site owner to reset the authorized admin access.");
	};
	return /* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)("div", {
		className: "flex min-h-screen items-center justify-center bg-[#050a07] px-4 py-12 text-white",
		children: /* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)("div", {
			className: "w-full max-w-md",
			children: [/* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)("div", {
				className: "mb-8 text-center",
				children: [
					/* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)("div", {
						className: "mx-auto mb-4 flex h-20 items-center justify-center",
						children: /* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)("img", {
							src: "/MCU-LOGO-0.2V-1.png",
							alt: "MCU Logo",
							className: "h-full w-auto object-contain"
						}, void 0, false, {
							fileName: _jsxFileName,
							lineNumber: 107,
							columnNumber: 13
						}, this)
					}, void 0, false, {
						fileName: _jsxFileName,
						lineNumber: 106,
						columnNumber: 11
					}, this),
					/* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)("h1", {
						className: "mb-2 text-3xl font-black tracking-tight text-white",
						children: "Admin Panel"
					}, void 0, false, {
						fileName: _jsxFileName,
						lineNumber: 109,
						columnNumber: 11
					}, this),
					/* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)("p", {
						className: "text-sm text-gray-400",
						children: "Sign in to manage the portfolio securely"
					}, void 0, false, {
						fileName: _jsxFileName,
						lineNumber: 110,
						columnNumber: 11
					}, this)
				]
			}, void 0, true, {
				fileName: _jsxFileName,
				lineNumber: 105,
				columnNumber: 9
			}, this), /* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)("div", {
				className: "rounded-2xl border border-gray-800 bg-gray-950/90 p-6 shadow-[0_30px_80px_rgba(0,0,0,0.45)] backdrop-blur-xl",
				children: [
					/* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)("div", {
						className: "mb-5 flex rounded-xl border border-gray-800 bg-black/30 p-1",
						children: [/* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)("button", {
							type: "button",
							onClick: () => setMode("signin"),
							className: `flex-1 rounded-lg px-3 py-2 text-sm font-semibold transition ${mode === "signin" ? "bg-emerald-500 text-black" : "text-gray-300"}`,
							children: "Sign in"
						}, void 0, false, {
							fileName: _jsxFileName,
							lineNumber: 115,
							columnNumber: 13
						}, this), /* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)("button", {
							type: "button",
							onClick: () => setMode("signup"),
							className: `flex-1 rounded-lg px-3 py-2 text-sm font-semibold transition ${mode === "signup" ? "bg-emerald-500 text-black" : "text-gray-300"}`,
							children: "Sign up"
						}, void 0, false, {
							fileName: _jsxFileName,
							lineNumber: 118,
							columnNumber: 13
						}, this)]
					}, void 0, true, {
						fileName: _jsxFileName,
						lineNumber: 114,
						columnNumber: 11
					}, this),
					/* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)("form", {
						onSubmit: handlePasswordLogin,
						className: "space-y-4",
						children: [
							mode === "signup" && /* @__PURE__ */ (void 0)("div", { children: [/* @__PURE__ */ (void 0)("label", {
								className: "mb-2 block text-sm text-gray-400",
								htmlFor: "admin-name",
								children: "Full name"
							}, void 0, false, {
								fileName: _jsxFileName,
								lineNumber: 125,
								columnNumber: 17
							}, this), /* @__PURE__ */ (void 0)("input", {
								id: "admin-name",
								type: "text",
								value: name,
								onChange: (event) => setName(event.target.value),
								className: "w-full rounded-xl border border-gray-700 bg-black px-4 py-3 text-white outline-none transition focus:border-emerald-400 focus:ring-2 focus:ring-emerald-500/20",
								placeholder: "Your name",
								autoComplete: "name",
								required: true
							}, void 0, false, {
								fileName: _jsxFileName,
								lineNumber: 128,
								columnNumber: 17
							}, this)] }, void 0, true, {
								fileName: _jsxFileName,
								lineNumber: 124,
								columnNumber: 35
							}, this),
							/* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)("div", { children: [/* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)("label", {
								className: "mb-2 block text-sm text-gray-400",
								htmlFor: "admin-email",
								children: "Email"
							}, void 0, false, {
								fileName: _jsxFileName,
								lineNumber: 132,
								columnNumber: 15
							}, this), /* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)("input", {
								id: "admin-email",
								type: "email",
								value: email,
								onChange: (event) => setEmail(event.target.value),
								className: "w-full rounded-xl border border-gray-700 bg-black px-4 py-3 text-white outline-none transition focus:border-emerald-400 focus:ring-2 focus:ring-emerald-500/20",
								placeholder: "admin@creativecanvashub.com",
								autoComplete: "email",
								required: true
							}, void 0, false, {
								fileName: _jsxFileName,
								lineNumber: 135,
								columnNumber: 15
							}, this)] }, void 0, true, {
								fileName: _jsxFileName,
								lineNumber: 131,
								columnNumber: 13
							}, this),
							/* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)("div", { children: [/* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)("div", {
								className: "mb-2 flex items-center justify-between gap-4",
								children: [/* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)("label", {
									className: "block text-sm text-gray-400",
									htmlFor: "admin-password",
									children: "Password"
								}, void 0, false, {
									fileName: _jsxFileName,
									lineNumber: 140,
									columnNumber: 17
								}, this), /* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)("button", {
									type: "button",
									onClick: handleForgotPassword,
									className: "text-xs text-gray-400 transition-colors hover:text-white",
									children: "Reset access"
								}, void 0, false, {
									fileName: _jsxFileName,
									lineNumber: 143,
									columnNumber: 17
								}, this)]
							}, void 0, true, {
								fileName: _jsxFileName,
								lineNumber: 139,
								columnNumber: 15
							}, this), /* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)("input", {
								id: "admin-password",
								type: "password",
								value: password,
								onChange: (event) => setPassword(event.target.value),
								className: "w-full rounded-xl border border-gray-700 bg-black px-4 py-3 text-white outline-none transition focus:border-emerald-400 focus:ring-2 focus:ring-emerald-500/20",
								autoComplete: "current-password",
								required: true
							}, void 0, false, {
								fileName: _jsxFileName,
								lineNumber: 147,
								columnNumber: 15
							}, this)] }, void 0, true, {
								fileName: _jsxFileName,
								lineNumber: 138,
								columnNumber: 13
							}, this),
							/* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)("button", {
								type: "submit",
								disabled: isSubmitting,
								className: "w-full rounded-xl bg-gradient-to-r from-emerald-500 to-emerald-400 px-4 py-3 font-semibold text-black shadow-lg shadow-emerald-500/20 transition hover:brightness-110 disabled:cursor-not-allowed disabled:opacity-60",
								children: isSubmitting ? mode === "signup" ? "Creating account..." : "Signing in..." : mode === "signup" ? "Create account" : "Sign in"
							}, void 0, false, {
								fileName: _jsxFileName,
								lineNumber: 150,
								columnNumber: 13
							}, this)
						]
					}, void 0, true, {
						fileName: _jsxFileName,
						lineNumber: 123,
						columnNumber: 11
					}, this),
					hasGoogleLogin && /* @__PURE__ */ (void 0)(import_jsx_dev_runtime.Fragment, { children: [/* @__PURE__ */ (void 0)("div", {
						className: "my-6 flex items-center gap-3",
						children: [
							/* @__PURE__ */ (void 0)("div", { className: "h-px flex-1 bg-gray-800" }, void 0, false, {
								fileName: _jsxFileName,
								lineNumber: 157,
								columnNumber: 17
							}, this),
							/* @__PURE__ */ (void 0)("span", {
								className: "text-[10px] uppercase tracking-[0.35em] text-gray-500",
								children: "or"
							}, void 0, false, {
								fileName: _jsxFileName,
								lineNumber: 158,
								columnNumber: 17
							}, this),
							/* @__PURE__ */ (void 0)("div", { className: "h-px flex-1 bg-gray-800" }, void 0, false, {
								fileName: _jsxFileName,
								lineNumber: 159,
								columnNumber: 17
							}, this)
						]
					}, void 0, true, {
						fileName: _jsxFileName,
						lineNumber: 156,
						columnNumber: 15
					}, this), /* @__PURE__ */ (void 0)("button", {
						onClick: handleGoogleLogin,
						className: "flex w-full items-center justify-center gap-2 rounded-xl bg-white px-4 py-3 font-semibold text-black transition hover:bg-gray-100",
						children: [/* @__PURE__ */ (void 0)("svg", {
							className: "h-5 w-5",
							viewBox: "0 0 24 24",
							fill: "currentColor",
							"aria-hidden": "true",
							children: [
								/* @__PURE__ */ (void 0)("path", { d: "M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92c-.26 1.37-1.04 2.53-2.21 3.31v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.09z" }, void 0, false, {
									fileName: _jsxFileName,
									lineNumber: 164,
									columnNumber: 19
								}, this),
								/* @__PURE__ */ (void 0)("path", { d: "M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z" }, void 0, false, {
									fileName: _jsxFileName,
									lineNumber: 165,
									columnNumber: 19
								}, this),
								/* @__PURE__ */ (void 0)("path", { d: "M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.07H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.93l2.85-2.22.81-.62z" }, void 0, false, {
									fileName: _jsxFileName,
									lineNumber: 166,
									columnNumber: 19
								}, this),
								/* @__PURE__ */ (void 0)("path", { d: "M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.07l3.66 2.84c.87-2.6 3.3-4.53 6.16-4.53z" }, void 0, false, {
									fileName: _jsxFileName,
									lineNumber: 167,
									columnNumber: 19
								}, this)
							]
						}, void 0, true, {
							fileName: _jsxFileName,
							lineNumber: 163,
							columnNumber: 17
						}, this), "Continue with Google"]
					}, void 0, true, {
						fileName: _jsxFileName,
						lineNumber: 162,
						columnNumber: 15
					}, this)] }, void 0, true, {
						fileName: _jsxFileName,
						lineNumber: 155,
						columnNumber: 30
					}, this),
					/* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)("div", {
						className: "mt-6 text-center text-sm text-gray-500",
						children: [
							/* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)("p", { children: "Only the authorized admin account can access this panel." }, void 0, false, {
								fileName: _jsxFileName,
								lineNumber: 174,
								columnNumber: 13
							}, this),
							error && /* @__PURE__ */ (void 0)("p", {
								className: "mt-4 text-sm text-red-400",
								children: error
							}, void 0, false, {
								fileName: _jsxFileName,
								lineNumber: 175,
								columnNumber: 23
							}, this),
							info && /* @__PURE__ */ (void 0)("p", {
								className: "mt-4 text-sm text-emerald-300",
								children: info
							}, void 0, false, {
								fileName: _jsxFileName,
								lineNumber: 176,
								columnNumber: 22
							}, this)
						]
					}, void 0, true, {
						fileName: _jsxFileName,
						lineNumber: 173,
						columnNumber: 11
					}, this)
				]
			}, void 0, true, {
				fileName: _jsxFileName,
				lineNumber: 113,
				columnNumber: 9
			}, this)]
		}, void 0, true, {
			fileName: _jsxFileName,
			lineNumber: 104,
			columnNumber: 7
		}, this)
	}, void 0, false, {
		fileName: _jsxFileName,
		lineNumber: 103,
		columnNumber: 10
	}, this);
}
//#endregion
export { AdminLogin as component };
