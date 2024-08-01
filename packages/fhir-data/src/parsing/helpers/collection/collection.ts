import { EMPTY_VALUE } from '../../type';

function isDefined(x: unknown): x is NonNullable<typeof x> {
    return x !== undefined;
}

export function collection<T, P extends (arg: T) => unknown>(value: T[] | undefined, parse: P) {
    if (!value?.length) return EMPTY_VALUE;
    return (value.map(parse) as ReturnType<P>[]).filter(isDefined);
}
