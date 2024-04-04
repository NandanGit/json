import { isArrayChanges, isObjectChanges } from '../src/type-guards/changes.ts';
import { Changes } from '../src/types/changes.ts';

describe('isArrayChanges', () => {
	it('should return true when changes is an array', () => {
		const changes: Changes = { entity: 'arr', changes: [] };
		expect(isArrayChanges(changes)).toBe(true);
	});

	it('should return false when changes is not an array', () => {
		const changes: Changes = { entity: 'obj', changes: {} };
		expect(isArrayChanges(changes)).toBe(false);
	});
});

describe('isObjectChanges', () => {
	it('should return true when changes is an object', () => {
		const changes: Changes = { entity: 'obj', changes: {} };
		expect(isObjectChanges(changes)).toBe(true);
	});

	it('should return false when changes is not an object', () => {
		const changes: Changes = { entity: 'arr', changes: [] };
		expect(isObjectChanges(changes)).toBe(false);
	});
});
