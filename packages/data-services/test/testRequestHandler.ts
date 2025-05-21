import { type Options, type ResponsePromise } from '@minvws/mgo-fhir-client';
import { HttpResponse, http } from 'msw';
import { expect } from 'vitest';
import { MOCK_SERVER_URL, server } from './server';

export type RequestHandler<Response extends ResponsePromise> = (options?: Options) => Response;

const toArray = (searchParams: URLSearchParams) => Array.from(searchParams.entries());

export async function testRequestHandler<Response extends ResponsePromise>(
    handler: RequestHandler<Response>,
    expectedPath: string,
    expectedSearchParams?: ConstructorParameters<typeof URLSearchParams>[0]
) {
    const response = { id: `${Date.now() + Math.random()}` };

    server.use(
        http.get(`${MOCK_SERVER_URL}/${expectedPath}`, ({ request }) => {
            const url = new URL(request.url);
            const urlParams = toArray(url.searchParams);

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
