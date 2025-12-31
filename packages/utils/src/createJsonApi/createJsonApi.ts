import { losslessParse, losslessStringify } from '@minvws/mgo-utils';

// eslint-disable-next-line @typescript-eslint/no-explicit-any
type Func = (...args: any[]) => any;

// eslint-disable-next-line @typescript-eslint/no-explicit-any
type JsonParam<TParams extends readonly any[]> = {
    [K in keyof TParams]: string;
};

type JsonInterfacedFunction<F> = F extends (...args: infer T) => infer R
    ? (...args: JsonParam<T>) => R extends undefined ? string | undefined : string
    : never;

function isPromise(value: unknown): value is Promise<unknown> {
    return (
        typeof value === 'object' && typeof (value as Promise<unknown> | null)?.then === 'function'
    );
}

export function createJsonApi<T extends Func>(
    func: T,
    options: { lossless?: boolean } = {}
): JsonInterfacedFunction<T> {
    const parse = options.lossless ? losslessParse : (value: string) => JSON.parse(value);
    const stringify = options.lossless ? losslessStringify : JSON.stringify;
    const replaceUndefinedWithNull = (_key: string, value: unknown) =>
        value === undefined ? null : value;

    return function (...args) {
        const result = func(...args.map(parse));
        if (isPromise(result)) {
            return result.then((value: unknown) => stringify(value, replaceUndefinedWithNull));
        }
        return stringify(result, replaceUndefinedWithNull);
    } as JsonInterfacedFunction<T>;
}
