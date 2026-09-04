import { o as __toESM } from "../_runtime.mjs";
import { u as require_react } from "../_libs/@floating-ui/react-dom+[...].mjs";
import { g as Link } from "../_libs/@tanstack/react-router+[...].mjs";
import { t as require_jsx_dev_runtime } from "../_libs/react.mjs";
import { a as useCMSServices, i as useCMSProjects, n as Timecode, o as useCMSSkills, r as useCMSExperience, s as useWebsiteSettings, t as SiteChrome } from "./SiteChrome-CtkgSc4O.mjs";
import { a as reel_05_default, o as reel_06_default, r as reel_03_default, t as reel_01_default } from "./reel-06-Dj3DRVm0.mjs";
import { n as ReelMarquee } from "./ReelMarquee-bkhyySdB.mjs";
import { t as require_matter } from "../_libs/matter-js.mjs";
//#region node_modules/.nitro/vite/services/ssr/assets/routes-B_I_kLKu.js
var import_react = /* @__PURE__ */ __toESM(require_react());
var import_jsx_dev_runtime = require_jsx_dev_runtime();
var import_matter = require_matter();
var _jsxFileName$2 = "E:/Web/creative-canvas-hub-main/creative-canvas-hub-main/src/components/ScrollReveal.tsx";
function ScrollReveal({ children, className = "", delay = 0, stagger = false, staggerMs = 80 }) {
	const [isVisible, setIsVisible] = (0, import_react.useState)(false);
	const ref = (0, import_react.useRef)(null);
	(0, import_react.useEffect)(() => {
		const el = ref.current;
		if (!el) return;
		const observer = new IntersectionObserver(([entry]) => {
			if (entry.isIntersecting) {
				setTimeout(() => setIsVisible(true), delay);
				observer.unobserve(el);
			}
		}, {
			threshold: .05,
			rootMargin: "0px 0px -40px 0px"
		});
		observer.observe(el);
		return () => observer.unobserve(el);
	}, [delay]);
	if (stagger) return /* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)("div", {
		ref,
		className,
		children: import_react.Children.toArray(children).map((child, i) => (0, import_react.isValidElement)(child) ? /* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)("div", {
			className: "scroll-reveal-item",
			style: {
				opacity: isVisible ? 1 : 0,
				transform: isVisible ? "translateY(0)" : "translateY(32px)",
				transition: `opacity 0.9s cubic-bezier(0.16,1,0.3,1) ${delay + i * staggerMs}ms, transform 0.9s cubic-bezier(0.16,1,0.3,1) ${delay + i * staggerMs}ms`,
				willChange: "opacity, transform"
			},
			children: child
		}, i, false, {
			fileName: _jsxFileName$2,
			lineNumber: 55,
			columnNumber: 13
		}, this) : child)
	}, void 0, false, {
		fileName: _jsxFileName$2,
		lineNumber: 52,
		columnNumber: 7
	}, this);
	return /* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)("div", {
		ref,
		className: `scroll-reveal ${isVisible ? "reveal-visible" : ""} ${className}`,
		children
	}, void 0, false, {
		fileName: _jsxFileName$2,
		lineNumber: 76,
		columnNumber: 5
	}, this);
}
var iconPositions = [
	{
		id: "ps",
		label: "Adobe Photoshop",
		src: "/icons/ps.png",
		delay: 0,
		floatDuration: 6.6,
		rotation: -7,
		zIndex: 22,
		scale: 1.02,
		positions: {
			desktop: {
				x: 897,
				y: 70,
				size: 30
			},
			tablet: {
				x: 22,
				y: 14,
				size: 48
			},
			mobile: {
				x: 18,
				y: 12,
				size: 36
			}
		}
	},
	{
		id: "ai",
		label: "Adobe Illustrator",
		src: "/icons/ai.png",
		delay: .12,
		floatDuration: 6.8,
		rotation: 5,
		zIndex: 24,
		scale: 1,
		positions: {
			desktop: {
				x: 930,
				y: 70,
				size: 30
			},
			tablet: {
				x: 80,
				y: 16,
				size: 44
			},
			mobile: {
				x: 68,
				y: 14,
				size: 34
			}
		}
	},
	{
		id: "ae",
		label: "Adobe After Effects",
		src: "/icons/ae.png",
		delay: .26,
		floatDuration: 6.5,
		rotation: 5,
		zIndex: 20,
		scale: .98,
		positions: {
			desktop: {
				x: 900,
				y: 38,
				size: 30
			},
			tablet: {
				x: 72,
				y: 64,
				size: 40
			},
			mobile: {
				x: 60,
				y: 48,
				size: 32
			}
		}
	},
	{
		id: "pr",
		label: "Adobe Premiere Pro",
		src: "/icons/pr.png",
		delay: .4,
		floatDuration: 7.1,
		rotation: -4,
		zIndex: 23,
		scale: 1.01,
		positions: {
			desktop: {
				x: 930,
				y: 38,
				size: 35
			},
			tablet: {
				x: 14,
				y: 70,
				size: 44
			},
			mobile: {
				x: 12,
				y: 56,
				size: 34
			}
		}
	},
	{
		id: "st",
		label: "Adobe Substance 3D",
		src: "/icons/st.png",
		delay: .58,
		floatDuration: 6.9,
		rotation: 7,
		zIndex: 21,
		scale: .96,
		positions: {
			desktop: {
				x: 1e3,
				y: 1e3,
				size: 35
			},
			tablet: {
				x: 50,
				y: 96,
				size: 38
			},
			mobile: {
				x: 40,
				y: 72,
				size: 30
			}
		}
	}
];
var _jsxFileName$1 = "E:/Web/creative-canvas-hub-main/creative-canvas-hub-main/src/components/Hero/InteractiveJ.tsx";
var getBreakpoint = (width) => {
	if (width < 640) return "mobile";
	if (width < 1024) return "tablet";
	return "desktop";
};
function InteractiveJ() {
	const [breakpoint, setBreakpoint] = (0, import_react.useState)(() => typeof window !== "undefined" ? getBreakpoint(window.innerWidth) : "desktop");
	const stageRef = (0, import_react.useRef)(null);
	const iconRefs = (0, import_react.useRef)({});
	const icons = (0, import_react.useMemo)(() => iconPositions, []);
	(0, import_react.useEffect)(() => {
		const handleResize = () => setBreakpoint(getBreakpoint(window.innerWidth));
		window.addEventListener("resize", handleResize);
		return () => window.removeEventListener("resize", handleResize);
	}, []);
	(0, import_react.useEffect)(() => {
		const stage = stageRef.current;
		if (!stage) return;
		const engine = import_matter.Engine.create();
		engine.gravity.y = .8;
		const world = engine.world;
		const width = stage.clientWidth;
		const height = stage.clientHeight;
		const thickness = 60;
		import_matter.World.add(world, [
			import_matter.Bodies.rectangle(width / 2, height + thickness / 2, width + thickness * 2, thickness, { isStatic: true }),
			import_matter.Bodies.rectangle(-60 / 2, height / 2, thickness, height + thickness * 2, { isStatic: true }),
			import_matter.Bodies.rectangle(width + thickness / 2, height / 2, thickness, height + thickness * 2, { isStatic: true })
		]);
		const initialOffsets = [
			{
				x: -48,
				y: -42
			},
			{
				x: 42,
				y: -34
			},
			{
				x: 10,
				y: 18
			},
			{
				x: -42,
				y: 44
			},
			{
				x: 44,
				y: 10
			}
		];
		const iconBodies = icons.map((icon, index) => {
			const size = icon.positions[breakpoint].size;
			const offset = initialOffsets[index] ?? {
				x: 0,
				y: 0
			};
			const startX = width / 2 + offset.x;
			const startY = height / 2 + offset.y - 20;
			const body = import_matter.Bodies.rectangle(startX, startY, size, size, {
				restitution: .45,
				friction: .25,
				frictionAir: .03,
				chamfer: { radius: 12 }
			});
			import_matter.Body.setAngle(body, (Math.random() - .5) * .8);
			import_matter.World.add(world, body);
			return {
				icon,
				body,
				el: iconRefs.current[icon.id]
			};
		});
		const mouse = import_matter.Mouse.create(stage);
		const mouseConstraint = import_matter.MouseConstraint.create(engine, {
			mouse,
			constraint: {
				stiffness: .18,
				render: { visible: false }
			}
		});
		import_matter.World.add(world, mouseConstraint);
		const runner = import_matter.Runner.create();
		import_matter.Runner.run(runner, engine);
		import_matter.Events.on(engine, "afterUpdate", () => {
			iconBodies.forEach(({ body, el }) => {
				if (!el) return;
				el.style.left = `${body.position.x}px`;
				el.style.top = `${body.position.y}px`;
				el.style.transform = `translate(-50%, -50%) rotate(${body.angle}rad)`;
			});
		});
		mouse.element.removeEventListener("mousewheel", mouse.mousewheel);
		mouse.element.removeEventListener("DOMMouseScroll", mouse.mousewheel);
		return () => {
			import_matter.Events.off(engine, "afterUpdate");
			import_matter.Runner.stop(runner);
			import_matter.World.remove(world, mouseConstraint);
			import_matter.World.clear(world, false);
			import_matter.Engine.clear(engine);
		};
	}, [breakpoint, icons]);
	return /* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)("div", {
		className: "physics-stage",
		ref: stageRef,
		children: icons.map((icon) => /* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)("div", {
			ref: (element) => {
				iconRefs.current[icon.id] = element;
			},
			className: "hero-icon-item pointer-events-auto",
			style: {
				width: icon.positions[breakpoint].size,
				height: icon.positions[breakpoint].size,
				zIndex: icon.zIndex
			},
			"aria-label": icon.label,
			children: /* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)("div", {
				className: "hero-icon-item-inner",
				children: /* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)("img", {
					src: icon.src,
					alt: icon.label,
					className: "hero-icon-image",
					draggable: false,
					style: { transform: `scale(${icon.scale})` }
				}, void 0, false, {
					fileName: _jsxFileName$1,
					lineNumber: 127,
					columnNumber: 13
				}, this)
			}, void 0, false, {
				fileName: _jsxFileName$1,
				lineNumber: 126,
				columnNumber: 11
			}, this)
		}, icon.id, false, {
			fileName: _jsxFileName$1,
			lineNumber: 113,
			columnNumber: 9
		}, this))
	}, void 0, false, {
		fileName: _jsxFileName$1,
		lineNumber: 111,
		columnNumber: 5
	}, this);
}
var _jsxFileName = "E:/Web/creative-canvas-hub-main/creative-canvas-hub-main/src/routes/index.tsx?tsr-split=component";
var defaultProjects = [
	{
		title: "Micro Electronic Campaign",
		year: "2025",
		cat: "Branding · Print",
		img: reel_01_default
	},
	{
		title: "Adobe Stock — Motion Pack",
		year: "2024",
		cat: "Motion Graphics",
		img: reel_03_default
	},
	{
		title: "Social Reels Series",
		year: "2025",
		cat: "Video Editing",
		img: reel_05_default
	},
	{
		title: "Promo Cutdowns",
		year: "2024",
		cat: "Promo · Color",
		img: reel_06_default
	}
];
var defaultServices = [
	{
		n: "01",
		t: "Graphic Design",
		d: "Posters, social creatives, and print collateral built with typographic precision."
	},
	{
		n: "02",
		t: "Motion Graphics",
		d: "Kinetic type, logo stings, and animated explainers in After Effects."
	},
	{
		n: "03",
		t: "Video Editing",
		d: "Story-driven cuts for reels, ads, and long-form in Premiere Pro."
	},
	{
		n: "04",
		t: "Color Grading",
		d: "Cinematic looks and consistent finishing across every deliverable."
	},
	{
		n: "05",
		t: "Branding Design",
		d: "Logo systems, guidelines, and identity that scales across media."
	},
	{
		n: "06",
		t: "Visual Storytelling",
		d: "Concept to screen — turning briefs into moments people remember."
	}
];
var defaultStack = [
	{
		name: "Adobe Photoshop",
		role: "Retouch · Composite"
	},
	{
		name: "Adobe Illustrator",
		role: "Vector · Logo"
	},
	{
		name: "Adobe After Effects",
		role: "Motion · VFX"
	},
	{
		name: "Adobe Premiere Pro",
		role: "Edit · Color"
	}
];
var defaultExp = [
	{
		role: "Graphics Designer",
		org: "Micro Electronic, Dhaka",
		years: "2025 — Present",
		note: "Marketing campaigns, social creatives, print & branding."
	},
	{
		role: "Contributor",
		org: "Adobe Stock",
		years: "2023 — Present",
		note: "Motion graphics templates and stock assets for global clients."
	},
	{
		role: "Computer Operator",
		org: "KBS Network, Savar",
		years: "2022 — 2025",
		note: "Documentation and support for media & promotional projects."
	}
];
function Index() {
	const { data: settings } = useWebsiteSettings();
	const { data: dbProjects } = useCMSProjects();
	const { data: dbServices } = useCMSServices();
	const { data: dbSkills } = useCMSSkills();
	const { data: dbExperience } = useCMSExperience();
	const heroTitle = settings?.hero?.title || "Meraj Hossain";
	const titleParts = heroTitle.split(" ");
	const firstName = titleParts[0] || "Meraj";
	const lastName = titleParts.slice(1).join(" ") || "Hossain";
	const heroSubtitle = settings?.general?.shortDescription || "Graphics designer, video editor and motion graphics artist. I build brands, cuts, and animations that stay on the retina.";
	const heroImage = settings?.hero?.profileImage || "/assets/meraj-CE40hyZo.png";
	const heroReelImages = Array.isArray(settings?.hero?.reelImages) ? settings.hero.reelImages.filter(Boolean) : [];
	const aboutImage = settings?.about?.profileImage || "/assets/meraj-CeURCLhN.jpg";
	const aboutDesc = settings?.about?.description || "I'm Meraj Hossain — a graphics designer and motion artist based in Savar, Dhaka. I work across branding, social media design, video editing and promotional content, powered by the Adobe Creative Suite and a real love for visual storytelling.";
	const displayProjects = dbProjects?.length ? dbProjects.slice(0, 4).map((p) => ({
		title: p.title,
		year: p.createdAt ? new Date(p.createdAt).getFullYear().toString() : "2025",
		cat: p.category || "Project",
		img: p.thumbnail || "/assets/reel-01-BciKUGwD.jpg",
		id: p._id
	})) : defaultProjects;
	const displayServices = dbServices?.length ? dbServices.map((s, i) => ({
		n: s.number || `0${i + 1}`,
		t: s.title,
		d: s.description
	})) : defaultServices;
	const displayStack = dbSkills?.length ? dbSkills.map((sk) => ({
		name: sk.name,
		role: sk.role || sk.category || "Design"
	})) : defaultStack;
	const displayExp = dbExperience?.length ? dbExperience.map((ex) => ({
		role: ex.position || ex.role || "Role",
		org: ex.company || ex.org || "Company",
		years: ex.period || ex.years || "Present",
		note: ex.description || ex.note || ""
	})) : defaultExp;
	const contactEmail = settings?.contact?.email || "munnahosain042@gmail.com";
	const contactPhone = settings?.contact?.phone || "+880 1300-294781";
	const contactLocation = settings?.contact?.address || "Nagar Kanda 1216 · Savar · Dhaka";
	return /* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)(SiteChrome, { children: [
		/* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)("section", {
			className: "hero-section relative min-h-[92vh] flex flex-col justify-center px-6 md:px-12 py-1",
			children: [
				/* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)("div", {
					className: "hero-meta flex items-center justify-between font-mono text-[10px] uppercase tracking-[0.3em] text-white/40 mb-12",
					children: [/* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)("span", { children: ["Portfolio / ", (/* @__PURE__ */ new Date()).getFullYear()] }, void 0, true, {
						fileName: _jsxFileName,
						lineNumber: 146,
						columnNumber: 11
					}, this), /* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)("span", {
						className: "hero-legend flex items-center gap-2",
						children: [
							/* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)("span", { className: "hero-legend-dot" }, void 0, false, {
								fileName: _jsxFileName,
								lineNumber: 148,
								columnNumber: 13
							}, this),
							"LIVE · ",
							/* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)(Timecode, {}, void 0, false, {
								fileName: _jsxFileName,
								lineNumber: 149,
								columnNumber: 20
							}, this)
						]
					}, void 0, true, {
						fileName: _jsxFileName,
						lineNumber: 147,
						columnNumber: 11
					}, this)]
				}, void 0, true, {
					fileName: _jsxFileName,
					lineNumber: 145,
					columnNumber: 9
				}, this),
				/* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)("div", {
					className: "hero-title-wrap relative flex flex-col items-center justify-center my-6 md:my-10 w-full select-none",
					children: [
						/* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)("h1", {
							className: "font-display uppercase leading-[0.9] tracking-tight text-center relative z-10 hero-name hero-first",
							style: { fontSize: "clamp(3.5rem, 16vw, 16rem)" },
							children: /* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)("span", {
								className: "block",
								children: firstName
							}, void 0, false, {
								fileName: _jsxFileName,
								lineNumber: 159,
								columnNumber: 13
							}, this)
						}, void 0, false, {
							fileName: _jsxFileName,
							lineNumber: 156,
							columnNumber: 11
						}, this),
						/* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)("div", {
							className: "hero-line",
							"aria-hidden": "true"
						}, void 0, false, {
							fileName: _jsxFileName,
							lineNumber: 164,
							columnNumber: 11
						}, this),
						/* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)(InteractiveJ, {}, void 0, false, {
							fileName: _jsxFileName,
							lineNumber: 165,
							columnNumber: 11
						}, this),
						/* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)("div", {
							className: "absolute top-[48%] left-1/2 -translate-x-1/2 -translate-y-1/2 w-full max-w-[280px] sm:max-w-[360px] md:max-w-[440px] aspect-square flex items-center justify-center z-20 hero-portrait",
							children: /* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)("img", {
								src: heroImage,
								alt: `${heroTitle} Portrait`,
								className: "h-[105%] md:h-[115%] w-auto object-contain object-center transition-transform duration-700 ease-out will-change-transform"
							}, void 0, false, {
								fileName: _jsxFileName,
								lineNumber: 169,
								columnNumber: 13
							}, this)
						}, void 0, false, {
							fileName: _jsxFileName,
							lineNumber: 168,
							columnNumber: 11
						}, this),
						/* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)("h1", {
							className: "font-display uppercase leading-[0.9] tracking-tight text-center relative z-30 hero-name hero-last",
							style: { fontSize: "clamp(3.5rem, 15vw, 15rem)" },
							children: /* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)("span", {
								className: "block",
								children: lastName
							}, void 0, false, {
								fileName: _jsxFileName,
								lineNumber: 176,
								columnNumber: 13
							}, this)
						}, void 0, false, {
							fileName: _jsxFileName,
							lineNumber: 173,
							columnNumber: 11
						}, this)
					]
				}, void 0, true, {
					fileName: _jsxFileName,
					lineNumber: 154,
					columnNumber: 9
				}, this),
				/* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)("div", {
					className: "hero-marquee mt-12",
					children: /* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)(ReelMarquee, { images: heroReelImages }, void 0, false, {
						fileName: _jsxFileName,
						lineNumber: 184,
						columnNumber: 11
					}, this)
				}, void 0, false, {
					fileName: _jsxFileName,
					lineNumber: 183,
					columnNumber: 9
				}, this),
				/* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)("div", {
					className: "hero-copy mt-10 flex items-center justify-center md:justify-start max-w-6xl mx-auto w-full px-6 md:px-0",
					children: /* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)("p", {
						className: "max-w-md text-center md:text-left text-sm md:text-base text-white/60 leading-relaxed uppercase tracking-wider font-mono",
						children: heroSubtitle
					}, void 0, false, {
						fileName: _jsxFileName,
						lineNumber: 189,
						columnNumber: 11
					}, this)
				}, void 0, false, {
					fileName: _jsxFileName,
					lineNumber: 188,
					columnNumber: 9
				}, this)
			]
		}, void 0, true, {
			fileName: _jsxFileName,
			lineNumber: 143,
			columnNumber: 7
		}, this),
		/* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)("section", {
			id: "home-about",
			className: "relative px-6 md:px-12 py-32 border-t border-white/5 section-block",
			children: /* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)(ScrollReveal, {
				className: "max-w-7xl mx-auto grid md:grid-cols-12 gap-12 items-start",
				children: [/* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)("div", {
					className: "md:col-span-4 space-y-6",
					children: [/* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)("div", {
						className: "section-number font-mono text-[10px] uppercase tracking-[0.3em] text-[var(--primary)]",
						children: "[ 01 ] About"
					}, void 0, false, {
						fileName: _jsxFileName,
						lineNumber: 199,
						columnNumber: 13
					}, this), /* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)("div", {
						className: "relative aspect-[3/4] overflow-hidden bg-neutral-900 border border-white/10 max-w-xs section-image-card",
						children: [
							/* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)("img", {
								src: aboutImage,
								alt: "Portrait",
								className: "w-full h-full object-cover grayscale-[20%]"
							}, void 0, false, {
								fileName: _jsxFileName,
								lineNumber: 203,
								columnNumber: 15
							}, this),
							/* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)("div", { className: "absolute inset-x-0 bottom-0 h-1/3 bg-gradient-to-t from-black to-transparent" }, void 0, false, {
								fileName: _jsxFileName,
								lineNumber: 204,
								columnNumber: 15
							}, this),
							/* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)("div", {
								className: "absolute bottom-3 left-3 font-mono text-[10px] uppercase tracking-widest text-white/80",
								children: [heroTitle, " · Dhaka"]
							}, void 0, true, {
								fileName: _jsxFileName,
								lineNumber: 205,
								columnNumber: 15
							}, this)
						]
					}, void 0, true, {
						fileName: _jsxFileName,
						lineNumber: 202,
						columnNumber: 13
					}, this)]
				}, void 0, true, {
					fileName: _jsxFileName,
					lineNumber: 198,
					columnNumber: 11
				}, this), /* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)("div", {
					className: "md:col-span-8 space-y-8",
					children: [
						/* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)("h2", {
							className: "font-display uppercase leading-[0.95] text-4xl md:text-7xl",
							children: [
								"Creative designer shaping brands that refuse to",
								" ",
								/* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)("span", {
									className: "text-[var(--primary)]",
									children: "whisper"
								}, void 0, false, {
									fileName: _jsxFileName,
									lineNumber: 213,
									columnNumber: 15
								}, this),
								"."
							]
						}, void 0, true, {
							fileName: _jsxFileName,
							lineNumber: 211,
							columnNumber: 13
						}, this),
						/* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)("p", {
							className: "text-white/60 leading-relaxed max-w-2xl text-lg",
							children: aboutDesc
						}, void 0, false, {
							fileName: _jsxFileName,
							lineNumber: 215,
							columnNumber: 13
						}, this),
						/* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)("div", {
							className: "grid grid-cols-2 md:grid-cols-4 gap-6 pt-6",
							children: displayStack.map((s) => /* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)("div", {
								className: "border-t border-white/10 pt-4",
								children: [/* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)("div", {
									className: "font-display uppercase text-lg",
									children: s.name
								}, void 0, false, {
									fileName: _jsxFileName,
									lineNumber: 218,
									columnNumber: 19
								}, this), /* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)("div", {
									className: "font-mono text-[10px] uppercase tracking-widest text-white/40 mt-1",
									children: s.role
								}, void 0, false, {
									fileName: _jsxFileName,
									lineNumber: 219,
									columnNumber: 19
								}, this)]
							}, s.name, true, {
								fileName: _jsxFileName,
								lineNumber: 217,
								columnNumber: 45
							}, this))
						}, void 0, false, {
							fileName: _jsxFileName,
							lineNumber: 216,
							columnNumber: 13
						}, this)
					]
				}, void 0, true, {
					fileName: _jsxFileName,
					lineNumber: 210,
					columnNumber: 11
				}, this)]
			}, void 0, true, {
				fileName: _jsxFileName,
				lineNumber: 197,
				columnNumber: 9
			}, this)
		}, void 0, false, {
			fileName: _jsxFileName,
			lineNumber: 196,
			columnNumber: 7
		}, this),
		/* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)("section", {
			className: "relative px-6 md:px-12 py-32 border-t border-white/5 section-block",
			children: /* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)(ScrollReveal, {
				className: "max-w-7xl mx-auto",
				children: [/* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)("div", {
					className: "section-header flex items-end justify-between mb-16",
					children: [/* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)("div", { children: [/* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)("div", {
						className: "section-number font-mono text-[10px] uppercase tracking-[0.3em] text-[var(--primary)] mb-4",
						children: "[ 02 ] Selected work"
					}, void 0, false, {
						fileName: _jsxFileName,
						lineNumber: 233,
						columnNumber: 15
					}, this), /* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)("h2", {
						className: "section-title font-display uppercase text-5xl md:text-7xl",
						children: "Projects"
					}, void 0, false, {
						fileName: _jsxFileName,
						lineNumber: 236,
						columnNumber: 15
					}, this)] }, void 0, true, {
						fileName: _jsxFileName,
						lineNumber: 232,
						columnNumber: 13
					}, this), /* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)(Link, {
						to: "/projects",
						className: "hidden md:block font-mono text-xs uppercase tracking-widest text-white/60 hover:text-white border-b border-white/20 hover:border-white pb-1 transition-all",
						children: "View all →"
					}, void 0, false, {
						fileName: _jsxFileName,
						lineNumber: 238,
						columnNumber: 13
					}, this)]
				}, void 0, true, {
					fileName: _jsxFileName,
					lineNumber: 231,
					columnNumber: 11
				}, this), /* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)("div", {
					className: "grid md:grid-cols-2 gap-8 md:gap-16",
					children: displayProjects.map((p, i) => /* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)("div", {
						className: `project-card group cursor-pointer ${i % 2 === 1 ? "md:mt-24" : ""}`,
						children: [/* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)("div", {
							className: "relative aspect-[4/5] overflow-hidden card border border-white/5 project-card-inner",
							children: [
								/* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)("img", {
									src: p.img,
									alt: p.title,
									width: 800,
									height: 1e3,
									loading: "lazy",
									className: "w-full h-full object-cover grayscale-[20%] group-hover:grayscale-0 group-hover:scale-105 transition-all duration-700"
								}, void 0, false, {
									fileName: _jsxFileName,
									lineNumber: 245,
									columnNumber: 19
								}, this),
								/* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)("div", { className: "absolute inset-0 bg-gradient-to-t from-black/80 via-transparent to-transparent opacity-60 group-hover:opacity-90 transition-opacity" }, void 0, false, {
									fileName: _jsxFileName,
									lineNumber: 246,
									columnNumber: 19
								}, this),
								/* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)("div", {
									className: "absolute top-6 left-6 font-mono text-[10px] uppercase tracking-widest bg-black/40 backdrop-blur px-2 py-1 border border-[var(--border)] text-[var(--muted-foreground)]",
									children: p.cat
								}, void 0, false, {
									fileName: _jsxFileName,
									lineNumber: 247,
									columnNumber: 19
								}, this),
								/* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)("div", {
									className: "absolute bottom-6 right-6 w-12 h-12 rounded-full border border-white/30 grid place-items-center backdrop-blur bg-black/40 group-hover:bg-[var(--primary)] group-hover:border-[var(--primary)] transition-all",
									children: /* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)("span", {
										className: "text-white text-lg",
										children: "→"
									}, void 0, false, {
										fileName: _jsxFileName,
										lineNumber: 251,
										columnNumber: 21
									}, this)
								}, void 0, false, {
									fileName: _jsxFileName,
									lineNumber: 250,
									columnNumber: 19
								}, this)
							]
						}, void 0, true, {
							fileName: _jsxFileName,
							lineNumber: 244,
							columnNumber: 17
						}, this), /* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)("div", {
							className: "mt-5 flex items-baseline justify-between",
							children: [/* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)("h3", {
								className: "font-display uppercase text-2xl md:text-3xl group-hover:text-[var(--primary)] transition-colors",
								children: p.title
							}, void 0, false, {
								fileName: _jsxFileName,
								lineNumber: 255,
								columnNumber: 19
							}, this), /* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)("span", {
								className: "font-mono text-xs text-white/40",
								children: p.year
							}, void 0, false, {
								fileName: _jsxFileName,
								lineNumber: 258,
								columnNumber: 19
							}, this)]
						}, void 0, true, {
							fileName: _jsxFileName,
							lineNumber: 254,
							columnNumber: 17
						}, this)]
					}, p.title + i, true, {
						fileName: _jsxFileName,
						lineNumber: 243,
						columnNumber: 57
					}, this))
				}, void 0, false, {
					fileName: _jsxFileName,
					lineNumber: 242,
					columnNumber: 11
				}, this)]
			}, void 0, true, {
				fileName: _jsxFileName,
				lineNumber: 230,
				columnNumber: 9
			}, this)
		}, void 0, false, {
			fileName: _jsxFileName,
			lineNumber: 229,
			columnNumber: 7
		}, this),
		/* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)("section", {
			className: "relative px-6 md:px-12 py-32 border-t border-white/5",
			children: /* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)("div", {
				className: "max-w-7xl mx-auto",
				children: [/* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)(ScrollReveal, {
					className: "grid md:grid-cols-12 gap-12 mb-16",
					children: [/* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)("div", {
						className: "md:col-span-4 font-mono text-[10px] uppercase tracking-[0.3em] text-[var(--primary)]",
						children: "[ 03 ] What I do"
					}, void 0, false, {
						fileName: _jsxFileName,
						lineNumber: 269,
						columnNumber: 13
					}, this), /* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)("h2", {
						className: "md:col-span-8 font-display uppercase text-5xl md:text-7xl leading-[0.95]",
						children: "Design. Motion. Cut."
					}, void 0, false, {
						fileName: _jsxFileName,
						lineNumber: 272,
						columnNumber: 13
					}, this)]
				}, void 0, true, {
					fileName: _jsxFileName,
					lineNumber: 268,
					columnNumber: 11
				}, this), /* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)(ScrollReveal, {
					stagger: true,
					staggerMs: 70,
					className: "divide-y divide-white/10 border-y border-white/10",
					children: displayServices.map((s) => /* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)("div", {
						className: "service-row grid md:grid-cols-12 gap-8 py-8 md:py-10 group hover:bg-white/[0.02] transition-colors px-2",
						children: [
							/* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)("div", {
								className: "md:col-span-1 font-mono text-xs text-white/40",
								children: s.n
							}, void 0, false, {
								fileName: _jsxFileName,
								lineNumber: 278,
								columnNumber: 17
							}, this),
							/* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)("h3", {
								className: "md:col-span-5 font-display uppercase text-3xl md:text-5xl group-hover:text-[var(--primary)] transition-colors",
								children: s.t
							}, void 0, false, {
								fileName: _jsxFileName,
								lineNumber: 279,
								columnNumber: 17
							}, this),
							/* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)("p", {
								className: "md:col-span-5 text-white/60 leading-relaxed",
								children: s.d
							}, void 0, false, {
								fileName: _jsxFileName,
								lineNumber: 282,
								columnNumber: 17
							}, this),
							/* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)("div", {
								className: "md:col-span-1 flex md:justify-end items-center text-white/40 group-hover:text-white transition-colors",
								children: "→"
							}, void 0, false, {
								fileName: _jsxFileName,
								lineNumber: 283,
								columnNumber: 17
							}, this)
						]
					}, s.n + s.t, true, {
						fileName: _jsxFileName,
						lineNumber: 277,
						columnNumber: 46
					}, this))
				}, void 0, false, {
					fileName: _jsxFileName,
					lineNumber: 276,
					columnNumber: 11
				}, this)]
			}, void 0, true, {
				fileName: _jsxFileName,
				lineNumber: 267,
				columnNumber: 9
			}, this)
		}, void 0, false, {
			fileName: _jsxFileName,
			lineNumber: 266,
			columnNumber: 7
		}, this),
		/* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)("section", {
			className: "relative px-6 md:px-12 py-32 border-t border-white/5",
			children: /* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)("div", {
				className: "max-w-7xl mx-auto",
				children: [/* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)(ScrollReveal, {
					className: "flex items-end justify-between mb-16",
					children: /* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)("div", { children: [/* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)("div", {
						className: "font-mono text-[10px] uppercase tracking-[0.3em] text-[var(--brand-red)] mb-4",
						children: "[ 04 ] Experience"
					}, void 0, false, {
						fileName: _jsxFileName,
						lineNumber: 296,
						columnNumber: 15
					}, this), /* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)("h2", {
						className: "font-display uppercase text-5xl md:text-7xl",
						children: "Career"
					}, void 0, false, {
						fileName: _jsxFileName,
						lineNumber: 299,
						columnNumber: 15
					}, this)] }, void 0, true, {
						fileName: _jsxFileName,
						lineNumber: 295,
						columnNumber: 13
					}, this)
				}, void 0, false, {
					fileName: _jsxFileName,
					lineNumber: 294,
					columnNumber: 11
				}, this), /* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)(ScrollReveal, {
					stagger: true,
					staggerMs: 100,
					className: "divide-y divide-white/10 border-y border-white/10",
					children: displayExp.map((x) => /* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)("div", {
						className: "experience-row grid md:grid-cols-12 gap-6 py-8 md:py-10 group hover:bg-white/[0.02] transition-colors px-2",
						children: [
							/* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)("div", {
								className: "md:col-span-3 font-mono text-xs text-white/40 uppercase tracking-widest",
								children: x.years
							}, void 0, false, {
								fileName: _jsxFileName,
								lineNumber: 304,
								columnNumber: 17
							}, this),
							/* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)("div", {
								className: "md:col-span-4",
								children: [/* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)("div", {
									className: "font-display uppercase text-2xl md:text-3xl group-hover:text-[var(--brand-red)] transition-colors",
									children: x.role
								}, void 0, false, {
									fileName: _jsxFileName,
									lineNumber: 308,
									columnNumber: 19
								}, this), /* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)("div", {
									className: "font-mono text-[10px] uppercase tracking-widest text-white/50 mt-2",
									children: x.org
								}, void 0, false, {
									fileName: _jsxFileName,
									lineNumber: 311,
									columnNumber: 19
								}, this)]
							}, void 0, true, {
								fileName: _jsxFileName,
								lineNumber: 307,
								columnNumber: 17
							}, this),
							/* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)("p", {
								className: "md:col-span-5 text-white/60 leading-relaxed",
								children: x.note
							}, void 0, false, {
								fileName: _jsxFileName,
								lineNumber: 315,
								columnNumber: 17
							}, this)
						]
					}, x.role + x.years, true, {
						fileName: _jsxFileName,
						lineNumber: 303,
						columnNumber: 41
					}, this))
				}, void 0, false, {
					fileName: _jsxFileName,
					lineNumber: 302,
					columnNumber: 11
				}, this)]
			}, void 0, true, {
				fileName: _jsxFileName,
				lineNumber: 293,
				columnNumber: 9
			}, this)
		}, void 0, false, {
			fileName: _jsxFileName,
			lineNumber: 292,
			columnNumber: 7
		}, this),
		/* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)("section", {
			className: "relative px-6 md:px-12 py-32 border-t border-white/5",
			children: /* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)(ScrollReveal, {
				className: "max-w-7xl mx-auto",
				children: [
					/* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)("div", {
						className: "font-mono text-[10px] uppercase tracking-[0.3em] text-[var(--brand-red)] mb-8",
						children: "[ 05 ] Get in touch"
					}, void 0, false, {
						fileName: _jsxFileName,
						lineNumber: 324,
						columnNumber: 11
					}, this),
					/* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)("h2", {
						className: "font-display uppercase leading-[0.9] text-6xl md:text-[10rem] mb-16",
						children: [
							"Let's make ",
							/* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)("br", {}, void 0, false, {
								fileName: _jsxFileName,
								lineNumber: 328,
								columnNumber: 24
							}, this),
							/* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)("span", {
								className: "text-[var(--brand-red)] italic font-normal",
								style: { fontFamily: "serif" },
								children: "something"
							}, void 0, false, {
								fileName: _jsxFileName,
								lineNumber: 329,
								columnNumber: 13
							}, this),
							" ",
							"loud."
						]
					}, void 0, true, {
						fileName: _jsxFileName,
						lineNumber: 327,
						columnNumber: 11
					}, this),
					/* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)("div", {
						className: "grid md:grid-cols-2 gap-16 items-end",
						children: [/* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)("div", {
							className: "space-y-8",
							children: [
								/* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)("div", { children: [/* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)("div", {
									className: "font-mono text-[10px] uppercase tracking-widest text-white/40 mb-2",
									children: "Email"
								}, void 0, false, {
									fileName: _jsxFileName,
									lineNumber: 339,
									columnNumber: 17
								}, this), /* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)("a", {
									href: `mailto:${contactEmail}`,
									className: "font-display uppercase text-2xl md:text-3xl hover:text-[var(--brand-red)] transition-colors break-all",
									children: contactEmail
								}, void 0, false, {
									fileName: _jsxFileName,
									lineNumber: 342,
									columnNumber: 17
								}, this)] }, void 0, true, {
									fileName: _jsxFileName,
									lineNumber: 338,
									columnNumber: 15
								}, this),
								/* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)("div", { children: [/* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)("div", {
									className: "font-mono text-[10px] uppercase tracking-widest text-white/40 mb-2",
									children: "Phone"
								}, void 0, false, {
									fileName: _jsxFileName,
									lineNumber: 347,
									columnNumber: 17
								}, this), /* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)("a", {
									href: `tel:${contactPhone}`,
									className: "font-display uppercase text-2xl md:text-3xl hover:text-[var(--brand-red)] transition-colors",
									children: contactPhone
								}, void 0, false, {
									fileName: _jsxFileName,
									lineNumber: 350,
									columnNumber: 17
								}, this)] }, void 0, true, {
									fileName: _jsxFileName,
									lineNumber: 346,
									columnNumber: 15
								}, this),
								/* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)("div", { children: [/* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)("div", {
									className: "font-mono text-[10px] uppercase tracking-widest text-white/40 mb-2",
									children: "Based in"
								}, void 0, false, {
									fileName: _jsxFileName,
									lineNumber: 355,
									columnNumber: 17
								}, this), /* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)("div", {
									className: "text-lg",
									children: contactLocation
								}, void 0, false, {
									fileName: _jsxFileName,
									lineNumber: 358,
									columnNumber: 17
								}, this)] }, void 0, true, {
									fileName: _jsxFileName,
									lineNumber: 354,
									columnNumber: 15
								}, this),
								/* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)("div", {
									className: "flex gap-6 font-mono text-xs uppercase tracking-widest text-white/60",
									children: [
										/* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)("a", {
											href: settings?.social?.linkedin?.url || "https://linkedin.com",
											target: "_blank",
											rel: "noreferrer",
											className: "hover:text-white",
											children: "LinkedIn ↗"
										}, void 0, false, {
											fileName: _jsxFileName,
											lineNumber: 361,
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
											lineNumber: 364,
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
											lineNumber: 367,
											columnNumber: 17
										}, this)
									]
								}, void 0, true, {
									fileName: _jsxFileName,
									lineNumber: 360,
									columnNumber: 15
								}, this)
							]
						}, void 0, true, {
							fileName: _jsxFileName,
							lineNumber: 337,
							columnNumber: 13
						}, this), /* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)(Link, {
							to: "/contact",
							className: "contact-card inline-flex items-center justify-between border border-white/20 hover:border-[var(--primary)] hover:bg-[var(--primary)] transition-all px-8 py-6 group",
							children: [/* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)("span", {
								className: "font-mono text-xs uppercase tracking-widest",
								children: "Start a project"
							}, void 0, false, {
								fileName: _jsxFileName,
								lineNumber: 373,
								columnNumber: 15
							}, this), /* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)("span", {
								className: "text-2xl group-hover:translate-x-2 transition-transform",
								children: "→"
							}, void 0, false, {
								fileName: _jsxFileName,
								lineNumber: 374,
								columnNumber: 15
							}, this)]
						}, void 0, true, {
							fileName: _jsxFileName,
							lineNumber: 372,
							columnNumber: 13
						}, this)]
					}, void 0, true, {
						fileName: _jsxFileName,
						lineNumber: 336,
						columnNumber: 11
					}, this)
				]
			}, void 0, true, {
				fileName: _jsxFileName,
				lineNumber: 323,
				columnNumber: 9
			}, this)
		}, void 0, false, {
			fileName: _jsxFileName,
			lineNumber: 322,
			columnNumber: 7
		}, this)
	] }, void 0, true, {
		fileName: _jsxFileName,
		lineNumber: 141,
		columnNumber: 10
	}, this);
}
//#endregion
export { Index as component };
