export type Nullable<T> = T | null | undefined;

export type DeepNullable<T> = T extends object
    ? Nullable<{
          [key in keyof T]: T[key] extends object
              ? DeepNullable<T[key]>
              : T[key] extends (infer U)[]
                ? Nullable<U>[]
                : Nullable<T[key]>;
      }>
    : Nullable<T>;
