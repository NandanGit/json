import { Changes } from '../types/changes';
import { JSONValue } from '../types/json';
import { isJSONArray, isJSONObject } from '../utils/general';
import { diffArray } from './array';
import { diffObject } from './object';

export function diff(oldObj: JSONValue, newObj: JSONValue): Changes {
	// Write the cases when both are primitives
	if (typeof oldObj !== 'object' || typeof newObj !== 'object') {
		if (oldObj === newObj) {
			return null;
		}
		return newObj;
	}

	// Write the cases when both are arrays
	if (isJSONArray(oldObj) && isJSONArray(newObj)) {
		return diffArray(oldObj, newObj);
	}

	// Write the cases when both are objects
	if (isJSONObject(oldObj) && isJSONObject(newObj)) {
		return diffObject(oldObj, newObj);
	}

	// Write the cases when both are of different types
	return newObj;
}

export { diffArray, diffObject };
