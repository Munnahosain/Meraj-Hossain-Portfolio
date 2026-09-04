import { o as __toESM } from "../_runtime.mjs";
import { u as require_react } from "../_libs/@floating-ui/react-dom+[...].mjs";
import { t as useLocalStorage } from "./use-local-storage-DfBBwPrj.mjs";
import { t as require_jsx_dev_runtime } from "../_libs/react.mjs";
import { a as Upload, o as Trash2, u as Plus } from "../_libs/lucide-react.mjs";
import { t as fetchWithAuth } from "./admin-api-B-is0sao.mjs";
import { r as useQueryClient } from "../_libs/tanstack__react-query.mjs";
import { a as cn, i as Switch, n as Input, r as Label, t as Button } from "./switch-BeOP6LuK.mjs";
import { t as Textarea } from "./textarea-BEdZpykQ.mjs";
import { t as DEFAULT_REEL_IMAGES } from "./ReelMarquee-bkhyySdB.mjs";
import { i as Trigger, n as List, r as Root2, t as Content } from "../_libs/radix-ui__react-tabs.mjs";
//#region node_modules/.nitro/vite/services/ssr/assets/settings-CLBLMCPR.js
var import_react = /* @__PURE__ */ __toESM(require_react());
var import_jsx_dev_runtime = require_jsx_dev_runtime();
var _jsxFileName$1 = "E:/Web/creative-canvas-hub-main/creative-canvas-hub-main/src/components/ui/tabs.tsx";
var Tabs = Root2;
var TabsList = import_react.forwardRef(({ className, ...props }, ref) => /* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)(List, {
	ref,
	className: cn("inline-flex h-9 items-center justify-center rounded-lg bg-muted p-1 text-muted-foreground", className),
	...props
}, void 0, false, {
	fileName: _jsxFileName$1,
	lineNumber: 12,
	columnNumber: 3
}, void 0));
TabsList.displayName = List.displayName;
var TabsTrigger = import_react.forwardRef(({ className, ...props }, ref) => /* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)(Trigger, {
	ref,
	className: cn("inline-flex items-center justify-center whitespace-nowrap rounded-md px-3 py-1 text-sm font-medium ring-offset-background cursor-pointer transition-all focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:pointer-events-none disabled:opacity-50 disabled:cursor-not-allowed data-[state=active]:bg-background data-[state=active]:text-foreground data-[state=active]:shadow", className),
	...props
}, void 0, false, {
	fileName: _jsxFileName$1,
	lineNumber: 27,
	columnNumber: 3
}, void 0));
TabsTrigger.displayName = Trigger.displayName;
var TabsContent = import_react.forwardRef(({ className, ...props }, ref) => /* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)(Content, {
	ref,
	className: cn("mt-2 ring-offset-background focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2", className),
	...props
}, void 0, false, {
	fileName: _jsxFileName$1,
	lineNumber: 42,
	columnNumber: 3
}, void 0));
TabsContent.displayName = Content.displayName;
var _jsxFileName = "E:/Web/creative-canvas-hub-main/creative-canvas-hub-main/src/routes/admin/_layout/settings.tsx?tsr-split=component";
function getUploadImageSrc(src) {
	if (src.startsWith("/uploads/")) return `/api/uploads/${encodeURIComponent(src.split("/").pop() || "")}`;
	return src;
}
function AdminSettings() {
	const queryClient = useQueryClient();
	const [token] = useLocalStorage("admin_token", "");
	const [settings, setSettings] = (0, import_react.useState)(null);
	const [isLoading, setIsLoading] = (0, import_react.useState)(true);
	const [isSaving, setIsSaving] = (0, import_react.useState)(false);
	const [isUploadingReel, setIsUploadingReel] = (0, import_react.useState)(false);
	const [reelImageUrl, setReelImageUrl] = (0, import_react.useState)("");
	const [message, setMessage] = (0, import_react.useState)("");
	const [error, setError] = (0, import_react.useState)("");
	(0, import_react.useEffect)(() => {
		const load = async () => {
			try {
				const result = await fetchWithAuth(token, "/api/settings");
				setSettings(result.data);
			} catch (err) {
				setError(err instanceof Error ? err.message : "Failed to load settings");
			} finally {
				setIsLoading(false);
			}
		};
		load();
	}, [token]);
	const updateField = (section, field, value) => {
		setSettings((prev) => {
			if (!prev) return prev;
			return {
				...prev,
				[section]: {
					...prev[section],
					[field]: value
				}
			};
		});
	};
	const updateSocial = (platform, field, value) => {
		setSettings((prev) => {
			if (!prev) return prev;
			const social = prev.social || {};
			return {
				...prev,
				social: {
					...social,
					[platform]: {
						...social[platform],
						[field]: value
					}
				}
			};
		});
	};
	const getReelImages = () => {
		const hero = settings?.hero || {};
		return Array.isArray(hero.reelImages) ? hero.reelImages.filter((src) => typeof src === "string" && src.trim() !== "") : [];
	};
	const updateReelImages = (images) => {
		updateField("hero", "reelImages", images);
	};
	const addReelImage = async (url) => {
		const cleanUrl = url.trim();
		if (!cleanUrl) return;
		setError("");
		try {
			const result = await fetchWithAuth(token, "/api/media", {
				method: "POST",
				body: JSON.stringify({
					url: cleanUrl,
					title: "Hero reel image",
					alt: "Hero reel image"
				})
			});
			updateReelImages([...getReelImages(), result.data?.url || cleanUrl]);
			setReelImageUrl("");
		} catch (err) {
			setError(err instanceof Error ? err.message : "Failed to add image URL");
		}
	};
	const removeReelImage = (index) => {
		updateReelImages(getReelImages().filter((_, i) => i !== index));
	};
	const loadDefaultReelImages = () => {
		updateReelImages(DEFAULT_REEL_IMAGES);
	};
	const uploadReelImage = async (file) => {
		setIsUploadingReel(true);
		setError("");
		try {
			const dataUrl = await new Promise((resolve, reject) => {
				const reader = new FileReader();
				reader.onload = () => resolve(String(reader.result || ""));
				reader.onerror = () => reject(/* @__PURE__ */ new Error("Failed to read file"));
				reader.readAsDataURL(file);
			});
			const result = await fetchWithAuth(token, "/api/media", {
				method: "POST",
				body: JSON.stringify({
					data: dataUrl,
					filename: file.name,
					title: file.name,
					alt: "Hero reel image"
				})
			});
			if (!result.data?.url) throw new Error(result.message || "Upload failed");
			updateReelImages([...getReelImages(), result.data.url]);
		} catch (err) {
			setError(err instanceof Error ? err.message : "Upload failed");
		} finally {
			setIsUploadingReel(false);
		}
	};
	const handleSave = async () => {
		if (!settings) return;
		setIsSaving(true);
		setMessage("");
		setError("");
		try {
			const result = await fetchWithAuth(token, "/api/settings", {
				method: "PUT",
				body: JSON.stringify(settings)
			});
			queryClient.setQueryData(["website-settings"], result.data || settings);
			await queryClient.invalidateQueries({ queryKey: ["website-settings"] });
			setMessage("Settings saved successfully.");
		} catch (err) {
			setError(err instanceof Error ? err.message : "Failed to save settings");
		} finally {
			setIsSaving(false);
		}
	};
	if (isLoading) return /* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)("div", {
		className: "text-gray-400",
		children: "Loading settings..."
	}, void 0, false, {
		fileName: _jsxFileName,
		lineNumber: 172,
		columnNumber: 25
	}, this);
	if (!settings) return /* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)("div", {
		className: "text-red-400",
		children: error || "No settings found."
	}, void 0, false, {
		fileName: _jsxFileName,
		lineNumber: 173,
		columnNumber: 25
	}, this);
	return /* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)("div", { children: [
		/* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)("div", {
			className: "mb-8 flex items-center justify-between",
			children: [/* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)("div", { children: [/* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)("h1", {
				className: "text-3xl font-bold text-white",
				children: "Website Settings"
			}, void 0, false, {
				fileName: _jsxFileName,
				lineNumber: 178,
				columnNumber: 11
			}, this), /* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)("p", {
				className: "text-gray-500",
				children: "Manage your portfolio content and branding"
			}, void 0, false, {
				fileName: _jsxFileName,
				lineNumber: 179,
				columnNumber: 11
			}, this)] }, void 0, true, {
				fileName: _jsxFileName,
				lineNumber: 177,
				columnNumber: 9
			}, this), /* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)(Button, {
				onClick: handleSave,
				disabled: isSaving,
				className: "bg-[var(--brand-red)] hover:brightness-110",
				children: isSaving ? "Saving..." : "Save Changes"
			}, void 0, false, {
				fileName: _jsxFileName,
				lineNumber: 181,
				columnNumber: 9
			}, this)]
		}, void 0, true, {
			fileName: _jsxFileName,
			lineNumber: 176,
			columnNumber: 7
		}, this),
		message && /* @__PURE__ */ (void 0)("p", {
			className: "mb-4 text-sm text-green-400",
			children: message
		}, void 0, false, {
			fileName: _jsxFileName,
			lineNumber: 186,
			columnNumber: 19
		}, this),
		error && /* @__PURE__ */ (void 0)("p", {
			className: "mb-4 text-sm text-red-400",
			children: error
		}, void 0, false, {
			fileName: _jsxFileName,
			lineNumber: 187,
			columnNumber: 17
		}, this),
		/* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)(Tabs, {
			defaultValue: "general",
			className: "space-y-6",
			children: [
				/* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)(TabsList, {
					className: "bg-gray-900 border border-gray-800",
					children: [
						/* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)(TabsTrigger, {
							value: "general",
							children: "General"
						}, void 0, false, {
							fileName: _jsxFileName,
							lineNumber: 191,
							columnNumber: 11
						}, this),
						/* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)(TabsTrigger, {
							value: "contact",
							children: "Contact"
						}, void 0, false, {
							fileName: _jsxFileName,
							lineNumber: 192,
							columnNumber: 11
						}, this),
						/* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)(TabsTrigger, {
							value: "hero",
							children: "Hero"
						}, void 0, false, {
							fileName: _jsxFileName,
							lineNumber: 193,
							columnNumber: 11
						}, this),
						/* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)(TabsTrigger, {
							value: "reel",
							children: "Hero Reel"
						}, void 0, false, {
							fileName: _jsxFileName,
							lineNumber: 194,
							columnNumber: 11
						}, this),
						/* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)(TabsTrigger, {
							value: "social",
							children: "Social"
						}, void 0, false, {
							fileName: _jsxFileName,
							lineNumber: 195,
							columnNumber: 11
						}, this),
						/* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)(TabsTrigger, {
							value: "seo",
							children: "SEO"
						}, void 0, false, {
							fileName: _jsxFileName,
							lineNumber: 196,
							columnNumber: 11
						}, this)
					]
				}, void 0, true, {
					fileName: _jsxFileName,
					lineNumber: 190,
					columnNumber: 9
				}, this),
				/* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)(TabsContent, {
					value: "general",
					className: "space-y-4",
					children: [/* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)(SettingsSection, {
						title: "Branding",
						children: [
							"websiteName",
							"browserTitle",
							"websiteLogo",
							"favicon"
						].map((field) => /* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)(Field, {
							label: field,
							value: String(settings.branding?.[field] || ""),
							onChange: (v) => updateField("branding", field, v)
						}, field, false, {
							fileName: _jsxFileName,
							lineNumber: 201,
							columnNumber: 96
						}, this))
					}, void 0, false, {
						fileName: _jsxFileName,
						lineNumber: 200,
						columnNumber: 11
					}, this), /* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)(SettingsSection, {
						title: "General Info",
						children: [
							"ownerName",
							"profession",
							"tagline",
							"shortDescription"
						].map((field) => /* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)(Field, {
							label: field,
							value: String(settings.general?.[field] || ""),
							onChange: (v) => updateField("general", field, v),
							multiline: field === "shortDescription"
						}, field, false, {
							fileName: _jsxFileName,
							lineNumber: 204,
							columnNumber: 97
						}, this))
					}, void 0, false, {
						fileName: _jsxFileName,
						lineNumber: 203,
						columnNumber: 11
					}, this)]
				}, void 0, true, {
					fileName: _jsxFileName,
					lineNumber: 199,
					columnNumber: 9
				}, this),
				/* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)(TabsContent, {
					value: "contact",
					className: "space-y-4",
					children: /* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)(SettingsSection, {
						title: "Contact Details",
						children: [
							"email",
							"phone",
							"whatsapp",
							"address",
							"googleMapsLink"
						].map((field) => /* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)(Field, {
							label: field,
							value: String(settings.contact?.[field] || ""),
							onChange: (v) => updateField("contact", field, v)
						}, field, false, {
							fileName: _jsxFileName,
							lineNumber: 210,
							columnNumber: 98
						}, this))
					}, void 0, false, {
						fileName: _jsxFileName,
						lineNumber: 209,
						columnNumber: 11
					}, this)
				}, void 0, false, {
					fileName: _jsxFileName,
					lineNumber: 208,
					columnNumber: 9
				}, this),
				/* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)(TabsContent, {
					value: "hero",
					className: "space-y-4",
					children: /* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)(SettingsSection, {
						title: "Hero Section",
						children: [
							"title",
							"subtitle",
							"description",
							"backgroundImage",
							"profileImage",
							"resumePdf",
							"resumeButtonText",
							"hireMeButtonText",
							"contactButtonText"
						].map((field) => /* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)(Field, {
							label: field,
							value: String(settings.hero?.[field] || ""),
							onChange: (v) => updateField("hero", field, v),
							multiline: field === "description"
						}, field, false, {
							fileName: _jsxFileName,
							lineNumber: 216,
							columnNumber: 184
						}, this))
					}, void 0, false, {
						fileName: _jsxFileName,
						lineNumber: 215,
						columnNumber: 11
					}, this)
				}, void 0, false, {
					fileName: _jsxFileName,
					lineNumber: 214,
					columnNumber: 9
				}, this),
				/* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)(TabsContent, {
					value: "reel",
					className: "space-y-4",
					children: /* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)(SettingsSection, {
						title: "Hero Reel Images",
						children: [/* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)("div", {
							className: "grid gap-4 sm:grid-cols-2 lg:grid-cols-3",
							children: [getReelImages().map((src, index) => /* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)("div", {
								className: "overflow-hidden rounded-lg border border-gray-800 bg-black",
								children: [/* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)("div", {
									className: "aspect-[4/5] bg-neutral-950",
									children: /* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)("img", {
										src: getUploadImageSrc(src),
										alt: "",
										className: "h-full w-full object-cover"
									}, void 0, false, {
										fileName: _jsxFileName,
										lineNumber: 225,
										columnNumber: 21
									}, this)
								}, void 0, false, {
									fileName: _jsxFileName,
									lineNumber: 224,
									columnNumber: 19
								}, this), /* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)("div", {
									className: "flex items-center justify-between gap-2 p-3",
									children: [/* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)("span", {
										className: "truncate text-xs text-gray-500",
										children: ["Image ", index + 1]
									}, void 0, true, {
										fileName: _jsxFileName,
										lineNumber: 228,
										columnNumber: 21
									}, this), /* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)(Button, {
										type: "button",
										variant: "ghost",
										size: "sm",
										onClick: () => removeReelImage(index),
										className: "text-gray-400 hover:text-red-400",
										children: /* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)(Trash2, { size: 14 }, void 0, false, {
											fileName: _jsxFileName,
											lineNumber: 230,
											columnNumber: 23
										}, this)
									}, void 0, false, {
										fileName: _jsxFileName,
										lineNumber: 229,
										columnNumber: 21
									}, this)]
								}, void 0, true, {
									fileName: _jsxFileName,
									lineNumber: 227,
									columnNumber: 19
								}, this)]
							}, `${src}-${index}`, true, {
								fileName: _jsxFileName,
								lineNumber: 223,
								columnNumber: 52
							}, this)), getReelImages().length === 0 && /* @__PURE__ */ (void 0)("div", {
								className: "rounded-lg border border-dashed border-gray-800 bg-black p-6 text-sm text-gray-500",
								children: [/* @__PURE__ */ (void 0)("p", {
									className: "mb-4",
									children: "Default reel images are showing now."
								}, void 0, false, {
									fileName: _jsxFileName,
									lineNumber: 235,
									columnNumber: 19
								}, this), /* @__PURE__ */ (void 0)(Button, {
									type: "button",
									variant: "outline",
									onClick: loadDefaultReelImages,
									className: "border-gray-700 bg-gray-950 text-white hover:bg-gray-900",
									children: "Load Current Images"
								}, void 0, false, {
									fileName: _jsxFileName,
									lineNumber: 236,
									columnNumber: 19
								}, this)]
							}, void 0, true, {
								fileName: _jsxFileName,
								lineNumber: 234,
								columnNumber: 48
							}, this)]
						}, void 0, true, {
							fileName: _jsxFileName,
							lineNumber: 222,
							columnNumber: 13
						}, this), /* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)("div", {
							className: "grid gap-3 rounded-lg border border-gray-800 bg-black p-4 md:grid-cols-[1fr_auto_auto] md:items-end",
							children: [
								/* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)("div", {
									className: "space-y-1.5",
									children: [/* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)(Label, {
										htmlFor: "hero-reel-url",
										className: "text-gray-400",
										children: "Image URL"
									}, void 0, false, {
										fileName: _jsxFileName,
										lineNumber: 244,
										columnNumber: 17
									}, this), /* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)(Input, {
										id: "hero-reel-url",
										value: reelImageUrl,
										onChange: (e) => setReelImageUrl(e.target.value),
										placeholder: "https://example.com/image.jpg",
										className: "border-gray-800 bg-gray-950 text-white"
									}, void 0, false, {
										fileName: _jsxFileName,
										lineNumber: 247,
										columnNumber: 17
									}, this)]
								}, void 0, true, {
									fileName: _jsxFileName,
									lineNumber: 243,
									columnNumber: 15
								}, this),
								/* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)(Button, {
									type: "button",
									onClick: () => void addReelImage(reelImageUrl),
									className: "bg-green-600 hover:bg-green-700",
									children: [/* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)(Plus, {
										size: 16,
										className: "mr-2"
									}, void 0, false, {
										fileName: _jsxFileName,
										lineNumber: 250,
										columnNumber: 17
									}, this), "Add URL"]
								}, void 0, true, {
									fileName: _jsxFileName,
									lineNumber: 249,
									columnNumber: 15
								}, this),
								/* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)("label", {
									className: "inline-flex h-10 cursor-pointer items-center justify-center rounded-md bg-blue-600 px-4 text-sm font-medium text-white hover:bg-blue-700",
									children: [
										/* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)(Upload, {
											size: 16,
											className: "mr-2"
										}, void 0, false, {
											fileName: _jsxFileName,
											lineNumber: 254,
											columnNumber: 17
										}, this),
										isUploadingReel ? "Uploading..." : "Upload",
										/* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)("input", {
											type: "file",
											accept: "image/*",
											disabled: isUploadingReel,
											className: "sr-only",
											onChange: (e) => {
												const file = e.target.files?.[0];
												e.currentTarget.value = "";
												if (file) uploadReelImage(file);
											}
										}, void 0, false, {
											fileName: _jsxFileName,
											lineNumber: 256,
											columnNumber: 17
										}, this)
									]
								}, void 0, true, {
									fileName: _jsxFileName,
									lineNumber: 253,
									columnNumber: 15
								}, this)
							]
						}, void 0, true, {
							fileName: _jsxFileName,
							lineNumber: 242,
							columnNumber: 13
						}, this)]
					}, void 0, true, {
						fileName: _jsxFileName,
						lineNumber: 221,
						columnNumber: 11
					}, this)
				}, void 0, false, {
					fileName: _jsxFileName,
					lineNumber: 220,
					columnNumber: 9
				}, this),
				/* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)(TabsContent, {
					value: "social",
					className: "space-y-4",
					children: /* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)(SettingsSection, {
						title: "Social Links",
						children: [
							"facebook",
							"linkedin",
							"behance",
							"dribbble",
							"github",
							"instagram",
							"youtube",
							"twitter"
						].map((platform) => {
							const entry = settings.social?.[platform] || {
								url: "",
								enabled: false
							};
							return /* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)("div", {
								className: "flex flex-col gap-2 rounded-lg border border-gray-800 bg-gray-900 p-4 sm:flex-row sm:items-center",
								children: [
									/* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)(Label, {
										className: "w-24 capitalize text-gray-400",
										children: platform
									}, void 0, false, {
										fileName: _jsxFileName,
										lineNumber: 277,
										columnNumber: 19
									}, this),
									/* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)(Input, {
										value: entry.url,
										onChange: (e) => updateSocial(platform, "url", e.target.value),
										placeholder: `${platform} URL`,
										className: "flex-1 border-gray-800 bg-black text-white"
									}, void 0, false, {
										fileName: _jsxFileName,
										lineNumber: 278,
										columnNumber: 19
									}, this),
									/* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)("div", {
										className: "flex items-center gap-2",
										children: [/* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)(Switch, {
											checked: entry.enabled,
											onCheckedChange: (v) => updateSocial(platform, "enabled", v)
										}, void 0, false, {
											fileName: _jsxFileName,
											lineNumber: 280,
											columnNumber: 21
										}, this), /* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)("span", {
											className: "text-xs text-gray-500",
											children: "Enabled"
										}, void 0, false, {
											fileName: _jsxFileName,
											lineNumber: 281,
											columnNumber: 21
										}, this)]
									}, void 0, true, {
										fileName: _jsxFileName,
										lineNumber: 279,
										columnNumber: 19
									}, this)
								]
							}, platform, true, {
								fileName: _jsxFileName,
								lineNumber: 276,
								columnNumber: 20
							}, this);
						})
					}, void 0, false, {
						fileName: _jsxFileName,
						lineNumber: 267,
						columnNumber: 11
					}, this)
				}, void 0, false, {
					fileName: _jsxFileName,
					lineNumber: 266,
					columnNumber: 9
				}, this),
				/* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)(TabsContent, {
					value: "seo",
					className: "space-y-4",
					children: /* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)(SettingsSection, {
						title: "SEO",
						children: [
							"homepageTitle",
							"metaTitle",
							"metaDescription",
							"canonicalUrl",
							"ogImage",
							"robots"
						].map((field) => /* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)(Field, {
							label: field,
							value: String(settings.seo?.[field] || ""),
							onChange: (v) => updateField("seo", field, v),
							multiline: field === "metaDescription"
						}, field, false, {
							fileName: _jsxFileName,
							lineNumber: 290,
							columnNumber: 125
						}, this))
					}, void 0, false, {
						fileName: _jsxFileName,
						lineNumber: 289,
						columnNumber: 11
					}, this)
				}, void 0, false, {
					fileName: _jsxFileName,
					lineNumber: 288,
					columnNumber: 9
				}, this)
			]
		}, void 0, true, {
			fileName: _jsxFileName,
			lineNumber: 189,
			columnNumber: 7
		}, this)
	] }, void 0, true, {
		fileName: _jsxFileName,
		lineNumber: 175,
		columnNumber: 10
	}, this);
}
function SettingsSection({ title, children }) {
	return /* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)("div", {
		className: "rounded-lg border border-gray-800 bg-gray-900 p-6 space-y-4",
		children: [/* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)("h2", {
			className: "text-lg font-semibold text-white",
			children: title
		}, void 0, false, {
			fileName: _jsxFileName,
			lineNumber: 304,
			columnNumber: 7
		}, this), children]
	}, void 0, true, {
		fileName: _jsxFileName,
		lineNumber: 303,
		columnNumber: 10
	}, this);
}
function Field({ label, value, onChange, multiline }) {
	const id = `field-${label}`;
	return /* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)("div", {
		className: "space-y-1.5",
		children: [/* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)(Label, {
			htmlFor: id,
			className: "capitalize text-gray-400",
			children: label.replace(/([A-Z])/g, " $1").trim()
		}, void 0, false, {
			fileName: _jsxFileName,
			lineNumber: 321,
			columnNumber: 7
		}, this), multiline ? /* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)(Textarea, {
			id,
			value,
			onChange: (e) => onChange(e.target.value),
			className: "border-gray-800 bg-black text-white min-h-[80px]"
		}, void 0, false, {
			fileName: _jsxFileName,
			lineNumber: 324,
			columnNumber: 20
		}, this) : /* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)(Input, {
			id,
			value,
			onChange: (e) => onChange(e.target.value),
			className: "border-gray-800 bg-black text-white"
		}, void 0, false, {
			fileName: _jsxFileName,
			lineNumber: 324,
			columnNumber: 159
		}, this)]
	}, void 0, true, {
		fileName: _jsxFileName,
		lineNumber: 320,
		columnNumber: 10
	}, this);
}
//#endregion
export { AdminSettings as component };
