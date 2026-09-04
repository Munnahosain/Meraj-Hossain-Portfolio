import { o as __toESM } from "../_runtime.mjs";
import { u as require_react } from "../_libs/@floating-ui/react-dom+[...].mjs";
import { t as require_jsx_dev_runtime } from "../_libs/react.mjs";
import { a as reel_05_default, i as reel_04_default, n as reel_02_default, o as reel_06_default, r as reel_03_default, t as reel_01_default } from "./reel-06-Dj3DRVm0.mjs";
//#region node_modules/.nitro/vite/services/ssr/assets/ReelMarquee-bkhyySdB.js
var import_react = /* @__PURE__ */ __toESM(require_react());
var import_jsx_dev_runtime = require_jsx_dev_runtime();
var reel_07_default = "/assets/reel-07-CNSsBTDt.jpg";
var _jsxFileName = "E:/Web/creative-canvas-hub-main/creative-canvas-hub-main/src/components/ReelMarquee.tsx";
var DEFAULT_REEL_IMAGES = [
	reel_01_default,
	reel_02_default,
	reel_03_default,
	reel_04_default,
	reel_05_default,
	reel_06_default,
	reel_07_default
];
var RIB_WIDTH = 6;
var RIB_STRIP_W = 200 * RIB_WIDTH;
var R_LABEL = 5;
var WHEEL_TICK = RIB_WIDTH;
function getImageSrc(src) {
	if (src.startsWith("/uploads/")) return `/api/uploads/${encodeURIComponent(src.split("/").pop() || "")}`;
	return src;
}
function ReelMarquee({ images }) {
	const activeShots = (0, import_react.useMemo)(() => images?.filter(Boolean).length ? images.filter(Boolean) : DEFAULT_REEL_IMAGES, [images]);
	const doubledShots = (0, import_react.useMemo)(() => [...activeShots, ...activeShots], [activeShots]);
	const trackRef = (0, import_react.useRef)(null);
	const rulerRef = (0, import_react.useRef)(null);
	const rulerWrapRef = (0, import_react.useRef)(null);
	const s = (0, import_react.useRef)({
		offset: 0,
		halfWidth: 0,
		rulerRatio: .25,
		active: false,
		src: "none",
		startX: 0,
		startOff: 0,
		vel: 0,
		lastX: 0,
		lastT: 0,
		autoRaf: 0,
		glideRaf: 0
	});
	const draw = (0, import_react.useCallback)(() => {
		const { offset, halfWidth, rulerRatio } = s.current;
		if (trackRef.current && halfWidth > 0) {
			const w = (offset % halfWidth + halfWidth) % halfWidth;
			trackRef.current.style.transform = `translateX(-${w}px)`;
		}
		if (rulerRef.current && rulerWrapRef.current) {
			const x = rulerWrapRef.current.offsetWidth / 2 - RIB_STRIP_W / 2 - offset * rulerRatio;
			rulerRef.current.style.transform = `translateX(${x}px)`;
		}
	}, []);
	const auto = (0, import_react.useCallback)(() => {
		if (s.current.active) return;
		s.current.offset += 1;
		draw();
		s.current.autoRaf = requestAnimationFrame(auto);
	}, [draw]);
	const glide = (0, import_react.useCallback)(() => {
		const st = s.current;
		st.vel *= .92;
		if (Math.abs(st.vel) < .3) {
			st.autoRaf = requestAnimationFrame(auto);
			return;
		}
		st.offset -= st.vel;
		draw();
		st.glideRaf = requestAnimationFrame(glide);
	}, [draw, auto]);
	const onDown = (0, import_react.useCallback)((e, src) => {
		const st = s.current;
		cancelAnimationFrame(st.autoRaf);
		cancelAnimationFrame(st.glideRaf);
		st.active = true;
		st.src = src;
		st.startX = e.clientX;
		st.startOff = st.offset;
		st.vel = 0;
		st.lastX = e.clientX;
		st.lastT = performance.now();
		e.currentTarget.setPointerCapture(e.pointerId);
	}, []);
	const onMove = (0, import_react.useCallback)((e) => {
		const st = s.current;
		if (!st.active) return;
		const now = performance.now();
		const dt = Math.max(now - st.lastT, 1);
		st.vel = (e.clientX - st.lastX) / dt * 16;
		st.lastX = e.clientX;
		st.lastT = now;
		const drag = e.clientX - st.startX;
		if (st.src === "img") st.offset = st.startOff - drag;
		else st.offset = st.startOff - drag / st.rulerRatio;
		draw();
	}, [draw]);
	const onUp = (0, import_react.useCallback)(() => {
		const st = s.current;
		if (!st.active) return;
		const wasRuler = st.src === "ruler";
		st.active = false;
		st.src = "none";
		if (wasRuler) st.vel = st.vel / st.rulerRatio;
		st.glideRaf = requestAnimationFrame(glide);
	}, [glide]);
	(0, import_react.useEffect)(() => {
		const el = trackRef.current;
		if (!el) return;
		const hw = el.scrollWidth / 2;
		const pi = hw / activeShots.length;
		s.current.halfWidth = hw;
		s.current.rulerRatio = R_LABEL * WHEEL_TICK / pi;
		s.current.autoRaf = requestAnimationFrame(auto);
		return () => {
			cancelAnimationFrame(s.current.autoRaf);
			cancelAnimationFrame(s.current.glideRaf);
		};
	}, [auto, activeShots.length]);
	return /* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)("div", {
		className: "relative w-full select-none hero-marquee-frame",
		children: /* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)("div", {
			className: "relative w-full overflow-hidden py-1 hero-marquee-inner",
			style: { cursor: "grab" },
			onPointerDown: (e) => onDown(e, "img"),
			onPointerMove: onMove,
			onPointerUp: onUp,
			onPointerLeave: onUp,
			children: /* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)("div", {
				ref: trackRef,
				className: "flex gap-6 w-max will-change-transform",
				children: doubledShots.map((src, i) => /* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)("div", {
					className: "relative w-[220px] md:w-[280px] aspect-[4/5] shrink-0 overflow-hidden bg-neutral-900 filmstrip-cell",
					children: [
						/* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)("img", {
							src: getImageSrc(src),
							alt: "",
							width: 800,
							height: 1e3,
							loading: "lazy",
							draggable: false,
							className: "w-full h-full object-cover grayscale-[30%] hover:grayscale-0 transition-all duration-700 pointer-events-none"
						}, void 0, false, {
							fileName: _jsxFileName,
							lineNumber: 187,
							columnNumber: 15
						}, this),
						/* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)("div", { className: "filmstrip-scratch" }, void 0, false, {
							fileName: _jsxFileName,
							lineNumber: 196,
							columnNumber: 15
						}, this),
						i % 5 === 0 && /* @__PURE__ */ (void 0)("div", {
							className: "absolute inset-0 mix-blend-multiply pointer-events-none",
							style: {
								background: "linear-gradient(135deg, var(--brand-red) 0%, transparent 70%)",
								opacity: .4
							}
						}, void 0, false, {
							fileName: _jsxFileName,
							lineNumber: 198,
							columnNumber: 17
						}, this)
					]
				}, i, true, {
					fileName: _jsxFileName,
					lineNumber: 183,
					columnNumber: 13
				}, this))
			}, void 0, false, {
				fileName: _jsxFileName,
				lineNumber: 181,
				columnNumber: 9
			}, this)
		}, void 0, false, {
			fileName: _jsxFileName,
			lineNumber: 173,
			columnNumber: 7
		}, this)
	}, void 0, false, {
		fileName: _jsxFileName,
		lineNumber: 172,
		columnNumber: 5
	}, this);
}
//#endregion
export { ReelMarquee as n, DEFAULT_REEL_IMAGES as t };
