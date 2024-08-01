/**
 * Replace one type with another in a type.
 */
export type ReplaceType<T, ToReplace, Replacement> = T extends ToReplace
    ? Exclude<T, ToReplace> | Replacement
    : T;

export type ReplacePropTypes<T extends object, ToReplace, Replacement> = {
    [P in keyof T]: ReplaceType<T[P], ToReplace, Replacement>;
};
