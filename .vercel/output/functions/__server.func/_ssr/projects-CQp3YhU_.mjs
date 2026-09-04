import { g as Link } from "../_libs/@tanstack/react-router+[...].mjs";
import { t as require_jsx_dev_runtime } from "../_libs/react.mjs";
import { i as useCMSProjects, t as SiteChrome } from "./SiteChrome-CtkgSc4O.mjs";
import { a as reel_05_default, i as reel_04_default, n as reel_02_default, o as reel_06_default, r as reel_03_default, t as reel_01_default } from "./reel-06-Dj3DRVm0.mjs";
//#region node_modules/.nitro/vite/services/ssr/assets/projects-CQp3YhU_.js
var import_jsx_dev_runtime = require_jsx_dev_runtime();
var _jsxFileName = "E:/Web/creative-canvas-hub-main/creative-canvas-hub-main/src/routes/projects.tsx?tsr-split=component";
var defaultAll = [
	{
		title: "Micro Electronic Campaign",
		year: "2025",
		cat: "Branding · Print",
		client: "Micro Electronic, Dhaka",
		img: reel_01_default
	},
	{
		title: "Product Launch Reel",
		year: "2025",
		cat: "Video Editing",
		client: "In-house",
		img: reel_02_default
	},
	{
		title: "Adobe Stock — Motion Pack",
		year: "2024",
		cat: "Motion Graphics",
		client: "Adobe Stock",
		img: reel_03_default
	},
	{
		title: "Ramadan Social Series",
		year: "2025",
		cat: "Social · Design",
		client: "Freelance",
		img: reel_04_default
	},
	{
		title: "Promo Cutdowns",
		year: "2024",
		cat: "Promo · Color",
		client: "KBS Network",
		img: reel_05_default
	},
	{
		title: "Logo Sting Library",
		year: "2024",
		cat: "Motion Graphics",
		client: "Adobe Stock",
		img: reel_06_default
	}
];
function ProjectsPage() {
	const { data: dbProjects } = useCMSProjects();
	const displayProjects = dbProjects?.length ? dbProjects.map((p) => ({
		id: p._id,
		title: p.title,
		year: p.createdAt ? new Date(p.createdAt).getFullYear().toString() : "2025",
		cat: p.category || "Project",
		client: p.clientName || p.shortDescription || "Client Work",
		img: p.thumbnail || "/assets/reel-01-BciKUGwD.jpg",
		mediaInfo: p.mediaInfo
	})) : defaultAll;
	return /* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)(SiteChrome, { children: [/* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)("section", {
		className: "px-6 md:px-12 py-16 md:py-24",
		children: /* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)("div", {
			className: "max-w-7xl mx-auto",
			children: [/* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)("div", {
				className: "font-mono text-[10px] uppercase tracking-[0.3em] text-[var(--brand-red)] mb-6",
				children: ["Archive / 2022 — ", (/* @__PURE__ */ new Date()).getFullYear()]
			}, void 0, true, {
				fileName: _jsxFileName,
				lineNumber: 63,
				columnNumber: 11
			}, this), /* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)("h1", {
				className: "font-display uppercase text-6xl md:text-[10rem] leading-[0.85]",
				children: "Projects"
			}, void 0, false, {
				fileName: _jsxFileName,
				lineNumber: 66,
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
	}, this), /* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)("section", {
		className: "px-6 md:px-12 pb-32",
		children: /* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)("div", {
			className: "max-w-7xl mx-auto grid md:grid-cols-2 gap-10 md:gap-20",
			children: displayProjects.map((p, i) => /* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)(Link, {
				to: `/project?id=${p.id}`,
				className: `group block ${i % 2 === 1 ? "md:mt-32" : ""}`,
				children: /* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)("article", { children: [/* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)("div", {
					className: "relative aspect-[4/5] overflow-hidden bg-neutral-900 border border-white/5",
					children: [p.mediaInfo?.youtubeEmbed ? /* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)("iframe", {
						src: p.mediaInfo.youtubeEmbed,
						title: p.title,
						className: "w-full h-full object-cover border-0",
						allow: "accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture",
						allowFullScreen: true
					}, void 0, false, {
						fileName: _jsxFileName,
						lineNumber: 76,
						columnNumber: 48
					}, this) : p.mediaInfo?.googleDriveEmbed ? /* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)("iframe", {
						src: p.mediaInfo.googleDriveEmbed,
						title: p.title,
						className: "w-full h-full object-cover border-0",
						allow: "autoplay"
					}, void 0, false, {
						fileName: _jsxFileName,
						lineNumber: 76,
						columnNumber: 301
					}, this) : /* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)("img", {
						src: p.img,
						alt: p.title,
						width: 800,
						height: 1e3,
						loading: "lazy",
						className: "w-full h-full object-cover grayscale-[20%] group-hover:grayscale-0 group-hover:scale-105 transition-all duration-700"
					}, void 0, false, {
						fileName: _jsxFileName,
						lineNumber: 76,
						columnNumber: 430
					}, this), /* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)("div", {
						className: "absolute top-6 left-6 font-mono text-[10px] uppercase tracking-widest bg-black/60 backdrop-blur px-2 py-1 border border-white/10",
						children: p.cat
					}, void 0, false, {
						fileName: _jsxFileName,
						lineNumber: 77,
						columnNumber: 19
					}, this)]
				}, void 0, true, {
					fileName: _jsxFileName,
					lineNumber: 75,
					columnNumber: 17
				}, this), /* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)("div", {
					className: "mt-6 flex items-start justify-between gap-6",
					children: [/* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)("div", { children: [/* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)("h2", {
						className: "font-display uppercase text-3xl md:text-4xl group-hover:text-[var(--brand-red)] transition-colors",
						children: p.title
					}, void 0, false, {
						fileName: _jsxFileName,
						lineNumber: 83,
						columnNumber: 21
					}, this), /* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)("p", {
						className: "font-mono text-[10px] uppercase tracking-widest text-white/40 mt-2",
						children: p.client
					}, void 0, false, {
						fileName: _jsxFileName,
						lineNumber: 86,
						columnNumber: 21
					}, this)] }, void 0, true, {
						fileName: _jsxFileName,
						lineNumber: 82,
						columnNumber: 19
					}, this), /* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)("span", {
						className: "font-mono text-xs text-white/40 shrink-0",
						children: p.year
					}, void 0, false, {
						fileName: _jsxFileName,
						lineNumber: 90,
						columnNumber: 19
					}, this)]
				}, void 0, true, {
					fileName: _jsxFileName,
					lineNumber: 81,
					columnNumber: 17
				}, this)] }, void 0, true, {
					fileName: _jsxFileName,
					lineNumber: 74,
					columnNumber: 15
				}, this)
			}, (p.title || p.id) + i, false, {
				fileName: _jsxFileName,
				lineNumber: 73,
				columnNumber: 55
			}, this))
		}, void 0, false, {
			fileName: _jsxFileName,
			lineNumber: 72,
			columnNumber: 9
		}, this)
	}, void 0, false, {
		fileName: _jsxFileName,
		lineNumber: 71,
		columnNumber: 7
	}, this)] }, void 0, true, {
		fileName: _jsxFileName,
		lineNumber: 60,
		columnNumber: 10
	}, this);
}
//#endregion
export { ProjectsPage as component };
