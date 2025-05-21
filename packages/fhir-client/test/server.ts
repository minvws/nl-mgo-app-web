import { type Bundle, type FhirResource } from '@minvws/mgo-fhir-types';
import { HttpResponse, http, type RequestHandler } from 'msw';
import { setupServer } from 'msw/node';

export const FHIR_API_URL = 'https://fhir-api.mock';

const fhirVersionRegexp = /application\/fhir\+json; fhirVersion=\d\.\d/i;

function assertFhirVersion(request: Request) {
    const acceptHeader = request.headers.get('Accept');
    if (!acceptHeader || !fhirVersionRegexp.test(acceptHeader)) {
        throw new HttpResponse(null, {
            status: 400,
            statusText: 'Bad Request: missing proper accept header with the fhir version.',
        });
    }
}

export const handlers: RequestHandler[] = [
    http.get(`${FHIR_API_URL}/:resourceType/:id`, ({ request, params }) => {
        assertFhirVersion(request);
        const { resourceType, id } = params;
        return HttpResponse.json({ resourceType, id } as Partial<FhirResource>);
    }),

    http.get(`${FHIR_API_URL}/:resourceType`, ({ request }) => {
        assertFhirVersion(request);
        return HttpResponse.json({
            resourceType: 'Bundle',
            entry: [],
            total: 0,
        } as Partial<Bundle>);
    }),
];

export const server = setupServer(...handlers);
