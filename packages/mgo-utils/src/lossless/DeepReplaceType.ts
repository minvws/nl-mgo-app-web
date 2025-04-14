/**
 * Perform a deep replacement of a type in another type definition.
 *
 * @example
 * type Foo =  { foo: string; bar: number; baz: { qux: number } }
 * DeepReplaceType<Foo, number, boolean> // { foo: string, bar: boolean, baz: { qux: boolean } }
 * DeepReplaceType<number, number, boolean> // boolean
 * DeepReplaceType<number | string, number, boolean> // boolean | string
 * DeepReplaceType<(number | string)[], number, boolean> // (boolean | string)[]
 */
export type DeepReplaceType<T, ToReplace, Replacement> = T extends ToReplace
    ? Exclude<T, ToReplace> | Replacement
    : T extends object
      ? DeepReplaceTypeInObject<T, ToReplace, Replacement>
      : T;

type DeepReplaceTypeInObject<T extends object, ToReplace, Replacement> = {
    [key in keyof T]: T[key] extends object
        ? DeepReplaceTypeInObject<T[key], ToReplace, Replacement>
        : T[key] extends (infer U)[]
          ? DeepReplaceType<U, ToReplace, Replacement>[]
          : DeepReplaceType<T[key], ToReplace, Replacement>;
};
