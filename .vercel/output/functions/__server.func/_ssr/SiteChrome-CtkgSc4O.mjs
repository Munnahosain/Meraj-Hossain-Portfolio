import { o as __toESM } from "../_runtime.mjs";
import { u as require_react } from "../_libs/@floating-ui/react-dom+[...].mjs";
import { g as Link } from "../_libs/@tanstack/react-router+[...].mjs";
import { t as require_jsx_dev_runtime } from "../_libs/react.mjs";
import { t as useQuery } from "../_libs/tanstack__react-query.mjs";
//#region node_modules/.nitro/vite/services/ssr/assets/SiteChrome-CtkgSc4O.js
var import_react = /* @__PURE__ */ __toESM(require_react());
var import_jsx_dev_runtime = require_jsx_dev_runtime();
function useWebsiteSettings() {
	return useQuery({
		queryKey: ["website-settings"],
		queryFn: async () => {
			return (await (await fetch("/api/settings")).json())?.data || {};
		},
		staleTime: 1e3 * 60 * 5,
		enabled: typeof window !== "undefined"
	});
}
function useCMSProjects(all = false) {
	return useQuery({
		queryKey: ["cms-projects", all],
		queryFn: async () => {
			return (await (await fetch(`/api/projects${all ? "?all=true" : ""}`)).json())?.data || [];
		},
		staleTime: 1e3 * 60 * 2,
		enabled: typeof window !== "undefined"
	});
}
function useCMSServices() {
	return useQuery({
		queryKey: ["cms-services"],
		queryFn: async () => {
			return (await (await fetch("/api/services")).json())?.data || [];
		},
		staleTime: 1e3 * 60 * 5,
		enabled: typeof window !== "undefined"
	});
}
function useCMSSkills() {
	return useQuery({
		queryKey: ["cms-skills"],
		queryFn: async () => {
			return (await (await fetch("/api/skills")).json())?.data || [];
		},
		staleTime: 1e3 * 60 * 5,
		enabled: typeof window !== "undefined"
	});
}
function useCMSExperience() {
	return useQuery({
		queryKey: ["cms-experience"],
		queryFn: async () => {
			return (await (await fetch("/api/experience")).json())?.data || [];
		},
		staleTime: 1e3 * 60 * 5,
		enabled: typeof window !== "undefined"
	});
}
var _jsxFileName$3 = "E:/Web/creative-canvas-hub-main/creative-canvas-hub-main/src/components/NavBar.tsx";
var navbarLogo = "/MCU-LOGO-0.2V-6.png";
function NavBar() {
	const { data: settings } = useWebsiteSettings();
	const logoRef = (0, import_react.useRef)(null);
	const dragRef = (0, import_react.useRef)({
		active: false,
		dragged: false,
		pointerId: 0,
		startX: 0,
		startOffset: 0
	});
	const [logoOffset, setLogoOffset] = (0, import_react.useState)(0);
	const [isDragging, setIsDragging] = (0, import_react.useState)(false);
	const brandName = settings?.branding?.websiteName || "Meraj Hossain";
	const contactText = settings?.hero?.contactButtonText || "Get in touch";
	const getMaxOffset = () => {
		const logo = logoRef.current;
		if (!logo) return 0;
		const reservedRightSpace = window.innerWidth >= 768 ? 620 : 56;
		return Math.max(window.innerWidth - logo.offsetWidth - reservedRightSpace, 0);
	};
	const getMaxScroll = () => Math.max(document.documentElement.scrollHeight - window.innerHeight, 1);
	const syncLogoToScroll = () => {
		const maxScroll = getMaxScroll();
		const maxOffset = getMaxOffset();
		const progress = Math.min(Math.max(window.scrollY / maxScroll, 0), 1);
		setLogoOffset(Math.round(maxOffset * progress));
	};
	(0, import_react.useEffect)(() => {
		let frame = 0;
		const updateLogoPosition = () => {
			cancelAnimationFrame(frame);
			frame = requestAnimationFrame(() => {
				if (!dragRef.current.active) syncLogoToScroll();
			});
		};
		updateLogoPosition();
		window.addEventListener("scroll", updateLogoPosition, { passive: true });
		window.addEventListener("resize", updateLogoPosition);
		return () => {
			cancelAnimationFrame(frame);
			window.removeEventListener("scroll", updateLogoPosition);
			window.removeEventListener("resize", updateLogoPosition);
		};
	}, []);
	const handlePointerDown = (event) => {
		dragRef.current = {
			active: true,
			dragged: false,
			pointerId: event.pointerId,
			startX: event.clientX,
			startOffset: logoOffset
		};
		setIsDragging(true);
		event.currentTarget.setPointerCapture(event.pointerId);
	};
	const handlePointerMove = (event) => {
		const drag = dragRef.current;
		if (!drag.active) return;
		const maxOffset = getMaxOffset();
		const delta = event.clientX - drag.startX;
		const nextOffset = Math.min(Math.max(drag.startOffset + delta, 0), maxOffset);
		if (Math.abs(delta) > 3) drag.dragged = true;
		setLogoOffset(nextOffset);
		window.scrollTo({
			top: nextOffset / Math.max(maxOffset, 1) * getMaxScroll(),
			behavior: "auto"
		});
	};
	const handlePointerUp = (event) => {
		if (dragRef.current.active && event.currentTarget.hasPointerCapture(dragRef.current.pointerId)) event.currentTarget.releasePointerCapture(dragRef.current.pointerId);
		dragRef.current.active = false;
		setIsDragging(false);
	};
	const handleLogoClick = (event) => {
		if (dragRef.current.dragged) {
			event.preventDefault();
			dragRef.current.dragged = false;
		}
	};
	return /* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)("nav", {
		className: "fixed inset-x-0 top-0 z-[9999] px-6 md:px-12 py-0 flex items-center justify-between backdrop-blur-md",
		style: {
			backgroundColor: "rgba(4,10,7,0.4)",
			borderBottom: "1px solid var(--border)"
		},
		children: [/* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)(Link, {
			ref: logoRef,
			to: "/",
			className: `flex items-center gap-2 select-none will-change-transform ${isDragging ? "cursor-grabbing" : "cursor-grab"}`,
			"aria-label": brandName,
			style: { transform: `translateX(${logoOffset}px)` },
			onClick: handleLogoClick,
			onPointerDown: handlePointerDown,
			onPointerMove: handlePointerMove,
			onPointerUp: handlePointerUp,
			onPointerCancel: handlePointerUp,
			children: /* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)("img", {
				src: navbarLogo,
				alt: brandName,
				className: "h-[60px] w-auto object-contain"
			}, void 0, false, {
				fileName: _jsxFileName$3,
				lineNumber: 125,
				columnNumber: 9
			}, this)
		}, void 0, false, {
			fileName: _jsxFileName$3,
			lineNumber: 111,
			columnNumber: 7
		}, this), /* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)("div", {
			className: "hidden md:flex items-center gap-10 font-mono text-[11px] uppercase tracking-[0.2em] text-white/60",
			children: [
				/* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)(Link, {
					to: "/about",
					className: "hover:text-[var(--primary)] transition-colors",
					activeProps: { className: "text-white" },
					children: "About"
				}, void 0, false, {
					fileName: _jsxFileName$3,
					lineNumber: 128,
					columnNumber: 9
				}, this),
				/* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)(Link, {
					to: "/projects",
					className: "hover:text-[var(--primary)] transition-colors",
					activeProps: { className: "text-white" },
					children: "Projects"
				}, void 0, false, {
					fileName: _jsxFileName$3,
					lineNumber: 135,
					columnNumber: 9
				}, this),
				/* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)(Link, {
					to: "/services",
					className: "hover:text-[var(--primary)] transition-colors",
					activeProps: { className: "text-white" },
					children: "Services"
				}, void 0, false, {
					fileName: _jsxFileName$3,
					lineNumber: 142,
					columnNumber: 9
				}, this),
				/* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)(Link, {
					to: "/contact",
					className: "flex items-center gap-2 hover:text-[var(--primary)] transition-colors",
					activeProps: { className: "text-white" },
					children: [/* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)("span", { className: "w-1.5 h-1.5 rounded-full bg-[var(--primary)] animate-pulse" }, void 0, false, {
						fileName: _jsxFileName$3,
						lineNumber: 154,
						columnNumber: 11
					}, this), contactText]
				}, void 0, true, {
					fileName: _jsxFileName$3,
					lineNumber: 149,
					columnNumber: 9
				}, this)
			]
		}, void 0, true, {
			fileName: _jsxFileName$3,
			lineNumber: 127,
			columnNumber: 7
		}, this)]
	}, void 0, true, {
		fileName: _jsxFileName$3,
		lineNumber: 107,
		columnNumber: 5
	}, this);
}
var _jsxFileName$2 = "E:/Web/creative-canvas-hub-main/creative-canvas-hub-main/src/components/Timecode.tsx";
function Timecode() {
	const [time, setTime] = (0, import_react.useState)("--:--:--");
	(0, import_react.useEffect)(() => {
		const tick = () => {
			const d = /* @__PURE__ */ new Date();
			setTime(`${String(d.getHours()).padStart(2, "0")}:${String(d.getMinutes()).padStart(2, "0")}:${String(d.getSeconds()).padStart(2, "0")}`);
		};
		tick();
		const id = setInterval(tick, 1e3);
		return () => clearInterval(id);
	}, []);
	return /* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)("span", {
		className: "font-mono text-xs tracking-widest text-white/70",
		children: time
	}, void 0, false, {
		fileName: _jsxFileName$2,
		lineNumber: 16,
		columnNumber: 10
	}, this);
}
var _jsxFileName$1 = "E:/Web/creative-canvas-hub-main/creative-canvas-hub-main/src/components/Footer.tsx";
var defaultLogo = "/MCU-LOGO-0.2V-1.png";
function Footer() {
	const { data: settings } = useWebsiteSettings();
	const ownerName = settings?.general?.ownerName || "Meraj Hossain";
	const logoImg = settings?.branding?.footerLogo || settings?.branding?.websiteLogo || defaultLogo;
	return /* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)("footer", {
		className: "relative z-20 px-6 md:px-12 py-8 border-t border-white/5 flex flex-col md:flex-row items-center justify-between gap-4 font-mono text-[10px] uppercase tracking-widest text-white/40",
		children: [
			/* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)("div", {
				className: "flex gap-4 items-center",
				children: [
					/* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)("span", {
						className: "text-white",
						children: "EN"
					}, void 0, false, {
						fileName: _jsxFileName$1,
						lineNumber: 14,
						columnNumber: 9
					}, this),
					/* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)("span", { children: "/" }, void 0, false, {
						fileName: _jsxFileName$1,
						lineNumber: 15,
						columnNumber: 9
					}, this),
					/* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)("span", { children: "BN" }, void 0, false, {
						fileName: _jsxFileName$1,
						lineNumber: 16,
						columnNumber: 9
					}, this)
				]
			}, void 0, true, {
				fileName: _jsxFileName$1,
				lineNumber: 13,
				columnNumber: 7
			}, this),
			/* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)("div", {
				className: "flex items-center gap-3 text-center",
				children: [/* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)("img", {
					src: logoImg,
					alt: ownerName,
					className: "h-7 w-auto object-contain opacity-90"
				}, void 0, false, {
					fileName: _jsxFileName$1,
					lineNumber: 19,
					columnNumber: 9
				}, this), /* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)("span", { children: [
					"© ",
					(/* @__PURE__ */ new Date()).getFullYear(),
					" ",
					ownerName,
					" - All rights reserved"
				] }, void 0, true, {
					fileName: _jsxFileName$1,
					lineNumber: 20,
					columnNumber: 9
				}, this)]
			}, void 0, true, {
				fileName: _jsxFileName$1,
				lineNumber: 18,
				columnNumber: 7
			}, this),
			/* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)("div", {
				className: "flex gap-4 items-center",
				children: [/* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)("span", { children: "23.8583° N, 90.2667° E" }, void 0, false, {
					fileName: _jsxFileName$1,
					lineNumber: 25,
					columnNumber: 9
				}, this), /* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)(Timecode, {}, void 0, false, {
					fileName: _jsxFileName$1,
					lineNumber: 26,
					columnNumber: 9
				}, this)]
			}, void 0, true, {
				fileName: _jsxFileName$1,
				lineNumber: 24,
				columnNumber: 7
			}, this)
		]
	}, void 0, true, {
		fileName: _jsxFileName$1,
		lineNumber: 12,
		columnNumber: 5
	}, this);
}
var _jsxFileName = "E:/Web/creative-canvas-hub-main/creative-canvas-hub-main/src/components/SiteChrome.tsx";
function SiteChrome({ children }) {
	return /* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)("div", {
		className: "min-h-screen relative overflow-x-hidden",
		style: {
			backgroundColor: "var(--background)",
			color: "var(--foreground)"
		},
		children: [
			/* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)("div", { className: "side-highlight-left" }, void 0, false, {
				fileName: _jsxFileName,
				lineNumber: 9,
				columnNumber: 7
			}, this),
			/* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)("div", { className: "side-highlight-right" }, void 0, false, {
				fileName: _jsxFileName,
				lineNumber: 10,
				columnNumber: 7
			}, this),
			/* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)(NavBar, {}, void 0, false, {
				fileName: _jsxFileName,
				lineNumber: 12,
				columnNumber: 7
			}, this),
			/* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)("main", {
				className: "relative z-10 pt-[6rem] md:pt-[6.5rem]",
				children
			}, void 0, false, {
				fileName: _jsxFileName,
				lineNumber: 13,
				columnNumber: 7
			}, this),
			/* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)(Footer, {}, void 0, false, {
				fileName: _jsxFileName,
				lineNumber: 14,
				columnNumber: 7
			}, this)
		]
	}, void 0, true, {
		fileName: _jsxFileName,
		lineNumber: 7,
		columnNumber: 5
	}, this);
}
//#endregion
export { useCMSServices as a, useCMSProjects as i, Timecode as n, useCMSSkills as o, useCMSExperience as r, useWebsiteSettings as s, SiteChrome as t };
