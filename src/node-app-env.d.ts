/**
 * reverse Partial interfaces to Immutable interface
 */
export type unPartial<T> = {
	[P in keyof T]-?: T[P];
};
/**
 * Turn Immutable interfaces to Mutable interfaces
 */
export type DeepPartial<T> = T extends object
	? {
			[P in keyof T]?: DeepPartial<T[P]>;
	  }
	: T;