import { JSONValue } from './json';

export type ArrayChanges = {
	entity: 'arr';
	additions?: JSONValue[];
	deletions?: number[]; // Indices
	updates?: {
		[index: number]: Changes;
	};
};

export type ObjectChanges = {
	entity: 'obj';
	additions?: {
		[key: string]: JSONValue;
	};
	deletions?: string[]; // keys
	updates?: {
		[key: string]: JSONValue;
	};
};

export type Changes =
	| JSONValue //
	| ObjectChanges
	| ArrayChanges;
