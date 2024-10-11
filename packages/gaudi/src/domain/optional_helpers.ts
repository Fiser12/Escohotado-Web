export type Optional<T> = T | undefined | null;

export function notNull<T, U>(value: Optional<T>, fn: (val: T) => U | undefined): U | undefined {
	return value != null ? fn(value) : undefined;
}
export async function notNullAsync<T, U>(value: Optional<T>, fn: (val: T) => Promise<Optional<U>>): Promise<Optional<U>> {
	return value != null ? await fn(value) : undefined;
}

Array.prototype.mapNotNull = function <T, U>(callback: (value: T, index: number, array: T[]) => U | null | undefined): U[] {
	return this.map(callback).filter((item): item is U => item != null);
};

declare global {
	interface Array<T> {
		mapNotNull<U>(callback: (value: T, index: number, array: T[]) => U | null | undefined): U[];
	}	
}
