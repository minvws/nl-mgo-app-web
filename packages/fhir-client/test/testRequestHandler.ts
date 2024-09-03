import { type KyOptions } from 'ky/distribution/types/options';
import { HttpResponse, http } from 'msw';
import { expect } from 'vitest';
import { type TypedKyResponse } from '../src/types';
import { FHIR_API_URL, server } from './server';

export type RequestHandler<Response extends TypedKyResponse> = (options?: KyOptions) => Response;

const toArray = (searchParams: URLSearchParams) => Array.from(searchParams.entries());

export async function testRequestHandler<Response extends TypedKyResponse>(
    handler: RequestHandler<Response>,
    expectedPath: string,
    expectedSearchParams?: ConstructorParameters<typeof URLSearchParams>[0]
) {
    const response = { id: `${Date.now() + Math.random()}` };

    server.use(
        http.get(`${FHIR_API_URL}/${expectedPath}`, ({ request }) => {
            const url = new URL(request.url);

            // Remove default search param from urlParams check
            const searchParams = url.searchParams;
            searchParams.delete('_format');
            const urlParams = toArray(searchParams);

            const expectedParams = toArray(new URLSearchParams(expectedSearchParams));
            expect(urlParams).toEqual(
                expectedParams.length === 0
                    ? expectedParams
                    : expect.arrayContaining(expectedParams)
            );

            return HttpResponse.json(response);
        })
    );

    const resource = await handler().json();
    expect(resource).toEqual(response);
}
