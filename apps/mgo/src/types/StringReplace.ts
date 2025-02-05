/**
 * Replace all occurrences of `ToReplace` with `Replacement` in `T`.
 *
 * @example
 * type T = 'foo bar foo'
 * StringReplace<T, 'foo', 'baz'> // Result: 'baz bar baz'
 */
export type StringReplace<
    T extends string,
    ToReplace extends string,
    Replacement extends string,
    A extends string = '',
> = T extends `${infer L}${ToReplace}${infer R}`
    ? StringReplace<R, ToReplace, Replacement, `${A}${L}${Replacement}`>
    : `${A}${T}`;
