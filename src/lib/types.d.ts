import { User } from '../routes/users/_typings';

/**
 * Can be made globally available by placing this
 * inside `global.d.ts` and removing `export` keyword
 */
export interface Locals {
	user: User;
}

// https://github.com/sveltejs/kit/issues/1997
export type Typify<T> = { [K in keyof T]: Typify<T[K]> };
