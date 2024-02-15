import type { SearchParamsOption } from 'ky';

type URLSearchParamsArg = ConstructorParameters<typeof URLSearchParams>[0];

export function defaultsSearchParams(...params: SearchParamsOption[]) {
    const searchParams = new URLSearchParams();

    params
        .map((x) => new URLSearchParams(x as URLSearchParamsArg))
        .forEach((urlSearchParams) => {
            for (const [key, val] of urlSearchParams.entries()) {
                if (searchParams.has(key)) {
                    searchParams.delete(key);
                }
                searchParams.append(key, val);
            }
        });

    return searchParams;
}
