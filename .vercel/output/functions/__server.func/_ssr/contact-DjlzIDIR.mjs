import { o as __toESM } from "../_runtime.mjs";
import { u as require_react } from "../_libs/@floating-ui/react-dom+[...].mjs";
import { t as require_jsx_dev_runtime } from "../_libs/react.mjs";
import { s as useWebsiteSettings, t as SiteChrome } from "./SiteChrome-CtkgSc4O.mjs";
//#region node_modules/.nitro/vite/services/ssr/assets/contact-DjlzIDIR.js
var import_react = /* @__PURE__ */ __toESM(require_react());
var import_jsx_dev_runtime = require_jsx_dev_runtime();
var _jsxFileName = "E:/Web/creative-canvas-hub-main/creative-canvas-hub-main/src/routes/contact.tsx?tsr-split=component";
function ContactPage() {
	const { data: settings } = useWebsiteSettings();
	const [name, setName] = (0, import_react.useState)("");
	const [email, setEmail] = (0, import_react.useState)("");
	const [message, setMessage] = (0, import_react.useState)("");
	const [status, setStatus] = (0, import_react.useState)("idle");
	const [feedbackMsg, setFeedbackMsg] = (0, import_react.useState)("");
	const emailVal = settings?.contact?.email || "munnahosain042@gmail.com";
	const phoneVal = settings?.contact?.phone || "+880 1300-294781";
	const addressVal = settings?.contact?.address || "1216 Nagar Kanda, Savar, Dhaka, Bangladesh";
	const handleSubmit = async (e) => {
		e.preventDefault();
		if (!name || !email || !message) return;
		setStatus("submitting");
		try {
			const res = await fetch("/api/contact", {
				method: "POST",
				headers: { "Content-Type": "application/json" },
				body: JSON.stringify({
					name,
					email,
					subject: "Portfolio Inquiry",
					message
				})
			});
			const data = await res.json();
			if (res.ok && data.success) {
				setStatus("success");
				setFeedbackMsg(data.message || "Message sent successfully!");
				setName("");
				setEmail("");
				setMessage("");
			} else {
				setStatus("error");
				setFeedbackMsg(data.message || "Failed to send message.");
			}
		} catch {
			setStatus("error");
			setFeedbackMsg("Network error. Please try again.");
		}
	};
	return /* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)(SiteChrome, { children: [/* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)("section", {
		className: "px-6 md:px-12 py-16 md:py-24",
		children: /* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)("div", {
			className: "max-w-7xl mx-auto",
			children: [/* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)("div", {
				className: "font-mono text-[10px] uppercase tracking-[0.3em] text-[var(--brand-red)] mb-6",
				children: "Get in touch"
			}, void 0, false, {
				fileName: _jsxFileName,
				lineNumber: 52,
				columnNumber: 11
			}, this), /* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)("h1", {
				className: "font-display uppercase text-6xl md:text-[10rem] leading-[0.95]",
				children: [
					"Let's ",
					/* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)("br", {}, void 0, false, {
						fileName: _jsxFileName,
						lineNumber: 56,
						columnNumber: 19
					}, this),
					"talk."
				]
			}, void 0, true, {
				fileName: _jsxFileName,
				lineNumber: 55,
				columnNumber: 11
			}, this)]
		}, void 0, true, {
			fileName: _jsxFileName,
			lineNumber: 51,
			columnNumber: 9
		}, this)
	}, void 0, false, {
		fileName: _jsxFileName,
		lineNumber: 50,
		columnNumber: 7
	}, this), /* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)("section", {
		className: "px-6 md:px-12 pb-32",
		children: /* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)("div", {
			className: "max-w-5xl mx-auto grid md:grid-cols-2 gap-16",
			children: [/* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)("div", {
				className: "space-y-10",
				children: [
					/* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)("div", { children: [/* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)("div", {
						className: "font-mono text-[10px] uppercase tracking-widest text-white/40 mb-2",
						children: "Email"
					}, void 0, false, {
						fileName: _jsxFileName,
						lineNumber: 65,
						columnNumber: 15
					}, this), /* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)("a", {
						href: `mailto:${emailVal}`,
						className: "font-display uppercase text-2xl md:text-3xl hover:text-[var(--brand-red)] transition-colors block break-all",
						children: emailVal
					}, void 0, false, {
						fileName: _jsxFileName,
						lineNumber: 68,
						columnNumber: 15
					}, this)] }, void 0, true, {
						fileName: _jsxFileName,
						lineNumber: 64,
						columnNumber: 13
					}, this),
					/* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)("div", { children: [/* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)("div", {
						className: "font-mono text-[10px] uppercase tracking-widest text-white/40 mb-2",
						children: "Phone"
					}, void 0, false, {
						fileName: _jsxFileName,
						lineNumber: 73,
						columnNumber: 15
					}, this), /* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)("a", {
						href: `tel:${phoneVal}`,
						className: "font-display uppercase text-2xl md:text-3xl hover:text-[var(--brand-red)] transition-colors",
						children: phoneVal
					}, void 0, false, {
						fileName: _jsxFileName,
						lineNumber: 76,
						columnNumber: 15
					}, this)] }, void 0, true, {
						fileName: _jsxFileName,
						lineNumber: 72,
						columnNumber: 13
					}, this),
					/* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)("div", { children: [/* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)("div", {
						className: "font-mono text-[10px] uppercase tracking-widest text-white/40 mb-2",
						children: "Address"
					}, void 0, false, {
						fileName: _jsxFileName,
						lineNumber: 81,
						columnNumber: 15
					}, this), /* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)("div", {
						className: "text-lg leading-relaxed whitespace-pre-line",
						children: addressVal
					}, void 0, false, {
						fileName: _jsxFileName,
						lineNumber: 84,
						columnNumber: 15
					}, this)] }, void 0, true, {
						fileName: _jsxFileName,
						lineNumber: 80,
						columnNumber: 13
					}, this),
					/* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)("div", { children: [/* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)("div", {
						className: "font-mono text-[10px] uppercase tracking-widest text-white/40 mb-2",
						children: "Social"
					}, void 0, false, {
						fileName: _jsxFileName,
						lineNumber: 87,
						columnNumber: 15
					}, this), /* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)("div", {
						className: "flex gap-6 font-mono text-xs uppercase tracking-widest text-white/70",
						children: [
							/* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)("a", {
								href: settings?.social?.linkedin?.url || "https://linkedin.com",
								target: "_blank",
								rel: "noreferrer",
								className: "hover:text-white",
								children: "LinkedIn ↗"
							}, void 0, false, {
								fileName: _jsxFileName,
								lineNumber: 91,
								columnNumber: 17
							}, this),
							/* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)("a", {
								href: settings?.social?.behance?.url || "https://behance.net",
								target: "_blank",
								rel: "noreferrer",
								className: "hover:text-white",
								children: "Behance ↗"
							}, void 0, false, {
								fileName: _jsxFileName,
								lineNumber: 94,
								columnNumber: 17
							}, this),
							/* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)("a", {
								href: settings?.social?.instagram?.url || "https://instagram.com",
								target: "_blank",
								rel: "noreferrer",
								className: "hover:text-white",
								children: "Instagram ↗"
							}, void 0, false, {
								fileName: _jsxFileName,
								lineNumber: 97,
								columnNumber: 17
							}, this)
						]
					}, void 0, true, {
						fileName: _jsxFileName,
						lineNumber: 90,
						columnNumber: 15
					}, this)] }, void 0, true, {
						fileName: _jsxFileName,
						lineNumber: 86,
						columnNumber: 13
					}, this)
				]
			}, void 0, true, {
				fileName: _jsxFileName,
				lineNumber: 63,
				columnNumber: 11
			}, this), /* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)("form", {
				className: "space-y-8",
				onSubmit: handleSubmit,
				children: [
					/* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)("div", {
						className: "border-b border-white/20 focus-within:border-[var(--brand-red)] transition-colors pb-2",
						children: [/* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)("label", {
							className: "font-mono text-[10px] uppercase tracking-widest text-white/40 block mb-2",
							children: "Name"
						}, void 0, false, {
							fileName: _jsxFileName,
							lineNumber: 106,
							columnNumber: 15
						}, this), /* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)("input", {
							type: "text",
							required: true,
							value: name,
							onChange: (e) => setName(e.target.value),
							className: "w-full bg-transparent outline-none text-lg placeholder:text-white/20",
							placeholder: "Your name"
						}, void 0, false, {
							fileName: _jsxFileName,
							lineNumber: 109,
							columnNumber: 15
						}, this)]
					}, void 0, true, {
						fileName: _jsxFileName,
						lineNumber: 105,
						columnNumber: 13
					}, this),
					/* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)("div", {
						className: "border-b border-white/20 focus-within:border-[var(--brand-red)] transition-colors pb-2",
						children: [/* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)("label", {
							className: "font-mono text-[10px] uppercase tracking-widest text-white/40 block mb-2",
							children: "Email"
						}, void 0, false, {
							fileName: _jsxFileName,
							lineNumber: 112,
							columnNumber: 15
						}, this), /* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)("input", {
							type: "email",
							required: true,
							value: email,
							onChange: (e) => setEmail(e.target.value),
							className: "w-full bg-transparent outline-none text-lg placeholder:text-white/20",
							placeholder: "you@studio.com"
						}, void 0, false, {
							fileName: _jsxFileName,
							lineNumber: 115,
							columnNumber: 15
						}, this)]
					}, void 0, true, {
						fileName: _jsxFileName,
						lineNumber: 111,
						columnNumber: 13
					}, this),
					/* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)("div", {
						className: "border-b border-white/20 focus-within:border-[var(--brand-red)] transition-colors pb-2",
						children: [/* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)("label", {
							className: "font-mono text-[10px] uppercase tracking-widest text-white/40 block mb-2",
							children: "Project"
						}, void 0, false, {
							fileName: _jsxFileName,
							lineNumber: 118,
							columnNumber: 15
						}, this), /* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)("textarea", {
							rows: 4,
							required: true,
							value: message,
							onChange: (e) => setMessage(e.target.value),
							className: "w-full bg-transparent outline-none text-lg placeholder:text-white/20 resize-none",
							placeholder: "Tell me what you're building"
						}, void 0, false, {
							fileName: _jsxFileName,
							lineNumber: 121,
							columnNumber: 15
						}, this)]
					}, void 0, true, {
						fileName: _jsxFileName,
						lineNumber: 117,
						columnNumber: 13
					}, this),
					feedbackMsg && /* @__PURE__ */ (void 0)("div", {
						className: `p-4 font-mono text-xs uppercase tracking-widest ${status === "success" ? "bg-emerald-950/60 text-emerald-400 border border-emerald-800" : "bg-red-950/60 text-red-400 border border-red-800"}`,
						children: feedbackMsg
					}, void 0, false, {
						fileName: _jsxFileName,
						lineNumber: 124,
						columnNumber: 29
					}, this),
					/* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)("button", {
						type: "submit",
						disabled: status === "submitting",
						className: "w-full flex items-center justify-between border border-white/20 hover:border-[var(--brand-red)] hover:bg-[var(--brand-red)] transition-all px-6 py-5 group disabled:opacity-50",
						children: [/* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)("span", {
							className: "font-mono text-xs uppercase tracking-widest",
							children: status === "submitting" ? "Sending..." : "Send message"
						}, void 0, false, {
							fileName: _jsxFileName,
							lineNumber: 129,
							columnNumber: 15
						}, this), /* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)("span", {
							className: "text-2xl group-hover:translate-x-2 transition-transform",
							children: "→"
						}, void 0, false, {
							fileName: _jsxFileName,
							lineNumber: 132,
							columnNumber: 15
						}, this)]
					}, void 0, true, {
						fileName: _jsxFileName,
						lineNumber: 128,
						columnNumber: 13
					}, this)
				]
			}, void 0, true, {
				fileName: _jsxFileName,
				lineNumber: 104,
				columnNumber: 11
			}, this)]
		}, void 0, true, {
			fileName: _jsxFileName,
			lineNumber: 62,
			columnNumber: 9
		}, this)
	}, void 0, false, {
		fileName: _jsxFileName,
		lineNumber: 61,
		columnNumber: 7
	}, this)] }, void 0, true, {
		fileName: _jsxFileName,
		lineNumber: 49,
		columnNumber: 10
	}, this);
}
//#endregion
export { ContactPage as component };
