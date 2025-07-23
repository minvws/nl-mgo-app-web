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

export function createJsonApi<T extends Func>(func: T): JsonInterfacedFunction<T> {
    return function (...args) {
        const result = func(...args.map(losslessParse));
        return losslessStringify(result, (_key, value) => (value === undefined ? null : value));
    } as JsonInterfacedFunction<T>;
}
