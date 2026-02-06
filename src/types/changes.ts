import { JSONValue } from './json';

export type ArrayAddition<T extends JSONValue = JSONValue> = {
  index: number;
  value: T;
};

export type ArrayChanges<T extends JSONValue = JSONValue> = {
  entity: 'arr';
  additions?: ArrayAddition<T>[];
  deletions?: number[]; // Indices (apply high->low)
  updates?: {
    [index: number]: T;
  };
};

export type ObjectChanges<
  T extends { [key: string]: JSONValue } = { [key: string]: JSONValue }
> = {
  entity: 'obj';
  additions?: { [key in keyof T]?: T[key] };
  deletions?: (keyof T)[];
  updates?: { [key in keyof T]?: T[key] };
};

export type Changes = ArrayChanges | ObjectChanges | JSONValue | null;
