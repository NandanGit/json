import { JSONValue, JSONObject } from '../types/json';

// export function deepClone<T extends JSONValue>(obj: T): T {
// 	return JSON.parse(JSON.stringify(obj));
// }

// export function deepClone<T>(obj: T): T {
// 	const hash = new WeakMap();
// 	function clone<T>(obj: T): T {
// 		if (obj instanceof Object) {
// 			if (hash.has(obj)) return hash.get(obj);
// 			let newObj = Array.isArray(obj) ? [] : {};
// 			hash.set(obj, newObj);
// 			for (let key in obj) {
// 				if (obj.hasOwnProperty(key)) {
// 					(newObj as any)[key] = clone((obj as any)[key]);
// 				}
// 			}
// 			return newObj as any;
// 		} else return obj;
// 	}
// 	return clone(obj);
// }

// export function deepClone<T>(obj: T): T {
// 	const hash = new WeakMap();

// 	function clone<T>(obj: T): T {
// 		if (obj === null || typeof obj !== 'object') {
// 			return obj;
// 		}

// 		if (hash.has(obj)) {
// 			return hash.get(obj);
// 		}

// 		// Handle Date
// 		if (obj instanceof Date) {
// 			return new Date(obj.getTime()) as any;
// 		}

// 		// Handle RegExp
// 		if (obj instanceof RegExp) {
// 			return new RegExp(obj) as any;
// 		}

// 		// Handle Set
// 		if (obj instanceof Set) {
// 			const result = new Set();
// 			hash.set(obj, result);
// 			obj.forEach((value) => {
// 				result.add(clone(value));
// 			});
// 			return result as any;
// 		}

// 		// Handle Map
// 		if (obj instanceof Map) {
// 			const result = new Map();
// 			hash.set(obj, result);
// 			obj.forEach((value, key) => {
// 				result.set(key, clone(value));
// 			});
// 			return result as any;
// 		}

// 		// Handle Array or Object
// 		const result = Array.isArray(obj)
// 			? []
// 			: Object.create(Object.getPrototypeOf(obj));
// 		hash.set(obj, result);

// 		for (const key in obj) {
// 			if (obj.hasOwnProperty(key)) {
// 				(result as any)[key] = clone((obj as any)[key]);
// 			}
// 		}

// 		return result;
// 	}

// 	return clone(obj);
// }

export function deepClone<T>(obj: T): T {
	const hash = new WeakMap();

	function clone<T>(obj: T): T {
		if (obj === null || typeof obj !== 'object') {
			return obj;
		}

		if (hash.has(obj)) {
			return hash.get(obj);
		}

		const result = Array.isArray(obj)
			? []
			: Object.create(Object.getPrototypeOf(obj));
		hash.set(obj, result);

		for (const key in obj) {
			if (Object.prototype.hasOwnProperty.call(obj, key)) {
				(result as any)[key] = clone((obj as any)[key]);
			}
		}

		return result;
	}

	return clone(obj);
}

export function deepCloneWithoutUndefined<T>(obj: T): T {
	const hash = new WeakMap();

	function clone<T>(obj: T): T {
		if (obj === null || typeof obj !== 'object') {
			return obj;
		}

		if (hash.has(obj)) {
			return hash.get(obj);
		}

		const result = Array.isArray(obj)
			? []
			: Object.create(Object.getPrototypeOf(obj));
		hash.set(obj, result);

		for (const key in obj) {
			if (Object.prototype.hasOwnProperty.call(obj, key)) {
				const value = (obj as any)[key];
				if (value !== undefined) {
					(result as any)[key] = clone(value);
				}
			}
		}

		return result;
	}

	return clone(obj);
}

export function deepEqual(a: any, b: any): boolean {
	// Check for simple primitives and references
	if (a === b) return true;

	// Handle null or undefined values
	if (a == null || b == null) return false;

	// Check if both are objects
	if (typeof a === 'object' && typeof b === 'object') {
		const keysA = Object.keys(a);
		const keysB = Object.keys(b);

		// Check if number of keys is the same
		if (keysA.length !== keysB.length) return false;

		// Check if all keys in object A are present in object B
		for (const key of keysA) {
			if (!keysB.includes(key)) return false;

			// Recursively deep compare values
			if (!deepEqual(a[key], b[key])) return false;
		}

		return true;
	}

	// Handle other non-object types
	return false;
}

export function isJSONObject(obj: unknown): obj is JSONObject {
	return typeof obj === 'object' && !Array.isArray(obj) && obj !== null;
}

export function isJSONArray(obj: unknown): obj is JSONValue[] {
	return Array.isArray(obj);
}

export function isElementOf(arr: JSONValue[], obj: JSONValue): boolean {
	return arr.some((element) => deepEqual(element, obj));
}

export function removeUndefined<T extends Record<string, unknown>>(obj: T): T {
	return Object.entries(obj).reduce((acc, [key, value]) => {
		if (value !== undefined) {
			(acc as any)[key] = value;
		}
		return acc;
	}, {} as T);
}
