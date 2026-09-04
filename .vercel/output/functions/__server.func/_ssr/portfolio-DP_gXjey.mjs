import { o as __toESM } from "../_runtime.mjs";
import { u as require_react } from "../_libs/@floating-ui/react-dom+[...].mjs";
import { t as useLocalStorage } from "./use-local-storage-DfBBwPrj.mjs";
import { t as require_jsx_dev_runtime } from "../_libs/react.mjs";
import { D as ChevronUp, O as ChevronDown, d as Pencil, k as Check, o as Trash2, u as Plus } from "../_libs/lucide-react.mjs";
import { t as fetchWithAuth } from "./admin-api-B-is0sao.mjs";
import { a as SelectItemIndicator, c as SelectPortal, d as SelectSeparator$1, f as SelectTrigger$1, i as SelectItem$1, l as SelectScrollDownButton$1, m as SelectViewport, n as SelectContent$1, o as SelectItemText, p as SelectValue$1, r as SelectIcon, s as SelectLabel$1, t as Select$1, u as SelectScrollUpButton$1 } from "../_libs/@radix-ui/react-select+[...].mjs";
import { a as cn, i as Switch, n as Input, r as Label, t as Button } from "./switch-BeOP6LuK.mjs";
import { a as Table, c as TableHead, i as DialogTitle, l as TableHeader, n as DialogContent, o as TableBody, r as DialogHeader, s as TableCell, t as Dialog, u as TableRow } from "./table-Cd5cyrDi.mjs";
import { t as Textarea } from "./textarea-BEdZpykQ.mjs";
//#region node_modules/.nitro/vite/services/ssr/assets/portfolio-DP_gXjey.js
var import_react = /* @__PURE__ */ __toESM(require_react());
var import_jsx_dev_runtime = require_jsx_dev_runtime();
var _jsxFileName$1 = "E:/Web/creative-canvas-hub-main/creative-canvas-hub-main/src/components/ui/select.tsx";
var Select = Select$1;
var SelectValue = SelectValue$1;
var SelectTrigger = import_react.forwardRef(({ className, children, ...props }, ref) => /* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)(SelectTrigger$1, {
	ref,
	className: cn("flex h-9 w-full items-center justify-between whitespace-nowrap rounded-md border border-input bg-transparent px-3 py-2 text-sm shadow-sm ring-offset-background cursor-pointer data-[placeholder]:text-muted-foreground focus:outline-none focus:ring-1 focus:ring-ring disabled:cursor-not-allowed disabled:opacity-50 [&>span]:line-clamp-1", className),
	...props,
	children: [children, /* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)(SelectIcon, {
		asChild: true,
		children: /* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)(ChevronDown, { className: "h-4 w-4 opacity-50" }, void 0, false, {
			fileName: _jsxFileName$1,
			lineNumber: 29,
			columnNumber: 7
		}, void 0)
	}, void 0, false, {
		fileName: _jsxFileName$1,
		lineNumber: 28,
		columnNumber: 5
	}, void 0)]
}, void 0, true, {
	fileName: _jsxFileName$1,
	lineNumber: 19,
	columnNumber: 3
}, void 0));
SelectTrigger.displayName = SelectTrigger$1.displayName;
var SelectScrollUpButton = import_react.forwardRef(({ className, ...props }, ref) => /* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)(SelectScrollUpButton$1, {
	ref,
	className: cn("flex cursor-default items-center justify-center py-1", className),
	...props,
	children: /* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)(ChevronUp, { className: "h-4 w-4" }, void 0, false, {
		fileName: _jsxFileName$1,
		lineNumber: 44,
		columnNumber: 5
	}, void 0)
}, void 0, false, {
	fileName: _jsxFileName$1,
	lineNumber: 39,
	columnNumber: 3
}, void 0));
SelectScrollUpButton.displayName = SelectScrollUpButton$1.displayName;
var SelectScrollDownButton = import_react.forwardRef(({ className, ...props }, ref) => /* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)(SelectScrollDownButton$1, {
	ref,
	className: cn("flex cursor-default items-center justify-center py-1", className),
	...props,
	children: /* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)(ChevronDown, { className: "h-4 w-4" }, void 0, false, {
		fileName: _jsxFileName$1,
		lineNumber: 58,
		columnNumber: 5
	}, void 0)
}, void 0, false, {
	fileName: _jsxFileName$1,
	lineNumber: 53,
	columnNumber: 3
}, void 0));
SelectScrollDownButton.displayName = SelectScrollDownButton$1.displayName;
var SelectContent = import_react.forwardRef(({ className, children, position = "popper", ...props }, ref) => /* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)(SelectPortal, { children: /* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)(SelectContent$1, {
	ref,
	className: cn("relative z-50 max-h-(--radix-select-content-available-height) min-w-[8rem] overflow-y-auto overflow-x-hidden rounded-md border bg-popover text-popover-foreground shadow-md data-[state=open]:animate-in data-[state=closed]:animate-out data-[state=closed]:fade-out-0 data-[state=open]:fade-in-0 data-[state=closed]:zoom-out-95 data-[state=open]:zoom-in-95 data-[side=bottom]:slide-in-from-top-2 data-[side=left]:slide-in-from-right-2 data-[side=right]:slide-in-from-left-2 data-[side=top]:slide-in-from-bottom-2 origin-(--radix-select-content-transform-origin)", position === "popper" && "data-[side=bottom]:translate-y-1 data-[side=left]:-translate-x-1 data-[side=right]:translate-x-1 data-[side=top]:-translate-y-1", className),
	position,
	...props,
	children: [
		/* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)(SelectScrollUpButton, {}, void 0, false, {
			fileName: _jsxFileName$1,
			lineNumber: 79,
			columnNumber: 7
		}, void 0),
		/* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)(SelectViewport, {
			className: cn("p-1", position === "popper" && "h-[var(--radix-select-trigger-height)] w-full min-w-[var(--radix-select-trigger-width)]"),
			children
		}, void 0, false, {
			fileName: _jsxFileName$1,
			lineNumber: 80,
			columnNumber: 7
		}, void 0),
		/* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)(SelectScrollDownButton, {}, void 0, false, {
			fileName: _jsxFileName$1,
			lineNumber: 89,
			columnNumber: 7
		}, void 0)
	]
}, void 0, true, {
	fileName: _jsxFileName$1,
	lineNumber: 68,
	columnNumber: 5
}, void 0) }, void 0, false, {
	fileName: _jsxFileName$1,
	lineNumber: 67,
	columnNumber: 3
}, void 0));
SelectContent.displayName = SelectContent$1.displayName;
var SelectLabel = import_react.forwardRef(({ className, ...props }, ref) => /* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)(SelectLabel$1, {
	ref,
	className: cn("px-2 py-1.5 text-sm font-semibold", className),
	...props
}, void 0, false, {
	fileName: _jsxFileName$1,
	lineNumber: 99,
	columnNumber: 3
}, void 0));
SelectLabel.displayName = SelectLabel$1.displayName;
var SelectItem = import_react.forwardRef(({ className, children, ...props }, ref) => /* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)(SelectItem$1, {
	ref,
	className: cn("relative flex w-full cursor-default select-none items-center rounded-sm py-1.5 pl-2 pr-8 text-sm outline-none focus:bg-accent focus:text-accent-foreground data-[disabled]:pointer-events-none data-[disabled]:opacity-50", className),
	...props,
	children: [/* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)("span", {
		className: "absolute right-2 flex h-3.5 w-3.5 items-center justify-center",
		children: /* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)(SelectItemIndicator, { children: /* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)(Check, { className: "h-4 w-4" }, void 0, false, {
			fileName: _jsxFileName$1,
			lineNumber: 121,
			columnNumber: 9
		}, void 0) }, void 0, false, {
			fileName: _jsxFileName$1,
			lineNumber: 120,
			columnNumber: 7
		}, void 0)
	}, void 0, false, {
		fileName: _jsxFileName$1,
		lineNumber: 119,
		columnNumber: 5
	}, void 0), /* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)(SelectItemText, { children }, void 0, false, {
		fileName: _jsxFileName$1,
		lineNumber: 124,
		columnNumber: 5
	}, void 0)]
}, void 0, true, {
	fileName: _jsxFileName$1,
	lineNumber: 111,
	columnNumber: 3
}, void 0));
SelectItem.displayName = SelectItem$1.displayName;
var SelectSeparator = import_react.forwardRef(({ className, ...props }, ref) => /* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)(SelectSeparator$1, {
	ref,
	className: cn("-mx-1 my-1 h-px bg-muted", className),
	...props
}, void 0, false, {
	fileName: _jsxFileName$1,
	lineNumber: 133,
	columnNumber: 3
}, void 0));
SelectSeparator.displayName = SelectSeparator$1.displayName;
var _jsxFileName = "E:/Web/creative-canvas-hub-main/creative-canvas-hub-main/src/routes/admin/_layout/portfolio.tsx?tsr-split=component";
var emptyProject = () => ({
	title: "",
	slug: "",
	category: "",
	shortDescription: "",
	fullDescription: "",
	thumbnail: "",
	featured: false,
	hidden: false,
	status: "draft",
	displayOrder: 0,
	liveWebsite: "",
	googleDriveLink: "",
	youtubeLink: "",
	behanceLink: "",
	githubLink: "",
	clientName: "",
	galleryImages: [],
	tags: []
});
function generateSlug(value) {
	return value.toLowerCase().trim().replace(/[^a-z0-9]+/g, "-").replace(/(^-|-$)+/g, "");
}
function extractYouTubeId(url) {
	const match = url.match(/(?:youtu\.be\/|youtube\.com\/(?:embed\/|v\/|watch\?v=|watch\?.+&v=|shorts\/))([\w-]{11})/);
	return match ? match[1] : null;
}
function getYouTubeThumb(url) {
	const id = extractYouTubeId(url);
	return id ? `https://img.youtube.com/vi/${id}/hqdefault.jpg` : url;
}
function extractGoogleDriveId(url) {
	if (!url) return null;
	const match = url.match(/\/file\/d\/([a-zA-Z0-9_-]+)/) || url.match(/id=([a-zA-Z0-9_-]+)/) || url.match(/\/d\/([a-zA-Z0-9_-]+)/);
	return match ? match[1] : null;
}
function getDriveThumb(url) {
	const id = extractGoogleDriveId(url);
	return id ? `https://drive.google.com/uc?id=${id}&export=view` : url;
}
function AdminPortfolio() {
	const [token] = useLocalStorage("admin_token", "");
	const [projects, setProjects] = (0, import_react.useState)([]);
	const [categories, setCategories] = (0, import_react.useState)([]);
	const [isLoading, setIsLoading] = (0, import_react.useState)(true);
	const [dialogOpen, setDialogOpen] = (0, import_react.useState)(false);
	const [editing, setEditing] = (0, import_react.useState)(null);
	const [form, setForm] = (0, import_react.useState)(emptyProject());
	const [error, setError] = (0, import_react.useState)("");
	const [isSaving, setIsSaving] = (0, import_react.useState)(false);
	const loadData = (0, import_react.useCallback)(async () => {
		try {
			const [projectsRes, categoriesRes] = await Promise.all([fetchWithAuth(token, "/api/projects?limit=1000"), fetchWithAuth(token, "/api/categories")]);
			setProjects(projectsRes.data || []);
			setCategories(categoriesRes.data || []);
		} catch (err) {
			setError(err instanceof Error ? err.message : "Failed to load projects");
		} finally {
			setIsLoading(false);
		}
	}, [token]);
	(0, import_react.useEffect)(() => {
		loadData();
	}, [loadData]);
	const openCreate = () => {
		setEditing(null);
		setForm(emptyProject());
		setDialogOpen(true);
	};
	const openEdit = (project) => {
		setEditing(project);
		setForm({
			title: project.title,
			slug: project.slug,
			category: project.category,
			shortDescription: project.shortDescription,
			fullDescription: project.fullDescription,
			thumbnail: project.thumbnail,
			featured: project.featured,
			hidden: project.hidden,
			status: project.status,
			displayOrder: project.displayOrder,
			liveWebsite: project.liveWebsite || "",
			googleDriveLink: project.googleDriveLink || "",
			youtubeLink: project.youtubeLink || "",
			behanceLink: project.behanceLink || "",
			githubLink: project.githubLink || "",
			clientName: project.clientName || "",
			galleryImages: Array.isArray(project.galleryImages) ? project.galleryImages : [],
			tags: Array.isArray(project.tags) ? project.tags : []
		});
		setDialogOpen(true);
	};
	const handleSave = async () => {
		setIsSaving(true);
		setError("");
		try {
			const payload = {
				...form,
				category: form.category || categories[0]?._id || "Uncategorized",
				slug: form.slug?.trim() || generateSlug(form.title || "project"),
				title: form.title.trim(),
				shortDescription: form.shortDescription.trim(),
				fullDescription: form.fullDescription.trim(),
				galleryImages: Array.isArray(form.galleryImages) ? form.galleryImages : [],
				tags: Array.isArray(form.tags) ? form.tags : []
			};
			if (!payload.title) throw new Error("Project title is required");
			if (editing) await fetchWithAuth(token, `/api/projects/${editing._id}`, {
				method: "PUT",
				body: JSON.stringify(payload)
			});
			else await fetchWithAuth(token, "/api/projects", {
				method: "POST",
				body: JSON.stringify(payload)
			});
			setDialogOpen(false);
			await loadData();
		} catch (err) {
			setError(err instanceof Error ? err.message : "Failed to save project");
		} finally {
			setIsSaving(false);
		}
	};
	const handleDelete = async (id) => {
		if (!confirm("Delete this project?")) return;
		try {
			await fetchWithAuth(token, `/api/projects/${id}`, { method: "DELETE" });
			await loadData();
		} catch (err) {
			setError(err instanceof Error ? err.message : "Failed to delete project");
		}
	};
	if (isLoading) return /* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)("div", {
		className: "text-gray-400",
		children: "Loading portfolio..."
	}, void 0, false, {
		fileName: _jsxFileName,
		lineNumber: 185,
		columnNumber: 25
	}, this);
	return /* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)("div", { children: [
		/* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)("div", {
			className: "mb-8 flex items-center justify-between",
			children: [/* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)("div", { children: [/* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)("h1", {
				className: "text-3xl font-bold text-white",
				children: "Portfolio"
			}, void 0, false, {
				fileName: _jsxFileName,
				lineNumber: 189,
				columnNumber: 11
			}, this), /* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)("p", {
				className: "text-gray-500",
				children: "Manage your projects"
			}, void 0, false, {
				fileName: _jsxFileName,
				lineNumber: 190,
				columnNumber: 11
			}, this)] }, void 0, true, {
				fileName: _jsxFileName,
				lineNumber: 188,
				columnNumber: 9
			}, this), /* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)(Button, {
				onClick: openCreate,
				className: "btn-primary",
				children: [/* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)(Plus, {
					size: 16,
					className: "mr-2"
				}, void 0, false, {
					fileName: _jsxFileName,
					lineNumber: 193,
					columnNumber: 11
				}, this), "Add Project"]
			}, void 0, true, {
				fileName: _jsxFileName,
				lineNumber: 192,
				columnNumber: 9
			}, this)]
		}, void 0, true, {
			fileName: _jsxFileName,
			lineNumber: 187,
			columnNumber: 7
		}, this),
		error && /* @__PURE__ */ (void 0)("p", {
			className: "mb-4 text-sm text-red-400",
			children: error
		}, void 0, false, {
			fileName: _jsxFileName,
			lineNumber: 198,
			columnNumber: 17
		}, this),
		/* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)("div", {
			className: "rounded-lg border border-gray-800 bg-gray-900 overflow-hidden",
			children: /* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)(Table, { children: [/* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)(TableHeader, { children: /* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)(TableRow, {
				className: "border-gray-800 hover:bg-transparent",
				children: [
					/* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)(TableHead, {
						className: "text-gray-400",
						children: "Title"
					}, void 0, false, {
						fileName: _jsxFileName,
						lineNumber: 204,
						columnNumber: 15
					}, this),
					/* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)(TableHead, {
						className: "text-gray-400",
						children: "Status"
					}, void 0, false, {
						fileName: _jsxFileName,
						lineNumber: 205,
						columnNumber: 15
					}, this),
					/* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)(TableHead, {
						className: "text-gray-400",
						children: "Featured"
					}, void 0, false, {
						fileName: _jsxFileName,
						lineNumber: 206,
						columnNumber: 15
					}, this),
					/* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)(TableHead, {
						className: "text-gray-400 text-right",
						children: "Actions"
					}, void 0, false, {
						fileName: _jsxFileName,
						lineNumber: 207,
						columnNumber: 15
					}, this)
				]
			}, void 0, true, {
				fileName: _jsxFileName,
				lineNumber: 203,
				columnNumber: 13
			}, this) }, void 0, false, {
				fileName: _jsxFileName,
				lineNumber: 202,
				columnNumber: 11
			}, this), /* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)(TableBody, { children: projects.length === 0 ? /* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)(TableRow, { children: /* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)(TableCell, {
				colSpan: 4,
				className: "text-center text-gray-500 py-8",
				children: "No projects yet. Add your first project."
			}, void 0, false, {
				fileName: _jsxFileName,
				lineNumber: 212,
				columnNumber: 17
			}, this) }, void 0, false, {
				fileName: _jsxFileName,
				lineNumber: 211,
				columnNumber: 38
			}, this) : projects.map((project) => /* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)(TableRow, {
				className: "border-gray-800",
				children: [
					/* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)(TableCell, {
						className: "text-white font-medium",
						children: project.title
					}, void 0, false, {
						fileName: _jsxFileName,
						lineNumber: 216,
						columnNumber: 19
					}, this),
					/* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)(TableCell, {
						className: "text-gray-400 capitalize",
						children: project.status
					}, void 0, false, {
						fileName: _jsxFileName,
						lineNumber: 217,
						columnNumber: 19
					}, this),
					/* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)(TableCell, {
						className: "text-gray-400",
						children: project.featured ? "Yes" : "No"
					}, void 0, false, {
						fileName: _jsxFileName,
						lineNumber: 218,
						columnNumber: 19
					}, this),
					/* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)(TableCell, {
						className: "text-right",
						children: [/* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)(Button, {
							variant: "ghost",
							size: "sm",
							onClick: () => openEdit(project),
							className: "text-gray-400 hover:text-white",
							children: /* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)(Pencil, { size: 14 }, void 0, false, {
								fileName: _jsxFileName,
								lineNumber: 221,
								columnNumber: 23
							}, this)
						}, void 0, false, {
							fileName: _jsxFileName,
							lineNumber: 220,
							columnNumber: 21
						}, this), /* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)(Button, {
							variant: "ghost",
							size: "sm",
							onClick: () => handleDelete(project._id),
							className: "text-gray-400 hover:text-red-400",
							children: /* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)(Trash2, { size: 14 }, void 0, false, {
								fileName: _jsxFileName,
								lineNumber: 224,
								columnNumber: 23
							}, this)
						}, void 0, false, {
							fileName: _jsxFileName,
							lineNumber: 223,
							columnNumber: 21
						}, this)]
					}, void 0, true, {
						fileName: _jsxFileName,
						lineNumber: 219,
						columnNumber: 19
					}, this)
				]
			}, project._id, true, {
				fileName: _jsxFileName,
				lineNumber: 215,
				columnNumber: 53
			}, this)) }, void 0, false, {
				fileName: _jsxFileName,
				lineNumber: 210,
				columnNumber: 11
			}, this)] }, void 0, true, {
				fileName: _jsxFileName,
				lineNumber: 201,
				columnNumber: 9
			}, this)
		}, void 0, false, {
			fileName: _jsxFileName,
			lineNumber: 200,
			columnNumber: 7
		}, this),
		/* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)(Dialog, {
			open: dialogOpen,
			onOpenChange: setDialogOpen,
			children: /* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)(DialogContent, {
				className: "max-h-[90vh] overflow-y-auto bg-gray-950 border-gray-800 text-white sm:max-w-lg",
				children: [/* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)(DialogHeader, { children: /* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)(DialogTitle, { children: editing ? "Edit Project" : "Add Project" }, void 0, false, {
					fileName: _jsxFileName,
					lineNumber: 235,
					columnNumber: 13
				}, this) }, void 0, false, {
					fileName: _jsxFileName,
					lineNumber: 234,
					columnNumber: 11
				}, this), /* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)("div", {
					className: "space-y-4 pt-2",
					children: [
						/* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)(FormField, {
							label: "Title",
							children: /* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)(Input, {
								value: form.title,
								onChange: (e) => setForm({
									...form,
									title: e.target.value
								}),
								className: "border-gray-800 bg-black"
							}, void 0, false, {
								fileName: _jsxFileName,
								lineNumber: 239,
								columnNumber: 15
							}, this)
						}, void 0, false, {
							fileName: _jsxFileName,
							lineNumber: 238,
							columnNumber: 13
						}, this),
						/* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)(FormField, {
							label: "Slug",
							children: /* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)(Input, {
								value: form.slug,
								onChange: (e) => setForm({
									...form,
									slug: e.target.value
								}),
								placeholder: "auto-generated if empty",
								className: "border-gray-800 bg-black"
							}, void 0, false, {
								fileName: _jsxFileName,
								lineNumber: 245,
								columnNumber: 15
							}, this)
						}, void 0, false, {
							fileName: _jsxFileName,
							lineNumber: 244,
							columnNumber: 13
						}, this),
						/* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)(FormField, {
							label: "Category",
							children: /* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)(Select, {
								value: form.category,
								onValueChange: (v) => setForm({
									...form,
									category: v
								}),
								children: [/* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)(SelectTrigger, {
									className: "border-gray-800 bg-black",
									children: /* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)(SelectValue, { placeholder: "Select category" }, void 0, false, {
										fileName: _jsxFileName,
										lineNumber: 256,
										columnNumber: 19
									}, this)
								}, void 0, false, {
									fileName: _jsxFileName,
									lineNumber: 255,
									columnNumber: 17
								}, this), /* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)(SelectContent, { children: categories.map((cat) => /* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)(SelectItem, {
									value: cat._id,
									children: cat.name
								}, cat._id, false, {
									fileName: _jsxFileName,
									lineNumber: 259,
									columnNumber: 42
								}, this)) }, void 0, false, {
									fileName: _jsxFileName,
									lineNumber: 258,
									columnNumber: 17
								}, this)]
							}, void 0, true, {
								fileName: _jsxFileName,
								lineNumber: 251,
								columnNumber: 15
							}, this)
						}, void 0, false, {
							fileName: _jsxFileName,
							lineNumber: 250,
							columnNumber: 13
						}, this),
						/* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)(FormField, {
							label: "Short Description",
							children: /* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)(Textarea, {
								value: form.shortDescription,
								onChange: (e) => setForm({
									...form,
									shortDescription: e.target.value
								}),
								className: "border-gray-800 bg-black min-h-[60px]"
							}, void 0, false, {
								fileName: _jsxFileName,
								lineNumber: 266,
								columnNumber: 15
							}, this)
						}, void 0, false, {
							fileName: _jsxFileName,
							lineNumber: 265,
							columnNumber: 13
						}, this),
						/* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)(FormField, {
							label: "Full Description",
							children: /* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)(Textarea, {
								value: form.fullDescription,
								onChange: (e) => setForm({
									...form,
									fullDescription: e.target.value
								}),
								className: "border-gray-800 bg-black min-h-[100px]"
							}, void 0, false, {
								fileName: _jsxFileName,
								lineNumber: 272,
								columnNumber: 15
							}, this)
						}, void 0, false, {
							fileName: _jsxFileName,
							lineNumber: 271,
							columnNumber: 13
						}, this),
						/* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)(FormField, {
							label: "Thumbnail URL",
							children: [
								/* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)(Input, {
									value: form.thumbnail,
									onChange: (e) => setForm({
										...form,
										thumbnail: e.target.value
									}),
									className: "border-gray-800 bg-black"
								}, void 0, false, {
									fileName: _jsxFileName,
									lineNumber: 278,
									columnNumber: 15
								}, this),
								/* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)("div", {
									className: "mt-2 text-xs text-gray-400",
									children: "Or upload a file"
								}, void 0, false, {
									fileName: _jsxFileName,
									lineNumber: 282,
									columnNumber: 15
								}, this),
								/* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)("input", {
									type: "file",
									accept: "image/*,video/*",
									onChange: async (e) => {
										const file = e.target.files?.[0];
										if (!file) return;
										try {
											const reader = new FileReader();
											reader.onload = async () => {
												const dataUrl = String(reader.result || "");
												const res = await fetchWithAuth(token, "/api/media", {
													method: "POST",
													body: JSON.stringify({
														data: dataUrl,
														filename: file.name,
														title: form.title || file.name,
														alt: form.shortDescription || file.name
													})
												});
												if (res?.success && res.data?.url) setForm({
													...form,
													thumbnail: res.data.url
												});
												else setError(res?.message || "Upload failed");
											};
											reader.readAsDataURL(file);
										} catch (err) {
											setError(err instanceof Error ? err.message : "Upload failed");
										}
									},
									className: "mt-2 text-sm text-white"
								}, void 0, false, {
									fileName: _jsxFileName,
									lineNumber: 283,
									columnNumber: 15
								}, this),
								form.thumbnail ? /* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)("div", {
									className: "mt-3",
									children: [/* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)("div", {
										className: "text-xs text-gray-400 mb-1",
										children: "Preview"
									}, void 0, false, {
										fileName: _jsxFileName,
										lineNumber: 321,
										columnNumber: 19
									}, this), /* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)("div", {
										className: "w-40 h-24 bg-neutral-900 border border-gray-800 overflow-hidden rounded",
										children: form.thumbnail.includes("youtube.com") || form.thumbnail.includes("youtu.be") ? /* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)("img", {
											src: getYouTubeThumb(form.thumbnail),
											alt: "preview",
											className: "w-full h-full object-cover"
										}, void 0, false, {
											fileName: _jsxFileName,
											lineNumber: 324,
											columnNumber: 102
										}, this) : form.thumbnail.includes("drive.google.com") ? /* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)("img", {
											src: getDriveThumb(form.thumbnail),
											alt: "preview",
											className: "w-full h-full object-cover"
										}, void 0, false, {
											fileName: _jsxFileName,
											lineNumber: 324,
											columnNumber: 249
										}, this) : /* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)("img", {
											src: form.thumbnail,
											alt: "preview",
											className: "w-full h-full object-cover"
										}, void 0, false, {
											fileName: _jsxFileName,
											lineNumber: 324,
											columnNumber: 348
										}, this)
									}, void 0, false, {
										fileName: _jsxFileName,
										lineNumber: 322,
										columnNumber: 19
									}, this)]
								}, void 0, true, {
									fileName: _jsxFileName,
									lineNumber: 320,
									columnNumber: 33
								}, this) : null
							]
						}, void 0, true, {
							fileName: _jsxFileName,
							lineNumber: 277,
							columnNumber: 13
						}, this),
						/* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)(FormField, {
							label: "Client Name",
							children: /* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)(Input, {
								value: form.clientName || "",
								onChange: (e) => setForm({
									...form,
									clientName: e.target.value
								}),
								className: "border-gray-800 bg-black",
								placeholder: "Client or brand"
							}, void 0, false, {
								fileName: _jsxFileName,
								lineNumber: 329,
								columnNumber: 15
							}, this)
						}, void 0, false, {
							fileName: _jsxFileName,
							lineNumber: 328,
							columnNumber: 13
						}, this),
						/* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)(FormField, {
							label: "Live Website URL",
							children: /* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)(Input, {
								value: form.liveWebsite || "",
								onChange: (e) => setForm({
									...form,
									liveWebsite: e.target.value
								}),
								className: "border-gray-800 bg-black",
								placeholder: "https://example.com"
							}, void 0, false, {
								fileName: _jsxFileName,
								lineNumber: 335,
								columnNumber: 15
							}, this)
						}, void 0, false, {
							fileName: _jsxFileName,
							lineNumber: 334,
							columnNumber: 13
						}, this),
						/* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)(FormField, {
							label: "Google Drive Link",
							children: /* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)(Input, {
								value: form.googleDriveLink || "",
								onChange: (e) => setForm({
									...form,
									googleDriveLink: e.target.value
								}),
								className: "border-gray-800 bg-black",
								placeholder: "https://drive.google.com/..."
							}, void 0, false, {
								fileName: _jsxFileName,
								lineNumber: 341,
								columnNumber: 15
							}, this)
						}, void 0, false, {
							fileName: _jsxFileName,
							lineNumber: 340,
							columnNumber: 13
						}, this),
						/* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)(FormField, {
							label: "YouTube Link",
							children: /* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)(Input, {
								value: form.youtubeLink || "",
								onChange: (e) => setForm({
									...form,
									youtubeLink: e.target.value
								}),
								className: "border-gray-800 bg-black",
								placeholder: "https://youtube.com/watch?v=..."
							}, void 0, false, {
								fileName: _jsxFileName,
								lineNumber: 347,
								columnNumber: 15
							}, this)
						}, void 0, false, {
							fileName: _jsxFileName,
							lineNumber: 346,
							columnNumber: 13
						}, this),
						/* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)(FormField, {
							label: "Behance Link",
							children: /* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)(Input, {
								value: form.behanceLink || "",
								onChange: (e) => setForm({
									...form,
									behanceLink: e.target.value
								}),
								className: "border-gray-800 bg-black",
								placeholder: "https://behance.net/..."
							}, void 0, false, {
								fileName: _jsxFileName,
								lineNumber: 353,
								columnNumber: 15
							}, this)
						}, void 0, false, {
							fileName: _jsxFileName,
							lineNumber: 352,
							columnNumber: 13
						}, this),
						/* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)(FormField, {
							label: "GitHub Link",
							children: /* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)(Input, {
								value: form.githubLink || "",
								onChange: (e) => setForm({
									...form,
									githubLink: e.target.value
								}),
								className: "border-gray-800 bg-black",
								placeholder: "https://github.com/..."
							}, void 0, false, {
								fileName: _jsxFileName,
								lineNumber: 359,
								columnNumber: 15
							}, this)
						}, void 0, false, {
							fileName: _jsxFileName,
							lineNumber: 358,
							columnNumber: 13
						}, this),
						/* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)(FormField, {
							label: "Gallery Images",
							children: /* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)("div", {
								className: "space-y-3",
								children: [
									/* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)("div", {
										className: "text-xs text-gray-500 mb-2",
										children: "Add multiple images to the project gallery"
									}, void 0, false, {
										fileName: _jsxFileName,
										lineNumber: 366,
										columnNumber: 17
									}, this),
									/* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)("div", {
										className: "grid grid-cols-2 gap-2",
										children: Array.isArray(form.galleryImages) && form.galleryImages.map((img, idx) => /* @__PURE__ */ (void 0)("div", {
											className: "relative group",
											children: [/* @__PURE__ */ (void 0)("div", {
												className: "w-full aspect-square bg-neutral-900 border border-gray-800 overflow-hidden rounded",
												children: /* @__PURE__ */ (void 0)("img", {
													src: img,
													alt: `gallery-${idx}`,
													className: "w-full h-full object-cover"
												}, void 0, false, {
													fileName: _jsxFileName,
													lineNumber: 372,
													columnNumber: 27
												}, this)
											}, void 0, false, {
												fileName: _jsxFileName,
												lineNumber: 371,
												columnNumber: 25
											}, this), /* @__PURE__ */ (void 0)("button", {
												type: "button",
												onClick: () => {
													const updated = [...form.galleryImages];
													updated.splice(idx, 1);
													setForm({
														...form,
														galleryImages: updated
													});
												},
												className: "absolute top-1 right-1 bg-red-600 hover:bg-red-700 text-white p-1 rounded opacity-0 group-hover:opacity-100 transition-opacity",
												children: "✕"
											}, void 0, false, {
												fileName: _jsxFileName,
												lineNumber: 374,
												columnNumber: 25
											}, this)]
										}, idx, true, {
											fileName: _jsxFileName,
											lineNumber: 370,
											columnNumber: 128
										}, this))
									}, void 0, false, {
										fileName: _jsxFileName,
										lineNumber: 369,
										columnNumber: 17
									}, this),
									/* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)("div", {
										className: "space-y-2",
										children: [/* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)(Input, {
											value: form._galleryImageUrl || "",
											onChange: (e) => setForm({
												...form,
												_galleryImageUrl: e.target.value
											}),
											className: "border-gray-800 bg-black text-sm",
											placeholder: "Paste image URL or Google Drive link"
										}, void 0, false, {
											fileName: _jsxFileName,
											lineNumber: 387,
											columnNumber: 19
										}, this), /* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)("div", {
											className: "flex gap-2",
											children: [
												/* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)("button", {
													type: "button",
													onClick: () => {
														const url = form._galleryImageUrl;
														if (url) {
															const current = Array.isArray(form.galleryImages) ? form.galleryImages : [];
															setForm({
																...form,
																galleryImages: [...current, url],
																_galleryImageUrl: ""
															});
														}
													},
													className: "flex-1 px-3 py-1.5 bg-green-600 hover:bg-green-700 text-white rounded text-xs font-medium",
													children: "Add Image"
												}, void 0, false, {
													fileName: _jsxFileName,
													lineNumber: 392,
													columnNumber: 21
												}, this),
												/* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)("input", {
													type: "file",
													accept: "image/*",
													onChange: async (e) => {
														const file = e.target.files?.[0];
														if (!file) return;
														try {
															const reader = new FileReader();
															reader.onload = async () => {
																const dataUrl = String(reader.result || "");
																const res = await fetchWithAuth(token, "/api/media", {
																	method: "POST",
																	body: JSON.stringify({
																		data: dataUrl,
																		filename: file.name,
																		title: form.title || file.name,
																		alt: "Gallery image"
																	})
																});
																if (res?.success && res.data?.url) {
																	const current = Array.isArray(form.galleryImages) ? form.galleryImages : [];
																	setForm({
																		...form,
																		galleryImages: [...current, res.data.url]
																	});
																} else setError(res?.message || "Upload failed");
															};
															reader.readAsDataURL(file);
														} catch (err) {
															setError(err instanceof Error ? err.message : "Upload failed");
														}
													},
													className: "flex-1 px-3 py-1.5 bg-blue-600 hover:bg-blue-700 text-white rounded text-xs font-medium cursor-pointer",
													style: { appearance: "none" }
												}, void 0, false, {
													fileName: _jsxFileName,
													lineNumber: 405,
													columnNumber: 21
												}, this),
												/* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)("label", {
													htmlFor: "gallery-upload",
													className: "flex-1 px-3 py-1.5 bg-blue-600 hover:bg-blue-700 text-white rounded text-xs font-medium cursor-pointer text-center",
													children: "Upload"
												}, void 0, false, {
													fileName: _jsxFileName,
													lineNumber: 444,
													columnNumber: 21
												}, this)
											]
										}, void 0, true, {
											fileName: _jsxFileName,
											lineNumber: 391,
											columnNumber: 19
										}, this)]
									}, void 0, true, {
										fileName: _jsxFileName,
										lineNumber: 386,
										columnNumber: 17
									}, this)
								]
							}, void 0, true, {
								fileName: _jsxFileName,
								lineNumber: 365,
								columnNumber: 15
							}, this)
						}, void 0, false, {
							fileName: _jsxFileName,
							lineNumber: 364,
							columnNumber: 13
						}, this),
						/* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)(FormField, {
							label: "Status",
							children: /* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)(Select, {
								value: form.status,
								onValueChange: (v) => setForm({
									...form,
									status: v
								}),
								children: [/* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)(SelectTrigger, {
									className: "border-gray-800 bg-black",
									children: /* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)(SelectValue, {}, void 0, false, {
										fileName: _jsxFileName,
										lineNumber: 457,
										columnNumber: 19
									}, this)
								}, void 0, false, {
									fileName: _jsxFileName,
									lineNumber: 456,
									columnNumber: 17
								}, this), /* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)(SelectContent, { children: [/* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)(SelectItem, {
									value: "draft",
									children: "Draft"
								}, void 0, false, {
									fileName: _jsxFileName,
									lineNumber: 460,
									columnNumber: 19
								}, this), /* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)(SelectItem, {
									value: "published",
									children: "Published"
								}, void 0, false, {
									fileName: _jsxFileName,
									lineNumber: 461,
									columnNumber: 19
								}, this)] }, void 0, true, {
									fileName: _jsxFileName,
									lineNumber: 459,
									columnNumber: 17
								}, this)]
							}, void 0, true, {
								fileName: _jsxFileName,
								lineNumber: 452,
								columnNumber: 15
							}, this)
						}, void 0, false, {
							fileName: _jsxFileName,
							lineNumber: 451,
							columnNumber: 13
						}, this),
						/* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)("div", {
							className: "flex items-center gap-6",
							children: [/* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)("div", {
								className: "flex items-center gap-2",
								children: [/* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)(Switch, {
									checked: form.featured,
									onCheckedChange: (v) => setForm({
										...form,
										featured: v
									})
								}, void 0, false, {
									fileName: _jsxFileName,
									lineNumber: 467,
									columnNumber: 17
								}, this), /* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)(Label, {
									className: "text-gray-400",
									children: "Featured"
								}, void 0, false, {
									fileName: _jsxFileName,
									lineNumber: 471,
									columnNumber: 17
								}, this)]
							}, void 0, true, {
								fileName: _jsxFileName,
								lineNumber: 466,
								columnNumber: 15
							}, this), /* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)("div", {
								className: "flex items-center gap-2",
								children: [/* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)(Switch, {
									checked: form.hidden,
									onCheckedChange: (v) => setForm({
										...form,
										hidden: v
									})
								}, void 0, false, {
									fileName: _jsxFileName,
									lineNumber: 474,
									columnNumber: 17
								}, this), /* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)(Label, {
									className: "text-gray-400",
									children: "Hidden"
								}, void 0, false, {
									fileName: _jsxFileName,
									lineNumber: 478,
									columnNumber: 17
								}, this)]
							}, void 0, true, {
								fileName: _jsxFileName,
								lineNumber: 473,
								columnNumber: 15
							}, this)]
						}, void 0, true, {
							fileName: _jsxFileName,
							lineNumber: 465,
							columnNumber: 13
						}, this),
						/* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)(Button, {
							onClick: handleSave,
							disabled: isSaving,
							className: "w-full btn-primary",
							children: isSaving ? "Saving..." : editing ? "Update Project" : "Create Project"
						}, void 0, false, {
							fileName: _jsxFileName,
							lineNumber: 481,
							columnNumber: 13
						}, this)
					]
				}, void 0, true, {
					fileName: _jsxFileName,
					lineNumber: 237,
					columnNumber: 11
				}, this)]
			}, void 0, true, {
				fileName: _jsxFileName,
				lineNumber: 233,
				columnNumber: 9
			}, this)
		}, void 0, false, {
			fileName: _jsxFileName,
			lineNumber: 232,
			columnNumber: 7
		}, this)
	] }, void 0, true, {
		fileName: _jsxFileName,
		lineNumber: 186,
		columnNumber: 10
	}, this);
}
function FormField({ label, children }) {
	return /* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)("div", {
		className: "space-y-1.5",
		children: [/* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)(Label, {
			className: "text-gray-400",
			children: label
		}, void 0, false, {
			fileName: _jsxFileName,
			lineNumber: 497,
			columnNumber: 7
		}, this), children]
	}, void 0, true, {
		fileName: _jsxFileName,
		lineNumber: 496,
		columnNumber: 10
	}, this);
}
//#endregion
export { AdminPortfolio as component };
