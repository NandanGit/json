import { JSONValue } from './json';

export type ArrayChanges<T extends JSONValue = JSONValue> = {
	entity: 'arr';
	additions?: T[];
	deletions?: number[]; // Indices
	updates?: {
		[index: number]: T;
	};
};

// type Transaction = {
// 	id: string;
// 	amount: number;
// 	type: 'credit' | 'debit';
// 	date: Date;
// 	categoryId: string;
// 	recurring: {
// 		frequency: 'daily' | 'weekly' | 'monthly';
// 		until: Date;
// 	};
// 	splits: {
// 		personId: string;
// 		amount: number;
// 	}[];
// };

export type ObjectChanges<
	T extends {
		[key: string]: JSONValue;
	} = {
		[key: string]: JSONValue;
	}
> = {
	entity: 'obj';
	additions?: {
		[key in keyof T]?: T[key];
	};
	deletions?: (keyof T)[];
	updates?: {
		[key in keyof T]?: T[key];
	};
};

// const changes: ObjectChanges<Transaction> = {
// 	entity: 'obj',
// 	updates: {
// 		amount: 100,
// 	},
// };

export type Changes =
	| JSONValue //
	| ObjectChanges
	| ArrayChanges;
