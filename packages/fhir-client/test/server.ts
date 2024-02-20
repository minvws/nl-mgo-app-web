/* c8 ignore start */

import { setupServer } from 'msw/node';

import { HttpResponse, http, type RequestHandler } from 'msw';

export const FHIR_API_URL = 'https://fhir-api.mock';

function assertJsonFormat(request: Request) {
    const searchParams = new URL(request.url).searchParams;
    if (searchParams.get('_format') !== 'json') {
        throw new HttpResponse(null, { status: 400 });
    }
}

export const handlers: RequestHandler[] = [
    http.get(`${FHIR_API_URL}/:resourceType/:id`, ({ request, params }) => {
        assertJsonFormat(request);
        const { resourceType, id } = params;
        return HttpResponse.json({ resourceType, id });
    }),

    http.get(`${FHIR_API_URL}/:resourceType`, ({ request }) => {
        assertJsonFormat(request);
        return HttpResponse.json({ resourceType: 'Bundle', entry: [] });
    }),
];

export const server = setupServer(...handlers);
