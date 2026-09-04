import { o as __toESM } from "../_runtime.mjs";
import { u as require_react } from "../_libs/@floating-ui/react-dom+[...].mjs";
import { t as require_jsx_dev_runtime } from "../_libs/react.mjs";
import { t as SiteChrome } from "./SiteChrome-CtkgSc4O.mjs";
//#region node_modules/.nitro/vite/services/ssr/assets/project-DVZk6wMZ.js
var import_react = /* @__PURE__ */ __toESM(require_react());
var import_jsx_dev_runtime = require_jsx_dev_runtime();
var _jsxFileName = "E:/Web/creative-canvas-hub-main/creative-canvas-hub-main/src/routes/project.tsx?tsr-split=component";
function ProjectPage() {
	const [project, setProject] = (0, import_react.useState)(null);
	const [loading, setLoading] = (0, import_react.useState)(true);
	const [error, setError] = (0, import_react.useState)(null);
	(0, import_react.useEffect)(() => {
		const id = new URLSearchParams(window.location.search).get("id");
		if (!id) {
			setError("No project specified");
			setLoading(false);
			return;
		}
		(async () => {
			try {
				setLoading(true);
				const res = await fetch(`/api/projects/${id}`);
				const json = await res.json().catch(() => ({}));
				if (!res.ok || !json.success) setError(json?.message || "Failed to load project");
				else setProject(json.data);
			} catch (err) {
				setError(err instanceof Error ? err.message : "Failed to load project");
			} finally {
				setLoading(false);
			}
		})();
	}, []);
	if (loading) return /* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)(SiteChrome, { children: /* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)("div", {
		className: "px-6 md:px-12 py-16",
		children: "Loading project..."
	}, void 0, false, {
		fileName: _jsxFileName,
		lineNumber: 33,
		columnNumber: 7
	}, this) }, void 0, false, {
		fileName: _jsxFileName,
		lineNumber: 32,
		columnNumber: 23
	}, this);
	if (error || !project) return /* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)(SiteChrome, { children: /* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)("div", {
		className: "px-6 md:px-12 py-16 text-red-400",
		children: error || "Project not found"
	}, void 0, false, {
		fileName: _jsxFileName,
		lineNumber: 36,
		columnNumber: 7
	}, this) }, void 0, false, {
		fileName: _jsxFileName,
		lineNumber: 35,
		columnNumber: 33
	}, this);
	return /* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)(SiteChrome, { children: [/* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)("section", {
		className: "px-6 md:px-12 py-12",
		children: /* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)("div", {
			className: "max-w-6xl mx-auto",
			children: [/* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)("h1", {
				className: "font-display uppercase text-5xl mb-4",
				children: project.title
			}, void 0, false, {
				fileName: _jsxFileName,
				lineNumber: 41,
				columnNumber: 11
			}, this), /* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)("p", {
				className: "text-white/60 mb-6",
				children: project.shortDescription
			}, void 0, false, {
				fileName: _jsxFileName,
				lineNumber: 42,
				columnNumber: 11
			}, this)]
		}, void 0, true, {
			fileName: _jsxFileName,
			lineNumber: 40,
			columnNumber: 9
		}, this)
	}, void 0, false, {
		fileName: _jsxFileName,
		lineNumber: 39,
		columnNumber: 7
	}, this), /* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)("section", {
		className: "px-6 md:px-12 pb-24",
		children: /* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)("div", {
			className: "max-w-6xl mx-auto grid grid-cols-1 md:grid-cols-3 gap-6",
			children: [/* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)("div", {
				className: "md:col-span-2",
				children: [/* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)("div", {
					className: "w-full bg-neutral-900 border border-white/5 overflow-hidden rounded",
					children: project.mediaInfo?.youtubeEmbed ? /* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)("iframe", {
						src: project.mediaInfo.youtubeEmbed,
						title: project.title,
						className: "w-full h-[480px] object-cover border-0",
						allow: "accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture",
						allowFullScreen: true
					}, void 0, false, {
						fileName: _jsxFileName,
						lineNumber: 51,
						columnNumber: 50
					}, this) : project.mediaInfo?.googleDriveEmbed ? /* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)("iframe", {
						src: project.mediaInfo.googleDriveEmbed,
						title: project.title,
						className: "w-full h-[480px] object-cover border-0",
						allow: "autoplay"
					}, void 0, false, {
						fileName: _jsxFileName,
						lineNumber: 51,
						columnNumber: 324
					}, this) : /* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)("img", {
						src: project.thumbnail,
						alt: project.title,
						className: "w-full h-[480px] object-cover"
					}, void 0, false, {
						fileName: _jsxFileName,
						lineNumber: 51,
						columnNumber: 468
					}, this)
				}, void 0, false, {
					fileName: _jsxFileName,
					lineNumber: 50,
					columnNumber: 13
				}, this), /* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)("div", {
					className: "mt-6 grid grid-cols-2 md:grid-cols-3 gap-4",
					children: (project.galleryImages || []).map((img, i) => /* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)("div", {
						className: "overflow-hidden rounded shadow-sm",
						children: /* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)("a", {
							href: img,
							target: "_blank",
							rel: "noreferrer",
							children: /* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)("img", {
								src: img,
								alt: `gallery-${i}`,
								className: "w-full h-48 object-cover hover:scale-105 transition-transform duration-400"
							}, void 0, false, {
								fileName: _jsxFileName,
								lineNumber: 58,
								columnNumber: 21
							}, this)
						}, void 0, false, {
							fileName: _jsxFileName,
							lineNumber: 57,
							columnNumber: 19
						}, this)
					}, img + i, false, {
						fileName: _jsxFileName,
						lineNumber: 56,
						columnNumber: 78
					}, this))
				}, void 0, false, {
					fileName: _jsxFileName,
					lineNumber: 55,
					columnNumber: 13
				}, this)]
			}, void 0, true, {
				fileName: _jsxFileName,
				lineNumber: 49,
				columnNumber: 11
			}, this), /* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)("aside", {
				className: "md:col-span-1",
				children: /* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)("div", {
					className: "bg-neutral-900 border border-white/5 p-4 rounded",
					children: [/* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)("h3", {
						className: "font-mono text-xs uppercase text-white/60",
						children: "Details"
					}, void 0, false, {
						fileName: _jsxFileName,
						lineNumber: 67,
						columnNumber: 15
					}, this), /* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)("div", {
						className: "mt-3 text-sm text-white/80",
						children: [
							/* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)("p", { children: [
								/* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)("strong", { children: "Client:" }, void 0, false, {
									fileName: _jsxFileName,
									lineNumber: 69,
									columnNumber: 20
								}, this),
								" ",
								project.clientName || "—"
							] }, void 0, true, {
								fileName: _jsxFileName,
								lineNumber: 69,
								columnNumber: 17
							}, this),
							/* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)("p", {
								className: "mt-2",
								children: [
									/* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)("strong", { children: "Category:" }, void 0, false, {
										fileName: _jsxFileName,
										lineNumber: 70,
										columnNumber: 37
									}, this),
									" ",
									project.category || "—"
								]
							}, void 0, true, {
								fileName: _jsxFileName,
								lineNumber: 70,
								columnNumber: 17
							}, this),
							/* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)("p", {
								className: "mt-2",
								children: [
									/* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)("strong", { children: "Year:" }, void 0, false, {
										fileName: _jsxFileName,
										lineNumber: 71,
										columnNumber: 37
									}, this),
									" ",
									project.createdAt ? new Date(project.createdAt).getFullYear() : "—"
								]
							}, void 0, true, {
								fileName: _jsxFileName,
								lineNumber: 71,
								columnNumber: 17
							}, this),
							project.liveWebsite && /* @__PURE__ */ (void 0)("p", {
								className: "mt-2",
								children: /* @__PURE__ */ (void 0)("a", {
									href: project.liveWebsite,
									className: "text-[var(--brand-green)] underline",
									target: "_blank",
									rel: "noreferrer",
									children: "Live site"
								}, void 0, false, {
									fileName: _jsxFileName,
									lineNumber: 72,
									columnNumber: 61
								}, this)
							}, void 0, false, {
								fileName: _jsxFileName,
								lineNumber: 72,
								columnNumber: 41
							}, this),
							project.behanceLink && /* @__PURE__ */ (void 0)("p", {
								className: "mt-2",
								children: /* @__PURE__ */ (void 0)("a", {
									href: project.behanceLink,
									className: "text-[var(--brand-green)] underline",
									target: "_blank",
									rel: "noreferrer",
									children: "Behance"
								}, void 0, false, {
									fileName: _jsxFileName,
									lineNumber: 73,
									columnNumber: 61
								}, this)
							}, void 0, false, {
								fileName: _jsxFileName,
								lineNumber: 73,
								columnNumber: 41
							}, this),
							project.githubLink && /* @__PURE__ */ (void 0)("p", {
								className: "mt-2",
								children: /* @__PURE__ */ (void 0)("a", {
									href: project.githubLink,
									className: "text-[var(--brand-green)] underline",
									target: "_blank",
									rel: "noreferrer",
									children: "Repository"
								}, void 0, false, {
									fileName: _jsxFileName,
									lineNumber: 74,
									columnNumber: 60
								}, this)
							}, void 0, false, {
								fileName: _jsxFileName,
								lineNumber: 74,
								columnNumber: 40
							}, this)
						]
					}, void 0, true, {
						fileName: _jsxFileName,
						lineNumber: 68,
						columnNumber: 15
					}, this)]
				}, void 0, true, {
					fileName: _jsxFileName,
					lineNumber: 66,
					columnNumber: 13
				}, this)
			}, void 0, false, {
				fileName: _jsxFileName,
				lineNumber: 65,
				columnNumber: 11
			}, this)]
		}, void 0, true, {
			fileName: _jsxFileName,
			lineNumber: 47,
			columnNumber: 9
		}, this)
	}, void 0, false, {
		fileName: _jsxFileName,
		lineNumber: 46,
		columnNumber: 7
	}, this)] }, void 0, true, {
		fileName: _jsxFileName,
		lineNumber: 38,
		columnNumber: 10
	}, this);
}
//#endregion
export { ProjectPage as component };
