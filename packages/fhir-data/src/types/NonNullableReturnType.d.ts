// eslint-disable-next-line @typescript-eslint/no-explicit-any
export type NonNullableReturnType<T extends (arg: any) => any> = NonNullable<ReturnType<T>>;
