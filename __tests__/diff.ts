import { diff } from '../src/diff';
import { Changes } from '../src/types/changes';

describe('diff', () => {
	it('should return null when the values are equal', () => {
		expect(diff(1, 1)).toBeNull();
		expect(diff('a', 'a')).toBeNull();
		expect(diff(true, true)).toBeNull();
		expect(diff(null, null)).toBeNull();
		expect(diff(undefined, undefined)).toBeNull();
		expect(diff([1, 2, 3], [1, 2, 3])).toBeNull();
		expect(diff({ a: 1, b: 2 }, { a: 1, b: 2 })).toBeNull();
		expect(diff([1, { a: 1, b: 2 }], [1, { a: 1, b: 2 }])).toBeNull();
		expect(diff({ a: 1, b: [1, 2] }, { a: 1, b: [1, 2] })).toBeNull();
	});

	it('should return the new value when the old value is a primitive', () => {
		expect(diff(1, 2)).toBe(2);
		expect(diff('a', 'b')).toBe('b');
		expect(diff(true, false)).toBe(false);
		expect(diff(null, 1)).toBe(1);
		expect(diff(undefined, 'a')).toBe('a');
	});

	it('should return the new value when the new value is a primitive', () => {
		expect(diff(1, null)).toBeNull();
		expect(diff('a', undefined)).toBeUndefined();
		expect(diff(true, 1)).toBe(1);
		expect(diff(null, 'a')).toBe('a');
		expect(diff(undefined, false)).toBe(false);
	});

	it('should return the new value when the old value is an array and the new value is a primitive', () => {
		const oldArr = [1, 2, 3];
		expect(diff(oldArr, 1)).toBe(1);
	});

	it('should return the new value when the old value is a primitive and the new value is an array', () => {
		const oldVal = 1;
		const newArr = [1, 2, 3];
		expect(diff(oldVal, newArr)).toBe(newArr);
	});

	it('should return the new value when the old value is an object and the new value is a primitive', () => {
		const oldObj = { a: 1, b: 2 };
		expect(diff(oldObj, 1)).toBe(1);
	});

	it('should return the new value when the old value is a primitive and the new value is an object', () => {
		const oldVal = 1;
		const newObj = { a: 1, b: 2 };
		expect(diff(oldVal, newObj)).toBe(newObj);
	});

	it('should return the new value when the old value is an array and the new value is an object', () => {
		const oldArr = [1, 2, 3];
		const newObj = { a: 1, b: 2 };
		expect(diff(oldArr, newObj)).toBe(newObj);
	});

	it('should return the new value when the old value is an object and the new value is an array', () => {
		const oldObj = { a: 1, b: 2 };
		const newArr = [1, 2, 3];
		expect(diff(oldObj, newArr)).toBe(newArr);
	});

	// Complex cases with a lot of nesting
	describe('complex cases with nestings', () => {
		it('Complex case 1', () => {
			const oldVal = { a: [1, 2, 3], b: { c: 4, d: 5 } };
			const newVal = { a: [1, 2, 3], b: { c: 4, d: 5 } };
			expect(diff(oldVal, newVal)).toBeNull();
		});

		it('Complex case 2', () => {
			const oldVal = { a: [1, 2, 3], b: { c: 4, d: 5 } };
			const newVal = { a: [1, 2, 3, 4], b: { c: 4, d: 5 } };
			expect(diff(oldVal, newVal)).toStrictEqual<Changes>({
				entity: 'obj',
				updates: {
					a: {
						entity: 'arr',
						additions: [4],
					},
				},
			});
		});

		it('Complex case 3', () => {
			const oldVal = { a: [1, 2, 3], b: { c: 4, d: 5 } };
			const newVal = { a: [1, 2, 3], b: { c: 4, d: 5, e: 6 } };
			expect(diff(oldVal, newVal)).toStrictEqual<Changes>({
				entity: 'obj',
				updates: {
					b: {
						entity: 'obj',
						additions: { e: 6 },
					},
				},
			});
		});

		it('Complex case 4', () => {
			const oldVal = { a: [1, 2, 3], b: { c: 4, d: 5 } };
			const newVal = { a: [1, 2, 3, 4], b: { c: 4, d: 6 } };
			expect(diff(oldVal, newVal)).toStrictEqual<Changes>({
				entity: 'obj',
				updates: {
					a: {
						entity: 'arr',
						additions: [4],
					},
					b: {
						entity: 'obj',
						updates: {
							d: 6,
						},
					},
				},
			});
		});

		it('Complex case 5', () => {
			const oldVal = { a: [1, 2, 3], b: { c: 4, d: 5 } };
			const newVal = { a: [1, 2, 3, 4], b: { c: 4, d: 5, e: 6 } };
			expect(diff(oldVal, newVal)).toStrictEqual<Changes>({
				entity: 'obj',
				updates: {
					a: {
						entity: 'arr',
						additions: [4],
					},
					b: {
						entity: 'obj',
						additions: { e: 6 },
					},
				},
			});
		});

		it('Complex case 6 - array of objects', () => {
			const oldVal = [
				{ a: 1, b: 2 },
				{ c: 3, d: 4 },
			];
			const newVal = [
				{ a: 1, b: 2 },
				{ c: 3, d: 4 },
			];
			expect(diff(oldVal, newVal)).toBeNull();
		});

		it('Complex case 7 - array of objects', () => {
			const oldVal = [
				{ a: 1, b: 2 },
				{ c: 3, d: 4 },
			];
			const newVal = [
				{ a: 1, b: 2 },
				{ c: 3, d: 4, e: 5 },
			];
			expect(diff(oldVal, newVal)).toStrictEqual<Changes>({
				entity: 'arr',
				updates: {
					1: {
						entity: 'obj',
						additions: { e: 5 },
					},
				},
			});
		});
	});
});
