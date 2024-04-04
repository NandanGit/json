import { isArrayChanges, isObjectChanges } from './type-guards/changes';
import { Changes } from './types/changes';
import { JSONValue } from './types/json';
import { isJSONArray, deepClone, isJSONObject } from './utils/general';

/**
 *
 * @param oldJSON The old JSON
 * @param changes The changes to be applied
 * @returns The new JSON
 * @summary This function takes in an old JSON and a set of changes and returns a new JSON.
 */
export const buildJSON = <T extends JSONValue>(
	oldJSON: T,
	changes: Changes
): T => {
	if (changes === null) {
		return oldJSON;
	}
	if (typeof changes !== 'object') {
		return changes as T;
	}
	if (isJSONArray(oldJSON) && isArrayChanges(changes)) {
		const { additions, deletions, updates } = changes;
		const oldArr = oldJSON; // as JSONValue[];
		const newArr = deepClone(oldArr); // [...oldArr];
		if (additions) {
			additions.forEach((addition) => {
				newArr.push(addition);
			});
		}
		if (deletions) {
			deletions.forEach((index) => {
				newArr.splice(index, 1);
			});
		}
		if (updates) {
			Object.entries(updates).forEach(([index, changes]) => {
				newArr[parseInt(index)] = buildJSON(oldArr[parseInt(index)], changes);
			});
		}
		return newArr;
	}
	if (isJSONObject(oldJSON) && isObjectChanges(changes)) {
		const { additions, deletions, updates } = changes;
		const oldObj = oldJSON;
		const newObj = deepClone(oldObj); // { ...oldObj };
		if (additions) {
			Object.entries(additions).forEach(([key, value]) => {
				newObj[key] = value;
			});
		}
		if (deletions) {
			deletions.forEach((key) => {
				delete newObj[key];
			});
		}
		if (updates) {
			Object.entries(updates).forEach(([key, changes]) => {
				newObj[key] = buildJSON(oldObj[key], changes);
			});
		}
		return newObj;
	}
	return changes as T;
};
