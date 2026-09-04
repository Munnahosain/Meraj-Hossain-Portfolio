import { o as __toESM } from "../_runtime.mjs";
import { u as require_react } from "../_libs/@floating-ui/react-dom+[...].mjs";
//#region node_modules/.nitro/vite/services/ssr/assets/use-local-storage-DfBBwPrj.js
var import_react = /* @__PURE__ */ __toESM(require_react());
function useLocalStorage(key, initialValue) {
	const getSnapshot = (0, import_react.useCallback)(() => {
		if (typeof window === "undefined") return initialValue;
		try {
			const item = window.localStorage.getItem(key);
			return item !== null ? JSON.parse(item) : initialValue;
		} catch {
			return initialValue;
		}
	}, [key, initialValue]);
	const [storedValue, setStoredValue] = (0, import_react.useState)(getSnapshot);
	(0, import_react.useEffect)(() => {
		setStoredValue(getSnapshot());
		const handleStorageChange = () => {
			setStoredValue(getSnapshot());
		};
		window.addEventListener("storage", handleStorageChange);
		window.addEventListener("local-storage-update", handleStorageChange);
		return () => {
			window.removeEventListener("storage", handleStorageChange);
			window.removeEventListener("local-storage-update", handleStorageChange);
		};
	}, [getSnapshot]);
	const setValue = (value) => {
		try {
			const valueToStore = value instanceof Function ? value(storedValue) : value;
			setStoredValue(valueToStore);
			if (typeof window !== "undefined") {
				if (valueToStore === "" || valueToStore === null || valueToStore === void 0) window.localStorage.removeItem(key);
				else window.localStorage.setItem(key, JSON.stringify(valueToStore));
				window.dispatchEvent(new Event("local-storage-update"));
			}
		} catch (error) {
			console.error(`Error setting localStorage key "${key}":`, error);
		}
	};
	return [storedValue, setValue];
}
//#endregion
export { useLocalStorage as t };
