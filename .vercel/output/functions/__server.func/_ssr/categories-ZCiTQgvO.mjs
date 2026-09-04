import { o as __toESM } from "../_runtime.mjs";
import { u as require_react } from "../_libs/@floating-ui/react-dom+[...].mjs";
import { t as useLocalStorage } from "./use-local-storage-DfBBwPrj.mjs";
import { t as require_jsx_dev_runtime } from "../_libs/react.mjs";
import { d as Pencil, o as Trash2, u as Plus } from "../_libs/lucide-react.mjs";
import { t as fetchWithAuth } from "./admin-api-B-is0sao.mjs";
import { i as Switch, n as Input, r as Label, t as Button } from "./switch-BeOP6LuK.mjs";
import { a as Table, c as TableHead, i as DialogTitle, l as TableHeader, n as DialogContent, o as TableBody, r as DialogHeader, s as TableCell, t as Dialog, u as TableRow } from "./table-Cd5cyrDi.mjs";
import { t as Textarea } from "./textarea-BEdZpykQ.mjs";
//#region node_modules/.nitro/vite/services/ssr/assets/categories-ZCiTQgvO.js
var import_react = /* @__PURE__ */ __toESM(require_react());
var import_jsx_dev_runtime = require_jsx_dev_runtime();
var _jsxFileName = "E:/Web/creative-canvas-hub-main/creative-canvas-hub-main/src/routes/admin/_layout/categories.tsx?tsr-split=component";
var emptyCategory = () => ({
	name: "",
	description: "",
	icon: "",
	displayOrder: 0,
	hidden: false
});
function AdminCategories() {
	const [token] = useLocalStorage("admin_token", "");
	const [categories, setCategories] = (0, import_react.useState)([]);
	const [isLoading, setIsLoading] = (0, import_react.useState)(true);
	const [dialogOpen, setDialogOpen] = (0, import_react.useState)(false);
	const [editing, setEditing] = (0, import_react.useState)(null);
	const [form, setForm] = (0, import_react.useState)(emptyCategory());
	const [error, setError] = (0, import_react.useState)("");
	const [isSaving, setIsSaving] = (0, import_react.useState)(false);
	const loadData = (0, import_react.useCallback)(async () => {
		try {
			const result = await fetchWithAuth(token, "/api/categories");
			setCategories(result.data || []);
		} catch (err) {
			setError(err instanceof Error ? err.message : "Failed to load categories");
		} finally {
			setIsLoading(false);
		}
	}, [token]);
	(0, import_react.useEffect)(() => {
		loadData();
	}, [loadData]);
	const openCreate = () => {
		setEditing(null);
		setForm(emptyCategory());
		setDialogOpen(true);
	};
	const openEdit = (category) => {
		setEditing(category);
		setForm({
			name: category.name,
			description: category.description || "",
			icon: category.icon || "",
			displayOrder: category.displayOrder,
			hidden: category.hidden
		});
		setDialogOpen(true);
	};
	const handleSave = async () => {
		setIsSaving(true);
		setError("");
		try {
			if (editing) await fetchWithAuth(token, `/api/categories/${editing._id}`, {
				method: "PUT",
				body: JSON.stringify(form)
			});
			else await fetchWithAuth(token, "/api/categories", {
				method: "POST",
				body: JSON.stringify(form)
			});
			setDialogOpen(false);
			await loadData();
		} catch (err) {
			setError(err instanceof Error ? err.message : "Failed to save category");
		} finally {
			setIsSaving(false);
		}
	};
	const handleDelete = async (id) => {
		if (!confirm("Delete this category?")) return;
		try {
			await fetchWithAuth(token, `/api/categories/${id}`, { method: "DELETE" });
			await loadData();
		} catch (err) {
			setError(err instanceof Error ? err.message : "Failed to delete category");
		}
	};
	if (isLoading) return /* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)("div", {
		className: "text-gray-400",
		children: "Loading categories..."
	}, void 0, false, {
		fileName: _jsxFileName,
		lineNumber: 101,
		columnNumber: 25
	}, this);
	return /* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)("div", { children: [
		/* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)("div", {
			className: "mb-8 flex items-center justify-between",
			children: [/* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)("div", { children: [/* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)("h1", {
				className: "text-3xl font-bold text-white",
				children: "Categories"
			}, void 0, false, {
				fileName: _jsxFileName,
				lineNumber: 105,
				columnNumber: 11
			}, this), /* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)("p", {
				className: "text-gray-500",
				children: "Organize your portfolio projects"
			}, void 0, false, {
				fileName: _jsxFileName,
				lineNumber: 106,
				columnNumber: 11
			}, this)] }, void 0, true, {
				fileName: _jsxFileName,
				lineNumber: 104,
				columnNumber: 9
			}, this), /* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)(Button, {
				onClick: openCreate,
				className: "bg-[var(--brand-red)] hover:brightness-110",
				children: [/* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)(Plus, {
					size: 16,
					className: "mr-2"
				}, void 0, false, {
					fileName: _jsxFileName,
					lineNumber: 109,
					columnNumber: 11
				}, this), "Add Category"]
			}, void 0, true, {
				fileName: _jsxFileName,
				lineNumber: 108,
				columnNumber: 9
			}, this)]
		}, void 0, true, {
			fileName: _jsxFileName,
			lineNumber: 103,
			columnNumber: 7
		}, this),
		error && /* @__PURE__ */ (void 0)("p", {
			className: "mb-4 text-sm text-red-400",
			children: error
		}, void 0, false, {
			fileName: _jsxFileName,
			lineNumber: 114,
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
						lineNumber: 120,
						columnNumber: 15
					}, this),
					/* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)(TableHead, {
						className: "text-gray-400",
						children: "Order"
					}, void 0, false, {
						fileName: _jsxFileName,
						lineNumber: 121,
						columnNumber: 15
					}, this),
					/* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)(TableHead, {
						className: "text-gray-400",
						children: "Hidden"
					}, void 0, false, {
						fileName: _jsxFileName,
						lineNumber: 122,
						columnNumber: 15
					}, this),
					/* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)(TableHead, {
						className: "text-gray-400 text-right",
						children: "Actions"
					}, void 0, false, {
						fileName: _jsxFileName,
						lineNumber: 123,
						columnNumber: 15
					}, this)
				]
			}, void 0, true, {
				fileName: _jsxFileName,
				lineNumber: 119,
				columnNumber: 13
			}, this) }, void 0, false, {
				fileName: _jsxFileName,
				lineNumber: 118,
				columnNumber: 11
			}, this), /* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)(TableBody, { children: categories.length === 0 ? /* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)(TableRow, { children: /* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)(TableCell, {
				colSpan: 4,
				className: "text-center text-gray-500 py-8",
				children: "No categories yet."
			}, void 0, false, {
				fileName: _jsxFileName,
				lineNumber: 128,
				columnNumber: 17
			}, this) }, void 0, false, {
				fileName: _jsxFileName,
				lineNumber: 127,
				columnNumber: 40
			}, this) : categories.map((cat) => /* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)(TableRow, {
				className: "border-gray-800",
				children: [
					/* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)(TableCell, {
						className: "text-white font-medium",
						children: cat.name
					}, void 0, false, {
						fileName: _jsxFileName,
						lineNumber: 132,
						columnNumber: 19
					}, this),
					/* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)(TableCell, {
						className: "text-gray-400",
						children: cat.displayOrder
					}, void 0, false, {
						fileName: _jsxFileName,
						lineNumber: 133,
						columnNumber: 19
					}, this),
					/* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)(TableCell, {
						className: "text-gray-400",
						children: cat.hidden ? "Yes" : "No"
					}, void 0, false, {
						fileName: _jsxFileName,
						lineNumber: 134,
						columnNumber: 19
					}, this),
					/* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)(TableCell, {
						className: "text-right",
						children: [/* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)(Button, {
							variant: "ghost",
							size: "sm",
							onClick: () => openEdit(cat),
							className: "text-gray-400 hover:text-white",
							children: /* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)(Pencil, { size: 14 }, void 0, false, {
								fileName: _jsxFileName,
								lineNumber: 137,
								columnNumber: 23
							}, this)
						}, void 0, false, {
							fileName: _jsxFileName,
							lineNumber: 136,
							columnNumber: 21
						}, this), /* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)(Button, {
							variant: "ghost",
							size: "sm",
							onClick: () => handleDelete(cat._id),
							className: "text-gray-400 hover:text-red-400",
							children: /* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)(Trash2, { size: 14 }, void 0, false, {
								fileName: _jsxFileName,
								lineNumber: 140,
								columnNumber: 23
							}, this)
						}, void 0, false, {
							fileName: _jsxFileName,
							lineNumber: 139,
							columnNumber: 21
						}, this)]
					}, void 0, true, {
						fileName: _jsxFileName,
						lineNumber: 135,
						columnNumber: 19
					}, this)
				]
			}, cat._id, true, {
				fileName: _jsxFileName,
				lineNumber: 131,
				columnNumber: 51
			}, this)) }, void 0, false, {
				fileName: _jsxFileName,
				lineNumber: 126,
				columnNumber: 11
			}, this)] }, void 0, true, {
				fileName: _jsxFileName,
				lineNumber: 117,
				columnNumber: 9
			}, this)
		}, void 0, false, {
			fileName: _jsxFileName,
			lineNumber: 116,
			columnNumber: 7
		}, this),
		/* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)(Dialog, {
			open: dialogOpen,
			onOpenChange: setDialogOpen,
			children: /* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)(DialogContent, {
				className: "bg-gray-950 border-gray-800 text-white sm:max-w-md",
				children: [/* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)(DialogHeader, { children: /* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)(DialogTitle, { children: editing ? "Edit Category" : "Add Category" }, void 0, false, {
					fileName: _jsxFileName,
					lineNumber: 151,
					columnNumber: 13
				}, this) }, void 0, false, {
					fileName: _jsxFileName,
					lineNumber: 150,
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
								lineNumber: 155,
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
								lineNumber: 156,
								columnNumber: 15
							}, this)]
						}, void 0, true, {
							fileName: _jsxFileName,
							lineNumber: 154,
							columnNumber: 13
						}, this),
						/* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)("div", {
							className: "space-y-1.5",
							children: [/* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)(Label, {
								className: "text-gray-400",
								children: "Description"
							}, void 0, false, {
								fileName: _jsxFileName,
								lineNumber: 162,
								columnNumber: 15
							}, this), /* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)(Textarea, {
								value: form.description,
								onChange: (e) => setForm({
									...form,
									description: e.target.value
								}),
								className: "border-gray-800 bg-black min-h-[60px]"
							}, void 0, false, {
								fileName: _jsxFileName,
								lineNumber: 163,
								columnNumber: 15
							}, this)]
						}, void 0, true, {
							fileName: _jsxFileName,
							lineNumber: 161,
							columnNumber: 13
						}, this),
						/* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)("div", {
							className: "space-y-1.5",
							children: [/* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)(Label, {
								className: "text-gray-400",
								children: "Icon"
							}, void 0, false, {
								fileName: _jsxFileName,
								lineNumber: 169,
								columnNumber: 15
							}, this), /* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)(Input, {
								value: form.icon,
								onChange: (e) => setForm({
									...form,
									icon: e.target.value
								}),
								placeholder: "Icon name or URL",
								className: "border-gray-800 bg-black"
							}, void 0, false, {
								fileName: _jsxFileName,
								lineNumber: 170,
								columnNumber: 15
							}, this)]
						}, void 0, true, {
							fileName: _jsxFileName,
							lineNumber: 168,
							columnNumber: 13
						}, this),
						/* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)("div", {
							className: "space-y-1.5",
							children: [/* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)(Label, {
								className: "text-gray-400",
								children: "Display Order"
							}, void 0, false, {
								fileName: _jsxFileName,
								lineNumber: 176,
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
								lineNumber: 177,
								columnNumber: 15
							}, this)]
						}, void 0, true, {
							fileName: _jsxFileName,
							lineNumber: 175,
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
								lineNumber: 183,
								columnNumber: 15
							}, this), /* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)(Label, {
								className: "text-gray-400",
								children: "Hidden"
							}, void 0, false, {
								fileName: _jsxFileName,
								lineNumber: 187,
								columnNumber: 15
							}, this)]
						}, void 0, true, {
							fileName: _jsxFileName,
							lineNumber: 182,
							columnNumber: 13
						}, this),
						/* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)(Button, {
							onClick: handleSave,
							disabled: isSaving,
							className: "w-full bg-[var(--brand-red)] hover:brightness-110",
							children: isSaving ? "Saving..." : editing ? "Update" : "Create"
						}, void 0, false, {
							fileName: _jsxFileName,
							lineNumber: 189,
							columnNumber: 13
						}, this)
					]
				}, void 0, true, {
					fileName: _jsxFileName,
					lineNumber: 153,
					columnNumber: 11
				}, this)]
			}, void 0, true, {
				fileName: _jsxFileName,
				lineNumber: 149,
				columnNumber: 9
			}, this)
		}, void 0, false, {
			fileName: _jsxFileName,
			lineNumber: 148,
			columnNumber: 7
		}, this)
	] }, void 0, true, {
		fileName: _jsxFileName,
		lineNumber: 102,
		columnNumber: 10
	}, this);
}
//#endregion
export { AdminCategories as component };
