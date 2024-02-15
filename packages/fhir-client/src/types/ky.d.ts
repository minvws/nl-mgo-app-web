import type { KyResponse } from 'ky';

type TypedJsonFunc<T> = {
    json: () => Promise<T>;
};

/**
 * Ky Responses don't include the response data type on the request. This type fixes that.
 * @see: https://github.com/sindresorhus/ky/issues/312
 */
export type TypedKyResponse<T = unknown> = Omit<ResponsePromise, 'json' | keyof Promise<unknown>> &
    TypedJsonFunc<T> &
    Promise<Omit<KyResponse, 'json'> & TypedJsonFunc<T>>;
