import { o as __toESM } from "../_runtime.mjs";
import { u as require_react } from "../_libs/@floating-ui/react-dom+[...].mjs";
import { t as useLocalStorage } from "./use-local-storage-DfBBwPrj.mjs";
import { t as require_jsx_dev_runtime } from "../_libs/react.mjs";
import { d as Pencil, o as Trash2, u as Plus } from "../_libs/lucide-react.mjs";
import { t as fetchWithAuth } from "./admin-api-B-is0sao.mjs";
import { a as cn, i as Switch, n as Input, r as Label, t as Button } from "./switch-BeOP6LuK.mjs";
import { a as Table, c as TableHead, i as DialogTitle, l as TableHeader, n as DialogContent, o as TableBody, r as DialogHeader, s as TableCell, t as Dialog, u as TableRow } from "./table-Cd5cyrDi.mjs";
import { i as SliderTrack, n as SliderRange, r as SliderThumb, t as Slider$1 } from "../_libs/radix-ui__react-slider.mjs";
//#region node_modules/.nitro/vite/services/ssr/assets/skills-CUWvQgLj.js
var import_react = /* @__PURE__ */ __toESM(require_react());
var import_jsx_dev_runtime = require_jsx_dev_runtime();
var _jsxFileName$1 = "E:/Web/creative-canvas-hub-main/creative-canvas-hub-main/src/components/ui/slider.tsx";
var Slider = import_react.forwardRef(({ className, ...props }, ref) => /* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)(Slider$1, {
	ref,
	className: cn("relative flex w-full touch-none select-none items-center", className),
	...props,
	children: [/* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)(SliderTrack, {
		className: "relative h-1.5 w-full grow overflow-hidden rounded-full bg-primary/20",
		children: /* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)(SliderRange, { className: "absolute h-full bg-primary" }, void 0, false, {
			fileName: _jsxFileName$1,
			lineNumber: 16,
			columnNumber: 7
		}, void 0)
	}, void 0, false, {
		fileName: _jsxFileName$1,
		lineNumber: 15,
		columnNumber: 5
	}, void 0), /* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)(SliderThumb, { className: "block h-4 w-4 rounded-full border border-primary/50 bg-background shadow transition-colors focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-ring disabled:pointer-events-none disabled:opacity-50" }, void 0, false, {
		fileName: _jsxFileName$1,
		lineNumber: 18,
		columnNumber: 5
	}, void 0)]
}, void 0, true, {
	fileName: _jsxFileName$1,
	lineNumber: 10,
	columnNumber: 3
}, void 0));
Slider.displayName = Slider$1.displayName;
var _jsxFileName = "E:/Web/creative-canvas-hub-main/creative-canvas-hub-main/src/routes/admin/_layout/skills.tsx?tsr-split=component";
var emptySkill = () => ({
	name: "",
	percentage: 50,
	category: "",
	color: "#ffffff",
	displayOrder: 0,
	hidden: false
});
function AdminSkills() {
	const [token] = useLocalStorage("admin_token", "");
	const [skills, setSkills] = (0, import_react.useState)([]);
	const [isLoading, setIsLoading] = (0, import_react.useState)(true);
	const [dialogOpen, setDialogOpen] = (0, import_react.useState)(false);
	const [editing, setEditing] = (0, import_react.useState)(null);
	const [form, setForm] = (0, import_react.useState)(emptySkill());
	const [error, setError] = (0, import_react.useState)("");
	const [isSaving, setIsSaving] = (0, import_react.useState)(false);
	const loadData = (0, import_react.useCallback)(async () => {
		try {
			const result = await fetchWithAuth(token, "/api/skills?limit=1000");
			setSkills(result.data || []);
		} catch (err) {
			setError(err instanceof Error ? err.message : "Failed to load skills");
		} finally {
			setIsLoading(false);
		}
	}, [token]);
	(0, import_react.useEffect)(() => {
		loadData();
	}, [loadData]);
	const openCreate = () => {
		setEditing(null);
		setForm(emptySkill());
		setDialogOpen(true);
	};
	const openEdit = (skill) => {
		setEditing(skill);
		setForm({
			name: skill.name,
			percentage: skill.percentage,
			category: skill.category || "",
			color: skill.color || "#ffffff",
			displayOrder: skill.displayOrder,
			hidden: skill.hidden
		});
		setDialogOpen(true);
	};
	const handleSave = async () => {
		setIsSaving(true);
		setError("");
		try {
			if (editing) await fetchWithAuth(token, `/api/skills/${editing._id}`, {
				method: "PUT",
				body: JSON.stringify(form)
			});
			else await fetchWithAuth(token, "/api/skills", {
				method: "POST",
				body: JSON.stringify(form)
			});
			setDialogOpen(false);
			await loadData();
		} catch (err) {
			setError(err instanceof Error ? err.message : "Failed to save skill");
		} finally {
			setIsSaving(false);
		}
	};
	const handleDelete = async (id) => {
		if (!confirm("Delete this skill?")) return;
		try {
			await fetchWithAuth(token, `/api/skills/${id}`, { method: "DELETE" });
			await loadData();
		} catch (err) {
			setError(err instanceof Error ? err.message : "Failed to delete skill");
		}
	};
	if (isLoading) return /* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)("div", {
		className: "text-gray-400",
		children: "Loading skills..."
	}, void 0, false, {
		fileName: _jsxFileName,
		lineNumber: 104,
		columnNumber: 25
	}, this);
	return /* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)("div", { children: [
		/* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)("div", {
			className: "mb-8 flex items-center justify-between",
			children: [/* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)("div", { children: [/* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)("h1", {
				className: "text-3xl font-bold text-white",
				children: "Skills"
			}, void 0, false, {
				fileName: _jsxFileName,
				lineNumber: 108,
				columnNumber: 11
			}, this), /* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)("p", {
				className: "text-gray-500",
				children: "Manage your skill set"
			}, void 0, false, {
				fileName: _jsxFileName,
				lineNumber: 109,
				columnNumber: 11
			}, this)] }, void 0, true, {
				fileName: _jsxFileName,
				lineNumber: 107,
				columnNumber: 9
			}, this), /* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)(Button, {
				onClick: openCreate,
				className: "bg-[var(--brand-red)] hover:brightness-110",
				children: [/* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)(Plus, {
					size: 16,
					className: "mr-2"
				}, void 0, false, {
					fileName: _jsxFileName,
					lineNumber: 112,
					columnNumber: 11
				}, this), "Add Skill"]
			}, void 0, true, {
				fileName: _jsxFileName,
				lineNumber: 111,
				columnNumber: 9
			}, this)]
		}, void 0, true, {
			fileName: _jsxFileName,
			lineNumber: 106,
			columnNumber: 7
		}, this),
		error && /* @__PURE__ */ (void 0)("p", {
			className: "mb-4 text-sm text-red-400",
			children: error
		}, void 0, false, {
			fileName: _jsxFileName,
			lineNumber: 117,
			columnNumber: 17
		}, this),
		/* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)("div", {
			className: "rounded-lg border border-gray-800 bg-gray-900 overflow-hidden",
			children: /* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)(Table, { children: [/* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)(TableHeader, { children: /* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)(TableRow, {
				className: "border-gray-800 hover:bg-transparent",
				children: [
					/* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)(TableHead, {
						className: "text-gray-400",
						children: "Name"
					}, void 0, false, {
						fileName: _jsxFileName,
						lineNumber: 123,
						columnNumber: 15
					}, this),
					/* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)(TableHead, {
						className: "text-gray-400",
						children: "Percentage"
					}, void 0, false, {
						fileName: _jsxFileName,
						lineNumber: 124,
						columnNumber: 15
					}, this),
					/* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)(TableHead, {
						className: "text-gray-400",
						children: "Category"
					}, void 0, false, {
						fileName: _jsxFileName,
						lineNumber: 125,
						columnNumber: 15
					}, this),
					/* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)(TableHead, {
						className: "text-gray-400 text-right",
						children: "Actions"
					}, void 0, false, {
						fileName: _jsxFileName,
						lineNumber: 126,
						columnNumber: 15
					}, this)
				]
			}, void 0, true, {
				fileName: _jsxFileName,
				lineNumber: 122,
				columnNumber: 13
			}, this) }, void 0, false, {
				fileName: _jsxFileName,
				lineNumber: 121,
				columnNumber: 11
			}, this), /* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)(TableBody, { children: skills.length === 0 ? /* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)(TableRow, { children: /* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)(TableCell, {
				colSpan: 4,
				className: "text-center text-gray-500 py-8",
				children: "No skills yet."
			}, void 0, false, {
				fileName: _jsxFileName,
				lineNumber: 131,
				columnNumber: 17
			}, this) }, void 0, false, {
				fileName: _jsxFileName,
				lineNumber: 130,
				columnNumber: 36
			}, this) : skills.map((skill) => /* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)(TableRow, {
				className: "border-gray-800",
				children: [
					/* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)(TableCell, {
						className: "text-white font-medium",
						children: skill.name
					}, void 0, false, {
						fileName: _jsxFileName,
						lineNumber: 135,
						columnNumber: 19
					}, this),
					/* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)(TableCell, {
						className: "text-gray-400",
						children: [skill.percentage, "%"]
					}, void 0, true, {
						fileName: _jsxFileName,
						lineNumber: 136,
						columnNumber: 19
					}, this),
					/* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)(TableCell, {
						className: "text-gray-400",
						children: skill.category || "—"
					}, void 0, false, {
						fileName: _jsxFileName,
						lineNumber: 137,
						columnNumber: 19
					}, this),
					/* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)(TableCell, {
						className: "text-right",
						children: [/* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)(Button, {
							variant: "ghost",
							size: "sm",
							onClick: () => openEdit(skill),
							className: "text-gray-400 hover:text-white",
							children: /* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)(Pencil, { size: 14 }, void 0, false, {
								fileName: _jsxFileName,
								lineNumber: 140,
								columnNumber: 23
							}, this)
						}, void 0, false, {
							fileName: _jsxFileName,
							lineNumber: 139,
							columnNumber: 21
						}, this), /* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)(Button, {
							variant: "ghost",
							size: "sm",
							onClick: () => handleDelete(skill._id),
							className: "text-gray-400 hover:text-red-400",
							children: /* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)(Trash2, { size: 14 }, void 0, false, {
								fileName: _jsxFileName,
								lineNumber: 143,
								columnNumber: 23
							}, this)
						}, void 0, false, {
							fileName: _jsxFileName,
							lineNumber: 142,
							columnNumber: 21
						}, this)]
					}, void 0, true, {
						fileName: _jsxFileName,
						lineNumber: 138,
						columnNumber: 19
					}, this)
				]
			}, skill._id, true, {
				fileName: _jsxFileName,
				lineNumber: 134,
				columnNumber: 49
			}, this)) }, void 0, false, {
				fileName: _jsxFileName,
				lineNumber: 129,
				columnNumber: 11
			}, this)] }, void 0, true, {
				fileName: _jsxFileName,
				lineNumber: 120,
				columnNumber: 9
			}, this)
		}, void 0, false, {
			fileName: _jsxFileName,
			lineNumber: 119,
			columnNumber: 7
		}, this),
		/* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)(Dialog, {
			open: dialogOpen,
			onOpenChange: setDialogOpen,
			children: /* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)(DialogContent, {
				className: "bg-gray-950 border-gray-800 text-white sm:max-w-md",
				children: [/* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)(DialogHeader, { children: /* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)(DialogTitle, { children: editing ? "Edit Skill" : "Add Skill" }, void 0, false, {
					fileName: _jsxFileName,
					lineNumber: 154,
					columnNumber: 13
				}, this) }, void 0, false, {
					fileName: _jsxFileName,
					lineNumber: 153,
					columnNumber: 11
				}, this), /* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)("div", {
					className: "space-y-4 pt-2",
					children: [
						/* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)("div", {
							className: "space-y-1.5",
							children: [/* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)(Label, {
								className: "text-gray-400",
								children: "Name"
							}, void 0, false, {
								fileName: _jsxFileName,
								lineNumber: 158,
								columnNumber: 15
							}, this), /* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)(Input, {
								value: form.name,
								onChange: (e) => setForm({
									...form,
									name: e.target.value
								}),
								className: "border-gray-800 bg-black"
							}, void 0, false, {
								fileName: _jsxFileName,
								lineNumber: 159,
								columnNumber: 15
							}, this)]
						}, void 0, true, {
							fileName: _jsxFileName,
							lineNumber: 157,
							columnNumber: 13
						}, this),
						/* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)("div", {
							className: "space-y-2",
							children: [/* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)(Label, {
								className: "text-gray-400",
								children: [
									"Percentage: ",
									form.percentage,
									"%"
								]
							}, void 0, true, {
								fileName: _jsxFileName,
								lineNumber: 165,
								columnNumber: 15
							}, this), /* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)(Slider, {
								value: [form.percentage],
								onValueChange: ([v]) => setForm({
									...form,
									percentage: v
								}),
								max: 100,
								step: 1
							}, void 0, false, {
								fileName: _jsxFileName,
								lineNumber: 166,
								columnNumber: 15
							}, this)]
						}, void 0, true, {
							fileName: _jsxFileName,
							lineNumber: 164,
							columnNumber: 13
						}, this),
						/* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)("div", {
							className: "space-y-1.5",
							children: [/* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)(Label, {
								className: "text-gray-400",
								children: "Category"
							}, void 0, false, {
								fileName: _jsxFileName,
								lineNumber: 172,
								columnNumber: 15
							}, this), /* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)(Input, {
								value: form.category,
								onChange: (e) => setForm({
									...form,
									category: e.target.value
								}),
								className: "border-gray-800 bg-black"
							}, void 0, false, {
								fileName: _jsxFileName,
								lineNumber: 173,
								columnNumber: 15
							}, this)]
						}, void 0, true, {
							fileName: _jsxFileName,
							lineNumber: 171,
							columnNumber: 13
						}, this),
						/* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)("div", {
							className: "space-y-1.5",
							children: [/* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)(Label, {
								className: "text-gray-400",
								children: "Color"
							}, void 0, false, {
								fileName: _jsxFileName,
								lineNumber: 179,
								columnNumber: 15
							}, this), /* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)(Input, {
								type: "color",
								value: form.color,
								onChange: (e) => setForm({
									...form,
									color: e.target.value
								}),
								className: "border-gray-800 bg-black h-10 w-20"
							}, void 0, false, {
								fileName: _jsxFileName,
								lineNumber: 180,
								columnNumber: 15
							}, this)]
						}, void 0, true, {
							fileName: _jsxFileName,
							lineNumber: 178,
							columnNumber: 13
						}, this),
						/* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)("div", {
							className: "space-y-1.5",
							children: [/* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)(Label, {
								className: "text-gray-400",
								children: "Display Order"
							}, void 0, false, {
								fileName: _jsxFileName,
								lineNumber: 186,
								columnNumber: 15
							}, this), /* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)(Input, {
								type: "number",
								value: form.displayOrder,
								onChange: (e) => setForm({
									...form,
									displayOrder: parseInt(e.target.value) || 0
								}),
								className: "border-gray-800 bg-black"
							}, void 0, false, {
								fileName: _jsxFileName,
								lineNumber: 187,
								columnNumber: 15
							}, this)]
						}, void 0, true, {
							fileName: _jsxFileName,
							lineNumber: 185,
							columnNumber: 13
						}, this),
						/* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)("div", {
							className: "flex items-center gap-2",
							children: [/* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)(Switch, {
								checked: form.hidden,
								onCheckedChange: (v) => setForm({
									...form,
									hidden: v
								})
							}, void 0, false, {
								fileName: _jsxFileName,
								lineNumber: 193,
								columnNumber: 15
							}, this), /* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)(Label, {
								className: "text-gray-400",
								children: "Hidden"
							}, void 0, false, {
								fileName: _jsxFileName,
								lineNumber: 197,
								columnNumber: 15
							}, this)]
						}, void 0, true, {
							fileName: _jsxFileName,
							lineNumber: 192,
							columnNumber: 13
						}, this),
						/* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)(Button, {
							onClick: handleSave,
							disabled: isSaving,
							className: "w-full bg-[var(--brand-red)] hover:brightness-110",
							children: isSaving ? "Saving..." : editing ? "Update" : "Create"
						}, void 0, false, {
							fileName: _jsxFileName,
							lineNumber: 199,
							columnNumber: 13
						}, this)
					]
				}, void 0, true, {
					fileName: _jsxFileName,
					lineNumber: 156,
					columnNumber: 11
				}, this)]
			}, void 0, true, {
				fileName: _jsxFileName,
				lineNumber: 152,
				columnNumber: 9
			}, this)
		}, void 0, false, {
			fileName: _jsxFileName,
			lineNumber: 151,
			columnNumber: 7
		}, this)
	] }, void 0, true, {
		fileName: _jsxFileName,
		lineNumber: 105,
		columnNumber: 10
	}, this);
}
//#endregion
export { AdminSkills as component };
