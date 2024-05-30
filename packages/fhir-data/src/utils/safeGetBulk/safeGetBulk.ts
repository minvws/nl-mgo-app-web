import { type SafeGetFunc, safeGet } from '../safeGet/safeGet';

export type GetBulkConfig<T extends object> = { [key: string]: SafeGetFunc<T> | GetBulkConfig<T> };

type SafeGetObjectResult<T extends object, Config extends GetBulkConfig<T>> = {
    [key in keyof Config]: Config[key] extends SafeGetFunc<T>
        ? ReturnType<Config[key]> | undefined
        : Config[key] extends GetBulkConfig<T>
          ? SafeGetObjectResult<T, Config[key]> | undefined
          : never;
};

type Defaults<Config extends object> = {
    [key in keyof Config]?: Config[key] extends (...args: any) => any // eslint-disable-line @typescript-eslint/no-explicit-any
        ? ReturnType<Config[key]>
        : Config[key] extends object
          ? Defaults<Config[key]>
          : never;
};

type MergedWithDefaults<Result, Defaults> = {
    [key in keyof Result]: Result[key] extends object
        ? MergedWithDefaults<Result[key], key extends keyof Defaults ? Defaults[key] : never>
        : key extends keyof Defaults
          ? Defaults[key] extends undefined
              ? Result[key]
              : NonNullable<Result[key]>
          : Result[key];
};

/**
 * Similar idea to the `safeGet` except safeGetBulk can retrieve multiple values from an object at once.
 *
 * @example
 *
 * type MyType = { a?: { b?: { c?: string }, b2?: { d?:number } } };
 * const myObject: MyType = { a: { b: { c: 'value' } };
 *
 * const { c, d } = safeGetBulk(myObject,
 *         { c: (x) => x.a!.b!.c, d: (x) => x.a!.b2!.d' },
 *         { c: :'default', d: 42 }
 *     ); // returns { c:'value', d: 42 }
 */
export function safeGetBulk<
    T extends object,
    Config extends GetBulkConfig<T>,
    Result = SafeGetObjectResult<T, Config>,
>(object: T | undefined, config: Config): Result;
export function safeGetBulk<
    T extends object,
    Config extends GetBulkConfig<T>,
    DefaultsConfig extends Defaults<Config>,
    Result = SafeGetObjectResult<T, Config>,
    ResultWithDefaults = MergedWithDefaults<Result, DefaultsConfig>,
>(object: T | undefined, config: Config, defaultValues?: DefaultsConfig): ResultWithDefaults;
export function safeGetBulk<
    T extends object,
    Config extends GetBulkConfig<T>,
    DefaultsConfig extends Defaults<Config>,
    Result = SafeGetObjectResult<T, Config>,
    ResultWithDefaults = MergedWithDefaults<Result, DefaultsConfig>,
    FinalResult = DefaultsConfig extends undefined ? Result : ResultWithDefaults,
>(object: T | undefined, config: Config, defaultValues?: DefaultsConfig): FinalResult {
    const result: Partial<Result> = {};

    for (const [key, value] of Object.entries(config)) {
        if (typeof value === 'object') {
            result[key as keyof Result] = safeGetBulk(
                object,
                value,
                defaultValues?.[key as keyof DefaultsConfig]
            );
        } else if (typeof value === 'function') {
            result[key as keyof Result] = safeGet(
                object,
                value,
                defaultValues?.[key as keyof DefaultsConfig]
            );
        }
    }

    return result as FinalResult;
}
