import { diffObject } from '../src/diff';
import { JSONObject } from '../src/types/json';

describe('diffObject', () => {
	it('should return null when the objects are equal', () => {
		const oldObj = { a: 1, b: 2, c: 3 };
		const newObj = { a: 1, b: 2, c: 3 };
		expect(diffObject(oldObj, newObj)).toBeNull();
	});

	it('should return an object of additions when the new object has more keys', () => {
		const oldObj = { a: 1, b: 2, c: 3 };
		const newObj = { a: 1, b: 2, c: 3, d: 4, e: 5 };
		expect(diffObject(oldObj, newObj)).toEqual({
			entity: 'obj',
			additions: { d: 4, e: 5 },
		});
	});

	it('should return an object of deletions when the new object has fewer keys', () => {
		const oldObj = { a: 1, b: 2, c: 3, d: 4, e: 5 };
		const newObj = { a: 1, b: 2, c: 3 };
		expect(diffObject(oldObj, newObj)).toEqual({
			entity: 'obj',
			deletions: ['d', 'e'],
		});
	});

	it('should return an object of updates when the objects have different values', () => {
		const oldObj = { a: 1, b: 2, c: 3 };
		const newObj = { a: 1, b: 4, c: 3 };
		expect(diffObject(oldObj, newObj)).toEqual({
			entity: 'obj',
			updates: { b: 4 },
		});
	});

	it('should return null when the objects are empty', () => {
		const oldObj: JSONObject = {};
		const newObj: JSONObject = {};
		expect(diffObject(oldObj, newObj)).toBeNull();
	});

	// Case when some are modified and some are added and some are deleted
	it('should return an object of additions, deletions, and updates for objects of similar size', () => {
		type T = {
			[key: string]: number;
		};
		const oldObj = { a: 1, b: 2, c: 3, d: 4, e: 5 };
		const newObj = { a: 1, c: 3, d: 6, f: 7, g: 8 };

		expect(diffObject<T>(oldObj, newObj)).toEqual({
			entity: 'obj',
			additions: { f: 7, g: 8 },
			deletions: ['b', 'e'],
			updates: { d: 6 },
		});
	});
});
