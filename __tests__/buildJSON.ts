// FILEPATH: /Users/nandan/Nandu/Programming/OwnProjects/npmPackages/nandn/json/src/buildJSON.test.ts
import { buildJSON } from '../src/buildJSON';
import { diffArray, diffObject } from '../src/diff';

describe('buildJSON', () => {
	// Primitive types
	describe('Primitive types', () => {
		it('should return the new value when the old value is a primitive', () => {
			const oldVal = 1;
			const changes = 2;
			expect(buildJSON(oldVal, changes)).toBe(changes);
		});

		it('should return the new value when the old value is a string', () => {
			const oldVal = 'a';
			const changes = 'b';
			expect(buildJSON(oldVal, changes)).toBe(changes);
		});

		it('should return the new value when the old value is a boolean', () => {
			const oldVal = true;
			const changes = false;
			expect(buildJSON(oldVal, changes)).toBe(changes);
		});

		it('should return the new value when the old value is null', () => {
			const oldVal = null;
			const changes = 1;
			expect(buildJSON(oldVal, changes)).toBe(changes);
		});

		it('should return the new value when the old value is undefined', () => {
			const oldVal = undefined;
			const changes = 'a';
			expect(buildJSON(oldVal, changes)).toBe(changes);
		});

		// Different types of primitives
		it('should return the new value when the old value is a number and the new value is a string', () => {
			const oldVal = 1;
			const changes = 'a';
			expect(buildJSON(oldVal, changes)).toBe(changes);
		});

		it('should return the new value when the old value is a string and the new value is a number', () => {
			const oldVal = 'a';
			const changes = 1;
			expect(buildJSON(oldVal, changes)).toBe(changes);
		});

		it('should return the new value when the old value is a boolean and the new value is a number', () => {
			const oldVal = true;
			const changes = 1;
			expect(buildJSON(oldVal, changes)).toBe(changes);
		});

		it('should return the new value when the old value is a number and the new value is a boolean', () => {
			const oldVal = 1;
			const changes = true;
			expect(buildJSON(oldVal, changes)).toBe(changes);
		});

		it('should return the new value when the old value is a string and the new value is a boolean', () => {
			const oldVal = 'a';
			const changes = true;
			expect(buildJSON(oldVal, changes)).toBe(changes);
		});

		it('should return the new value when the old value is a boolean and the new value is a string', () => {
			const oldVal = true;
			const changes = 'a';
			expect(buildJSON(oldVal, changes)).toBe(changes);
		});
	});

	// Arrays
	describe('Arrays', () => {
		it('when both the arrays are equal', () => {
			const oldArr = [1, 2, 3];
			const newArr = [1, 2, 3];
			const changes = diffArray(oldArr, newArr);
			expect(buildJSON(oldArr, changes)).toEqual(newArr);
		});

		it('when elements are added', () => {
			const oldArr = [1, 2, 3];
			const newArr = [1, 2, 3, 4, 5];
			const changes = diffArray(oldArr, newArr);
			expect(buildJSON(oldArr, changes)).toEqual(newArr);
		});

		it('when elements are deleted', () => {
			const oldArr = [1, 2, 3, 4, 5];
			const newArr = [1, 2, 3];
			const changes = diffArray(oldArr, newArr);
			expect(buildJSON(oldArr, changes)).toEqual(newArr);
		});

		it('when elements are updated', () => {
			const oldArr = [1, 2, 3];
			const newArr = [1, 4, 3];
			const changes = diffArray(oldArr, newArr);
			expect(buildJSON(oldArr, changes)).toEqual(newArr);
		});

		it('when elements are added, deleted, and updated', () => {
			const oldArr = [1, 2, 3, 4, 5];
			const newArr = [1, 3, 4, 6, 7];
			const changes = diffArray(oldArr, newArr);
			expect(buildJSON(oldArr, changes)).toEqual(newArr);
		});

		it('when the arrays are empty', () => {
			const oldArr: any[] = [];
			const newArr: any[] = [];
			const changes = diffArray(oldArr, newArr);
			expect(buildJSON(oldArr, changes)).toEqual(newArr);
		});

		it('when the old array is empty and the new array is not', () => {
			const oldArr: any[] = [];
			const newArr = [1, 2, 3];
			const changes = diffArray(oldArr, newArr);
			expect(buildJSON(oldArr, changes)).toEqual(newArr);
		});

		it('when the new array is empty and the old array is not', () => {
			const oldArr = [1, 2, 3];
			const newArr: any[] = [];
			const changes = diffArray(oldArr, newArr);
			expect(buildJSON(oldArr, changes)).toEqual(newArr);
		});

		it('when the old array is empty and the new array has one element', () => {
			const oldArr: any[] = [];
			const newArr = [1];
			const changes = diffArray(oldArr, newArr);
			expect(buildJSON(oldArr, changes)).toEqual(newArr);
		});

		it('when the new array is empty and the old array has one element', () => {
			const oldArr = [1];
			const newArr: any[] = [];
			const changes = diffArray(oldArr, newArr);
			expect(buildJSON(oldArr, changes)).toEqual(newArr);
		});

		it('when the old array has one element and the new array has one element', () => {
			const oldArr = [1];
			const newArr = [2];
			const changes = diffArray(oldArr, newArr);
			expect(buildJSON(oldArr, changes)).toEqual(newArr);
		});
	});

	// Objects
	describe('Objects', () => {
		it('when both the objects are equal', () => {
			const oldObj = { a: 1, b: 2, c: 3 };
			const newObj = { a: 1, b: 2, c: 3 };
			const changes = diffObject(oldObj, newObj);
			expect(buildJSON(oldObj, changes)).toEqual(newObj);
		});

		it('when keys are added', () => {
			const oldObj = { a: 1, b: 2, c: 3 };
			const newObj = { a: 1, b: 2, c: 3, d: 4, e: 5 };
			const changes = diffObject(oldObj, newObj);
			expect(buildJSON(oldObj, changes)).toEqual(newObj);
		});

		it('when keys are deleted', () => {
			const oldObj = { a: 1, b: 2, c: 3, d: 4, e: 5 };
			const newObj = { a: 1, b: 2, c: 3 };
			const changes = diffObject(oldObj, newObj);
			expect(buildJSON(oldObj, changes)).toEqual(newObj);
		});

		it('when keys are updated', () => {
			const oldObj = { a: 1, b: 2, c: 3 };
			const newObj = { a: 1, b: 4, c: 3 };
			const changes = diffObject(oldObj, newObj);
			expect(buildJSON(oldObj, changes)).toEqual(newObj);
		});

		it('when keys are added, deleted, and updated', () => {
			type T = {
				a?: number;
				b?: number;
				c?: number;
				d?: number;
				e?: number;
				f?: number;
				g?: number;
			};
			const oldObj: T = { a: 1, b: 2, c: 3, d: 4, e: 5 };
			const newObj: T = { a: 1, c: 3, d: 6, f: 7, g: 8 };
			const changes = diffObject(oldObj, newObj);
			expect(buildJSON(oldObj, changes)).toEqual(newObj);
		});

		it('when the objects are empty', () => {
			const oldObj: any = {};
			const newObj: any = {};
			const changes = diffObject(oldObj, newObj);
			expect(buildJSON(oldObj, changes)).toEqual(newObj);
		});

		it('when the old object is empty and the new object is not', () => {
			const oldObj: any = {};
			const newObj = { a: 1, b: 2, c: 3 };
			const changes = diffObject(oldObj, newObj);
			expect(buildJSON(oldObj, changes)).toEqual(newObj);
		});

		it('when the new object is empty and the old object is not', () => {
			const oldObj = { a: 1, b: 2, c: 3 };
			const newObj: any = {};
			const changes = diffObject(oldObj, newObj);
			expect(buildJSON(oldObj, changes)).toEqual(newObj);
		});

		it('when the old object is empty and the new object has one key', () => {
			const oldObj: any = {};
			const newObj = { a: 1 };
			const changes = diffObject(oldObj, newObj);
			expect(buildJSON(oldObj, changes)).toEqual(newObj);
		});

		it('when the new object is empty and the old object has one key', () => {
			const oldObj = { a: 1 };
			const newObj: any = {};
			const changes = diffObject(oldObj, newObj);
			expect(buildJSON(oldObj, changes)).toEqual(newObj);
		});
	});

	// Mixed
	describe('Mixed', () => {
		it('when the old value is an array and the new value is an object', () => {
			const oldVal = [1, 2, 3];
			const newObj = { a: 1, b: 2 };
			expect(buildJSON(oldVal, newObj)).toBe(newObj);
		});

		it('when the old value is an object and the new value is an array', () => {
			const oldObj = { a: 1, b: 2 };
			const newArr = [1, 2, 3];
			expect(buildJSON(oldObj, newArr)).toBe(newArr);
		});

		// Complex cases with a lot of nesting
		describe('Arrays in Objects', () => {
			it('unchanged arrays', () => {
				const oldObj = { a: [1, 2, 3], b: { c: 4, d: 5 } };
				const newObj = { a: [1, 2, 3], b: { c: 4, d: 5 } };
				const changes = diffObject(oldObj, newObj);
				expect(buildJSON(oldObj, changes)).toEqual(newObj);
			});

			it('1 elements added', () => {
				const oldObj = { a: [1, 2, 3], b: { c: 4, d: 5 } };
				const newObj = { a: [1, 2, 3, 4], b: { c: 4, d: 5 } };
				const changes = diffObject(oldObj, newObj);
				expect(buildJSON(oldObj, changes)).toEqual(newObj);
			});

			it('1 elements deleted', () => {
				const oldObj = { a: [1, 2, 3], b: { c: 4, d: 5 } };
				const newObj = { a: [1, 2], b: { c: 4, d: 5 } };
				const changes = diffObject(oldObj, newObj);
				expect(buildJSON(oldObj, changes)).toEqual(newObj);
			});

			it('1 elements updated', () => {
				const oldObj = { a: [1, 2, 3], b: { c: 4, d: 5 } };
				const newObj = { a: [1, 2, 4], b: { c: 4, d: 5 } };
				const changes = diffObject(oldObj, newObj);
				expect(buildJSON(oldObj, changes)).toEqual(newObj);
			});

			it('2 elements added', () => {
				const oldObj = { a: [1, 2, 3], b: { c: 4, d: 5 } };
				const newObj = { a: [1, 2, 3, 4, 5], b: { c: 4, d: 5 } };
				const changes = diffObject(oldObj, newObj);
				expect(buildJSON(oldObj, changes)).toEqual(newObj);
			});

			it('2 elements deleted', () => {
				const oldObj = { a: [1, 2, 3], b: { c: 4, d: 5 } };
				const newObj = { a: [1], b: { c: 4, d: 5 } };
				const changes = diffObject(oldObj, newObj);
				expect(buildJSON(oldObj, changes)).toEqual(newObj);
			});

			it('2 elements updated', () => {
				const oldObj = { a: [1, 2, 3], b: { c: 4, d: 5 } };
				const newObj = { a: [1, 4, 3], b: { c: 4, d: 5 } };
				const changes = diffObject(oldObj, newObj);
				expect(buildJSON(oldObj, changes)).toEqual(newObj);
			});

			it('2 elements added, 2 elements deleted, 2 elements updated', () => {
				const oldObj = { a: [1, 2, 3, 4, 5], b: { c: 4, d: 5 } };
				const newObj = { a: [1, 3, 4, 6, 7], b: { c: 4, d: 5 } };
				const changes = diffObject(oldObj, newObj);
				expect(buildJSON(oldObj, changes)).toEqual(newObj);
			});
		});

		describe('Objects in Arrays', () => {
			it('unchanged objects', () => {
				const oldArr = [
					{ a: 1, b: 2 },
					{ c: 3, d: 4 },
				];
				const newArr = [
					{ a: 1, b: 2 },
					{ c: 3, d: 4 },
				];
				const changes = diffArray(oldArr, newArr);
				expect(buildJSON(oldArr, changes)).toEqual(newArr);
			});

			it('1 element added', () => {
				const oldArr = [
					{ a: 1, b: 2 },
					{ c: 3, d: 4 },
				];
				const newArr: any = [
					{ a: 1, b: 2 },
					{ c: 3, d: 4 },
					{ e: 5, f: 6 },
				];
				const changes = diffArray(oldArr, newArr);
				expect(buildJSON(oldArr, changes)).toEqual(newArr);
			});

			it('1 element deleted', () => {
				const oldArr = [
					{ a: 1, b: 2 },
					{ c: 3, d: 4 },
				];
				const newArr = [{ a: 1, b: 2 }];
				const changes = diffArray(oldArr, newArr);
				expect(buildJSON(oldArr, changes)).toEqual(newArr);
			});

			it('1 element updated', () => {
				const oldArr = [
					{ a: 1, b: 2 },
					{ c: 3, d: 4 },
				];
				const newArr = [
					{ a: 1, b: 2 },
					{ c: 3, d: 5 },
				];
				const changes = diffArray(oldArr, newArr);
				expect(buildJSON(oldArr, changes)).toEqual(newArr);
			});

			it('2 elements added', () => {
				const oldArr = [
					{ a: 1, b: 2 },
					{ c: 3, d: 4 },
				];
				const newArr = [
					{ a: 1, b: 2 },
					{ c: 3, d: 4 },
					{ e: 5, f: 6 },
					{ g: 7, h: 8 },
				];
				const changes = diffArray<any>(oldArr, newArr);
				expect(buildJSON(oldArr, changes)).toEqual(newArr);
			});

			it('2 elements deleted', () => {
				type T = {
					[key: string]: number;
				};
				const oldArr: T[] = [
					{ a: 1, b: 2 },
					{ c: 3, d: 4 },
				];
				const newArr: T[] = [];
				const changes = diffArray(oldArr, newArr);
				expect(buildJSON(oldArr, changes)).toEqual(newArr);
			});

			it('2 elements updated', () => {
				const oldArr = [
					{ a: 1, b: 2 },
					{ c: 3, d: 4 },
				];
				const newArr = [
					{ a: 1, b: 2 },
					{ c: 3, d: 5 },
				];
				const changes = diffArray(oldArr, newArr);
				expect(buildJSON(oldArr, changes)).toEqual(newArr);
			});

			it('2 elements added, 2 elements deleted, 2 elements updated', () => {
				const oldArr = [
					{ a: 1, b: 2 },
					{ c: 3, d: 4 },
					{ e: 5, f: 6 },
					{ g: 7, h: 8 },
				];
				const newArr = [
					{ a: 1, b: 2 },
					{ c: 3, d: 5 },
					{ i: 9, j: 10 },
					{ k: 11, l: 12 },
				];
				const changes = diffArray<any>(oldArr, newArr);
				expect(buildJSON(oldArr, changes)).toEqual(newArr);
			});

			it('1 element added, 1 element deleted, 1 element updated', () => {
				const oldArr = [
					{ a: 1, b: 2 },
					{ c: 3, d: 4 },
					{ e: 5, f: 6 },
					{ g: 7, h: 8 },
				];
				const newArr = [
					{ a: 1, b: 2 },
					{ c: 3, d: 5 },
					{ i: 9, j: 10 },
				];
				const changes = diffArray<any>(oldArr, newArr);
				expect(buildJSON(oldArr, changes)).toEqual(newArr);
			});
		});
	});
});
