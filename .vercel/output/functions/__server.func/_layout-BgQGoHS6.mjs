import { o as __toESM } from "./_runtime.mjs";
import { u as require_react } from "./_libs/@floating-ui/react-dom+[...].mjs";
import { t as useLocalStorage } from "./_ssr/use-local-storage-DfBBwPrj.mjs";
import { g as Link } from "./_libs/@tanstack/react-router+[...].mjs";
import { t as require_jsx_dev_runtime } from "./_libs/react.mjs";
import { C as Download, M as Briefcase, S as Eye, T as CodeXml, r as Users, v as Layers } from "./_libs/lucide-react.mjs";
//#region node_modules/.nitro/vite/services/ssr/assets/_layout-BgQGoHS6.js
var import_react = /* @__PURE__ */ __toESM(require_react());
var import_jsx_dev_runtime = require_jsx_dev_runtime();
var _jsxFileName = "E:/Web/creative-canvas-hub-main/creative-canvas-hub-main/src/routes/admin/_layout/index.tsx?tsr-split=component";
function AdminDashboard() {
	const [token] = useLocalStorage("admin_token", "");
	const [stats, setStats] = (0, import_react.useState)(null);
	const [isLoading, setIsLoading] = (0, import_react.useState)(true);
	(0, import_react.useEffect)(() => {
		const fetchStats = async () => {
			try {
				const authHeader = token ? { Authorization: "Bearer " + token } : {};
				const [projectsRes, categoriesRes, skillsRes] = await Promise.all([
					fetch("/api/projects?limit=1000", { headers: authHeader }),
					fetch("/api/categories", { headers: authHeader }),
					fetch("/api/skills?limit=1000", { headers: authHeader })
				]);
				const projectsData = await projectsRes.json();
				const categoriesData = await categoriesRes.json();
				const skillsData = await skillsRes.json();
				const projects = projectsData.data || [];
				const featured = projects.filter((p) => p.featured).length;
				const hidden = projects.filter((p) => p.hidden).length;
				setStats({
					totalProjects: projectsData.total || projects.length,
					featuredProjects: featured,
					hiddenProjects: hidden,
					totalCategories: categoriesData.data?.length || 0,
					totalSkills: skillsData.total || skillsData.data?.length || 0,
					totalServices: 0,
					visitors: 0,
					messages: 0,
					resumeDownloads: 0
				});
			} catch (error) {
				console.error("Failed to fetch stats:", error);
			} finally {
				setIsLoading(false);
			}
		};
		fetchStats();
	}, [token]);
	if (isLoading) return /* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)("div", { children: "Loading..." }, void 0, false, {
		fileName: _jsxFileName,
		lineNumber: 60,
		columnNumber: 12
	}, this);
	const StatCard = ({ icon, label, value }) => /* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)("div", {
		className: "bg-gray-900 border border-gray-800 rounded-lg p-6",
		children: [/* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)("div", {
			className: "flex items-center justify-between mb-4",
			children: [/* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)("h3", {
				className: "text-sm font-medium text-gray-400",
				children: label
			}, void 0, false, {
				fileName: _jsxFileName,
				lineNumber: 72,
				columnNumber: 9
			}, this), icon]
		}, void 0, true, {
			fileName: _jsxFileName,
			lineNumber: 71,
			columnNumber: 7
		}, this), /* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)("p", {
			className: "text-3xl font-bold text-white",
			children: value
		}, void 0, false, {
			fileName: _jsxFileName,
			lineNumber: 75,
			columnNumber: 7
		}, this)]
	}, void 0, true, {
		fileName: _jsxFileName,
		lineNumber: 70,
		columnNumber: 9
	}, this);
	return /* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)("div", { children: [
		/* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)("div", {
			className: "mb-8",
			children: [/* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)("h1", {
				className: "text-3xl font-bold text-white mb-2",
				children: "Dashboard"
			}, void 0, false, {
				fileName: _jsxFileName,
				lineNumber: 79,
				columnNumber: 9
			}, this), /* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)("p", {
				className: "text-gray-500",
				children: "Welcome to your admin panel"
			}, void 0, false, {
				fileName: _jsxFileName,
				lineNumber: 80,
				columnNumber: 9
			}, this)]
		}, void 0, true, {
			fileName: _jsxFileName,
			lineNumber: 78,
			columnNumber: 7
		}, this),
		/* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)("div", {
			className: "grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 mb-8",
			children: [
				/* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)(StatCard, {
					icon: /* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)(Briefcase, {
						size: 24,
						className: "text-blue-500"
					}, void 0, false, {
						fileName: _jsxFileName,
						lineNumber: 84,
						columnNumber: 25
					}, this),
					label: "Total Projects",
					value: stats?.totalProjects || 0
				}, void 0, false, {
					fileName: _jsxFileName,
					lineNumber: 84,
					columnNumber: 9
				}, this),
				/* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)(StatCard, {
					icon: /* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)(Eye, {
						size: 24,
						className: "text-green-500"
					}, void 0, false, {
						fileName: _jsxFileName,
						lineNumber: 85,
						columnNumber: 25
					}, this),
					label: "Featured Projects",
					value: stats?.featuredProjects || 0
				}, void 0, false, {
					fileName: _jsxFileName,
					lineNumber: 85,
					columnNumber: 9
				}, this),
				/* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)(StatCard, {
					icon: /* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)(Layers, {
						size: 24,
						className: "text-purple-500"
					}, void 0, false, {
						fileName: _jsxFileName,
						lineNumber: 86,
						columnNumber: 25
					}, this),
					label: "Categories",
					value: stats?.totalCategories || 0
				}, void 0, false, {
					fileName: _jsxFileName,
					lineNumber: 86,
					columnNumber: 9
				}, this),
				/* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)(StatCard, {
					icon: /* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)(CodeXml, {
						size: 24,
						className: "text-orange-500"
					}, void 0, false, {
						fileName: _jsxFileName,
						lineNumber: 87,
						columnNumber: 25
					}, this),
					label: "Skills",
					value: stats?.totalSkills || 0
				}, void 0, false, {
					fileName: _jsxFileName,
					lineNumber: 87,
					columnNumber: 9
				}, this),
				/* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)(StatCard, {
					icon: /* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)(Users, {
						size: 24,
						className: "text-pink-500"
					}, void 0, false, {
						fileName: _jsxFileName,
						lineNumber: 88,
						columnNumber: 25
					}, this),
					label: "Visitors",
					value: stats?.visitors || 0
				}, void 0, false, {
					fileName: _jsxFileName,
					lineNumber: 88,
					columnNumber: 9
				}, this),
				/* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)(StatCard, {
					icon: /* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)(Download, {
						size: 24,
						className: "text-cyan-500"
					}, void 0, false, {
						fileName: _jsxFileName,
						lineNumber: 89,
						columnNumber: 25
					}, this),
					label: "Resume Downloads",
					value: stats?.resumeDownloads || 0
				}, void 0, false, {
					fileName: _jsxFileName,
					lineNumber: 89,
					columnNumber: 9
				}, this)
			]
		}, void 0, true, {
			fileName: _jsxFileName,
			lineNumber: 83,
			columnNumber: 7
		}, this),
		/* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)("div", {
			className: "bg-gray-900 border border-gray-800 rounded-lg p-6",
			children: [/* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)("h2", {
				className: "text-lg font-bold text-white mb-4",
				children: "Quick Actions"
			}, void 0, false, {
				fileName: _jsxFileName,
				lineNumber: 93,
				columnNumber: 9
			}, this), /* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)("div", {
				className: "grid grid-cols-2 md:grid-cols-4 gap-4",
				children: [
					{
						label: "Edit Settings",
						href: "/admin/settings"
					},
					{
						label: "Add Project",
						href: "/admin/portfolio"
					},
					{
						label: "Manage Skills",
						href: "/admin/skills"
					},
					{
						label: "Open Website",
						href: "/",
						external: true
					},
					{
						label: "View Messages",
						href: "/admin/messages"
					}
				].map((action) => /* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)(Link, {
					to: action.href,
					target: action.external ? "_blank" : void 0,
					rel: action.external ? "noreferrer" : void 0,
					className: "bg-gray-800 hover:bg-gray-700 text-white font-medium py-3 px-4 rounded-lg text-center transition-colors",
					children: action.label
				}, action.href, false, {
					fileName: _jsxFileName,
					lineNumber: 111,
					columnNumber: 26
				}, this))
			}, void 0, false, {
				fileName: _jsxFileName,
				lineNumber: 94,
				columnNumber: 9
			}, this)]
		}, void 0, true, {
			fileName: _jsxFileName,
			lineNumber: 92,
			columnNumber: 7
		}, this)
	] }, void 0, true, {
		fileName: _jsxFileName,
		lineNumber: 77,
		columnNumber: 10
	}, this);
}
//#endregion
export { AdminDashboard as component };
