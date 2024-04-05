import { JSONValue, JSONObject } from '../types/json';

export function deepClone<T extends JSONValue>(obj: T): T {
	return JSON.parse(JSON.stringify(obj));
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
