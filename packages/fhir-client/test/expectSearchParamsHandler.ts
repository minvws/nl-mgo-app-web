import { HttpResponse, type HttpResponseResolver } from 'msw';
import { expect } from 'vitest';

const toArray = (searchParams: URLSearchParams) => Array.from(searchParams.entries());

export function expectSearchParamsHandler<T extends object>(
    expectedSearchParams: ConstructorParameters<typeof URLSearchParams>[0],
    response?: T
): HttpResponseResolver {
    return ({ request }) => {
        const url = new URL(request.url);
        const urlParams = toArray(url.searchParams);
        const expectedParams = toArray(new URLSearchParams(expectedSearchParams));

        expect(urlParams).toEqual(expect.arrayContaining(expectedParams));

        return HttpResponse.json(response);
    };
}
