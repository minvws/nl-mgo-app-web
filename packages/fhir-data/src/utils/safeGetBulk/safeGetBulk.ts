import { type SafeGetFunc, safeGet } from '../safeGet/safeGet';

export type GetBulkConfig<T extends object> = { [key: string]: SafeGetFunc<T> | GetBulkConfig<T> };

type SafeGetObjectResult<T extends object, Config extends GetBulkConfig<T>> = {
    [key in keyof Config]: Config[key] extends SafeGetFunc<T>
        ? ReturnType<Config[key]> | undefined
        : Config[key] extends GetBulkConfig<T>
          ? SafeGetObjectResult<T, Config[key]>
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

export function safeGetBulk<
    T extends object,
    Config extends GetBulkConfig<T>,
    DefaultsConfig extends Defaults<Config>,
    Result = SafeGetObjectResult<T, Config>,
    ResultWithDefaults = MergedWithDefaults<Result, DefaultsConfig>,
>(object: T | undefined, config: Config, defaultValues?: DefaultsConfig) {
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

    return result as ResultWithDefaults;
}
