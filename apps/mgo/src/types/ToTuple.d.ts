type UnionToParm<U> = U extends unknown ? (k: U) => void : never;
type UnionToSect<U> = UnionToParm<U> extends (k: infer I) => void ? I : never;
type ExtractParm<F> = F extends { (a: infer A): void } ? A : never;

type SpliceOne<Union> = Exclude<Union, ExtractOne<Union>>;
type ExtractOne<Union> = ExtractParm<UnionToSect<UnionToParm<Union>>>;
type ToTupleRec<Union, Rslt extends unknown[]> =
    SpliceOne<Union> extends never
        ? [ExtractOne<Union>, ...Rslt]
        : ToTupleRec<SpliceOne<Union>, [ExtractOne<Union>, ...Rslt]>;

/**
 * Converts a union type to a tuple type.
 *
 * @template Union - The union type to convert.
 * @returns A tuple type representing the union type.
 *
 * @example
 * // Convert a union type to a tuple type
 * type MyUnion = 'a' | 'b' | 'c'
 * type MyTuple = ToTuple<MyUnion> // Result: ['a', 'b', 'c']
 */
export type ToTuple<Union> = ToTupleRec<Union, []>;
