import { diff } from '.';
import { ObjectChanges } from '../types/changes';
import { JSONObject } from '../types/json';
import { deepEqual, removeUndefined } from '../utils/general';

export function diffObject(
	oldObj: JSONObject,
	newObj: JSONObject
): ObjectChanges | null {
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
	}, {} as NonNullable<ObjectChanges['additions']>);
	const deletions = deletedKeys;
	const updates: ObjectChanges['updates'] = updatedKeys.reduce((acc, key) => {
		acc[key] = diff(oldObj[key], newObj[key]);
		return acc;
	}, {} as NonNullable<ObjectChanges['updates']>);

	return removeUndefined<ObjectChanges>({
		entity: 'obj',
		additions: Object.keys(additions).length > 0 ? additions : undefined,
		deletions: deletions.length > 0 ? deletions : undefined,
		updates: Object.keys(updates).length > 0 ? updates : undefined,
	});
}
