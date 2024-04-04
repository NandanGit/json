import { JSONValue } from '../src/types/json';
import { diffArray } from '../src/diff/array';

describe('diffArray', () => {
	it('should return null when the arrays are equal', () => {
		const oldArr = [1, 2, 3];
		const newArr = [1, 2, 3];
		expect(diffArray(oldArr, newArr)).toBeNull();
	});

	it('should return an array of additions when the new array is longer', () => {
		const oldArr = [1, 2, 3];
		const newArr = [1, 2, 3, 4, 5];
		expect(diffArray(oldArr, newArr)).toEqual({
			entity: 'arr',
			additions: [4, 5],
		});
	});

	it('should return an array of deletions (indices) when the new array is shorter', () => {
		const oldArr = [1, 2, 3, 4, 5];
		const newArr = [1, 2, 3];
		expect(diffArray(oldArr, newArr)).toEqual({
			entity: 'arr',
			deletions: [3, 4],
		});
	});

	it('should return an array of updates when the arrays have different elements', () => {
		const oldArr = [1, 2, 3];
		const newArr = [1, 4, 3];
		expect(diffArray(oldArr, newArr)).toEqual({
			entity: 'arr',
			updates: {
				1: 4,
			},
		});
	});

	it('should return null when the arrays are empty', () => {
		const oldArr: JSONValue[] = [];
		const newArr: JSONValue[] = [];
		expect(diffArray(oldArr, newArr)).toBeNull();
	});

	// Case when some are modified and some are added and some are deleted
	it('should return an array of additions, deletions, and updates for arrays of similar size', () => {
		const oldArr = [1, 2, 3, 4, 5];
		const newArr = [1, 3, 4, 6, 7];

		expect(diffArray(oldArr, newArr)).toEqual({
			entity: 'arr',
			// additions: [6, 7],
			// deletions: [1],
			updates: {
				1: 3,
				2: 4,
				3: 6,
				4: 7,
			},
		});
	});

	it('should return an array of additions, deletions, and updates for arrays of different size', () => {
		const oldArr = [1, 2, 3, 4, 5];
		const newArr = [1, 3, 4, 6];

		expect(diffArray(oldArr, newArr)).toEqual({
			entity: 'arr',
			deletions: [4],
			updates: {
				1: 3,
				2: 4,
				3: 6,
			},
		});
	});
});
