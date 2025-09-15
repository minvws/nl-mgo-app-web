import type { SetOptional } from 'type-fest';

/**
 * Either the full object `T`, with all required keys - or - none of the keys
 */
export type AllOrNone<T> = T | SetOptional<{ [K in keyof T]: never }, keyof T>;
