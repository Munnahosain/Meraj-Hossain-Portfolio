import { o as __toESM } from "../_runtime.mjs";
import { u as require_react } from "../_libs/@floating-ui/react-dom+[...].mjs";
import { t as useLocalStorage } from "./use-local-storage-DfBBwPrj.mjs";
import { c as HeadContent, d as createRouter, f as Outlet, g as Link, h as createRootRouteWithContext, l as useLocation, m as createFileRoute, p as lazyRouteComponent, s as Scripts, v as useRouter } from "../_libs/@tanstack/react-router+[...].mjs";
import { t as require_jsx_dev_runtime } from "../_libs/react.mjs";
import { E as CircleAlert, c as Search, f as Pen, i as User, j as Calendar, k as Check, l as Save, m as Mail, o as Trash2, u as Plus, w as Copy } from "../_libs/lucide-react.mjs";
import { t as fetchWithAuth } from "./admin-api-B-is0sao.mjs";
import { t as QueryClient } from "../_libs/tanstack__query-core.mjs";
import { n as QueryClientProvider } from "../_libs/tanstack__react-query.mjs";
import { t as Lenis } from "../_libs/lenis.mjs";
import { t as require_mongoose } from "../_libs/mongoose+mpath+mquery+sift.mjs";
import { t as require_main } from "../_libs/dotenv.mjs";
import { t as require_jsonwebtoken } from "../_libs/jsonwebtoken+[...].mjs";
import { t as require_cloudinary } from "../_libs/cloudinary+[...].mjs";
import { t as require_bcryptjs } from "../_libs/bcryptjs.mjs";
import { randomUUID } from "node:crypto";
import path from "path";
import { mkdir, readFile, writeFile } from "node:fs/promises";
import path$1 from "node:path";
//#region node_modules/.nitro/vite/services/ssr/assets/router-m86LW6Qu.js
var import_react = /* @__PURE__ */ __toESM(require_react());
var import_jsx_dev_runtime = require_jsx_dev_runtime();
var import_mongoose = /* @__PURE__ */ __toESM(require_mongoose());
var import_main = /* @__PURE__ */ __toESM(require_main());
var import_jsonwebtoken = /* @__PURE__ */ __toESM(require_jsonwebtoken());
var import_cloudinary = require_cloudinary();
var import_bcryptjs = /* @__PURE__ */ __toESM(require_bcryptjs());
var styles_default = "/assets/styles-DIooI8-g.css";
function reportLovableError(error, context = {}) {
	if (typeof window === "undefined") return;
	window.__lovableEvents?.captureException?.(error, {
		source: "react_error_boundary",
		route: window.location.pathname,
		...context
	}, {
		mechanism: "react_error_boundary",
		handled: false,
		severity: "error"
	});
	const message = error instanceof Response ? `Response ${error.status}${error.url ? ` at ${error.url}` : ""}` : error instanceof Error ? error.message : String(error);
	window.__lovableReportRuntimeError?.({
		message,
		stack: error instanceof Error ? error.stack : void 0,
		filename: window.location.pathname
	});
}
var _jsxFileName$7 = "E:/Web/creative-canvas-hub-main/creative-canvas-hub-main/src/components/Preloader.tsx";
function Preloader({ onComplete }) {
	const [count, setCount] = (0, import_react.useState)(0);
	const [isFadingOut, setIsFadingOut] = (0, import_react.useState)(false);
	const onCompleteRef = (0, import_react.useRef)(onComplete);
	(0, import_react.useEffect)(() => {
		onCompleteRef.current = onComplete;
	}, [onComplete]);
	(0, import_react.useEffect)(() => {
		const duration = 1200;
		const startTime = performance.now();
		let animationFrameId;
		const updateCounter = (now) => {
			const elapsed = now - startTime;
			const progress = Math.min(elapsed / duration * 100, 100);
			setCount(Math.round(progress));
			if (progress < 100) animationFrameId = requestAnimationFrame(updateCounter);
			else setTimeout(() => {
				setIsFadingOut(true);
				setTimeout(() => {
					onCompleteRef.current();
				}, 600);
			}, 200);
		};
		animationFrameId = requestAnimationFrame(updateCounter);
		return () => {
			cancelAnimationFrame(animationFrameId);
		};
	}, []);
	return /* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)("div", {
		className: `preloader-overlay ${isFadingOut ? "preloader-hidden" : ""}`,
		children: /* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)("div", {
			className: "flex items-center gap-4 font-mono select-none",
			children: [/* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)("span", {
				className: "font-display text-4xl md:text-6xl text-white tracking-widest min-w-[3ch] text-right",
				children: [count, "%"]
			}, void 0, true, {
				fileName: _jsxFileName$7,
				lineNumber: 50,
				columnNumber: 9
			}, this), /* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)("span", { className: "w-3.5 h-3.5 rounded-full bg-[var(--brand-red)] animate-blink-dot" }, void 0, false, {
				fileName: _jsxFileName$7,
				lineNumber: 53,
				columnNumber: 9
			}, this)]
		}, void 0, true, {
			fileName: _jsxFileName$7,
			lineNumber: 49,
			columnNumber: 7
		}, this)
	}, void 0, false, {
		fileName: _jsxFileName$7,
		lineNumber: 48,
		columnNumber: 5
	}, this);
}
var _jsxFileName$6 = "E:/Web/creative-canvas-hub-main/creative-canvas-hub-main/src/routes/__root.tsx";
function NotFoundComponent() {
	return /* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)("div", {
		className: "flex min-h-screen items-center justify-center bg-background px-4",
		children: /* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)("div", {
			className: "max-w-md text-center",
			children: [
				/* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)("div", {
					className: "font-mono text-xs tracking-widest text-[var(--brand-red)] mb-4",
					children: "ERROR / 404"
				}, void 0, false, {
					fileName: _jsxFileName$6,
					lineNumber: 22,
					columnNumber: 9
				}, this),
				/* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)("h1", {
					className: "font-display text-7xl uppercase tracking-tight",
					children: "Signal lost"
				}, void 0, false, {
					fileName: _jsxFileName$6,
					lineNumber: 25,
					columnNumber: 9
				}, this),
				/* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)("p", {
					className: "mt-4 text-sm text-muted-foreground",
					children: "This frame doesn't exist in our archive."
				}, void 0, false, {
					fileName: _jsxFileName$6,
					lineNumber: 26,
					columnNumber: 9
				}, this),
				/* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)(Link, {
					to: "/",
					className: "mt-8 inline-block border border-white/20 px-6 py-3 text-xs uppercase tracking-widest hover:bg-white hover:text-black transition-colors",
					children: "Return to studio"
				}, void 0, false, {
					fileName: _jsxFileName$6,
					lineNumber: 29,
					columnNumber: 9
				}, this)
			]
		}, void 0, true, {
			fileName: _jsxFileName$6,
			lineNumber: 21,
			columnNumber: 7
		}, this)
	}, void 0, false, {
		fileName: _jsxFileName$6,
		lineNumber: 20,
		columnNumber: 5
	}, this);
}
function ErrorComponent({ error, reset }) {
	console.error(error);
	const router = useRouter();
	(0, import_react.useEffect)(() => {
		reportLovableError(error, { boundary: "tanstack_root_error_component" });
	}, [error]);
	return /* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)("div", {
		className: "flex min-h-screen items-center justify-center bg-background px-4",
		children: /* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)("div", {
			className: "max-w-md text-center",
			children: [
				/* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)("h1", {
					className: "font-display text-4xl uppercase",
					children: "Cut. Something broke."
				}, void 0, false, {
					fileName: _jsxFileName$6,
					lineNumber: 50,
					columnNumber: 9
				}, this),
				/* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)("p", {
					className: "mt-2 text-sm text-muted-foreground",
					children: "Reload the frame or head back to the studio."
				}, void 0, false, {
					fileName: _jsxFileName$6,
					lineNumber: 51,
					columnNumber: 9
				}, this),
				/* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)("div", {
					className: "mt-6 flex justify-center gap-2",
					children: [/* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)("button", {
						onClick: () => {
							router.invalidate();
							reset();
						},
						className: "border border-white/20 px-6 py-3 text-xs uppercase tracking-widest hover:bg-white hover:text-black transition-colors",
						children: "Retry"
					}, void 0, false, {
						fileName: _jsxFileName$6,
						lineNumber: 55,
						columnNumber: 11
					}, this), /* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)("a", {
						href: "/",
						className: "border border-white/20 px-6 py-3 text-xs uppercase tracking-widest hover:bg-white hover:text-black transition-colors",
						children: "Home"
					}, void 0, false, {
						fileName: _jsxFileName$6,
						lineNumber: 64,
						columnNumber: 11
					}, this)]
				}, void 0, true, {
					fileName: _jsxFileName$6,
					lineNumber: 54,
					columnNumber: 9
				}, this)
			]
		}, void 0, true, {
			fileName: _jsxFileName$6,
			lineNumber: 49,
			columnNumber: 7
		}, this)
	}, void 0, false, {
		fileName: _jsxFileName$6,
		lineNumber: 48,
		columnNumber: 5
	}, this);
}
var Route$42 = createRootRouteWithContext()({
	head: () => ({
		meta: [
			{ charSet: "utf-8" },
			{
				name: "viewport",
				content: "width=device-width, initial-scale=1"
			},
			{ title: "Meraj Hossain — Graphics & Motion Designer" },
			{
				name: "description",
				content: "Portfolio of Meraj Hossain — graphics designer, video editor and motion graphics artist based in Dhaka, Bangladesh."
			},
			{
				name: "author",
				content: "Meraj Hossain"
			},
			{
				property: "og:title",
				content: "Meraj Hossain — Graphics & Motion Designer"
			},
			{
				property: "og:description",
				content: "Branding, motion graphics and video editing."
			},
			{
				property: "og:type",
				content: "website"
			},
			{
				property: "og:site_name",
				content: "Meraj Hossain"
			},
			{
				name: "twitter:card",
				content: "summary_large_image"
			}
		],
		links: [
			{
				rel: "stylesheet",
				href: styles_default
			},
			{
				rel: "icon",
				href: "/favicon.ico",
				type: "image/x-icon"
			},
			{
				rel: "preconnect",
				href: "https://fonts.googleapis.com"
			},
			{
				rel: "preconnect",
				href: "https://fonts.gstatic.com",
				crossOrigin: "anonymous"
			},
			{
				rel: "stylesheet",
				href: "https://fonts.googleapis.com/css2?family=Anton&family=Inter:wght@400;500;600&family=JetBrains+Mono:wght@400;500&display=swap"
			}
		]
	}),
	shellComponent: RootShell,
	component: RootComponent,
	notFoundComponent: NotFoundComponent,
	errorComponent: ErrorComponent
});
function RootShell({ children }) {
	return /* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)("html", {
		lang: "en",
		children: [/* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)("head", { children: /* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)(HeadContent, {}, void 0, false, {
			fileName: _jsxFileName$6,
			lineNumber: 115,
			columnNumber: 9
		}, this) }, void 0, false, {
			fileName: _jsxFileName$6,
			lineNumber: 114,
			columnNumber: 7
		}, this), /* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)("body", { children: [children, /* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)(Scripts, {}, void 0, false, {
			fileName: _jsxFileName$6,
			lineNumber: 119,
			columnNumber: 9
		}, this)] }, void 0, true, {
			fileName: _jsxFileName$6,
			lineNumber: 117,
			columnNumber: 7
		}, this)]
	}, void 0, true, {
		fileName: _jsxFileName$6,
		lineNumber: 113,
		columnNumber: 5
	}, this);
}
function RootComponent() {
	const { queryClient } = Route$42.useRouteContext();
	const location = useLocation();
	const [isLoaded, setIsLoaded] = (0, import_react.useState)(false);
	const isAdminRoute = location.pathname.startsWith("/admin");
	(0, import_react.useEffect)(() => {
		if (isAdminRoute) {
			document.body.style.overflow = "";
			return;
		}
		if (!isLoaded) {
			document.body.style.overflow = "hidden";
			return;
		}
		document.body.style.overflow = "";
		const lenisInstance = new Lenis({
			duration: 1.2,
			easing: (t) => Math.min(1, 1.001 - Math.pow(2, -10 * t)),
			orientation: "vertical",
			gestureOrientation: "vertical",
			smoothWheel: true
		});
		let rafId;
		const raf = (time) => {
			lenisInstance.raf(time);
			rafId = requestAnimationFrame(raf);
		};
		rafId = requestAnimationFrame(raf);
		return () => {
			lenisInstance.destroy();
			cancelAnimationFrame(rafId);
		};
	}, [isLoaded, isAdminRoute]);
	return /* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)(QueryClientProvider, {
		client: queryClient,
		children: [
			/* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)("div", {
				className: "grunge-overlay",
				"aria-hidden": "true"
			}, void 0, false, {
				fileName: _jsxFileName$6,
				lineNumber: 172,
				columnNumber: 7
			}, this),
			/* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)("div", {
				className: "grain-overlay",
				"aria-hidden": "true"
			}, void 0, false, {
				fileName: _jsxFileName$6,
				lineNumber: 173,
				columnNumber: 7
			}, this),
			!isAdminRoute && !isLoaded && /* @__PURE__ */ (void 0)(Preloader, { onComplete: () => setIsLoaded(true) }, void 0, false, {
				fileName: _jsxFileName$6,
				lineNumber: 175,
				columnNumber: 38
			}, this),
			/* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)("div", {
				className: "page-fade",
				children: /* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)(Outlet, {}, void 0, false, {
					fileName: _jsxFileName$6,
					lineNumber: 176,
					columnNumber: 58
				}, this)
			}, location.pathname, false, {
				fileName: _jsxFileName$6,
				lineNumber: 176,
				columnNumber: 7
			}, this)
		]
	}, void 0, true, {
		fileName: _jsxFileName$6,
		lineNumber: 170,
		columnNumber: 5
	}, this);
}
var $$splitComponentImporter$17 = () => import("./services-BSoUchNL.mjs");
var Route$41 = createFileRoute("/services")({
	component: lazyRouteComponent($$splitComponentImporter$17, "component"),
	head: () => ({
		meta: [
			{ title: "Services — Meraj Hossain" },
			{
				name: "description",
				content: "Graphic design, motion graphics, video editing, color grading and branding services by Meraj Hossain."
			},
			{
				property: "og:title",
				content: "Services — Meraj Hossain"
			},
			{
				property: "og:description",
				content: "Design, motion and edit services."
			},
			{
				property: "og:url",
				content: "/services"
			}
		],
		links: [{
			rel: "canonical",
			href: "/services"
		}]
	})
});
var $$splitComponentImporter$16 = () => import("./projects-CQp3YhU_.mjs");
var Route$40 = createFileRoute("/projects")({
	component: lazyRouteComponent($$splitComponentImporter$16, "component"),
	head: () => ({
		meta: [
			{ title: "Projects — Meraj Hossain" },
			{
				name: "description",
				content: "Selected graphics, motion and video projects by Meraj Hossain."
			},
			{
				property: "og:title",
				content: "Projects — Meraj Hossain"
			},
			{
				property: "og:description",
				content: "Selected graphics, motion and video work."
			},
			{
				property: "og:url",
				content: "/projects"
			}
		],
		links: [{
			rel: "canonical",
			href: "/projects"
		}]
	})
});
var $$splitComponentImporter$15 = () => import("./project-DVZk6wMZ.mjs");
var Route$39 = createFileRoute("/project")({
	component: lazyRouteComponent($$splitComponentImporter$15, "component"),
	head: () => ({ meta: [{ title: "Project — Meraj Hossain" }] })
});
var $$splitComponentImporter$14 = () => import("./contact-DjlzIDIR.mjs");
var Route$38 = createFileRoute("/contact")({
	component: lazyRouteComponent($$splitComponentImporter$14, "component"),
	head: () => ({
		meta: [
			{ title: "Contact — Meraj Hossain" },
			{
				name: "description",
				content: "Get in touch with Meraj Hossain for graphic design, motion graphics and video editing projects."
			},
			{
				property: "og:title",
				content: "Contact — Meraj Hossain"
			},
			{
				property: "og:description",
				content: "Let's build something loud."
			},
			{
				property: "og:url",
				content: "/contact"
			}
		],
		links: [{
			rel: "canonical",
			href: "/contact"
		}]
	})
});
var $$splitComponentImporter$13 = () => import("./about-Dq_InD_P.mjs");
var Route$37 = createFileRoute("/about")({
	component: lazyRouteComponent($$splitComponentImporter$13, "component"),
	head: () => ({
		meta: [
			{ title: "About — Meraj Hossain" },
			{
				name: "description",
				content: "About Meraj Hossain — graphics designer, motion graphics artist and video editor based in Savar, Dhaka."
			},
			{
				property: "og:title",
				content: "About — Meraj Hossain"
			},
			{
				property: "og:description",
				content: "Graphics designer and motion artist based in Dhaka, Bangladesh."
			},
			{
				property: "og:url",
				content: "/about"
			}
		],
		links: [{
			rel: "canonical",
			href: "/about"
		}]
	})
});
var $$splitComponentImporter$12 = () => import("./routes-B_I_kLKu.mjs");
var Route$36 = createFileRoute("/")({
	component: lazyRouteComponent($$splitComponentImporter$12, "component"),
	head: () => ({ meta: [
		{ title: "Meraj Hossain — Graphics Designer & Motion Artist" },
		{
			name: "description",
			content: "Portfolio of Meraj Hossain — Graphics Designer, Video Editor and Motion Graphics Designer based in Dhaka, Bangladesh."
		},
		{
			property: "og:title",
			content: "Meraj Hossain — Graphics & Motion Designer"
		},
		{
			property: "og:description",
			content: "Branding, motion graphics, video editing and visual storytelling."
		}
	] })
});
if (!process.env.MONGODB_URI) import_main.default.config({ path: path.resolve(process.cwd(), ".env") });
var MONGODB_URI = process.env.MONGODB_URI;
if (!MONGODB_URI) throw new Error("MONGODB_URI is not defined in environment variables");
var isConnected = false;
import_mongoose.default.connection.on("disconnected", () => {
	isConnected = false;
	console.log("MongoDB disconnected");
});
import_mongoose.default.connection.on("error", () => {
	isConnected = false;
});
async function connectDB() {
	if (isConnected && import_mongoose.default.connection.readyState === 1) return import_mongoose.default.connection;
	try {
		await import_mongoose.default.connect(MONGODB_URI, {
			serverSelectionTimeoutMS: 1e4,
			connectTimeoutMS: 1e4,
			socketTimeoutMS: 3e4,
			maxPoolSize: 10,
			minPoolSize: 2
		});
		isConnected = true;
		console.log("✓ MongoDB connected successfully");
		return import_mongoose.default.connection;
	} catch (error) {
		isConnected = false;
		console.error("✗ MongoDB connection failed:", error);
		throw error;
	}
}
var skillSchema = new import_mongoose.Schema({
	name: {
		type: String,
		required: true,
		unique: true
	},
	percentage: {
		type: Number,
		required: true,
		min: 0,
		max: 100
	},
	category: String,
	icon: String,
	color: String,
	displayOrder: {
		type: Number,
		default: 0
	},
	hidden: {
		type: Boolean,
		default: false
	}
}, { timestamps: true });
var Skill = import_mongoose.default.models.Skill || import_mongoose.default.model("Skill", skillSchema);
var websiteSettingsSchema = new import_mongoose.Schema({
	branding: {
		websiteName: {
			type: String,
			default: "Creative Canvas Hub"
		},
		websiteLogo: String,
		darkLogo: String,
		lightLogo: String,
		footerLogo: String,
		favicon: String,
		browserTitle: String
	},
	general: {
		ownerName: String,
		profession: String,
		tagline: String,
		shortDescription: String
	},
	contact: {
		email: String,
		phone: String,
		whatsapp: String,
		address: String,
		googleMapsLink: String
	},
	social: {
		facebook: {
			url: String,
			enabled: Boolean
		},
		linkedin: {
			url: String,
			enabled: Boolean
		},
		behance: {
			url: String,
			enabled: Boolean
		},
		dribbble: {
			url: String,
			enabled: Boolean
		},
		github: {
			url: String,
			enabled: Boolean
		},
		instagram: {
			url: String,
			enabled: Boolean
		},
		youtube: {
			url: String,
			enabled: Boolean
		},
		twitter: {
			url: String,
			enabled: Boolean
		}
	},
	hero: {
		title: String,
		subtitle: String,
		description: String,
		backgroundImage: String,
		profileImage: String,
		reelImages: [String],
		resumePdf: String,
		resumeButtonText: {
			type: String,
			default: "Download Resume"
		},
		hireMeButtonText: {
			type: String,
			default: "Hire Me"
		},
		contactButtonText: {
			type: String,
			default: "Contact"
		}
	},
	about: {
		title: String,
		description: String,
		experience: String,
		location: String,
		languages: String,
		birthday: String,
		nationality: String,
		availability: String,
		yearsOfExperience: Number,
		profileImage: String,
		cv: String
	},
	theme: {
		primaryColor: {
			type: String,
			default: "#ffffff"
		},
		secondaryColor: {
			type: String,
			default: "#000000"
		},
		accentColor: {
			type: String,
			default: "#ff0000"
		},
		backgroundColor: {
			type: String,
			default: "#000000"
		},
		textColor: {
			type: String,
			default: "#ffffff"
		},
		fontFamily: {
			type: String,
			default: "system-ui"
		},
		borderRadius: {
			type: String,
			default: "0.5rem"
		},
		darkMode: {
			type: Boolean,
			default: true
		}
	},
	seo: {
		homepageTitle: String,
		metaTitle: String,
		metaDescription: String,
		keywords: [String],
		canonicalUrl: String,
		ogImage: String,
		twitterCard: String,
		robots: String,
		sitemap: String
	},
	updatedBy: String
}, { timestamps: true });
var WebsiteSettings = import_mongoose.default.models.WebsiteSettings || import_mongoose.default.model("WebsiteSettings", websiteSettingsSchema);
var serviceSchema = new import_mongoose.Schema({
	icon: {
		type: String,
		required: true
	},
	title: {
		type: String,
		required: true
	},
	description: {
		type: String,
		required: true
	},
	buttonText: String,
	displayOrder: {
		type: Number,
		default: 0
	},
	hidden: {
		type: Boolean,
		default: false
	}
}, { timestamps: true });
var Service = import_mongoose.default.models.Service || import_mongoose.default.model("Service", serviceSchema);
var categorySchema = new import_mongoose.Schema({
	name: {
		type: String,
		required: true,
		unique: true
	},
	icon: String,
	description: String,
	displayOrder: {
		type: Number,
		default: 0
	},
	hidden: {
		type: Boolean,
		default: false
	}
}, { timestamps: true });
var Category = import_mongoose.default.models.Category || import_mongoose.default.model("Category", categorySchema);
var projectSchema = new import_mongoose.Schema({
	title: {
		type: String,
		required: true
	},
	slug: {
		type: String,
		required: true,
		unique: true
	},
	category: {
		type: String,
		required: true
	},
	shortDescription: {
		type: String,
		required: true
	},
	fullDescription: {
		type: String,
		required: true
	},
	thumbnail: {
		type: String,
		required: true
	},
	galleryImages: [String],
	googleDriveLink: String,
	liveWebsite: String,
	behanceLink: String,
	githubLink: String,
	youtubeLink: String,
	clientName: String,
	completionDate: Date,
	softwareUsed: [String],
	tags: [String],
	featured: {
		type: Boolean,
		default: false
	},
	hidden: {
		type: Boolean,
		default: false
	},
	displayOrder: {
		type: Number,
		default: 0
	},
	status: {
		type: String,
		enum: ["draft", "published"],
		default: "draft"
	}
}, { timestamps: true });
projectSchema.index({ slug: 1 });
var Project = import_mongoose.default.models.Project || import_mongoose.default.model("Project", projectSchema);
async function ensureInitialSeed() {
	try {
		await connectDB();
		if (!await WebsiteSettings.findOne()) {
			await WebsiteSettings.create({
				branding: {
					websiteName: "Meraj Hossain",
					browserTitle: "Meraj Hossain — Graphics & Motion Designer",
					websiteLogo: "/MCU-LOGO-0.2V-1.png",
					footerLogo: "/MCU-LOGO-0.2V-1.png",
					favicon: "/favicon.ico"
				},
				general: {
					ownerName: "Meraj Hossain",
					profession: "Graphics Designer & Motion Artist",
					tagline: "Visual Storyteller · Video Editor · Motion Artist",
					shortDescription: "Graphics designer, video editor and motion graphics artist based in Dhaka, Bangladesh."
				},
				contact: {
					email: "merajhossain.mcu@gmail.com",
					phone: "+880 1700 000 000",
					whatsapp: "+8801700000000",
					address: "Dhaka, Bangladesh",
					googleMapsLink: ""
				},
				social: {
					facebook: {
						url: "https://facebook.com",
						enabled: true
					},
					linkedin: {
						url: "https://linkedin.com",
						enabled: true
					},
					behance: {
						url: "https://behance.net",
						enabled: true
					},
					dribbble: {
						url: "https://dribbble.com",
						enabled: true
					},
					github: {
						url: "https://github.com",
						enabled: true
					},
					instagram: {
						url: "https://instagram.com",
						enabled: true
					},
					youtube: {
						url: "https://youtube.com",
						enabled: true
					},
					twitter: {
						url: "https://x.com",
						enabled: true
					}
				},
				hero: {
					title: "Meraj Hossain",
					subtitle: "Graphics Designer · Video Editor · Motion Artist",
					description: "Turning briefs into visual moments people remember.",
					reelImages: [],
					resumeButtonText: "Download Resume",
					hireMeButtonText: "Hire Me",
					contactButtonText: "Contact Studio"
				},
				about: {
					title: "About Meraj",
					description: "Specializing in branding design, video editing, motion graphics, and visual storytelling.",
					experience: "4+ Years",
					location: "Dhaka, Bangladesh",
					languages: "English, Bengali",
					birthday: "October 15",
					nationality: "Bangladeshi",
					availability: "Available for Freelance & Full-time",
					yearsOfExperience: 4
				},
				seo: {
					homepageTitle: "Meraj Hossain — Graphics & Motion Designer",
					metaTitle: "Meraj Hossain Portfolio",
					metaDescription: "Graphics Designer, Video Editor and Motion Graphics Designer based in Dhaka, Bangladesh.",
					keywords: [
						"Graphics Design",
						"Motion Graphics",
						"Video Editing",
						"Branding",
						"Dhaka"
					]
				}
			});
			console.log("✓ Seeded default WebsiteSettings");
		}
		if (await Category.countDocuments() === 0) {
			await Category.insertMany([
				{
					name: "Branding",
					slug: "branding",
					description: "Brand identity & print",
					displayOrder: 1
				},
				{
					name: "Motion Graphics",
					slug: "motion-graphics",
					description: "Kinetic typography & animations",
					displayOrder: 2
				},
				{
					name: "Video Editing",
					slug: "video-editing",
					description: "Reels, promo cuts & post-production",
					displayOrder: 3
				},
				{
					name: "Promo & Color",
					slug: "promo-color",
					description: "Commercial cutdowns & color grading",
					displayOrder: 4
				}
			]);
			console.log("✓ Seeded default Categories");
		}
		if (await Service.countDocuments() === 0) {
			await Service.insertMany([
				{
					number: "01",
					title: "Graphic Design",
					description: "Posters, social creatives, and print collateral built with typographic precision.",
					icon: "Palette",
					displayOrder: 1,
					active: true
				},
				{
					number: "02",
					title: "Motion Graphics",
					description: "Kinetic type, logo stings, and animated explainers in After Effects.",
					icon: "Film",
					displayOrder: 2,
					active: true
				},
				{
					number: "03",
					title: "Video Editing",
					description: "Story-driven cuts for reels, ads, and long-form in Premiere Pro.",
					icon: "Video",
					displayOrder: 3,
					active: true
				},
				{
					number: "04",
					title: "Color Grading",
					description: "Cinematic looks and consistent finishing across every deliverable.",
					icon: "Sliders",
					displayOrder: 4,
					active: true
				},
				{
					number: "05",
					title: "Branding Design",
					description: "Logo systems, guidelines, and identity that scales across media.",
					icon: "Sparkles",
					displayOrder: 5,
					active: true
				},
				{
					number: "06",
					title: "Visual Storytelling",
					description: "Concept to screen — turning briefs into moments people remember.",
					icon: "Layout",
					displayOrder: 6,
					active: true
				}
			]);
			console.log("✓ Seeded default Services");
		}
		if (await Skill.countDocuments() === 0) {
			await Skill.insertMany([
				{
					name: "Adobe Photoshop",
					category: "Software",
					role: "Retouch · Composite",
					percentage: 95,
					displayOrder: 1,
					active: true
				},
				{
					name: "Adobe Illustrator",
					category: "Software",
					role: "Vector · Logo System",
					percentage: 90,
					displayOrder: 2,
					active: true
				},
				{
					name: "Adobe After Effects",
					category: "Software",
					role: "Motion · Kinetic Type",
					percentage: 92,
					displayOrder: 3,
					active: true
				},
				{
					name: "Adobe Premiere Pro",
					category: "Software",
					role: "Video Edit · Color Grading",
					percentage: 88,
					displayOrder: 4,
					active: true
				}
			]);
			console.log("✓ Seeded default Skills");
		}
		if (await Project.countDocuments() === 0) {
			await Project.insertMany([
				{
					title: "Micro Electronic Campaign",
					slug: "micro-electronic-campaign",
					category: "Branding",
					shortDescription: "Complete branding and print collateral for tech hardware product launch.",
					fullDescription: "Designed high-impact print posters, social media campaign kits, and product packaging for a national electronics launch.",
					thumbnail: "/assets/reel-01.jpg",
					galleryImages: ["/assets/reel-01.jpg"],
					featured: true,
					hidden: false,
					displayOrder: 1,
					status: "published",
					tags: [
						"Branding",
						"Print",
						"Tech"
					]
				},
				{
					title: "Adobe Stock — Motion Pack",
					slug: "adobe-stock-motion-pack",
					category: "Motion Graphics",
					shortDescription: "Kinetic title templates and lower-thirds package for video creators.",
					fullDescription: "Custom After Effects motion graphics templates created for stock licensing.",
					thumbnail: "/assets/reel-03.jpg",
					galleryImages: ["/assets/reel-03.jpg"],
					featured: true,
					hidden: false,
					displayOrder: 2,
					status: "published",
					tags: [
						"Motion Graphics",
						"After Effects",
						"Templates"
					]
				},
				{
					title: "Social Reels Series",
					slug: "social-reels-series",
					category: "Video Editing",
					shortDescription: "Fast-paced, engagement-optimized short form video cuts for digital brands.",
					fullDescription: "Edited high-converting vertical reel series with dynamic captions, sound design, and speed ramping.",
					thumbnail: "/assets/reel-05.jpg",
					galleryImages: ["/assets/reel-05.jpg"],
					featured: true,
					hidden: false,
					displayOrder: 3,
					status: "published",
					tags: [
						"Video Editing",
						"Reels",
						"Shorts"
					]
				},
				{
					title: "Promo Cutdowns",
					slug: "promo-cutdowns",
					category: "Promo & Color",
					shortDescription: "Cinematic commercial cutdowns and color grading for brand campaign.",
					fullDescription: "Color-graded and master-edited commercial promos for broadcast and web.",
					thumbnail: "/assets/reel-06.jpg",
					galleryImages: ["/assets/reel-06.jpg"],
					featured: true,
					hidden: false,
					displayOrder: 4,
					status: "published",
					tags: [
						"Promo",
						"Color Grading",
						"Commercial"
					]
				}
			]);
			console.log("✓ Seeded default Projects");
		}
	} catch (error) {
		console.error("Seed defaults error:", error);
	}
}
var JWT_SECRET = process.env.JWT_SECRET;
if (!JWT_SECRET) throw new Error("JWT_SECRET is not defined in environment variables");
function generateToken(payload) {
	return import_jsonwebtoken.default.sign(payload, JWT_SECRET, { expiresIn: "30d" });
}
function verifyToken(token) {
	try {
		return import_jsonwebtoken.default.verify(token, JWT_SECRET);
	} catch (error) {
		console.error("JWT verification failed:", error);
		return null;
	}
}
function extractTokenFromHeader(authHeader) {
	if (!authHeader) return null;
	const parts = authHeader.split(" ");
	if (parts.length === 2 && parts[0] === "Bearer") return parts[1];
	return null;
}
var Route$35 = createFileRoute("/api/skills")({ server: { handlers: {
	GET: async () => {
		try {
			await connectDB();
			await ensureInitialSeed();
			const skills = await Skill.find({ active: { $ne: false } }).sort({ displayOrder: 1 }).lean();
			return Response.json({
				success: true,
				data: skills
			});
		} catch (error) {
			console.error("API /api/skills GET error:", error);
			return Response.json({
				success: false,
				message: "Failed to fetch skills"
			}, { status: 500 });
		}
	},
	POST: async ({ request }) => {
		try {
			const token = extractTokenFromHeader(request.headers.get("authorization") || void 0);
			if (!token || !verifyToken(token)) return Response.json({
				success: false,
				message: "Unauthorized"
			}, { status: 401 });
			await connectDB();
			const body = await request.json().catch(() => ({}));
			const skill = await Skill.create(body);
			return Response.json({
				success: true,
				data: skill,
				message: "Skill created successfully"
			});
		} catch (error) {
			console.error("API /api/skills POST error:", error);
			return Response.json({
				success: false,
				message: "Failed to create skill"
			}, { status: 500 });
		}
	},
	PUT: async ({ request }) => {
		try {
			const token = extractTokenFromHeader(request.headers.get("authorization") || void 0);
			if (!token || !verifyToken(token)) return Response.json({
				success: false,
				message: "Unauthorized"
			}, { status: 401 });
			await connectDB();
			const { _id, ...updateData } = await request.json().catch(() => ({}));
			const updated = await Skill.findByIdAndUpdate(_id, { $set: updateData }, { new: true });
			return Response.json({
				success: true,
				data: updated,
				message: "Skill updated successfully"
			});
		} catch (error) {
			console.error("API /api/skills PUT error:", error);
			return Response.json({
				success: false,
				message: "Failed to update skill"
			}, { status: 500 });
		}
	},
	DELETE: async ({ request }) => {
		try {
			const token = extractTokenFromHeader(request.headers.get("authorization") || void 0);
			if (!token || !verifyToken(token)) return Response.json({
				success: false,
				message: "Unauthorized"
			}, { status: 401 });
			await connectDB();
			const id = new URL(request.url).searchParams.get("id");
			if (!id) return Response.json({
				success: false,
				message: "ID required"
			}, { status: 400 });
			await Skill.findByIdAndDelete(id);
			return Response.json({
				success: true,
				message: "Skill deleted successfully"
			});
		} catch (error) {
			console.error("API /api/skills DELETE error:", error);
			return Response.json({
				success: false,
				message: "Failed to delete skill"
			}, { status: 500 });
		}
	}
} } });
var Route$34 = createFileRoute("/api/settings")({ server: { handlers: {
	GET: async () => {
		try {
			await connectDB();
			await ensureInitialSeed();
			let settings = await WebsiteSettings.findOne().lean();
			if (!settings) settings = {
				branding: {
					websiteName: "Meraj Hossain",
					browserTitle: "Meraj Hossain",
					websiteLogo: "/MCU-LOGO-0.2V-1.png",
					footerLogo: "/MCU-LOGO-0.2V-1.png"
				},
				general: {
					ownerName: "Meraj Hossain",
					profession: "Graphics Designer & Motion Artist"
				},
				contact: { email: "merajhossain042@gmail.com" },
				social: {},
				hero: {
					title: "Meraj Hossain",
					reelImages: [],
					subtitle: "Graphics Designer · Video Editor · Motion Artist"
				},
				about: { title: "About Meraj" },
				seo: { metaTitle: "Meraj Hossain Portfolio" }
			};
			return Response.json({
				success: true,
				data: settings
			});
		} catch (error) {
			console.error("API /api/settings GET error:", error);
			return Response.json({
				success: false,
				message: "Failed to fetch settings"
			}, { status: 500 });
		}
	},
	PUT: async ({ request }) => {
		try {
			const token = extractTokenFromHeader(request.headers.get("authorization") || void 0);
			if (!token || !verifyToken(token)) return Response.json({
				success: false,
				message: "Unauthorized"
			}, { status: 401 });
			await connectDB();
			const body = await request.json().catch(() => ({}));
			const updated = await WebsiteSettings.findOneAndUpdate({}, { $set: body }, {
				new: true,
				upsert: true
			});
			return Response.json({
				success: true,
				data: updated,
				message: "Settings updated successfully"
			});
		} catch (error) {
			console.error("API /api/settings PUT error:", error);
			return Response.json({
				success: false,
				message: "Failed to update settings"
			}, { status: 500 });
		}
	}
} } });
var Route$33 = createFileRoute("/api/services")({ server: { handlers: {
	GET: async () => {
		try {
			await connectDB();
			await ensureInitialSeed();
			const services = await Service.find({ active: { $ne: false } }).sort({ displayOrder: 1 }).lean();
			return Response.json({
				success: true,
				data: services
			});
		} catch (error) {
			console.error("API /api/services GET error:", error);
			return Response.json({
				success: false,
				message: "Failed to fetch services"
			}, { status: 500 });
		}
	},
	POST: async ({ request }) => {
		try {
			const token = extractTokenFromHeader(request.headers.get("authorization") || void 0);
			if (!token || !verifyToken(token)) return Response.json({
				success: false,
				message: "Unauthorized"
			}, { status: 401 });
			await connectDB();
			const body = await request.json().catch(() => ({}));
			const service = await Service.create(body);
			return Response.json({
				success: true,
				data: service,
				message: "Service created successfully"
			});
		} catch (error) {
			console.error("API /api/services POST error:", error);
			return Response.json({
				success: false,
				message: "Failed to create service"
			}, { status: 500 });
		}
	},
	PUT: async ({ request }) => {
		try {
			const token = extractTokenFromHeader(request.headers.get("authorization") || void 0);
			if (!token || !verifyToken(token)) return Response.json({
				success: false,
				message: "Unauthorized"
			}, { status: 401 });
			await connectDB();
			const { _id, ...updateData } = await request.json().catch(() => ({}));
			const updated = await Service.findByIdAndUpdate(_id, { $set: updateData }, { new: true });
			return Response.json({
				success: true,
				data: updated,
				message: "Service updated successfully"
			});
		} catch (error) {
			console.error("API /api/services PUT error:", error);
			return Response.json({
				success: false,
				message: "Failed to update service"
			}, { status: 500 });
		}
	},
	DELETE: async ({ request }) => {
		try {
			const token = extractTokenFromHeader(request.headers.get("authorization") || void 0);
			if (!token || !verifyToken(token)) return Response.json({
				success: false,
				message: "Unauthorized"
			}, { status: 401 });
			await connectDB();
			const id = new URL(request.url).searchParams.get("id");
			if (!id) return Response.json({
				success: false,
				message: "ID required"
			}, { status: 400 });
			await Service.findByIdAndDelete(id);
			return Response.json({
				success: true,
				message: "Service deleted successfully"
			});
		} catch (error) {
			console.error("API /api/services DELETE error:", error);
			return Response.json({
				success: false,
				message: "Failed to delete service"
			}, { status: 500 });
		}
	}
} } });
/**
* Extracts Google Drive File ID from various link formats
*/
function extractGoogleDriveId(url) {
	if (!url) return null;
	const match = url.match(/\/file\/d\/([a-zA-Z0-9_-]+)/) || url.match(/id=([a-zA-Z0-9_-]+)/) || url.match(/\/d\/([a-zA-Z0-9_-]+)/);
	return match ? match[1] : null;
}
/**
* Extracts YouTube Video ID from various link formats (watch, shorts, share)
*/
function extractYouTubeId(url) {
	if (!url) return null;
	const match = url.match(/(?:youtu\.be\/|youtube\.com\/(?:embed\/|v\/|watch\?v=|watch\?.+&v=|shorts\/))([\w-]{11})/);
	return match ? match[1] : null;
}
/**
* Parses any media URL and returns optimized embed and stream URLs
*/
function parseMediaUrl(url) {
	if (!url) return {
		type: "unknown",
		originalUrl: "",
		embedUrl: "",
		streamUrl: ""
	};
	const cleanUrl = url.trim();
	const driveId = extractGoogleDriveId(cleanUrl);
	if (driveId) return {
		type: "gdrive",
		originalUrl: cleanUrl,
		embedUrl: `https://drive.google.com/file/d/${driveId}/preview`,
		streamUrl: `https://lh3.googleusercontent.com/d/${driveId}`
	};
	const youtubeId = extractYouTubeId(cleanUrl);
	if (youtubeId) return {
		type: "youtube",
		originalUrl: cleanUrl,
		embedUrl: `https://www.youtube-nocookie.com/embed/${youtubeId}?autoplay=0&rel=0`,
		streamUrl: `https://img.youtube.com/vi/${youtubeId}/hqdefault.jpg`
	};
	if (/\.(mp4|webm|ogg|mov|m4v)(\?.*)?$/i.test(cleanUrl)) return {
		type: "video",
		originalUrl: cleanUrl,
		embedUrl: cleanUrl,
		streamUrl: cleanUrl
	};
	return {
		type: "image",
		originalUrl: cleanUrl,
		embedUrl: cleanUrl,
		streamUrl: cleanUrl
	};
}
var Route$32 = createFileRoute("/api/projects")({ server: { handlers: {
	GET: async ({ request }) => {
		try {
			await connectDB();
			await ensureInitialSeed();
			const showAll = new URL(request.url).searchParams.get("all") === "true";
			let query = {};
			if (!showAll) query = { hidden: { $ne: true } };
			const processedProjects = (await Project.find(query).sort({
				displayOrder: 1,
				createdAt: -1
			}).lean()).map((p) => {
				const driveMedia = p.googleDriveLink ? parseMediaUrl(p.googleDriveLink) : null;
				const youtubeMedia = p.youtubeLink ? parseMediaUrl(p.youtubeLink) : null;
				return {
					...p,
					mediaInfo: {
						googleDriveEmbed: driveMedia?.embedUrl || "",
						googleDriveStream: driveMedia?.streamUrl || "",
						youtubeEmbed: youtubeMedia?.embedUrl || "",
						youtubeStream: youtubeMedia?.streamUrl || ""
					}
				};
			});
			return Response.json({
				success: true,
				data: processedProjects
			});
		} catch (error) {
			console.error("API /api/projects GET error:", error);
			return Response.json({
				success: false,
				message: "Failed to fetch projects"
			}, { status: 500 });
		}
	},
	POST: async ({ request }) => {
		try {
			const token = extractTokenFromHeader(request.headers.get("authorization") || void 0);
			if (!token || !verifyToken(token)) return Response.json({
				success: false,
				message: "Unauthorized"
			}, { status: 401 });
			await connectDB();
			const body = await request.json().catch(() => ({}));
			if (!body.title) return Response.json({
				success: false,
				message: "Project title is required"
			}, { status: 400 });
			const slug = body.slug || body.title.toLowerCase().replace(/[^a-z0-9]+/g, "-").replace(/(^-|-$)+/g, "");
			const newProject = await Project.create({
				title: body.title,
				slug: `${slug}-${Date.now().toString().slice(-4)}`,
				category: body.category || "Uncategorized",
				shortDescription: body.shortDescription || "",
				fullDescription: body.fullDescription || "",
				thumbnail: body.thumbnail || "/assets/reel-01.jpg",
				galleryImages: Array.isArray(body.galleryImages) ? body.galleryImages : [],
				googleDriveLink: body.googleDriveLink || "",
				youtubeLink: body.youtubeLink || "",
				liveWebsite: body.liveWebsite || "",
				behanceLink: body.behanceLink || "",
				githubLink: body.githubLink || "",
				tags: Array.isArray(body.tags) ? body.tags : [],
				featured: Boolean(body.featured),
				hidden: Boolean(body.hidden),
				displayOrder: Number(body.displayOrder) || 0,
				status: body.status || "published"
			});
			return Response.json({
				success: true,
				data: newProject,
				message: "Project created successfully"
			});
		} catch (error) {
			console.error("API /api/projects POST error:", error);
			return Response.json({
				success: false,
				message: "Failed to create project"
			}, { status: 500 });
		}
	}
} } });
var contactMessageSchema = new import_mongoose.Schema({
	name: {
		type: String,
		required: true
	},
	email: {
		type: String,
		required: true
	},
	phone: String,
	subject: {
		type: String,
		required: true
	},
	message: {
		type: String,
		required: true
	},
	read: {
		type: Boolean,
		default: false
	},
	replied: {
		type: Boolean,
		default: false
	},
	replyMessage: String,
	attachments: [String]
}, { timestamps: true });
var ContactMessage = import_mongoose.default.models.ContactMessage || import_mongoose.default.model("ContactMessage", contactMessageSchema);
var Route$31 = createFileRoute("/api/messages")({ server: { handlers: {
	GET: async ({ request }) => {
		try {
			const token = extractTokenFromHeader(request.headers.get("authorization") || void 0);
			if (!token || !verifyToken(token)) return Response.json({
				success: false,
				message: "Unauthorized"
			}, { status: 401 });
			await connectDB();
			const messages = await ContactMessage.find().sort({ createdAt: -1 }).lean();
			return Response.json({
				success: true,
				data: messages
			});
		} catch (error) {
			console.error("API /api/messages GET error:", error);
			return Response.json({
				success: false,
				message: "Failed to fetch messages"
			}, { status: 500 });
		}
	},
	DELETE: async ({ request }) => {
		try {
			const token = extractTokenFromHeader(request.headers.get("authorization") || void 0);
			if (!token || !verifyToken(token)) return Response.json({
				success: false,
				message: "Unauthorized"
			}, { status: 401 });
			await connectDB();
			const id = new URL(request.url).searchParams.get("id");
			if (!id) return Response.json({
				success: false,
				message: "ID required"
			}, { status: 400 });
			await ContactMessage.findByIdAndDelete(id);
			return Response.json({
				success: true,
				message: "Message deleted successfully"
			});
		} catch (error) {
			console.error("API /api/messages DELETE error:", error);
			return Response.json({
				success: false,
				message: "Failed to delete message"
			}, { status: 500 });
		}
	}
} } });
var mediaSchema = new import_mongoose.Schema({
	name: {
		type: String,
		required: true
	},
	filename: {
		type: String,
		required: true
	},
	url: {
		type: String,
		required: true
	},
	publicId: String,
	type: {
		type: String,
		enum: [
			"image",
			"video",
			"pdf",
			"document"
		],
		required: true
	},
	size: {
		type: Number,
		required: true
	},
	mimeType: {
		type: String,
		required: true
	},
	folder: {
		type: String,
		enum: [
			"logo",
			"hero",
			"portfolio",
			"gallery",
			"icon",
			"resume",
			"other"
		],
		default: "other"
	},
	tags: [String],
	altText: String,
	uploadedBy: String
}, { timestamps: true });
mediaSchema.index({
	name: "text",
	tags: "text"
});
mediaSchema.index({ folder: 1 });
var Media = import_mongoose.default.models.Media || import_mongoose.default.model("Media", mediaSchema);
import_cloudinary.v2.config({
	cloud_name: process.env.CLOUDINARY_CLOUD_NAME,
	api_key: process.env.CLOUDINARY_API_KEY,
	api_secret: process.env.CLOUDINARY_API_SECRET
});
async function uploadToCloudinary(fileBuffer, filename, options = {}) {
	return new Promise((resolve, reject) => {
		import_cloudinary.v2.uploader.upload_stream({
			resource_type: "auto",
			filename_override: filename,
			folder: options.folder || "creative-canvas-hub",
			...options
		}, (error, result) => {
			if (error) reject(error);
			else resolve(result);
		}).end(fileBuffer);
	});
}
var Route$30 = createFileRoute("/api/media")({ server: { handlers: {
	GET: async ({ request }) => {
		try {
			const token = extractTokenFromHeader(request.headers.get("authorization") || void 0);
			if (!token || !verifyToken(token)) return Response.json({
				success: false,
				message: "Unauthorized"
			}, { status: 401 });
			await connectDB();
			const items = await Media.find().sort({ createdAt: -1 }).lean();
			return Response.json({
				success: true,
				data: items
			});
		} catch (error) {
			console.error("API /api/media GET error:", error);
			return Response.json({
				success: false,
				message: "Failed to fetch media"
			}, { status: 500 });
		}
	},
	POST: async ({ request }) => {
		try {
			const token = extractTokenFromHeader(request.headers.get("authorization") || void 0);
			if (!token || !verifyToken(token)) return Response.json({
				success: false,
				message: "Unauthorized"
			}, { status: 401 });
			await connectDB();
			const { url, title, alt, data, filename } = await request.json().catch(() => ({}));
			if (data) {
				const match = String(data).match(/^data:(.+);base64,(.+)$/);
				if (!match) return Response.json({
					success: false,
					message: "Invalid data format"
				}, { status: 400 });
				const mime = match[1];
				const b64 = match[2];
				const uploadName = filename || title || `upload-${Date.now()}`;
				const type = mime.startsWith("video/") ? "video" : mime.startsWith("image/") ? "image" : "document";
				if (!!process.env.CLOUDINARY_CLOUD_NAME && !!process.env.CLOUDINARY_API_KEY && !!process.env.CLOUDINARY_API_SECRET) {
					const buffer = Buffer.from(b64, "base64");
					const result = await uploadToCloudinary(buffer, uploadName, { folder: "creative-canvas-hub/portfolio" });
					const newMedia = await Media.create({
						name: title || uploadName,
						filename: uploadName,
						url: result?.secure_url || result?.url,
						publicId: result?.public_id,
						type,
						size: result?.bytes || buffer.length,
						mimeType: mime,
						folder: "portfolio",
						altText: alt || title || "",
						tags: [type],
						uploadedBy: "admin"
					});
					return Response.json({
						success: true,
						data: newMedia,
						message: "Upload successful"
					});
				}
				const buffer = Buffer.from(b64, "base64");
				const extensionFromMime = mime.split("/")[1]?.split("+")[0] || "bin";
				const safeFilename = `${String(uploadName).replace(/\.[a-z0-9]+$/i, "").replace(/[^a-z0-9_-]+/gi, "-").replace(/^-+|-+$/g, "").slice(0, 60) || "upload"}-${randomUUID()}.${extensionFromMime}`;
				const uploadDir = path$1.join(process.cwd(), "public", "uploads");
				await mkdir(uploadDir, { recursive: true });
				await writeFile(path$1.join(uploadDir, safeFilename), buffer);
				const fallbackUrl = `/api/uploads/${encodeURIComponent(safeFilename)}`;
				const newMedia = await Media.create({
					name: title || uploadName,
					filename: safeFilename,
					url: fallbackUrl,
					publicId: `local-${Date.now()}`,
					type,
					size: buffer.length,
					mimeType: mime,
					folder: "portfolio",
					altText: alt || title || "",
					tags: [type],
					uploadedBy: "admin"
				});
				return Response.json({
					success: true,
					data: newMedia,
					message: "Upload successful"
				});
			}
			if (!url) return Response.json({
				success: false,
				message: "Media URL is required"
			}, { status: 400 });
			const parsed = parseMediaUrl(url);
			const newMedia = await Media.create({
				name: title || url.split("/").pop() || "media-item",
				filename: title || url.split("/").pop() || "media-item",
				url: parsed.streamUrl || parsed.originalUrl,
				type: parsed.type === "video" ? "video" : parsed.type === "youtube" ? "video" : "image",
				size: 0,
				mimeType: parsed.type,
				folder: "portfolio",
				altText: alt || title || "",
				tags: [parsed.type],
				uploadedBy: "admin"
			});
			return Response.json({
				success: true,
				data: newMedia,
				message: "Media added to library"
			});
		} catch (error) {
			console.error("API /api/media POST error:", error);
			return Response.json({
				success: false,
				message: "Failed to add media"
			}, { status: 500 });
		}
	},
	DELETE: async ({ request }) => {
		try {
			const token = extractTokenFromHeader(request.headers.get("authorization") || void 0);
			if (!token || !verifyToken(token)) return Response.json({
				success: false,
				message: "Unauthorized"
			}, { status: 401 });
			await connectDB();
			const id = new URL(request.url).searchParams.get("id");
			if (!id) return Response.json({
				success: false,
				message: "ID required"
			}, { status: 400 });
			await Media.findByIdAndDelete(id);
			return Response.json({
				success: true,
				message: "Media deleted"
			});
		} catch (error) {
			console.error("API /api/media DELETE error:", error);
			return Response.json({
				success: false,
				message: "Failed to delete media"
			}, { status: 500 });
		}
	}
} } });
var experienceSchema = new import_mongoose.Schema({
	company: {
		type: String,
		required: true
	},
	position: {
		type: String,
		required: true
	},
	description: {
		type: String,
		required: true
	},
	startDate: {
		type: Date,
		required: true
	},
	endDate: Date,
	currentlyWorking: {
		type: Boolean,
		default: false
	},
	companyLogo: String,
	displayOrder: {
		type: Number,
		default: 0
	}
}, { timestamps: true });
var Experience = import_mongoose.default.models.Experience || import_mongoose.default.model("Experience", experienceSchema);
var Route$29 = createFileRoute("/api/experience")({ server: { handlers: {
	GET: async () => {
		try {
			await connectDB();
			const items = await Experience.find().sort({
				displayOrder: 1,
				startDate: -1
			}).lean();
			return Response.json({
				success: true,
				data: items
			});
		} catch (error) {
			console.error("API /api/experience GET error:", error);
			return Response.json({
				success: false,
				message: "Failed to fetch experience"
			}, { status: 500 });
		}
	},
	POST: async ({ request }) => {
		try {
			const token = extractTokenFromHeader(request.headers.get("authorization") || void 0);
			if (!token || !verifyToken(token)) return Response.json({
				success: false,
				message: "Unauthorized"
			}, { status: 401 });
			await connectDB();
			const body = await request.json().catch(() => ({}));
			const item = await Experience.create(body);
			return Response.json({
				success: true,
				data: item,
				message: "Experience added"
			});
		} catch (error) {
			console.error("API /api/experience POST error:", error);
			return Response.json({
				success: false,
				message: "Failed to add experience"
			}, { status: 500 });
		}
	},
	PUT: async ({ request }) => {
		try {
			const token = extractTokenFromHeader(request.headers.get("authorization") || void 0);
			if (!token || !verifyToken(token)) return Response.json({
				success: false,
				message: "Unauthorized"
			}, { status: 401 });
			await connectDB();
			const { _id, ...updateData } = await request.json().catch(() => ({}));
			const updated = await Experience.findByIdAndUpdate(_id, { $set: updateData }, { new: true });
			return Response.json({
				success: true,
				data: updated,
				message: "Experience updated"
			});
		} catch (error) {
			console.error("API /api/experience PUT error:", error);
			return Response.json({
				success: false,
				message: "Failed to update experience"
			}, { status: 500 });
		}
	},
	DELETE: async ({ request }) => {
		try {
			const token = extractTokenFromHeader(request.headers.get("authorization") || void 0);
			if (!token || !verifyToken(token)) return Response.json({
				success: false,
				message: "Unauthorized"
			}, { status: 401 });
			await connectDB();
			const id = new URL(request.url).searchParams.get("id");
			if (!id) return Response.json({
				success: false,
				message: "ID required"
			}, { status: 400 });
			await Experience.findByIdAndDelete(id);
			return Response.json({
				success: true,
				message: "Experience deleted"
			});
		} catch (error) {
			console.error("API /api/experience DELETE error:", error);
			return Response.json({
				success: false,
				message: "Failed to delete experience"
			}, { status: 500 });
		}
	}
} } });
var educationSchema = new import_mongoose.Schema({
	institute: {
		type: String,
		required: true
	},
	degree: {
		type: String,
		required: true
	},
	description: {
		type: String,
		required: true
	},
	startDate: {
		type: Date,
		required: true
	},
	endDate: Date,
	certificate: String,
	displayOrder: {
		type: Number,
		default: 0
	}
}, { timestamps: true });
var Education = import_mongoose.default.models.Education || import_mongoose.default.model("Education", educationSchema);
var Route$28 = createFileRoute("/api/education")({ server: { handlers: {
	GET: async () => {
		try {
			await connectDB();
			const items = await Education.find().sort({
				displayOrder: 1,
				startDate: -1
			}).lean();
			return Response.json({
				success: true,
				data: items
			});
		} catch (error) {
			console.error("API /api/education GET error:", error);
			return Response.json({
				success: false,
				message: "Failed to fetch education"
			}, { status: 500 });
		}
	},
	POST: async ({ request }) => {
		try {
			const token = extractTokenFromHeader(request.headers.get("authorization") || void 0);
			if (!token || !verifyToken(token)) return Response.json({
				success: false,
				message: "Unauthorized"
			}, { status: 401 });
			await connectDB();
			const body = await request.json().catch(() => ({}));
			const item = await Education.create(body);
			return Response.json({
				success: true,
				data: item,
				message: "Education record added"
			});
		} catch (error) {
			console.error("API /api/education POST error:", error);
			return Response.json({
				success: false,
				message: "Failed to add education"
			}, { status: 500 });
		}
	},
	PUT: async ({ request }) => {
		try {
			const token = extractTokenFromHeader(request.headers.get("authorization") || void 0);
			if (!token || !verifyToken(token)) return Response.json({
				success: false,
				message: "Unauthorized"
			}, { status: 401 });
			await connectDB();
			const { _id, ...updateData } = await request.json().catch(() => ({}));
			const updated = await Education.findByIdAndUpdate(_id, { $set: updateData }, { new: true });
			return Response.json({
				success: true,
				data: updated,
				message: "Education record updated"
			});
		} catch (error) {
			console.error("API /api/education PUT error:", error);
			return Response.json({
				success: false,
				message: "Failed to update education"
			}, { status: 500 });
		}
	},
	DELETE: async ({ request }) => {
		try {
			const token = extractTokenFromHeader(request.headers.get("authorization") || void 0);
			if (!token || !verifyToken(token)) return Response.json({
				success: false,
				message: "Unauthorized"
			}, { status: 401 });
			await connectDB();
			const id = new URL(request.url).searchParams.get("id");
			if (!id) return Response.json({
				success: false,
				message: "ID required"
			}, { status: 400 });
			await Education.findByIdAndDelete(id);
			return Response.json({
				success: true,
				message: "Education record deleted"
			});
		} catch (error) {
			console.error("API /api/education DELETE error:", error);
			return Response.json({
				success: false,
				message: "Failed to delete education"
			}, { status: 500 });
		}
	}
} } });
var Route$27 = createFileRoute("/api/contact")({ server: { handlers: { POST: async ({ request }) => {
	try {
		await connectDB();
		const { name, email, subject, message } = await request.json().catch(() => ({}));
		if (!name || !email || !message) return Response.json({
			success: false,
			message: "Name, email, and message are required fields"
		}, { status: 400 });
		const newMessage = await ContactMessage.create({
			name: String(name).trim(),
			email: String(email).trim().toLowerCase(),
			subject: String(subject || "General Inquiry").trim(),
			message: String(message).trim(),
			status: "unread",
			createdAt: /* @__PURE__ */ new Date()
		});
		return Response.json({
			success: true,
			data: newMessage,
			message: "Thank you! Your message has been sent successfully."
		});
	} catch (error) {
		console.error("API /api/contact POST error:", error);
		return Response.json({
			success: false,
			message: "Failed to send message"
		}, { status: 500 });
	}
} } } });
var Route$26 = createFileRoute("/api/categories")({ server: { handlers: {
	GET: async () => {
		try {
			await connectDB();
			const categories = await Category.find().sort({ displayOrder: 1 }).lean();
			return Response.json({
				success: true,
				data: categories
			});
		} catch (error) {
			console.error("API /api/categories GET error:", error);
			return Response.json({
				success: false,
				message: "Failed to fetch categories"
			}, { status: 500 });
		}
	},
	POST: async ({ request }) => {
		try {
			const token = extractTokenFromHeader(request.headers.get("authorization") || void 0);
			if (!token || !verifyToken(token)) return Response.json({
				success: false,
				message: "Unauthorized"
			}, { status: 401 });
			await connectDB();
			const body = await request.json().catch(() => ({}));
			if (!body.name) return Response.json({
				success: false,
				message: "Category name is required"
			}, { status: 400 });
			const category = await Category.create(body);
			return Response.json({
				success: true,
				data: category,
				message: "Category created successfully"
			});
		} catch (error) {
			console.error("API /api/categories POST error:", error);
			return Response.json({
				success: false,
				message: "Failed to create category"
			}, { status: 500 });
		}
	}
} } });
var $$splitComponentImporter$11 = () => import("./login-J9uX_nqM.mjs");
var Route$25 = createFileRoute("/admin/login")({ component: lazyRouteComponent($$splitComponentImporter$11, "component") });
var $$splitComponentImporter$10 = () => import("./google-callback-CyCEShUU.mjs");
var Route$24 = createFileRoute("/admin/google-callback")({ component: lazyRouteComponent($$splitComponentImporter$10, "component") });
var $$splitComponentImporter$9 = () => import("../_layout-Bt0Mz52m.mjs");
var Route$23 = createFileRoute("/admin/_layout")({ component: lazyRouteComponent($$splitComponentImporter$9, "component") });
var $$splitComponentImporter$8 = () => import("../_layout-BgQGoHS6.mjs");
var Route$22 = createFileRoute("/admin/_layout/")({ component: lazyRouteComponent($$splitComponentImporter$8, "component") });
var contentTypes = {
	".avif": "image/avif",
	".gif": "image/gif",
	".jpeg": "image/jpeg",
	".jpg": "image/jpeg",
	".png": "image/png",
	".webp": "image/webp"
};
var Route$21 = createFileRoute("/api/uploads/$filename")({ server: { handlers: { GET: async ({ params }) => {
	try {
		const filename = path$1.basename(decodeURIComponent(params.filename));
		const file = await readFile(path$1.join(process.cwd(), "public", "uploads", filename));
		const ext = path$1.extname(filename).toLowerCase();
		return new Response(file, { headers: {
			"Cache-Control": "public, max-age=31536000, immutable",
			"Content-Type": contentTypes[ext] || "application/octet-stream"
		} });
	} catch {
		return Response.json({
			success: false,
			message: "Upload not found"
		}, { status: 404 });
	}
} } } });
var Route$20 = createFileRoute("/api/skills/id")({ server: { handlers: {
	GET: async ({ params }) => {
		try {
			await connectDB();
			const skill = await Skill.findById(params.id).lean();
			if (!skill) return Response.json({
				success: false,
				message: "Skill not found"
			}, { status: 404 });
			return Response.json({
				success: true,
				data: skill
			});
		} catch (error) {
			console.error("API /api/skills/[id] GET error:", error);
			return Response.json({
				success: false,
				message: "Failed to fetch skill"
			}, { status: 500 });
		}
	},
	PUT: async ({ request, params }) => {
		try {
			const token = extractTokenFromHeader(request.headers.get("authorization") || void 0);
			if (!token || !verifyToken(token)) return Response.json({
				success: false,
				message: "Unauthorized"
			}, { status: 401 });
			await connectDB();
			const body = await request.json().catch(() => ({}));
			const updated = await Skill.findByIdAndUpdate(params.id, { $set: body }, { new: true });
			if (!updated) return Response.json({
				success: false,
				message: "Skill not found"
			}, { status: 404 });
			return Response.json({
				success: true,
				data: updated,
				message: "Skill updated successfully"
			});
		} catch (error) {
			console.error("API /api/skills/[id] PUT error:", error);
			return Response.json({
				success: false,
				message: "Failed to update skill"
			}, { status: 500 });
		}
	},
	DELETE: async ({ request, params }) => {
		try {
			const token = extractTokenFromHeader(request.headers.get("authorization") || void 0);
			if (!token || !verifyToken(token)) return Response.json({
				success: false,
				message: "Unauthorized"
			}, { status: 401 });
			await connectDB();
			if (!await Skill.findByIdAndDelete(params.id)) return Response.json({
				success: false,
				message: "Skill not found"
			}, { status: 404 });
			return Response.json({
				success: true,
				message: "Skill deleted successfully"
			});
		} catch (error) {
			console.error("API /api/skills/[id] DELETE error:", error);
			return Response.json({
				success: false,
				message: "Failed to delete skill"
			}, { status: 500 });
		}
	}
} } });
var Route$19 = createFileRoute("/api/skills/$id")({ server: { handlers: {
	GET: async ({ params }) => {
		try {
			await connectDB();
			const skill = await Skill.findById(params.id).lean();
			if (!skill) return Response.json({
				success: false,
				message: "Skill not found"
			}, { status: 404 });
			return Response.json({
				success: true,
				data: skill
			});
		} catch (error) {
			console.error("API /api/skills/$id GET error:", error);
			return Response.json({
				success: false,
				message: "Failed to fetch skill"
			}, { status: 500 });
		}
	},
	PUT: async ({ request, params }) => {
		try {
			const token = extractTokenFromHeader(request.headers.get("authorization") || void 0);
			if (!token || !verifyToken(token)) return Response.json({
				success: false,
				message: "Unauthorized"
			}, { status: 401 });
			await connectDB();
			const body = await request.json().catch(() => ({}));
			const updated = await Skill.findByIdAndUpdate(params.id, { $set: body }, { new: true });
			if (!updated) return Response.json({
				success: false,
				message: "Skill not found"
			}, { status: 404 });
			return Response.json({
				success: true,
				data: updated,
				message: "Skill updated successfully"
			});
		} catch (error) {
			console.error("API /api/skills/$id PUT error:", error);
			return Response.json({
				success: false,
				message: "Failed to update skill"
			}, { status: 500 });
		}
	},
	DELETE: async ({ request, params }) => {
		try {
			const token = extractTokenFromHeader(request.headers.get("authorization") || void 0);
			if (!token || !verifyToken(token)) return Response.json({
				success: false,
				message: "Unauthorized"
			}, { status: 401 });
			await connectDB();
			if (!await Skill.findByIdAndDelete(params.id)) return Response.json({
				success: false,
				message: "Skill not found"
			}, { status: 404 });
			return Response.json({
				success: true,
				message: "Skill deleted successfully"
			});
		} catch (error) {
			console.error("API /api/skills/$id DELETE error:", error);
			return Response.json({
				success: false,
				message: "Failed to delete skill"
			}, { status: 500 });
		}
	}
} } });
var Route$18 = createFileRoute("/api/projects/$id")({ server: { handlers: {
	GET: async ({ params }) => {
		try {
			await connectDB();
			const project = await Project.findById(params.id).lean();
			if (!project) return Response.json({
				success: false,
				message: "Project not found"
			}, { status: 404 });
			const driveMedia = project.googleDriveLink ? parseMediaUrl(project.googleDriveLink) : null;
			const youtubeMedia = project.youtubeLink ? parseMediaUrl(project.youtubeLink) : null;
			return Response.json({
				success: true,
				data: {
					...project,
					mediaInfo: {
						googleDriveEmbed: driveMedia?.embedUrl || "",
						googleDriveStream: driveMedia?.streamUrl || "",
						youtubeEmbed: youtubeMedia?.embedUrl || "",
						youtubeStream: youtubeMedia?.streamUrl || ""
					}
				}
			});
		} catch (error) {
			console.error("API /api/projects/$id GET error:", error);
			return Response.json({
				success: false,
				message: "Failed to fetch project"
			}, { status: 500 });
		}
	},
	PUT: async ({ params, request }) => {
		try {
			const token = extractTokenFromHeader(request.headers.get("authorization") || void 0);
			if (!token || !verifyToken(token)) return Response.json({
				success: false,
				message: "Unauthorized"
			}, { status: 401 });
			await connectDB();
			const body = await request.json().catch(() => ({}));
			const updated = await Project.findByIdAndUpdate(params.id, { $set: body }, { new: true });
			if (!updated) return Response.json({
				success: false,
				message: "Project not found"
			}, { status: 404 });
			return Response.json({
				success: true,
				data: updated,
				message: "Project updated successfully"
			});
		} catch (error) {
			console.error("API /api/projects/$id PUT error:", error);
			return Response.json({
				success: false,
				message: "Failed to update project"
			}, { status: 500 });
		}
	},
	DELETE: async ({ params, request }) => {
		try {
			const token = extractTokenFromHeader(request.headers.get("authorization") || void 0);
			if (!token || !verifyToken(token)) return Response.json({
				success: false,
				message: "Unauthorized"
			}, { status: 401 });
			await connectDB();
			if (!await Project.findByIdAndDelete(params.id)) return Response.json({
				success: false,
				message: "Project not found"
			}, { status: 404 });
			return Response.json({
				success: true,
				message: "Project deleted successfully"
			});
		} catch (error) {
			console.error("API /api/projects/$id DELETE error:", error);
			return Response.json({
				success: false,
				message: "Failed to delete project"
			}, { status: 500 });
		}
	}
} } });
var Route$17 = createFileRoute("/api/categories/$id")({ server: { handlers: {
	GET: async ({ params }) => {
		try {
			await connectDB();
			const category = await Category.findById(params.id).lean();
			if (!category) return Response.json({
				success: false,
				message: "Category not found"
			}, { status: 404 });
			return Response.json({
				success: true,
				data: category
			});
		} catch (error) {
			console.error("API /api/categories/$id GET error:", error);
			return Response.json({
				success: false,
				message: "Failed to fetch category"
			}, { status: 500 });
		}
	},
	PUT: async ({ params, request }) => {
		try {
			const token = extractTokenFromHeader(request.headers.get("authorization") || void 0);
			if (!token || !verifyToken(token)) return Response.json({
				success: false,
				message: "Unauthorized"
			}, { status: 401 });
			await connectDB();
			const body = await request.json().catch(() => ({}));
			const updated = await Category.findByIdAndUpdate(params.id, { $set: body }, { new: true });
			if (!updated) return Response.json({
				success: false,
				message: "Category not found"
			}, { status: 404 });
			return Response.json({
				success: true,
				data: updated,
				message: "Category updated successfully"
			});
		} catch (error) {
			console.error("API /api/categories/$id PUT error:", error);
			return Response.json({
				success: false,
				message: "Failed to update category"
			}, { status: 500 });
		}
	},
	DELETE: async ({ params, request }) => {
		try {
			const token = extractTokenFromHeader(request.headers.get("authorization") || void 0);
			if (!token || !verifyToken(token)) return Response.json({
				success: false,
				message: "Unauthorized"
			}, { status: 401 });
			await connectDB();
			if (!await Category.findByIdAndDelete(params.id)) return Response.json({
				success: false,
				message: "Category not found"
			}, { status: 404 });
			return Response.json({
				success: true,
				message: "Category deleted successfully"
			});
		} catch (error) {
			console.error("API /api/categories/$id DELETE error:", error);
			return Response.json({
				success: false,
				message: "Failed to delete category"
			}, { status: 500 });
		}
	}
} } });
var userSchema = new import_mongoose.Schema({
	email: {
		type: String,
		required: true,
		unique: true,
		lowercase: true
	},
	googleId: {
		type: String,
		unique: true,
		sparse: true
	},
	passwordHash: String,
	name: {
		type: String,
		required: true
	},
	picture: String,
	lastLogin: {
		type: Date,
		default: Date.now
	}
}, { timestamps: true });
var User$1 = import_mongoose.default.models.User || import_mongoose.default.model("User", userSchema);
var DEFAULT_ADMIN_EMAIL = "merajhossain.mcu@gmail.com";
var DEFAULT_ADMIN_PASSWORD = "Admin@123";
function getAllowedAdminEmails() {
	return [DEFAULT_ADMIN_EMAIL];
}
function isAuthorizedAdminEmail(email) {
	if (!email) return false;
	return getAllowedAdminEmails().includes(email.trim().toLowerCase());
}
var Route$16 = createFileRoute("/api/auth/signup")({ server: { handlers: { POST: async ({ request }) => {
	try {
		await connectDB();
		const body = await request.json().catch(() => ({}));
		const name = String(body.name || "").trim();
		const email = String(body.email || "").trim().toLowerCase();
		const password = String(body.password || "");
		if (!name || !email || !password) return Response.json({
			success: false,
			message: "Name, email, and password are required"
		}, { status: 400 });
		if (password.length < 6) return Response.json({
			success: false,
			message: "Password must be at least 6 characters long"
		}, { status: 400 });
		if (!isAuthorizedAdminEmail(email)) return Response.json({
			success: false,
			message: "Only the authorized admin email can create an admin account."
		}, { status: 403 });
		if (await User$1.findOne({ email })) return Response.json({
			success: false,
			message: "An account with this email already exists."
		}, { status: 409 });
		const passwordHash = await import_bcryptjs.default.hash(password, 10);
		const user = await User$1.create({
			name,
			email,
			passwordHash,
			lastLogin: /* @__PURE__ */ new Date()
		});
		const token = generateToken({
			id: user._id.toString(),
			email: user.email
		});
		return Response.json({
			success: true,
			token,
			user: {
				id: user._id,
				email: user.email,
				name: user.name,
				picture: user.picture || ""
			}
		});
	} catch (error) {
		console.error("Signup error:", error);
		return Response.json({
			success: false,
			message: "Signup failed"
		}, { status: 500 });
	}
} } } });
var Route$15 = createFileRoute("/api/auth/login")({ server: { handlers: { POST: async ({ request }) => {
	try {
		await connectDB();
		const body = await request.json().catch(() => ({}));
		const email = String(body.email || "").trim().toLowerCase();
		const password = String(body.password || "");
		if (!email || !password) return Response.json({
			success: false,
			message: "Email and password are required"
		}, { status: 400 });
		if (!getAllowedAdminEmails().includes(email)) return Response.json({
			success: false,
			message: "Access Denied. This email is not authorized to access the admin panel."
		}, { status: 403 });
		const defaultEmailMatch = email === DEFAULT_ADMIN_EMAIL;
		const defaultPasswordMatch = password === DEFAULT_ADMIN_PASSWORD;
		const envEmail = process.env.ADMIN_EMAIL?.trim().toLowerCase() || process.env.VITE_ADMIN_EMAIL?.trim().toLowerCase();
		const envPassword = process.env.ADMIN_PASSWORD || process.env.VITE_ADMIN_PASS || "";
		const envPasswordValid = envEmail === email && !!envPassword && password === envPassword;
		if (defaultEmailMatch && defaultPasswordMatch) {
			let user = await User$1.findOne({ email });
			if (!user) user = await User$1.create({
				email,
				name: "Demo Admin",
				passwordHash: await import_bcryptjs.default.hash(DEFAULT_ADMIN_PASSWORD, 10),
				lastLogin: /* @__PURE__ */ new Date()
			});
			const token = generateToken({
				id: user._id.toString(),
				email: user.email
			});
			return Response.json({
				success: true,
				token,
				user: {
					id: user._id,
					email: user.email,
					name: user.name || "Demo Admin",
					picture: user.picture
				}
			});
		}
		if (envPasswordValid) {
			const token = generateToken({
				id: "admin-env",
				email
			});
			return Response.json({
				success: true,
				token,
				user: {
					id: "admin-env",
					email,
					name: process.env.ADMIN_NAME || "Admin",
					picture: process.env.ADMIN_PICTURE || ""
				}
			});
		}
		const user = await User$1.findOne({ email });
		if (!user || !user.passwordHash) return Response.json({
			success: false,
			message: "Invalid email or password"
		}, { status: 401 });
		if (!await import_bcryptjs.default.compare(password, user.passwordHash)) return Response.json({
			success: false,
			message: "Invalid email or password"
		}, { status: 401 });
		user.lastLogin = /* @__PURE__ */ new Date();
		await user.save();
		const token = generateToken({
			id: user._id.toString(),
			email: user.email
		});
		return Response.json({
			success: true,
			token,
			user: {
				id: user._id,
				email: user.email,
				name: user.name,
				picture: user.picture
			}
		});
	} catch (error) {
		console.error("Login error:", error);
		return Response.json({
			success: false,
			message: "Login failed"
		}, { status: 500 });
	}
} } } });
var Route$14 = createFileRoute("/api/auth/check")({ server: { handlers: { GET: async ({ request }) => {
	const token = extractTokenFromHeader(request.headers.get("authorization") || void 0);
	if (!token) return Response.json({
		success: false,
		message: "Unauthorized - No token provided"
	}, { status: 401 });
	const payload = verifyToken(token);
	const allowedEmails = getAllowedAdminEmails().map((email) => email.trim().toLowerCase());
	if (!payload || !allowedEmails.includes(payload.email.trim().toLowerCase())) return Response.json({
		success: false,
		message: "Unauthorized - Invalid token"
	}, { status: 401 });
	return Response.json({
		success: true,
		user: {
			id: payload.id,
			email: payload.email
		}
	});
} } } });
var $$splitComponentImporter$7 = () => import("./testimonials-DOajkZCB.mjs");
var Route$13 = createFileRoute("/admin/_layout/testimonials")({ component: lazyRouteComponent($$splitComponentImporter$7, "component") });
var $$splitComponentImporter$6 = () => import("./skills-CUWvQgLj.mjs");
var Route$12 = createFileRoute("/admin/_layout/skills")({ component: lazyRouteComponent($$splitComponentImporter$6, "component") });
var $$splitComponentImporter$5 = () => import("./settings-CLBLMCPR.mjs");
var Route$11 = createFileRoute("/admin/_layout/settings")({ component: lazyRouteComponent($$splitComponentImporter$5, "component") });
var _jsxFileName$5 = "E:/Web/creative-canvas-hub-main/creative-canvas-hub-main/src/routes/admin/_layout/services.tsx";
var Route$10 = createFileRoute("/admin/_layout/services")({ component: AdminServices });
function AdminServices() {
	const [token] = useLocalStorage("admin_token", "");
	const [services, setServices] = (0, import_react.useState)([]);
	const [isLoading, setIsLoading] = (0, import_react.useState)(true);
	const [editingId, setEditingId] = (0, import_react.useState)(null);
	const [form, setForm] = (0, import_react.useState)({
		number: "01",
		title: "",
		description: "",
		icon: "Palette",
		displayOrder: 1,
		active: true
	});
	const fetchServices = async () => {
		try {
			const json = await (await fetch("/api/services")).json();
			if (json.success) setServices(json.data || []);
		} catch (e) {
			console.error(e);
		} finally {
			setIsLoading(false);
		}
	};
	(0, import_react.useEffect)(() => {
		fetchServices();
	}, []);
	const handleSave = async (e) => {
		e.preventDefault();
		try {
			const url = "/api/services";
			const method = editingId ? "PUT" : "POST";
			const body = editingId ? {
				_id: editingId,
				...form
			} : form;
			await fetchWithAuth(token, url, {
				method,
				body: JSON.stringify(body)
			});
			setForm({
				number: `0${services.length + 1}`,
				title: "",
				description: "",
				icon: "Palette",
				displayOrder: services.length + 1,
				active: true
			});
			setEditingId(null);
			fetchServices();
		} catch (e) {
			console.error(e);
		}
	};
	const handleDelete = async (id) => {
		if (!confirm("Are you sure you want to delete this service?")) return;
		try {
			await fetchWithAuth(token, `/api/services?id=${id}`, { method: "DELETE" });
			fetchServices();
		} catch (e) {
			console.error(e);
		}
	};
	const handleEdit = (s) => {
		setEditingId(s._id);
		setForm({
			number: s.number || "01",
			title: s.title || "",
			description: s.description || "",
			icon: s.icon || "Palette",
			displayOrder: s.displayOrder || 1,
			active: s.active !== false
		});
	};
	return /* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)("div", {
		className: "space-y-8",
		children: [/* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)("div", { children: [/* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)("h1", {
			className: "text-3xl font-bold text-white mb-2",
			children: "Services Management"
		}, void 0, false, {
			fileName: _jsxFileName$5,
			lineNumber: 89,
			columnNumber: 9
		}, this), /* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)("p", {
			className: "text-gray-400",
			children: "Manage the services displayed on your website"
		}, void 0, false, {
			fileName: _jsxFileName$5,
			lineNumber: 90,
			columnNumber: 9
		}, this)] }, void 0, true, {
			fileName: _jsxFileName$5,
			lineNumber: 88,
			columnNumber: 7
		}, this), /* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)("div", {
			className: "grid md:grid-cols-12 gap-8",
			children: [/* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)("form", {
				onSubmit: handleSave,
				className: "md:col-span-5 bg-gray-950 border border-gray-800 rounded-lg p-6 space-y-4",
				children: [
					/* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)("h2", {
						className: "text-xl font-bold text-white mb-4",
						children: editingId ? "Edit Service" : "Add New Service"
					}, void 0, false, {
						fileName: _jsxFileName$5,
						lineNumber: 98,
						columnNumber: 11
					}, this),
					/* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)("div", { children: [/* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)("label", {
						className: "block text-xs uppercase tracking-widest text-gray-400 mb-1",
						children: "Number / Code"
					}, void 0, false, {
						fileName: _jsxFileName$5,
						lineNumber: 103,
						columnNumber: 13
					}, this), /* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)("input", {
						type: "text",
						required: true,
						value: form.number,
						onChange: (e) => setForm({
							...form,
							number: e.target.value
						}),
						className: "w-full rounded bg-black border border-gray-800 px-3 py-2 text-white outline-none focus:border-white",
						placeholder: "01"
					}, void 0, false, {
						fileName: _jsxFileName$5,
						lineNumber: 106,
						columnNumber: 13
					}, this)] }, void 0, true, {
						fileName: _jsxFileName$5,
						lineNumber: 102,
						columnNumber: 11
					}, this),
					/* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)("div", { children: [/* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)("label", {
						className: "block text-xs uppercase tracking-widest text-gray-400 mb-1",
						children: "Service Title"
					}, void 0, false, {
						fileName: _jsxFileName$5,
						lineNumber: 117,
						columnNumber: 13
					}, this), /* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)("input", {
						type: "text",
						required: true,
						value: form.title,
						onChange: (e) => setForm({
							...form,
							title: e.target.value
						}),
						className: "w-full rounded bg-black border border-gray-800 px-3 py-2 text-white outline-none focus:border-white",
						placeholder: "e.g. Graphic Design"
					}, void 0, false, {
						fileName: _jsxFileName$5,
						lineNumber: 120,
						columnNumber: 13
					}, this)] }, void 0, true, {
						fileName: _jsxFileName$5,
						lineNumber: 116,
						columnNumber: 11
					}, this),
					/* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)("div", { children: [/* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)("label", {
						className: "block text-xs uppercase tracking-widest text-gray-400 mb-1",
						children: "Description"
					}, void 0, false, {
						fileName: _jsxFileName$5,
						lineNumber: 131,
						columnNumber: 13
					}, this), /* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)("textarea", {
						rows: 3,
						required: true,
						value: form.description,
						onChange: (e) => setForm({
							...form,
							description: e.target.value
						}),
						className: "w-full rounded bg-black border border-gray-800 px-3 py-2 text-white outline-none focus:border-white resize-none",
						placeholder: "Brief service description..."
					}, void 0, false, {
						fileName: _jsxFileName$5,
						lineNumber: 134,
						columnNumber: 13
					}, this)] }, void 0, true, {
						fileName: _jsxFileName$5,
						lineNumber: 130,
						columnNumber: 11
					}, this),
					/* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)("div", {
						className: "flex gap-4",
						children: /* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)("div", {
							className: "flex-1",
							children: [/* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)("label", {
								className: "block text-xs uppercase tracking-widest text-gray-400 mb-1",
								children: "Order"
							}, void 0, false, {
								fileName: _jsxFileName$5,
								lineNumber: 146,
								columnNumber: 15
							}, this), /* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)("input", {
								type: "number",
								value: form.displayOrder,
								onChange: (e) => setForm({
									...form,
									displayOrder: Number(e.target.value)
								}),
								className: "w-full rounded bg-black border border-gray-800 px-3 py-2 text-white outline-none focus:border-white"
							}, void 0, false, {
								fileName: _jsxFileName$5,
								lineNumber: 149,
								columnNumber: 15
							}, this)]
						}, void 0, true, {
							fileName: _jsxFileName$5,
							lineNumber: 145,
							columnNumber: 13
						}, this)
					}, void 0, false, {
						fileName: _jsxFileName$5,
						lineNumber: 144,
						columnNumber: 11
					}, this),
					/* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)("div", {
						className: "flex gap-2 pt-2",
						children: [/* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)("button", {
							type: "submit",
							className: "flex-1 btn-primary text-white font-semibold py-2 rounded transition-all flex items-center justify-center gap-2",
							children: [/* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)(Plus, { size: 16 }, void 0, false, {
								fileName: _jsxFileName$5,
								lineNumber: 163,
								columnNumber: 15
							}, this), editingId ? "Update Service" : "Add Service"]
						}, void 0, true, {
							fileName: _jsxFileName$5,
							lineNumber: 159,
							columnNumber: 13
						}, this), editingId && /* @__PURE__ */ (void 0)("button", {
							type: "button",
							onClick: () => {
								setEditingId(null);
								setForm({
									number: "01",
									title: "",
									description: "",
									icon: "Palette",
									displayOrder: 1,
									active: true
								});
							},
							className: "px-4 py-2 border border-gray-800 rounded text-gray-400 hover:text-white",
							children: "Cancel"
						}, void 0, false, {
							fileName: _jsxFileName$5,
							lineNumber: 167,
							columnNumber: 15
						}, this)]
					}, void 0, true, {
						fileName: _jsxFileName$5,
						lineNumber: 158,
						columnNumber: 11
					}, this)
				]
			}, void 0, true, {
				fileName: _jsxFileName$5,
				lineNumber: 94,
				columnNumber: 9
			}, this), /* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)("div", {
				className: "md:col-span-7 bg-gray-950 border border-gray-800 rounded-lg p-6",
				children: [/* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)("h2", {
					className: "text-xl font-bold text-white mb-4",
					children: "Existing Services"
				}, void 0, false, {
					fileName: _jsxFileName$5,
					lineNumber: 189,
					columnNumber: 11
				}, this), isLoading ? /* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)("p", {
					className: "text-gray-400",
					children: "Loading services..."
				}, void 0, false, {
					fileName: _jsxFileName$5,
					lineNumber: 191,
					columnNumber: 13
				}, this) : services.length === 0 ? /* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)("p", {
					className: "text-gray-500",
					children: "No services found. Add your first service on the left."
				}, void 0, false, {
					fileName: _jsxFileName$5,
					lineNumber: 193,
					columnNumber: 13
				}, this) : /* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)("div", {
					className: "space-y-3",
					children: services.map((s) => /* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)("div", {
						className: "flex items-center justify-between p-4 bg-black border border-gray-800 rounded-lg",
						children: [/* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)("div", { children: [/* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)("div", {
							className: "flex items-center gap-2",
							children: [/* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)("span", {
								className: "font-mono text-xs text-[var(--primary)] font-bold",
								children: s.number
							}, void 0, false, {
								fileName: _jsxFileName$5,
								lineNumber: 203,
								columnNumber: 23
							}, this), /* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)("h3", {
								className: "font-semibold text-white",
								children: s.title
							}, void 0, false, {
								fileName: _jsxFileName$5,
								lineNumber: 206,
								columnNumber: 23
							}, this)]
						}, void 0, true, {
							fileName: _jsxFileName$5,
							lineNumber: 202,
							columnNumber: 21
						}, this), /* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)("p", {
							className: "text-xs text-gray-400 mt-1 line-clamp-1",
							children: s.description
						}, void 0, false, {
							fileName: _jsxFileName$5,
							lineNumber: 208,
							columnNumber: 21
						}, this)] }, void 0, true, {
							fileName: _jsxFileName$5,
							lineNumber: 201,
							columnNumber: 19
						}, this), /* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)("div", {
							className: "flex items-center gap-2",
							children: [/* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)("button", {
								onClick: () => handleEdit(s),
								className: "p-2 text-gray-400 hover:text-white",
								children: /* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)(Pen, { size: 16 }, void 0, false, {
									fileName: _jsxFileName$5,
									lineNumber: 215,
									columnNumber: 23
								}, this)
							}, void 0, false, {
								fileName: _jsxFileName$5,
								lineNumber: 211,
								columnNumber: 21
							}, this), /* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)("button", {
								onClick: () => handleDelete(s._id),
								className: "p-2 text-red-400 hover:text-red-300",
								children: /* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)(Trash2, { size: 16 }, void 0, false, {
									fileName: _jsxFileName$5,
									lineNumber: 221,
									columnNumber: 23
								}, this)
							}, void 0, false, {
								fileName: _jsxFileName$5,
								lineNumber: 217,
								columnNumber: 21
							}, this)]
						}, void 0, true, {
							fileName: _jsxFileName$5,
							lineNumber: 210,
							columnNumber: 19
						}, this)]
					}, s._id, true, {
						fileName: _jsxFileName$5,
						lineNumber: 197,
						columnNumber: 17
					}, this))
				}, void 0, false, {
					fileName: _jsxFileName$5,
					lineNumber: 195,
					columnNumber: 13
				}, this)]
			}, void 0, true, {
				fileName: _jsxFileName$5,
				lineNumber: 188,
				columnNumber: 9
			}, this)]
		}, void 0, true, {
			fileName: _jsxFileName$5,
			lineNumber: 93,
			columnNumber: 7
		}, this)]
	}, void 0, true, {
		fileName: _jsxFileName$5,
		lineNumber: 87,
		columnNumber: 5
	}, this);
}
var _jsxFileName$4 = "E:/Web/creative-canvas-hub-main/creative-canvas-hub-main/src/routes/admin/_layout/seo.tsx";
var Route$9 = createFileRoute("/admin/_layout/seo")({ component: AdminSEO });
function AdminSEO() {
	const [token] = useLocalStorage("admin_token", "");
	const [isSubmitting, setIsSubmitting] = (0, import_react.useState)(false);
	const [message, setMessage] = (0, import_react.useState)("");
	const [isError, setIsError] = (0, import_react.useState)(false);
	const [form, setForm] = (0, import_react.useState)({
		homepageTitle: "",
		metaTitle: "",
		metaDescription: "",
		keywords: "",
		canonicalUrl: "",
		ogImage: "",
		twitterCard: "summary_large_image",
		robots: "index, follow"
	});
	(0, import_react.useEffect)(() => {
		const fetchSEO = async () => {
			try {
				const json = await (await fetch("/api/settings")).json();
				if (json.success && json.data?.seo) {
					const seo = json.data.seo;
					setForm({
						homepageTitle: seo.homepageTitle || "",
						metaTitle: seo.metaTitle || "",
						metaDescription: seo.metaDescription || "",
						keywords: Array.isArray(seo.keywords) ? seo.keywords.join(", ") : "",
						canonicalUrl: seo.canonicalUrl || "",
						ogImage: seo.ogImage || "",
						twitterCard: seo.twitterCard || "summary_large_image",
						robots: seo.robots || "index, follow"
					});
				}
			} catch (e) {
				console.error(e);
			}
		};
		fetchSEO();
	}, []);
	const handleSubmit = async (e) => {
		e.preventDefault();
		setIsSubmitting(true);
		setMessage("");
		try {
			const keywordsArray = form.keywords.split(",").map((k) => k.trim()).filter((k) => k.length > 0);
			await fetchWithAuth(token, "/api/settings", {
				method: "PUT",
				body: JSON.stringify({ seo: {
					...form,
					keywords: keywordsArray
				} })
			});
			setIsError(false);
			setMessage("SEO settings saved successfully!");
		} catch {
			setIsError(true);
			setMessage("Network error. Please try again.");
		} finally {
			setIsSubmitting(false);
		}
	};
	return /* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)("div", {
		className: "space-y-8 max-w-4xl",
		children: [/* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)("div", { children: [/* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)("h1", {
			className: "text-3xl font-bold text-white mb-2",
			children: "SEO Settings"
		}, void 0, false, {
			fileName: _jsxFileName$4,
			lineNumber: 78,
			columnNumber: 9
		}, this), /* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)("p", {
			className: "text-gray-400",
			children: "Configure search engine optimization meta tags and search presence"
		}, void 0, false, {
			fileName: _jsxFileName$4,
			lineNumber: 79,
			columnNumber: 9
		}, this)] }, void 0, true, {
			fileName: _jsxFileName$4,
			lineNumber: 77,
			columnNumber: 7
		}, this), /* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)("form", {
			onSubmit: handleSubmit,
			className: "bg-gray-950 border border-gray-800 rounded-lg p-6 space-y-6",
			children: [
				/* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)("div", {
					className: "grid md:grid-cols-2 gap-6",
					children: [/* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)("div", {
						className: "space-y-2",
						children: [/* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)("label", {
							className: "block text-xs uppercase tracking-widest text-gray-400",
							children: "Homepage browser Title"
						}, void 0, false, {
							fileName: _jsxFileName$4,
							lineNumber: 90,
							columnNumber: 13
						}, this), /* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)("input", {
							type: "text",
							value: form.homepageTitle,
							onChange: (e) => setForm({
								...form,
								homepageTitle: e.target.value
							}),
							className: "w-full rounded bg-black border border-gray-800 px-3 py-2 text-white outline-none focus:border-white text-sm",
							placeholder: "e.g. Meraj Hossain — Graphics & Motion Designer"
						}, void 0, false, {
							fileName: _jsxFileName$4,
							lineNumber: 93,
							columnNumber: 13
						}, this)]
					}, void 0, true, {
						fileName: _jsxFileName$4,
						lineNumber: 89,
						columnNumber: 11
					}, this), /* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)("div", {
						className: "space-y-2",
						children: [/* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)("label", {
							className: "block text-xs uppercase tracking-widest text-gray-400",
							children: "Meta Title"
						}, void 0, false, {
							fileName: _jsxFileName$4,
							lineNumber: 103,
							columnNumber: 13
						}, this), /* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)("input", {
							type: "text",
							value: form.metaTitle,
							onChange: (e) => setForm({
								...form,
								metaTitle: e.target.value
							}),
							className: "w-full rounded bg-black border border-gray-800 px-3 py-2 text-white outline-none focus:border-white text-sm",
							placeholder: "e.g. Meraj Hossain Portfolio"
						}, void 0, false, {
							fileName: _jsxFileName$4,
							lineNumber: 106,
							columnNumber: 13
						}, this)]
					}, void 0, true, {
						fileName: _jsxFileName$4,
						lineNumber: 102,
						columnNumber: 11
					}, this)]
				}, void 0, true, {
					fileName: _jsxFileName$4,
					lineNumber: 88,
					columnNumber: 9
				}, this),
				/* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)("div", {
					className: "space-y-2",
					children: [/* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)("label", {
						className: "block text-xs uppercase tracking-widest text-gray-400",
						children: "Meta Description"
					}, void 0, false, {
						fileName: _jsxFileName$4,
						lineNumber: 117,
						columnNumber: 11
					}, this), /* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)("textarea", {
						rows: 3,
						value: form.metaDescription,
						onChange: (e) => setForm({
							...form,
							metaDescription: e.target.value
						}),
						className: "w-full rounded bg-black border border-gray-800 px-3 py-2 text-white outline-none focus:border-white text-sm resize-none",
						placeholder: "A short summary of your portfolio for search engine snippets..."
					}, void 0, false, {
						fileName: _jsxFileName$4,
						lineNumber: 120,
						columnNumber: 11
					}, this)]
				}, void 0, true, {
					fileName: _jsxFileName$4,
					lineNumber: 116,
					columnNumber: 9
				}, this),
				/* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)("div", {
					className: "space-y-2",
					children: [/* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)("label", {
						className: "block text-xs uppercase tracking-widest text-gray-400",
						children: "Keywords (Comma-separated)"
					}, void 0, false, {
						fileName: _jsxFileName$4,
						lineNumber: 130,
						columnNumber: 11
					}, this), /* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)("input", {
						type: "text",
						value: form.keywords,
						onChange: (e) => setForm({
							...form,
							keywords: e.target.value
						}),
						className: "w-full rounded bg-black border border-gray-800 px-3 py-2 text-white outline-none focus:border-white text-sm",
						placeholder: "e.g. graphics design, video editing, motion graphics, portfolio"
					}, void 0, false, {
						fileName: _jsxFileName$4,
						lineNumber: 133,
						columnNumber: 11
					}, this)]
				}, void 0, true, {
					fileName: _jsxFileName$4,
					lineNumber: 129,
					columnNumber: 9
				}, this),
				/* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)("div", {
					className: "grid md:grid-cols-2 gap-6",
					children: [/* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)("div", {
						className: "space-y-2",
						children: [/* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)("label", {
							className: "block text-xs uppercase tracking-widest text-gray-400",
							children: "Canonical URL"
						}, void 0, false, {
							fileName: _jsxFileName$4,
							lineNumber: 144,
							columnNumber: 13
						}, this), /* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)("input", {
							type: "url",
							value: form.canonicalUrl,
							onChange: (e) => setForm({
								...form,
								canonicalUrl: e.target.value
							}),
							className: "w-full rounded bg-black border border-gray-800 px-3 py-2 text-white outline-none focus:border-white text-sm",
							placeholder: "https://merajhossain.com"
						}, void 0, false, {
							fileName: _jsxFileName$4,
							lineNumber: 147,
							columnNumber: 13
						}, this)]
					}, void 0, true, {
						fileName: _jsxFileName$4,
						lineNumber: 143,
						columnNumber: 11
					}, this), /* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)("div", {
						className: "space-y-2",
						children: [/* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)("label", {
							className: "block text-xs uppercase tracking-widest text-gray-400",
							children: "OG Image URL (Social Share Image)"
						}, void 0, false, {
							fileName: _jsxFileName$4,
							lineNumber: 157,
							columnNumber: 13
						}, this), /* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)("input", {
							type: "text",
							value: form.ogImage,
							onChange: (e) => setForm({
								...form,
								ogImage: e.target.value
							}),
							className: "w-full rounded bg-black border border-gray-800 px-3 py-2 text-white outline-none focus:border-white text-sm",
							placeholder: "https://merajhossain.com/og-image.jpg"
						}, void 0, false, {
							fileName: _jsxFileName$4,
							lineNumber: 160,
							columnNumber: 13
						}, this)]
					}, void 0, true, {
						fileName: _jsxFileName$4,
						lineNumber: 156,
						columnNumber: 11
					}, this)]
				}, void 0, true, {
					fileName: _jsxFileName$4,
					lineNumber: 142,
					columnNumber: 9
				}, this),
				message && /* @__PURE__ */ (void 0)("div", {
					className: `p-4 rounded text-sm flex items-center gap-3 font-mono ${isError ? "bg-red-950/60 border border-red-800 text-red-400" : "bg-emerald-950/60 border border-emerald-800 text-emerald-400"}`,
					children: [/* @__PURE__ */ (void 0)(CircleAlert, { size: 18 }, void 0, false, {
						fileName: _jsxFileName$4,
						lineNumber: 174,
						columnNumber: 13
					}, this), /* @__PURE__ */ (void 0)("span", { children: message }, void 0, false, {
						fileName: _jsxFileName$4,
						lineNumber: 175,
						columnNumber: 13
					}, this)]
				}, void 0, true, {
					fileName: _jsxFileName$4,
					lineNumber: 171,
					columnNumber: 11
				}, this),
				/* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)("button", {
					type: "submit",
					disabled: isSubmitting,
					className: "btn-primary text-white font-semibold py-2.5 px-6 rounded disabled:opacity-50 transition-all flex items-center gap-2",
					children: [/* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)(Save, { size: 18 }, void 0, false, {
						fileName: _jsxFileName$4,
						lineNumber: 184,
						columnNumber: 11
					}, this), isSubmitting ? "Saving SEO settings..." : "Save Settings"]
				}, void 0, true, {
					fileName: _jsxFileName$4,
					lineNumber: 179,
					columnNumber: 9
				}, this)
			]
		}, void 0, true, {
			fileName: _jsxFileName$4,
			lineNumber: 84,
			columnNumber: 7
		}, this)]
	}, void 0, true, {
		fileName: _jsxFileName$4,
		lineNumber: 76,
		columnNumber: 5
	}, this);
}
var $$splitComponentImporter$4 = () => import("./security-CKpKFWux.mjs");
var Route$8 = createFileRoute("/admin/_layout/security")({ component: lazyRouteComponent($$splitComponentImporter$4, "component") });
var $$splitComponentImporter$3 = () => import("./portfolio-DP_gXjey.mjs");
var Route$7 = createFileRoute("/admin/_layout/portfolio")({ component: lazyRouteComponent($$splitComponentImporter$3, "component") });
var _jsxFileName$3 = "E:/Web/creative-canvas-hub-main/creative-canvas-hub-main/src/routes/admin/_layout/messages.tsx";
var Route$6 = createFileRoute("/admin/_layout/messages")({ component: AdminMessages });
function AdminMessages() {
	const [token] = useLocalStorage("admin_token", "");
	const [messages, setMessages] = (0, import_react.useState)([]);
	const [isLoading, setIsLoading] = (0, import_react.useState)(true);
	const fetchMessages = async () => {
		try {
			const json = await fetchWithAuth(token, "/api/messages");
			if (json.success) setMessages(json.data || []);
		} catch (e) {
			console.error(e);
		} finally {
			setIsLoading(false);
		}
	};
	(0, import_react.useEffect)(() => {
		fetchMessages();
	}, [token]);
	const handleDelete = async (id) => {
		if (!confirm("Delete this message inquiry?")) return;
		try {
			await fetchWithAuth(token, `/api/messages?id=${id}`, { method: "DELETE" });
			fetchMessages();
		} catch (e) {
			console.error(e);
		}
	};
	return /* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)("div", {
		className: "space-y-8",
		children: [/* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)("div", { children: [/* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)("h1", {
			className: "text-3xl font-bold text-white mb-2",
			children: "Contact Messages"
		}, void 0, false, {
			fileName: _jsxFileName$3,
			lineNumber: 44,
			columnNumber: 9
		}, this), /* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)("p", {
			className: "text-gray-400",
			children: "View inquiries sent through your website contact form"
		}, void 0, false, {
			fileName: _jsxFileName$3,
			lineNumber: 45,
			columnNumber: 9
		}, this)] }, void 0, true, {
			fileName: _jsxFileName$3,
			lineNumber: 43,
			columnNumber: 7
		}, this), /* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)("div", {
			className: "bg-gray-950 border border-gray-800 rounded-lg p-6",
			children: isLoading ? /* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)("p", {
				className: "text-gray-400",
				children: "Loading messages..."
			}, void 0, false, {
				fileName: _jsxFileName$3,
				lineNumber: 50,
				columnNumber: 11
			}, this) : messages.length === 0 ? /* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)("div", {
				className: "py-12 text-center text-gray-500",
				children: [/* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)(Mail, { className: "mx-auto h-12 w-12 mb-3 text-gray-600" }, void 0, false, {
					fileName: _jsxFileName$3,
					lineNumber: 53,
					columnNumber: 13
				}, this), /* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)("p", {
					className: "text-base font-medium",
					children: "No contact inquiries received yet."
				}, void 0, false, {
					fileName: _jsxFileName$3,
					lineNumber: 54,
					columnNumber: 13
				}, this)]
			}, void 0, true, {
				fileName: _jsxFileName$3,
				lineNumber: 52,
				columnNumber: 11
			}, this) : /* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)("div", {
				className: "space-y-4",
				children: messages.map((m) => /* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)("div", {
					className: "p-5 bg-black border border-gray-800 rounded-lg space-y-3",
					children: [/* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)("div", {
						className: "flex flex-wrap items-center justify-between gap-4 border-b border-gray-800/80 pb-3",
						children: [/* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)("div", {
							className: "flex items-center gap-3",
							children: [/* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)(User, { className: "h-5 w-5 text-[var(--primary)]" }, void 0, false, {
								fileName: _jsxFileName$3,
								lineNumber: 62,
								columnNumber: 21
							}, this), /* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)("div", { children: [/* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)("h3", {
								className: "font-bold text-white text-base",
								children: m.name
							}, void 0, false, {
								fileName: _jsxFileName$3,
								lineNumber: 64,
								columnNumber: 23
							}, this), /* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)("a", {
								href: `mailto:${m.email}`,
								className: "text-xs text-gray-400 hover:text-white font-mono",
								children: m.email
							}, void 0, false, {
								fileName: _jsxFileName$3,
								lineNumber: 65,
								columnNumber: 23
							}, this)] }, void 0, true, {
								fileName: _jsxFileName$3,
								lineNumber: 63,
								columnNumber: 21
							}, this)]
						}, void 0, true, {
							fileName: _jsxFileName$3,
							lineNumber: 61,
							columnNumber: 19
						}, this), /* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)("div", {
							className: "flex items-center gap-4",
							children: [/* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)("span", {
								className: "flex items-center gap-1.5 text-xs text-gray-500 font-mono",
								children: [
									/* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)(Calendar, { size: 14 }, void 0, false, {
										fileName: _jsxFileName$3,
										lineNumber: 75,
										columnNumber: 23
									}, this),
									new Date(m.createdAt).toLocaleDateString(),
									" ",
									new Date(m.createdAt).toLocaleTimeString([], {
										hour: "2-digit",
										minute: "2-digit"
									})
								]
							}, void 0, true, {
								fileName: _jsxFileName$3,
								lineNumber: 74,
								columnNumber: 21
							}, this), /* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)("button", {
								onClick: () => handleDelete(m._id),
								className: "p-1.5 text-red-400 hover:text-red-300 rounded hover:bg-gray-900 transition-colors",
								title: "Delete message",
								children: /* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)(Trash2, { size: 16 }, void 0, false, {
									fileName: _jsxFileName$3,
									lineNumber: 87,
									columnNumber: 23
								}, this)
							}, void 0, false, {
								fileName: _jsxFileName$3,
								lineNumber: 82,
								columnNumber: 21
							}, this)]
						}, void 0, true, {
							fileName: _jsxFileName$3,
							lineNumber: 73,
							columnNumber: 19
						}, this)]
					}, void 0, true, {
						fileName: _jsxFileName$3,
						lineNumber: 60,
						columnNumber: 17
					}, this), /* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)("div", { children: [/* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)("div", {
						className: "text-xs uppercase tracking-widest text-gray-500 font-mono mb-1",
						children: ["Subject: ", m.subject]
					}, void 0, true, {
						fileName: _jsxFileName$3,
						lineNumber: 92,
						columnNumber: 19
					}, this), /* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)("p", {
						className: "text-sm text-gray-200 leading-relaxed whitespace-pre-wrap",
						children: m.message
					}, void 0, false, {
						fileName: _jsxFileName$3,
						lineNumber: 95,
						columnNumber: 19
					}, this)] }, void 0, true, {
						fileName: _jsxFileName$3,
						lineNumber: 91,
						columnNumber: 17
					}, this)]
				}, m._id, true, {
					fileName: _jsxFileName$3,
					lineNumber: 59,
					columnNumber: 15
				}, this))
			}, void 0, false, {
				fileName: _jsxFileName$3,
				lineNumber: 57,
				columnNumber: 11
			}, this)
		}, void 0, false, {
			fileName: _jsxFileName$3,
			lineNumber: 48,
			columnNumber: 7
		}, this)]
	}, void 0, true, {
		fileName: _jsxFileName$3,
		lineNumber: 42,
		columnNumber: 5
	}, this);
}
var _jsxFileName$2 = "E:/Web/creative-canvas-hub-main/creative-canvas-hub-main/src/routes/admin/_layout/media.tsx";
var Route$5 = createFileRoute("/admin/_layout/media")({ component: AdminMedia });
function AdminMedia() {
	const [token] = useLocalStorage("admin_token", "");
	const [mediaList, setMediaList] = (0, import_react.useState)([]);
	const [search, setSearch] = (0, import_react.useState)("");
	const [isLoading, setIsLoading] = (0, import_react.useState)(true);
	const [copiedId, setCopiedId] = (0, import_react.useState)(null);
	const [form, setForm] = (0, import_react.useState)({
		url: "",
		title: "",
		alt: ""
	});
	const fetchMedia = async () => {
		try {
			const result = await fetchWithAuth(token, "/api/media");
			if (result && result.data) setMediaList(result.data || []);
		} catch (e) {
			console.error(e);
		} finally {
			setIsLoading(false);
		}
	};
	(0, import_react.useEffect)(() => {
		fetchMedia();
	}, [token]);
	const handleSave = async (e) => {
		e.preventDefault();
		if (!form.url) return;
		try {
			const result = await fetchWithAuth(token, "/api/media", {
				method: "POST",
				body: JSON.stringify(form)
			});
			if (result && result.success) {
				setForm({
					url: "",
					title: "",
					alt: ""
				});
				fetchMedia();
			}
		} catch (e) {
			console.error(e);
		}
	};
	const handleDelete = async (id) => {
		if (!confirm("Are you sure you want to delete this media item?")) return;
		try {
			const result = await fetchWithAuth(token, `/api/media?id=${id}`, { method: "DELETE" });
			if (result && result.success) fetchMedia();
		} catch (e) {
			console.error(e);
		}
	};
	const copyToClipboard = (url, id) => {
		navigator.clipboard.writeText(url);
		setCopiedId(id);
		setTimeout(() => setCopiedId(null), 2e3);
	};
	const filteredMedia = mediaList.filter((m) => m.fileName?.toLowerCase().includes(search.toLowerCase()) || m.url?.toLowerCase().includes(search.toLowerCase()));
	return /* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)("div", {
		className: "space-y-8",
		children: [/* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)("div", { children: [/* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)("h1", {
			className: "text-3xl font-bold text-white mb-2",
			children: "Media Library"
		}, void 0, false, {
			fileName: _jsxFileName$2,
			lineNumber: 79,
			columnNumber: 9
		}, this), /* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)("p", {
			className: "text-gray-400",
			children: "Add external URLs, Google Drive links, and YouTube links here to reuse across pages"
		}, void 0, false, {
			fileName: _jsxFileName$2,
			lineNumber: 80,
			columnNumber: 9
		}, this)] }, void 0, true, {
			fileName: _jsxFileName$2,
			lineNumber: 78,
			columnNumber: 7
		}, this), /* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)("div", {
			className: "grid md:grid-cols-12 gap-8",
			children: [/* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)("form", {
				onSubmit: handleSave,
				className: "md:col-span-4 bg-gray-950 border border-gray-800 rounded-lg p-6 space-y-4 h-fit",
				children: [
					/* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)("h2", {
						className: "text-xl font-bold text-white mb-2",
						children: "Add Media URL"
					}, void 0, false, {
						fileName: _jsxFileName$2,
						lineNumber: 90,
						columnNumber: 11
					}, this),
					/* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)("p", {
						className: "text-xs text-gray-500 mb-4",
						children: "Paste any image/video URL, Google Drive share URL, or YouTube video link."
					}, void 0, false, {
						fileName: _jsxFileName$2,
						lineNumber: 91,
						columnNumber: 11
					}, this),
					/* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)("div", { children: [/* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)("label", {
						className: "block text-xs uppercase tracking-widest text-gray-400 mb-1",
						children: "Media URL"
					}, void 0, false, {
						fileName: _jsxFileName$2,
						lineNumber: 96,
						columnNumber: 13
					}, this), /* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)("input", {
						type: "url",
						required: true,
						value: form.url,
						onChange: (e) => setForm({
							...form,
							url: e.target.value
						}),
						className: "w-full rounded bg-black border border-gray-800 px-3 py-2 text-white outline-none focus:border-white text-sm",
						placeholder: "https://drive.google.com/file/d/... or YouTube link"
					}, void 0, false, {
						fileName: _jsxFileName$2,
						lineNumber: 99,
						columnNumber: 13
					}, this)] }, void 0, true, {
						fileName: _jsxFileName$2,
						lineNumber: 95,
						columnNumber: 11
					}, this),
					/* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)("div", { children: [/* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)("label", {
						className: "block text-xs uppercase tracking-widest text-gray-400 mb-1",
						children: "Title / Name"
					}, void 0, false, {
						fileName: _jsxFileName$2,
						lineNumber: 110,
						columnNumber: 13
					}, this), /* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)("input", {
						type: "text",
						value: form.title,
						onChange: (e) => setForm({
							...form,
							title: e.target.value
						}),
						className: "w-full rounded bg-black border border-gray-800 px-3 py-2 text-white outline-none focus:border-white text-sm",
						placeholder: "e.g. Hero Cutdown"
					}, void 0, false, {
						fileName: _jsxFileName$2,
						lineNumber: 113,
						columnNumber: 13
					}, this)] }, void 0, true, {
						fileName: _jsxFileName$2,
						lineNumber: 109,
						columnNumber: 11
					}, this),
					/* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)("div", { children: [/* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)("label", {
						className: "block text-xs uppercase tracking-widest text-gray-400 mb-1",
						children: "Alt Text"
					}, void 0, false, {
						fileName: _jsxFileName$2,
						lineNumber: 123,
						columnNumber: 13
					}, this), /* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)("input", {
						type: "text",
						value: form.alt,
						onChange: (e) => setForm({
							...form,
							alt: e.target.value
						}),
						className: "w-full rounded bg-black border border-gray-800 px-3 py-2 text-white outline-none focus:border-white text-sm",
						placeholder: "Describe this media..."
					}, void 0, false, {
						fileName: _jsxFileName$2,
						lineNumber: 126,
						columnNumber: 13
					}, this)] }, void 0, true, {
						fileName: _jsxFileName$2,
						lineNumber: 122,
						columnNumber: 11
					}, this),
					/* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)("button", {
						type: "submit",
						className: "w-full btn-primary text-white font-semibold py-2 rounded transition-all flex items-center justify-center gap-2 text-sm",
						children: [/* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)(Plus, { size: 16 }, void 0, false, {
							fileName: _jsxFileName$2,
							lineNumber: 139,
							columnNumber: 13
						}, this), "Add to Library"]
					}, void 0, true, {
						fileName: _jsxFileName$2,
						lineNumber: 135,
						columnNumber: 11
					}, this)
				]
			}, void 0, true, {
				fileName: _jsxFileName$2,
				lineNumber: 86,
				columnNumber: 9
			}, this), /* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)("div", {
				className: "md:col-span-8 bg-gray-950 border border-gray-800 rounded-lg p-6 space-y-4",
				children: [/* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)("div", {
					className: "flex items-center justify-between border-b border-gray-800 pb-4",
					children: [/* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)("h2", {
						className: "text-xl font-bold text-white",
						children: "All Library Items"
					}, void 0, false, {
						fileName: _jsxFileName$2,
						lineNumber: 146,
						columnNumber: 13
					}, this), /* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)("div", {
						className: "relative w-64",
						children: [/* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)(Search, { className: "absolute left-3 top-2.5 h-4 w-4 text-gray-500" }, void 0, false, {
							fileName: _jsxFileName$2,
							lineNumber: 148,
							columnNumber: 15
						}, this), /* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)("input", {
							type: "text",
							value: search,
							onChange: (e) => setSearch(e.target.value),
							placeholder: "Search media...",
							className: "w-full pl-9 pr-4 py-1.5 bg-black border border-gray-800 rounded-lg text-xs text-white outline-none focus:border-white"
						}, void 0, false, {
							fileName: _jsxFileName$2,
							lineNumber: 149,
							columnNumber: 15
						}, this)]
					}, void 0, true, {
						fileName: _jsxFileName$2,
						lineNumber: 147,
						columnNumber: 13
					}, this)]
				}, void 0, true, {
					fileName: _jsxFileName$2,
					lineNumber: 145,
					columnNumber: 11
				}, this), isLoading ? /* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)("p", {
					className: "text-gray-400",
					children: "Loading Media Library..."
				}, void 0, false, {
					fileName: _jsxFileName$2,
					lineNumber: 160,
					columnNumber: 13
				}, this) : filteredMedia.length === 0 ? /* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)("p", {
					className: "text-gray-500 py-8 text-center text-sm",
					children: "No media items found in the library."
				}, void 0, false, {
					fileName: _jsxFileName$2,
					lineNumber: 162,
					columnNumber: 13
				}, this) : /* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)("div", {
					className: "grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4",
					children: filteredMedia.map((m) => /* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)("div", {
						className: "card overflow-hidden flex flex-col justify-between group",
						children: [/* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)("div", {
							className: "aspect-video bg-neutral-900 border-b border-gray-800 flex items-center justify-center relative overflow-hidden",
							children: m.fileType === "youtube" ? /* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)("div", {
								className: "text-xs text-red-500 font-bold uppercase",
								children: "YouTube Video"
							}, void 0, false, {
								fileName: _jsxFileName$2,
								lineNumber: 174,
								columnNumber: 23
							}, this) : m.fileType === "gdrive" ? /* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)("div", {
								className: "text-xs text-blue-500 font-bold uppercase",
								children: "Google Drive File"
							}, void 0, false, {
								fileName: _jsxFileName$2,
								lineNumber: 176,
								columnNumber: 23
							}, this) : m.fileType === "video" ? /* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)("video", {
								src: m.url,
								className: "w-full h-full object-cover",
								muted: true
							}, void 0, false, {
								fileName: _jsxFileName$2,
								lineNumber: 180,
								columnNumber: 23
							}, this) : /* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)("img", {
								src: m.url,
								alt: m.altText,
								className: "w-full h-full object-cover"
							}, void 0, false, {
								fileName: _jsxFileName$2,
								lineNumber: 182,
								columnNumber: 23
							}, this)
						}, void 0, false, {
							fileName: _jsxFileName$2,
							lineNumber: 172,
							columnNumber: 19
						}, this), /* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)("div", {
							className: "p-3 space-y-2",
							children: [/* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)("h3", {
								className: "font-semibold text-white text-xs truncate",
								title: m.fileName,
								children: m.fileName
							}, void 0, false, {
								fileName: _jsxFileName$2,
								lineNumber: 186,
								columnNumber: 21
							}, this), /* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)("div", {
								className: "flex gap-2 justify-end pt-1",
								children: [/* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)("button", {
									onClick: () => copyToClipboard(m.url, m._id),
									className: "p-1.5 border border-gray-800 hover:border-white rounded text-gray-400 hover:text-white transition-colors",
									title: "Copy direct URL",
									children: copiedId === m._id ? /* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)(Check, {
										size: 14,
										className: "text-emerald-400"
									}, void 0, false, {
										fileName: _jsxFileName$2,
										lineNumber: 196,
										columnNumber: 27
									}, this) : /* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)(Copy, { size: 14 }, void 0, false, {
										fileName: _jsxFileName$2,
										lineNumber: 198,
										columnNumber: 27
									}, this)
								}, void 0, false, {
									fileName: _jsxFileName$2,
									lineNumber: 190,
									columnNumber: 23
								}, this), /* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)("button", {
									onClick: () => handleDelete(m._id),
									className: "p-1.5 border border-gray-800 hover:border-red-500 hover:bg-red-950/20 rounded text-red-400 hover:text-red-300 transition-colors",
									title: "Delete item",
									children: /* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)(Trash2, { size: 14 }, void 0, false, {
										fileName: _jsxFileName$2,
										lineNumber: 206,
										columnNumber: 25
									}, this)
								}, void 0, false, {
									fileName: _jsxFileName$2,
									lineNumber: 201,
									columnNumber: 23
								}, this)]
							}, void 0, true, {
								fileName: _jsxFileName$2,
								lineNumber: 189,
								columnNumber: 21
							}, this)]
						}, void 0, true, {
							fileName: _jsxFileName$2,
							lineNumber: 185,
							columnNumber: 19
						}, this)]
					}, m._id, true, {
						fileName: _jsxFileName$2,
						lineNumber: 168,
						columnNumber: 17
					}, this))
				}, void 0, false, {
					fileName: _jsxFileName$2,
					lineNumber: 166,
					columnNumber: 13
				}, this)]
			}, void 0, true, {
				fileName: _jsxFileName$2,
				lineNumber: 144,
				columnNumber: 9
			}, this)]
		}, void 0, true, {
			fileName: _jsxFileName$2,
			lineNumber: 85,
			columnNumber: 7
		}, this)]
	}, void 0, true, {
		fileName: _jsxFileName$2,
		lineNumber: 77,
		columnNumber: 5
	}, this);
}
var _jsxFileName$1 = "E:/Web/creative-canvas-hub-main/creative-canvas-hub-main/src/routes/admin/_layout/experience.tsx";
var Route$4 = createFileRoute("/admin/_layout/experience")({ component: AdminExperience });
function AdminExperience() {
	const [token] = useLocalStorage("admin_token", "");
	const [items, setItems] = (0, import_react.useState)([]);
	const [isLoading, setIsLoading] = (0, import_react.useState)(true);
	const [editingId, setEditingId] = (0, import_react.useState)(null);
	const [form, setForm] = (0, import_react.useState)({
		role: "",
		org: "",
		years: "2025 — Present",
		note: "",
		displayOrder: 1
	});
	const fetchItems = async () => {
		try {
			const json = await (await fetch("/api/experience")).json();
			if (json.success) setItems(json.data || []);
		} catch (e) {
			console.error(e);
		} finally {
			setIsLoading(false);
		}
	};
	(0, import_react.useEffect)(() => {
		fetchItems();
	}, []);
	const handleSave = async (e) => {
		e.preventDefault();
		try {
			const url = "/api/experience";
			const method = editingId ? "PUT" : "POST";
			const body = editingId ? {
				_id: editingId,
				...form
			} : form;
			await fetchWithAuth(token, url, {
				method,
				body: JSON.stringify(body)
			});
			setForm({
				role: "",
				org: "",
				years: "2025 � Present",
				note: "",
				displayOrder: items.length + 1
			});
			setEditingId(null);
			fetchItems();
		} catch (e) {
			console.error(e);
		}
	};
	const handleDelete = async (id) => {
		if (!confirm("Delete this experience entry?")) return;
		try {
			await fetchWithAuth(token, `/api/experience?id=${id}`, { method: "DELETE" });
			fetchItems();
		} catch (e) {
			console.error(e);
		}
	};
	return /* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)("div", {
		className: "space-y-8",
		children: [/* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)("div", { children: [/* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)("h1", {
			className: "text-3xl font-bold text-white mb-2",
			children: "Experience & Career"
		}, void 0, false, {
			fileName: _jsxFileName$1,
			lineNumber: 69,
			columnNumber: 9
		}, this), /* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)("p", {
			className: "text-gray-400",
			children: "Manage your work timeline and career experience"
		}, void 0, false, {
			fileName: _jsxFileName$1,
			lineNumber: 70,
			columnNumber: 9
		}, this)] }, void 0, true, {
			fileName: _jsxFileName$1,
			lineNumber: 68,
			columnNumber: 7
		}, this), /* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)("div", {
			className: "grid md:grid-cols-12 gap-8",
			children: [/* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)("form", {
				onSubmit: handleSave,
				className: "md:col-span-5 bg-gray-950 border border-gray-800 rounded-lg p-6 space-y-4",
				children: [
					/* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)("h2", {
						className: "text-xl font-bold text-white mb-4",
						children: editingId ? "Edit Entry" : "Add Experience Entry"
					}, void 0, false, {
						fileName: _jsxFileName$1,
						lineNumber: 78,
						columnNumber: 11
					}, this),
					/* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)("div", { children: [/* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)("label", {
						className: "block text-xs uppercase tracking-widest text-gray-400 mb-1",
						children: "Role / Position"
					}, void 0, false, {
						fileName: _jsxFileName$1,
						lineNumber: 83,
						columnNumber: 13
					}, this), /* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)("input", {
						type: "text",
						required: true,
						value: form.role,
						onChange: (e) => setForm({
							...form,
							role: e.target.value
						}),
						className: "w-full rounded bg-black border border-gray-800 px-3 py-2 text-white outline-none focus:border-white",
						placeholder: "e.g. Senior Motion Designer"
					}, void 0, false, {
						fileName: _jsxFileName$1,
						lineNumber: 86,
						columnNumber: 13
					}, this)] }, void 0, true, {
						fileName: _jsxFileName$1,
						lineNumber: 82,
						columnNumber: 11
					}, this),
					/* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)("div", { children: [/* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)("label", {
						className: "block text-xs uppercase tracking-widest text-gray-400 mb-1",
						children: "Company / Organization"
					}, void 0, false, {
						fileName: _jsxFileName$1,
						lineNumber: 97,
						columnNumber: 13
					}, this), /* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)("input", {
						type: "text",
						required: true,
						value: form.org,
						onChange: (e) => setForm({
							...form,
							org: e.target.value
						}),
						className: "w-full rounded bg-black border border-gray-800 px-3 py-2 text-white outline-none focus:border-white",
						placeholder: "e.g. Micro Electronic, Dhaka"
					}, void 0, false, {
						fileName: _jsxFileName$1,
						lineNumber: 100,
						columnNumber: 13
					}, this)] }, void 0, true, {
						fileName: _jsxFileName$1,
						lineNumber: 96,
						columnNumber: 11
					}, this),
					/* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)("div", { children: [/* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)("label", {
						className: "block text-xs uppercase tracking-widest text-gray-400 mb-1",
						children: "Years / Period"
					}, void 0, false, {
						fileName: _jsxFileName$1,
						lineNumber: 111,
						columnNumber: 13
					}, this), /* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)("input", {
						type: "text",
						required: true,
						value: form.years,
						onChange: (e) => setForm({
							...form,
							years: e.target.value
						}),
						className: "w-full rounded bg-black border border-gray-800 px-3 py-2 text-white outline-none focus:border-white",
						placeholder: "2025 — Present"
					}, void 0, false, {
						fileName: _jsxFileName$1,
						lineNumber: 114,
						columnNumber: 13
					}, this)] }, void 0, true, {
						fileName: _jsxFileName$1,
						lineNumber: 110,
						columnNumber: 11
					}, this),
					/* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)("div", { children: [/* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)("label", {
						className: "block text-xs uppercase tracking-widest text-gray-400 mb-1",
						children: "Responsibilities / Notes"
					}, void 0, false, {
						fileName: _jsxFileName$1,
						lineNumber: 125,
						columnNumber: 13
					}, this), /* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)("textarea", {
						rows: 3,
						value: form.note,
						onChange: (e) => setForm({
							...form,
							note: e.target.value
						}),
						className: "w-full rounded bg-black border border-gray-800 px-3 py-2 text-white outline-none focus:border-white resize-none",
						placeholder: "Key accomplishments and role details..."
					}, void 0, false, {
						fileName: _jsxFileName$1,
						lineNumber: 128,
						columnNumber: 13
					}, this)] }, void 0, true, {
						fileName: _jsxFileName$1,
						lineNumber: 124,
						columnNumber: 11
					}, this),
					/* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)("div", {
						className: "flex gap-2 pt-2",
						children: /* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)("button", {
							type: "submit",
							className: "flex-1 btn-primary text-white font-semibold py-2 rounded transition-all flex items-center justify-center gap-2",
							children: [/* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)(Plus, { size: 16 }, void 0, false, {
								fileName: _jsxFileName$1,
								lineNumber: 142,
								columnNumber: 15
							}, this), editingId ? "Update Entry" : "Add Entry"]
						}, void 0, true, {
							fileName: _jsxFileName$1,
							lineNumber: 138,
							columnNumber: 13
						}, this)
					}, void 0, false, {
						fileName: _jsxFileName$1,
						lineNumber: 137,
						columnNumber: 11
					}, this)
				]
			}, void 0, true, {
				fileName: _jsxFileName$1,
				lineNumber: 74,
				columnNumber: 9
			}, this), /* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)("div", {
				className: "md:col-span-7 bg-gray-950 border border-gray-800 rounded-lg p-6",
				children: [/* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)("h2", {
					className: "text-xl font-bold text-white mb-4",
					children: "Career Timeline"
				}, void 0, false, {
					fileName: _jsxFileName$1,
					lineNumber: 149,
					columnNumber: 11
				}, this), isLoading ? /* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)("p", {
					className: "text-gray-400",
					children: "Loading timeline..."
				}, void 0, false, {
					fileName: _jsxFileName$1,
					lineNumber: 151,
					columnNumber: 13
				}, this) : items.length === 0 ? /* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)("p", {
					className: "text-gray-500",
					children: "No experience records yet."
				}, void 0, false, {
					fileName: _jsxFileName$1,
					lineNumber: 153,
					columnNumber: 13
				}, this) : /* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)("div", {
					className: "space-y-3",
					children: items.map((x) => /* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)("div", {
						className: "p-4 bg-black border border-gray-800 rounded-lg flex justify-between items-start",
						children: [/* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)("div", { children: [
							/* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)("span", {
								className: "font-mono text-xs text-[var(--primary)]",
								children: x.years
							}, void 0, false, {
								fileName: _jsxFileName$1,
								lineNumber: 162,
								columnNumber: 21
							}, this),
							/* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)("h3", {
								className: "font-bold text-white text-lg mt-1",
								children: x.role
							}, void 0, false, {
								fileName: _jsxFileName$1,
								lineNumber: 163,
								columnNumber: 21
							}, this),
							/* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)("p", {
								className: "text-xs text-gray-400 mt-0.5",
								children: x.org
							}, void 0, false, {
								fileName: _jsxFileName$1,
								lineNumber: 164,
								columnNumber: 21
							}, this),
							x.note && /* @__PURE__ */ (void 0)("p", {
								className: "text-sm text-gray-300 mt-2",
								children: x.note
							}, void 0, false, {
								fileName: _jsxFileName$1,
								lineNumber: 165,
								columnNumber: 32
							}, this)
						] }, void 0, true, {
							fileName: _jsxFileName$1,
							lineNumber: 161,
							columnNumber: 19
						}, this), /* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)("div", {
							className: "flex gap-2",
							children: [/* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)("button", {
								onClick: () => {
									setEditingId(x._id);
									setForm({
										role: x.role,
										org: x.org,
										years: x.years,
										note: x.note || "",
										displayOrder: x.displayOrder || 1
									});
								},
								className: "p-1.5 text-gray-400 hover:text-white",
								children: /* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)(Pen, { size: 16 }, void 0, false, {
									fileName: _jsxFileName$1,
									lineNumber: 181,
									columnNumber: 23
								}, this)
							}, void 0, false, {
								fileName: _jsxFileName$1,
								lineNumber: 168,
								columnNumber: 21
							}, this), /* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)("button", {
								onClick: () => handleDelete(x._id),
								className: "p-1.5 text-red-400 hover:text-red-300",
								children: /* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)(Trash2, { size: 16 }, void 0, false, {
									fileName: _jsxFileName$1,
									lineNumber: 187,
									columnNumber: 23
								}, this)
							}, void 0, false, {
								fileName: _jsxFileName$1,
								lineNumber: 183,
								columnNumber: 21
							}, this)]
						}, void 0, true, {
							fileName: _jsxFileName$1,
							lineNumber: 167,
							columnNumber: 19
						}, this)]
					}, x._id, true, {
						fileName: _jsxFileName$1,
						lineNumber: 157,
						columnNumber: 17
					}, this))
				}, void 0, false, {
					fileName: _jsxFileName$1,
					lineNumber: 155,
					columnNumber: 13
				}, this)]
			}, void 0, true, {
				fileName: _jsxFileName$1,
				lineNumber: 148,
				columnNumber: 9
			}, this)]
		}, void 0, true, {
			fileName: _jsxFileName$1,
			lineNumber: 73,
			columnNumber: 7
		}, this)]
	}, void 0, true, {
		fileName: _jsxFileName$1,
		lineNumber: 67,
		columnNumber: 5
	}, this);
}
var _jsxFileName = "E:/Web/creative-canvas-hub-main/creative-canvas-hub-main/src/routes/admin/_layout/education.tsx";
var Route$3 = createFileRoute("/admin/_layout/education")({ component: AdminEducation });
function AdminEducation() {
	const [token] = useLocalStorage("admin_token", "");
	const [items, setItems] = (0, import_react.useState)([]);
	const [isLoading, setIsLoading] = (0, import_react.useState)(true);
	const [editingId, setEditingId] = (0, import_react.useState)(null);
	const [form, setForm] = (0, import_react.useState)({
		degree: "",
		institution: "",
		fieldOfStudy: "",
		startDate: "",
		endDate: "",
		description: "",
		displayOrder: 1
	});
	const fetchItems = async () => {
		try {
			const json = await (await fetch("/api/education")).json();
			if (json.success) setItems(json.data || []);
		} catch (e) {
			console.error(e);
		} finally {
			setIsLoading(false);
		}
	};
	(0, import_react.useEffect)(() => {
		fetchItems();
	}, []);
	const handleSave = async (e) => {
		e.preventDefault();
		try {
			const url = "/api/education";
			const method = editingId ? "PUT" : "POST";
			const body = editingId ? {
				_id: editingId,
				...form
			} : form;
			await fetchWithAuth(token, url, {
				method,
				body: JSON.stringify(body)
			});
			setForm({
				degree: "",
				institution: "",
				fieldOfStudy: "",
				startDate: "",
				endDate: "",
				description: "",
				displayOrder: items.length + 1
			});
			setEditingId(null);
			fetchItems();
		} catch (e) {
			console.error(e);
		}
	};
	const handleDelete = async (id) => {
		if (!confirm("Delete this education entry?")) return;
		try {
			await fetchWithAuth(token, `/api/education?id=${id}`, { method: "DELETE" });
			fetchItems();
		} catch (e) {
			console.error(e);
		}
	};
	return /* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)("div", {
		className: "space-y-8",
		children: [/* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)("div", { children: [/* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)("h1", {
			className: "text-3xl font-bold text-white mb-2",
			children: "Education Settings"
		}, void 0, false, {
			fileName: _jsxFileName,
			lineNumber: 81,
			columnNumber: 9
		}, this), /* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)("p", {
			className: "text-gray-400",
			children: "Manage your educational qualification details"
		}, void 0, false, {
			fileName: _jsxFileName,
			lineNumber: 82,
			columnNumber: 9
		}, this)] }, void 0, true, {
			fileName: _jsxFileName,
			lineNumber: 80,
			columnNumber: 7
		}, this), /* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)("div", {
			className: "grid md:grid-cols-12 gap-8",
			children: [/* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)("form", {
				onSubmit: handleSave,
				className: "md:col-span-5 bg-gray-950 border border-gray-800 rounded-lg p-6 space-y-4",
				children: [
					/* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)("h2", {
						className: "text-xl font-bold text-white mb-4",
						children: editingId ? "Edit Entry" : "Add Education Entry"
					}, void 0, false, {
						fileName: _jsxFileName,
						lineNumber: 90,
						columnNumber: 11
					}, this),
					/* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)("div", { children: [/* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)("label", {
						className: "block text-xs uppercase tracking-widest text-gray-400 mb-1",
						children: "Degree / Qualification"
					}, void 0, false, {
						fileName: _jsxFileName,
						lineNumber: 95,
						columnNumber: 13
					}, this), /* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)("input", {
						type: "text",
						required: true,
						value: form.degree,
						onChange: (e) => setForm({
							...form,
							degree: e.target.value
						}),
						className: "w-full rounded bg-black border border-gray-800 px-3 py-2 text-white outline-none focus:border-white",
						placeholder: "e.g. Higher Secondary Certificate"
					}, void 0, false, {
						fileName: _jsxFileName,
						lineNumber: 98,
						columnNumber: 13
					}, this)] }, void 0, true, {
						fileName: _jsxFileName,
						lineNumber: 94,
						columnNumber: 11
					}, this),
					/* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)("div", { children: [/* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)("label", {
						className: "block text-xs uppercase tracking-widest text-gray-400 mb-1",
						children: "Institution"
					}, void 0, false, {
						fileName: _jsxFileName,
						lineNumber: 109,
						columnNumber: 13
					}, this), /* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)("input", {
						type: "text",
						required: true,
						value: form.institution,
						onChange: (e) => setForm({
							...form,
							institution: e.target.value
						}),
						className: "w-full rounded bg-black border border-gray-800 px-3 py-2 text-white outline-none focus:border-white",
						placeholder: "e.g. Savar Cantonment Public School"
					}, void 0, false, {
						fileName: _jsxFileName,
						lineNumber: 112,
						columnNumber: 13
					}, this)] }, void 0, true, {
						fileName: _jsxFileName,
						lineNumber: 108,
						columnNumber: 11
					}, this),
					/* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)("div", {
						className: "flex gap-4",
						children: [/* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)("div", {
							className: "flex-1",
							children: [/* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)("label", {
								className: "block text-xs uppercase tracking-widest text-gray-400 mb-1",
								children: "Start Date"
							}, void 0, false, {
								fileName: _jsxFileName,
								lineNumber: 124,
								columnNumber: 15
							}, this), /* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)("input", {
								type: "text",
								required: true,
								value: form.startDate,
								onChange: (e) => setForm({
									...form,
									startDate: e.target.value
								}),
								className: "w-full rounded bg-black border border-gray-800 px-3 py-2 text-white outline-none focus:border-white",
								placeholder: "2020"
							}, void 0, false, {
								fileName: _jsxFileName,
								lineNumber: 127,
								columnNumber: 15
							}, this)]
						}, void 0, true, {
							fileName: _jsxFileName,
							lineNumber: 123,
							columnNumber: 13
						}, this), /* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)("div", {
							className: "flex-1",
							children: [/* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)("label", {
								className: "block text-xs uppercase tracking-widest text-gray-400 mb-1",
								children: "End Date"
							}, void 0, false, {
								fileName: _jsxFileName,
								lineNumber: 137,
								columnNumber: 15
							}, this), /* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)("input", {
								type: "text",
								required: true,
								value: form.endDate,
								onChange: (e) => setForm({
									...form,
									endDate: e.target.value
								}),
								className: "w-full rounded bg-black border border-gray-800 px-3 py-2 text-white outline-none focus:border-white",
								placeholder: "2022"
							}, void 0, false, {
								fileName: _jsxFileName,
								lineNumber: 140,
								columnNumber: 15
							}, this)]
						}, void 0, true, {
							fileName: _jsxFileName,
							lineNumber: 136,
							columnNumber: 13
						}, this)]
					}, void 0, true, {
						fileName: _jsxFileName,
						lineNumber: 122,
						columnNumber: 11
					}, this),
					/* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)("div", { children: [/* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)("label", {
						className: "block text-xs uppercase tracking-widest text-gray-400 mb-1",
						children: "Field of Study / Info"
					}, void 0, false, {
						fileName: _jsxFileName,
						lineNumber: 152,
						columnNumber: 13
					}, this), /* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)("input", {
						type: "text",
						value: form.fieldOfStudy,
						onChange: (e) => setForm({
							...form,
							fieldOfStudy: e.target.value
						}),
						className: "w-full rounded bg-black border border-gray-800 px-3 py-2 text-white outline-none focus:border-white",
						placeholder: "Science / Humanities"
					}, void 0, false, {
						fileName: _jsxFileName,
						lineNumber: 155,
						columnNumber: 13
					}, this)] }, void 0, true, {
						fileName: _jsxFileName,
						lineNumber: 151,
						columnNumber: 11
					}, this),
					/* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)("div", { children: [/* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)("label", {
						className: "block text-xs uppercase tracking-widest text-gray-400 mb-1",
						children: "Description"
					}, void 0, false, {
						fileName: _jsxFileName,
						lineNumber: 165,
						columnNumber: 13
					}, this), /* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)("textarea", {
						rows: 3,
						value: form.description,
						onChange: (e) => setForm({
							...form,
							description: e.target.value
						}),
						className: "w-full rounded bg-black border border-gray-800 px-3 py-2 text-white outline-none focus:border-white resize-none",
						placeholder: "Key accomplishments or details..."
					}, void 0, false, {
						fileName: _jsxFileName,
						lineNumber: 168,
						columnNumber: 13
					}, this)] }, void 0, true, {
						fileName: _jsxFileName,
						lineNumber: 164,
						columnNumber: 11
					}, this),
					/* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)("div", {
						className: "flex gap-2 pt-2",
						children: /* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)("button", {
							type: "submit",
							className: "flex-1 btn-primary text-white font-semibold py-2 rounded transition-all flex items-center justify-center gap-2",
							children: [/* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)(Plus, { size: 16 }, void 0, false, {
								fileName: _jsxFileName,
								lineNumber: 182,
								columnNumber: 15
							}, this), editingId ? "Update Entry" : "Add Entry"]
						}, void 0, true, {
							fileName: _jsxFileName,
							lineNumber: 178,
							columnNumber: 13
						}, this)
					}, void 0, false, {
						fileName: _jsxFileName,
						lineNumber: 177,
						columnNumber: 11
					}, this)
				]
			}, void 0, true, {
				fileName: _jsxFileName,
				lineNumber: 86,
				columnNumber: 9
			}, this), /* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)("div", {
				className: "md:col-span-7 bg-gray-950 border border-gray-800 rounded-lg p-6",
				children: [/* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)("h2", {
					className: "text-xl font-bold text-white mb-4",
					children: "Education Timeline"
				}, void 0, false, {
					fileName: _jsxFileName,
					lineNumber: 189,
					columnNumber: 11
				}, this), isLoading ? /* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)("p", {
					className: "text-gray-400",
					children: "Loading timeline..."
				}, void 0, false, {
					fileName: _jsxFileName,
					lineNumber: 191,
					columnNumber: 13
				}, this) : items.length === 0 ? /* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)("p", {
					className: "text-gray-500",
					children: "No education records yet."
				}, void 0, false, {
					fileName: _jsxFileName,
					lineNumber: 193,
					columnNumber: 13
				}, this) : /* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)("div", {
					className: "space-y-3",
					children: items.map((x) => /* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)("div", {
						className: "p-4 bg-black border border-gray-800 rounded-lg flex justify-between items-start",
						children: [/* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)("div", { children: [
							/* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)("span", {
								className: "font-mono text-xs text-[var(--primary)]",
								children: [
									x.startDate,
									" — ",
									x.endDate
								]
							}, void 0, true, {
								fileName: _jsxFileName,
								lineNumber: 202,
								columnNumber: 21
							}, this),
							/* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)("h3", {
								className: "font-bold text-white text-lg mt-1",
								children: x.degree
							}, void 0, false, {
								fileName: _jsxFileName,
								lineNumber: 205,
								columnNumber: 21
							}, this),
							/* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)("p", {
								className: "text-xs text-gray-400 mt-0.5",
								children: x.institution
							}, void 0, false, {
								fileName: _jsxFileName,
								lineNumber: 206,
								columnNumber: 21
							}, this),
							x.description && /* @__PURE__ */ (void 0)("p", {
								className: "text-sm text-gray-300 mt-2",
								children: x.description
							}, void 0, false, {
								fileName: _jsxFileName,
								lineNumber: 207,
								columnNumber: 39
							}, this)
						] }, void 0, true, {
							fileName: _jsxFileName,
							lineNumber: 201,
							columnNumber: 19
						}, this), /* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)("div", {
							className: "flex gap-2",
							children: [/* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)("button", {
								onClick: () => {
									setEditingId(x._id);
									setForm({
										degree: x.degree,
										institution: x.institution,
										fieldOfStudy: x.fieldOfStudy || "",
										startDate: x.startDate,
										endDate: x.endDate,
										description: x.description || "",
										displayOrder: x.displayOrder || 1
									});
								},
								className: "p-1.5 text-gray-400 hover:text-white",
								children: /* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)(Pen, { size: 16 }, void 0, false, {
									fileName: _jsxFileName,
									lineNumber: 225,
									columnNumber: 23
								}, this)
							}, void 0, false, {
								fileName: _jsxFileName,
								lineNumber: 210,
								columnNumber: 21
							}, this), /* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)("button", {
								onClick: () => handleDelete(x._id),
								className: "p-1.5 text-red-400 hover:text-red-300",
								children: /* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)(Trash2, { size: 16 }, void 0, false, {
									fileName: _jsxFileName,
									lineNumber: 231,
									columnNumber: 23
								}, this)
							}, void 0, false, {
								fileName: _jsxFileName,
								lineNumber: 227,
								columnNumber: 21
							}, this)]
						}, void 0, true, {
							fileName: _jsxFileName,
							lineNumber: 209,
							columnNumber: 19
						}, this)]
					}, x._id, true, {
						fileName: _jsxFileName,
						lineNumber: 197,
						columnNumber: 17
					}, this))
				}, void 0, false, {
					fileName: _jsxFileName,
					lineNumber: 195,
					columnNumber: 13
				}, this)]
			}, void 0, true, {
				fileName: _jsxFileName,
				lineNumber: 188,
				columnNumber: 9
			}, this)]
		}, void 0, true, {
			fileName: _jsxFileName,
			lineNumber: 85,
			columnNumber: 7
		}, this)]
	}, void 0, true, {
		fileName: _jsxFileName,
		lineNumber: 79,
		columnNumber: 5
	}, this);
}
var $$splitComponentImporter$2 = () => import("./categories-ZCiTQgvO.mjs");
var Route$2 = createFileRoute("/admin/_layout/categories")({ component: lazyRouteComponent($$splitComponentImporter$2, "component") });
var $$splitComponentImporter$1 = () => import("./backup-3ss1Pymr.mjs");
var Route$1 = createFileRoute("/admin/_layout/backup")({ component: lazyRouteComponent($$splitComponentImporter$1, "component") });
var $$splitComponentImporter = () => import("./analytics-CF8Wm8Sm.mjs");
var Route = createFileRoute("/admin/_layout/analytics")({ component: lazyRouteComponent($$splitComponentImporter, "component") });
var ServicesRoute = Route$41.update({
	id: "/services",
	path: "/services",
	getParentRoute: () => Route$42
});
var ProjectsRoute = Route$40.update({
	id: "/projects",
	path: "/projects",
	getParentRoute: () => Route$42
});
var ProjectRoute = Route$39.update({
	id: "/project",
	path: "/project",
	getParentRoute: () => Route$42
});
var ContactRoute = Route$38.update({
	id: "/contact",
	path: "/contact",
	getParentRoute: () => Route$42
});
var AboutRoute = Route$37.update({
	id: "/about",
	path: "/about",
	getParentRoute: () => Route$42
});
var IndexRoute = Route$36.update({
	id: "/",
	path: "/",
	getParentRoute: () => Route$42
});
var ApiSkillsRoute = Route$35.update({
	id: "/api/skills",
	path: "/api/skills",
	getParentRoute: () => Route$42
});
var ApiSettingsRoute = Route$34.update({
	id: "/api/settings",
	path: "/api/settings",
	getParentRoute: () => Route$42
});
var ApiServicesRoute = Route$33.update({
	id: "/api/services",
	path: "/api/services",
	getParentRoute: () => Route$42
});
var ApiProjectsRoute = Route$32.update({
	id: "/api/projects",
	path: "/api/projects",
	getParentRoute: () => Route$42
});
var ApiMessagesRoute = Route$31.update({
	id: "/api/messages",
	path: "/api/messages",
	getParentRoute: () => Route$42
});
var ApiMediaRoute = Route$30.update({
	id: "/api/media",
	path: "/api/media",
	getParentRoute: () => Route$42
});
var ApiExperienceRoute = Route$29.update({
	id: "/api/experience",
	path: "/api/experience",
	getParentRoute: () => Route$42
});
var ApiEducationRoute = Route$28.update({
	id: "/api/education",
	path: "/api/education",
	getParentRoute: () => Route$42
});
var ApiContactRoute = Route$27.update({
	id: "/api/contact",
	path: "/api/contact",
	getParentRoute: () => Route$42
});
var ApiCategoriesRoute = Route$26.update({
	id: "/api/categories",
	path: "/api/categories",
	getParentRoute: () => Route$42
});
var AdminLoginRoute = Route$25.update({
	id: "/admin/login",
	path: "/admin/login",
	getParentRoute: () => Route$42
});
var AdminGoogleCallbackRoute = Route$24.update({
	id: "/admin/google-callback",
	path: "/admin/google-callback",
	getParentRoute: () => Route$42
});
var AdminLayoutRoute = Route$23.update({
	id: "/admin/_layout",
	path: "/admin",
	getParentRoute: () => Route$42
});
var AdminLayoutIndexRoute = Route$22.update({
	id: "/",
	path: "/",
	getParentRoute: () => AdminLayoutRoute
});
var ApiUploadsFilenameRoute = Route$21.update({
	id: "/api/uploads/$filename",
	path: "/api/uploads/$filename",
	getParentRoute: () => Route$42
});
var ApiSkillsChar91idChar93Route = Route$20.update({
	id: "/id",
	path: "/id",
	getParentRoute: () => ApiSkillsRoute
});
var ApiSkillsIdRoute = Route$19.update({
	id: "/$id",
	path: "/$id",
	getParentRoute: () => ApiSkillsRoute
});
var ApiProjectsIdRoute = Route$18.update({
	id: "/$id",
	path: "/$id",
	getParentRoute: () => ApiProjectsRoute
});
var ApiCategoriesIdRoute = Route$17.update({
	id: "/$id",
	path: "/$id",
	getParentRoute: () => ApiCategoriesRoute
});
var ApiAuthSignupRoute = Route$16.update({
	id: "/api/auth/signup",
	path: "/api/auth/signup",
	getParentRoute: () => Route$42
});
var ApiAuthLoginRoute = Route$15.update({
	id: "/api/auth/login",
	path: "/api/auth/login",
	getParentRoute: () => Route$42
});
var ApiAuthCheckRoute = Route$14.update({
	id: "/api/auth/check",
	path: "/api/auth/check",
	getParentRoute: () => Route$42
});
var AdminLayoutTestimonialsRoute = Route$13.update({
	id: "/testimonials",
	path: "/testimonials",
	getParentRoute: () => AdminLayoutRoute
});
var AdminLayoutSkillsRoute = Route$12.update({
	id: "/skills",
	path: "/skills",
	getParentRoute: () => AdminLayoutRoute
});
var AdminLayoutSettingsRoute = Route$11.update({
	id: "/settings",
	path: "/settings",
	getParentRoute: () => AdminLayoutRoute
});
var AdminLayoutServicesRoute = Route$10.update({
	id: "/services",
	path: "/services",
	getParentRoute: () => AdminLayoutRoute
});
var AdminLayoutSeoRoute = Route$9.update({
	id: "/seo",
	path: "/seo",
	getParentRoute: () => AdminLayoutRoute
});
var AdminLayoutSecurityRoute = Route$8.update({
	id: "/security",
	path: "/security",
	getParentRoute: () => AdminLayoutRoute
});
var AdminLayoutPortfolioRoute = Route$7.update({
	id: "/portfolio",
	path: "/portfolio",
	getParentRoute: () => AdminLayoutRoute
});
var AdminLayoutMessagesRoute = Route$6.update({
	id: "/messages",
	path: "/messages",
	getParentRoute: () => AdminLayoutRoute
});
var AdminLayoutMediaRoute = Route$5.update({
	id: "/media",
	path: "/media",
	getParentRoute: () => AdminLayoutRoute
});
var AdminLayoutExperienceRoute = Route$4.update({
	id: "/experience",
	path: "/experience",
	getParentRoute: () => AdminLayoutRoute
});
var AdminLayoutEducationRoute = Route$3.update({
	id: "/education",
	path: "/education",
	getParentRoute: () => AdminLayoutRoute
});
var AdminLayoutCategoriesRoute = Route$2.update({
	id: "/categories",
	path: "/categories",
	getParentRoute: () => AdminLayoutRoute
});
var AdminLayoutBackupRoute = Route$1.update({
	id: "/backup",
	path: "/backup",
	getParentRoute: () => AdminLayoutRoute
});
var AdminLayoutRouteChildren = {
	AdminLayoutAnalyticsRoute: Route.update({
		id: "/analytics",
		path: "/analytics",
		getParentRoute: () => AdminLayoutRoute
	}),
	AdminLayoutBackupRoute,
	AdminLayoutCategoriesRoute,
	AdminLayoutEducationRoute,
	AdminLayoutExperienceRoute,
	AdminLayoutMediaRoute,
	AdminLayoutMessagesRoute,
	AdminLayoutPortfolioRoute,
	AdminLayoutSecurityRoute,
	AdminLayoutSeoRoute,
	AdminLayoutServicesRoute,
	AdminLayoutSettingsRoute,
	AdminLayoutSkillsRoute,
	AdminLayoutTestimonialsRoute,
	AdminLayoutIndexRoute
};
var AdminLayoutRouteWithChildren = AdminLayoutRoute._addFileChildren(AdminLayoutRouteChildren);
var ApiCategoriesRouteChildren = { ApiCategoriesIdRoute };
var ApiCategoriesRouteWithChildren = ApiCategoriesRoute._addFileChildren(ApiCategoriesRouteChildren);
var ApiProjectsRouteChildren = { ApiProjectsIdRoute };
var ApiProjectsRouteWithChildren = ApiProjectsRoute._addFileChildren(ApiProjectsRouteChildren);
var ApiSkillsRouteChildren = {
	ApiSkillsIdRoute,
	ApiSkillsChar91idChar93Route
};
var rootRouteChildren = {
	IndexRoute,
	AboutRoute,
	ContactRoute,
	ProjectRoute,
	ProjectsRoute,
	ServicesRoute,
	AdminLayoutRoute: AdminLayoutRouteWithChildren,
	AdminGoogleCallbackRoute,
	AdminLoginRoute,
	ApiCategoriesRoute: ApiCategoriesRouteWithChildren,
	ApiContactRoute,
	ApiEducationRoute,
	ApiExperienceRoute,
	ApiMediaRoute,
	ApiMessagesRoute,
	ApiProjectsRoute: ApiProjectsRouteWithChildren,
	ApiServicesRoute,
	ApiSettingsRoute,
	ApiSkillsRoute: ApiSkillsRoute._addFileChildren(ApiSkillsRouteChildren),
	ApiAuthCheckRoute,
	ApiAuthLoginRoute,
	ApiAuthSignupRoute,
	ApiUploadsFilenameRoute
};
var routeTree = Route$42._addFileChildren(rootRouteChildren)._addFileTypes();
var getRouter = () => {
	return createRouter({
		routeTree,
		context: { queryClient: new QueryClient() },
		scrollRestoration: true,
		defaultPreloadStaleTime: 0
	});
};
//#endregion
export { getRouter };
