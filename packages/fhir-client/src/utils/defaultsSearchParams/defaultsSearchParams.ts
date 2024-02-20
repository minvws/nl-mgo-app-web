import type { SearchParamsOption } from 'ky';

type URLSearchParamsArg = ConstructorParameters<typeof URLSearchParams>[0];

export function defaultsSearchParams(...searchParams: SearchParamsOption[]) {
    const result = new URLSearchParams();

    searchParams
        .map((x) => new URLSearchParams(x as URLSearchParamsArg))
        .map((x) => [...x.entries()])
        .flat()
        .forEach(([key, val]) => {
            if (result.has(key)) {
                result.delete(key);
            }
            result.append(key, val);
        });

    return result;
}
