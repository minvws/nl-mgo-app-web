import { type SearchParamsOption } from '@minvws/mgo-fhir-client';

type URLSearchParamsArg = ConstructorParameters<typeof URLSearchParams>[0];

export function defaultsSearchParams(...searchParams: SearchParamsOption[]) {
    const result = new URLSearchParams();

    return searchParams
        .map((x) => new URLSearchParams(x as URLSearchParamsArg))
        .map((x) => [...x.entries()])
        .reduce((acc, params) => {
            // drop any keys that were previously set and are now being overridden
            for (const [key] of params) {
                if (acc.has(key)) {
                    acc.delete(key);
                }
            }

            for (const [key, value] of params) {
                acc.append(key, value);
            }

            return acc;
        }, result);
}
