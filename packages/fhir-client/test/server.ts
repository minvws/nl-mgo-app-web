import { setupServer } from 'msw/node';

import { HttpResponse, http, type RequestHandler } from 'msw';
import { type FhirResource, type Bundle } from '../src/types';

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
        return HttpResponse.json({ resourceType, id } as Partial<FhirResource>);
    }),

    http.get(`${FHIR_API_URL}/:resourceType`, ({ request }) => {
        assertJsonFormat(request);
        return HttpResponse.json({
            resourceType: 'Bundle',
            entry: [],
            total: 0,
        } as Partial<Bundle>);
    }),
];

export const server = setupServer(...handlers);
