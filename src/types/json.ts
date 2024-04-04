export type JSONValue =
	| string
	| number
	| boolean
	| null
	| undefined
	| JSONObject
	// | {}
	| Date
	| Array<JSONValue>;

export interface JSONObject {
	[key: string]: JSONValue;
}
