/**
 * Create a new type that forcefully dissalows certain properties from being set
 */
type CreateConstrainedType<T extends object, ForbiddenProps extends object> = {
    [key in keyof T | keyof ForbiddenProps]?: key extends keyof T ? T[key] : never;
};

/**
 * Transform a union type to an intersection type
 * @see: https://stackoverflow.com/questions/50374908/transform-union-type-to-intersection-type
 */
type UnionToIntersection<U> = (U extends unknown ? (x: U) => void : never) extends (
    x: infer I
) => void
    ? I
    : never;

/**
 * Create a new union type that strictly enforces only one of the types can be set.
 * It prevents the props from being mixed together.
 * @example
 * type FooOrBar = OneOf<[ {foo: string}, {bar: number} ]>; // {foo: string, bar: never} | {foo: never, bar: number}
 *
 * const foo: FooOrBar = { foo: 'hello' }; // OK
 * const bar: FooOrBar = { bar: 42 }; // OK
 * const weird: FooOrBar = { foo: 'hello', bar: 42 }; // Error
 */
export type OneOf<
    Options extends object[],
    Combined = UnionToIntersection<Options[number]>,
> = Options extends [infer T, ...infer R]
    ? T extends object
        ? R extends object[]
            ? Combined extends object
                ? CreateConstrainedType<T, Combined> | OneOf<R, Combined>
                : never
            : never
        : never
    : never;
