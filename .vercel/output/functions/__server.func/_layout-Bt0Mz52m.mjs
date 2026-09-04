import { o as __toESM } from "./_runtime.mjs";
import { u as require_react } from "./_libs/@floating-ui/react-dom+[...].mjs";
import { t as useLocalStorage } from "./_ssr/use-local-storage-DfBBwPrj.mjs";
import { _ as useNavigate, f as Outlet, g as Link } from "./_libs/@tanstack/react-router+[...].mjs";
import { t as require_jsx_dev_runtime } from "./_libs/react.mjs";
import { A as ChartColumn, M as Briefcase, N as BookOpen, P as Award, T as CodeXml, _ as LayoutDashboard, b as HardDrive, c as Search, g as Lock, h as LogOut, m as Mail, p as MessageSquare, s as Settings, t as Zap, v as Layers, x as Globe, y as Image } from "./_libs/lucide-react.mjs";
import { t as fetchWithAuth } from "./_ssr/admin-api-B-is0sao.mjs";
//#region node_modules/.nitro/vite/services/ssr/assets/_layout-Bt0Mz52m.js
var import_react = /* @__PURE__ */ __toESM(require_react());
var import_jsx_dev_runtime = require_jsx_dev_runtime();
var _jsxFileName$1 = "E:/Web/creative-canvas-hub-main/creative-canvas-hub-main/src/components/admin/AdminSidebar.tsx";
var menuItems = [
	{
		icon: LayoutDashboard,
		label: "Dashboard",
		path: "/admin"
	},
	{
		icon: Settings,
		label: "Website Settings",
		path: "/admin/settings"
	},
	{
		icon: Briefcase,
		label: "Portfolio",
		path: "/admin/portfolio"
	},
	{
		icon: Layers,
		label: "Categories",
		path: "/admin/categories"
	},
	{
		icon: CodeXml,
		label: "Skills",
		path: "/admin/skills"
	},
	{
		icon: Zap,
		label: "Services",
		path: "/admin/services"
	},
	{
		icon: Award,
		label: "Experience",
		path: "/admin/experience"
	},
	{
		icon: BookOpen,
		label: "Education",
		path: "/admin/education"
	},
	{
		icon: MessageSquare,
		label: "Testimonials",
		path: "/admin/testimonials"
	},
	{
		icon: Image,
		label: "Media Library",
		path: "/admin/media"
	},
	{
		icon: Search,
		label: "SEO",
		path: "/admin/seo"
	},
	{
		icon: Mail,
		label: "Contact Messages",
		path: "/admin/messages"
	},
	{
		icon: ChartColumn,
		label: "Analytics",
		path: "/admin/analytics"
	},
	{
		icon: Lock,
		label: "Security",
		path: "/admin/security"
	},
	{
		icon: HardDrive,
		label: "Backup",
		path: "/admin/backup"
	}
];
function AdminSidebar() {
	const navigate = useNavigate();
	const [, setToken] = useLocalStorage("admin_token", "");
	const handleLogout = () => {
		setToken("");
		navigate({ to: "/admin/login" });
	};
	return /* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)("aside", {
		className: "fixed left-0 top-0 w-64 h-screen bg-gray-950 border-r border-gray-800 p-6 overflow-y-auto",
		children: [
			/* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)("div", {
				className: "mb-8 pb-8 border-b border-gray-800",
				children: [/* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)(Link, {
					to: "/",
					target: "_blank",
					rel: "noreferrer",
					className: "flex items-center gap-3 text-white hover:text-emerald-400 transition-colors",
					children: [/* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)("img", {
						src: "/MCU-LOGO-0.2V-1.png",
						alt: "MCU Logo",
						className: "h-11 w-auto object-contain"
					}, void 0, false, {
						fileName: _jsxFileName$1,
						lineNumber: 55,
						columnNumber: 11
					}, this), /* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)("h1", {
						className: "text-xl font-bold leading-tight",
						children: "Admin Panel"
					}, void 0, false, {
						fileName: _jsxFileName$1,
						lineNumber: 56,
						columnNumber: 11
					}, this)]
				}, void 0, true, {
					fileName: _jsxFileName$1,
					lineNumber: 54,
					columnNumber: 9
				}, this), /* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)("p", {
					className: "text-xs text-gray-500 mt-1",
					children: "Creative Canvas Hub"
				}, void 0, false, {
					fileName: _jsxFileName$1,
					lineNumber: 58,
					columnNumber: 9
				}, this)]
			}, void 0, true, {
				fileName: _jsxFileName$1,
				lineNumber: 53,
				columnNumber: 7
			}, this),
			/* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)("nav", {
				className: "space-y-2 mb-8",
				children: menuItems.map((item) => {
					const Icon = item.icon;
					return /* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)(Link, {
						to: item.path,
						activeProps: { className: "bg-gray-900 text-white" },
						className: "flex items-center gap-3 px-4 py-2.5 rounded-lg text-gray-400 hover:text-white hover:bg-gray-900 transition-colors",
						children: [/* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)(Icon, { size: 18 }, void 0, false, {
							fileName: _jsxFileName$1,
							lineNumber: 74,
							columnNumber: 15
						}, this), /* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)("span", {
							className: "text-sm font-medium",
							children: item.label
						}, void 0, false, {
							fileName: _jsxFileName$1,
							lineNumber: 75,
							columnNumber: 15
						}, this)]
					}, item.path, true, {
						fileName: _jsxFileName$1,
						lineNumber: 66,
						columnNumber: 13
					}, this);
				})
			}, void 0, false, {
				fileName: _jsxFileName$1,
				lineNumber: 62,
				columnNumber: 7
			}, this),
			/* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)("div", {
				className: "border-t border-gray-800 pt-6 space-y-2",
				children: [/* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)(Link, {
					to: "/",
					target: "_blank",
					rel: "noreferrer",
					className: "flex items-center gap-3 w-full px-4 py-2.5 rounded-lg text-gray-400 hover:text-white hover:bg-gray-900 transition-colors",
					children: [/* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)(Globe, { size: 18 }, void 0, false, {
						fileName: _jsxFileName$1,
						lineNumber: 88,
						columnNumber: 11
					}, this), /* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)("span", {
						className: "text-sm font-medium",
						children: "View Website"
					}, void 0, false, {
						fileName: _jsxFileName$1,
						lineNumber: 89,
						columnNumber: 11
					}, this)]
				}, void 0, true, {
					fileName: _jsxFileName$1,
					lineNumber: 82,
					columnNumber: 9
				}, this), /* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)("button", {
					onClick: handleLogout,
					className: "flex items-center gap-3 w-full px-4 py-2.5 rounded-lg text-gray-400 hover:text-white hover:bg-gray-900 transition-colors",
					children: [/* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)(LogOut, { size: 18 }, void 0, false, {
						fileName: _jsxFileName$1,
						lineNumber: 96,
						columnNumber: 11
					}, this), /* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)("span", {
						className: "text-sm font-medium",
						children: "Logout"
					}, void 0, false, {
						fileName: _jsxFileName$1,
						lineNumber: 97,
						columnNumber: 11
					}, this)]
				}, void 0, true, {
					fileName: _jsxFileName$1,
					lineNumber: 92,
					columnNumber: 9
				}, this)]
			}, void 0, true, {
				fileName: _jsxFileName$1,
				lineNumber: 81,
				columnNumber: 7
			}, this)
		]
	}, void 0, true, {
		fileName: _jsxFileName$1,
		lineNumber: 51,
		columnNumber: 5
	}, this);
}
var _jsxFileName = "E:/Web/creative-canvas-hub-main/creative-canvas-hub-main/src/routes/admin/_layout.tsx?tsr-split=component";
function AdminLayout() {
	const navigate = useNavigate();
	const [token, setToken] = useLocalStorage("admin_token", "");
	const [isAuthenticated, setIsAuthenticated] = (0, import_react.useState)(false);
	const [isLoading, setIsLoading] = (0, import_react.useState)(true);
	(0, import_react.useEffect)(() => {
		const checkAuth = async () => {
			if (!token) {
				navigate({
					to: "/admin/login",
					replace: true
				});
				setIsLoading(false);
				return;
			}
			try {
				await fetchWithAuth(token, "/api/auth/check");
				setIsAuthenticated(true);
			} catch (error) {
				console.error("Auth check failed:", error);
				setToken("");
				navigate({
					to: "/admin/login",
					replace: true
				});
			} finally {
				setIsLoading(false);
			}
		};
		checkAuth();
	}, [
		token,
		navigate,
		setToken
	]);
	if (isLoading) return /* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)("div", {
		className: "flex items-center justify-center min-h-screen bg-black text-white",
		children: /* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)("div", {
			className: "text-center",
			children: [/* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)("div", { className: "w-12 h-12 border-4 border-gray-800 border-t-white rounded-full animate-spin mx-auto mb-4" }, void 0, false, {
				fileName: _jsxFileName,
				lineNumber: 40,
				columnNumber: 11
			}, this), /* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)("p", { children: "Loading Admin Panel..." }, void 0, false, {
				fileName: _jsxFileName,
				lineNumber: 41,
				columnNumber: 11
			}, this)]
		}, void 0, true, {
			fileName: _jsxFileName,
			lineNumber: 39,
			columnNumber: 9
		}, this)
	}, void 0, false, {
		fileName: _jsxFileName,
		lineNumber: 38,
		columnNumber: 12
	}, this);
	if (!isAuthenticated) return null;
	return /* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)("div", {
		className: "flex min-h-screen bg-black text-white",
		children: [/* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)(AdminSidebar, {}, void 0, false, {
			fileName: _jsxFileName,
			lineNumber: 49,
			columnNumber: 7
		}, this), /* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)("div", {
			className: "flex-1 ml-64",
			children: /* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)("div", {
				className: "p-8",
				children: /* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)(Outlet, {}, void 0, false, {
					fileName: _jsxFileName,
					lineNumber: 52,
					columnNumber: 11
				}, this)
			}, void 0, false, {
				fileName: _jsxFileName,
				lineNumber: 51,
				columnNumber: 9
			}, this)
		}, void 0, false, {
			fileName: _jsxFileName,
			lineNumber: 50,
			columnNumber: 7
		}, this)]
	}, void 0, true, {
		fileName: _jsxFileName,
		lineNumber: 48,
		columnNumber: 10
	}, this);
}
//#endregion
export { AdminLayout as component };
