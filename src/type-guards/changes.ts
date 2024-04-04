import { Changes, ArrayChanges, ObjectChanges } from '../types/changes';
import { isJSONObject } from '../utils/general';

export const isArrayChanges = (changes: Changes): changes is ArrayChanges => {
	return isJSONObject(changes) && changes.entity === 'arr';
};

export const isObjectChanges = (changes: Changes): changes is ObjectChanges => {
	return isJSONObject(changes) && changes.entity === 'obj';
};
