import { diff } from '.';
import { ObjectChanges } from '../types/changes';
import { JSONObject } from '../types/json';
import { deepEqual, removeUndefined } from '../utils/general';

export function diffObject<T extends JSONObject>(
	oldObj: T,
	newObj: T
): ObjectChanges<T> | null {
	const oldKeys = Object.keys(oldObj);
	const newKeys = Object.keys(newObj);
	const addedKeys = newKeys.filter((newKey) => !oldKeys.includes(newKey));
	const deletedKeys = oldKeys.filter((oldKey) => !newKeys.includes(oldKey));
	const updatedKeys = newKeys.filter(
		(newKey) =>
			oldKeys.includes(newKey) && !deepEqual(oldObj[newKey], newObj[newKey])
	);
	// console.log(addedKeys, deletedKeys, updatedKeys);
	if ([...addedKeys, ...deletedKeys, ...updatedKeys].length === 0) {
		return null;
	}
	const additions = addedKeys.reduce((acc, key) => {
		acc[key] = newObj[key];
		return acc;
	}, {} as Record<string, unknown>) as NonNullable<
		ObjectChanges<T>['additions']
	>;
	const deletions = deletedKeys;
	const updates = updatedKeys.reduce((acc, key) => {
		acc[key] = diff(oldObj[key], newObj[key]);
		return acc;
	}, {} as Record<string, unknown>) as NonNullable<ObjectChanges<T>['updates']>;

	return removeUndefined<ObjectChanges<T>>({
		entity: 'obj',
		additions: Object.keys(additions).length > 0 ? additions : undefined,
		deletions: deletions.length > 0 ? deletions : undefined,
		updates: Object.keys(updates).length > 0 ? updates : undefined,
	});
}
