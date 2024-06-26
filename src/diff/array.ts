import { diff } from '.';
import { ArrayChanges } from '../types/changes';
import { JSONValue } from '../types/json';
import { removeUndefined } from '../utils/general';

export function diffArray<T extends JSONValue>(
	oldArr: T[],
	newArr: T[]
): ArrayChanges<T> | null {
	const oldLength = oldArr.length;
	const newLength = newArr.length;
	// Pad the arrays with nulls
	const maxLength = Math.max(oldLength, newLength);
	oldArr = [...oldArr, ...Array(maxLength - oldLength).fill(null)];
	newArr = [...newArr, ...Array(maxLength - newLength).fill(null)];
	// console.log(oldArr, newArr);

	const additions: ArrayChanges<T>['additions'] = [];
	const deletions: ArrayChanges<T>['deletions'] = [];
	const updates: ArrayChanges<T>['updates'] = {};

	for (let i = 0; i < maxLength; i++) {
		// const changes = diff(oldArr[i], newArr[i]);
		// console.log(changes);
		if (oldArr[i] === null) {
			additions.push(newArr[i]);
		} else if (newArr[i] === null) {
			deletions.push(i);
		} else {
			const changes = diff(oldArr[i], newArr[i]);
			if (changes !== null) {
				updates[i] = changes as NonNullable<ArrayChanges<T>['updates']>[number];
			}
		}
	}
	// console.log(additions, deletions, updates);
	if ([...additions, ...deletions, ...Object.values(updates)].length === 0) {
		return null;
	}
	return removeUndefined<ArrayChanges<T>>({
		entity: 'arr',
		additions: additions.length > 0 ? additions : undefined,
		deletions: deletions.length > 0 ? deletions : undefined,
		updates: Object.keys(updates).length > 0 ? updates : undefined,
	});
}
