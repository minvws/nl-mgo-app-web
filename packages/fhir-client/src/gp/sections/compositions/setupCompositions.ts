import { type FhirClient } from '../../../client/createClient/createClient';
import { partialRequest } from '../../../utils/partialRequest/partialRequest';

export function setupCompositions({ getResources }: FhirClient) {
    return {
        getCompositions: partialRequest(
            getResources,
            {
                resource: 'Composition',
            } as const,
            {
                searchParams: {
                    type: 'https://loinc.org|67781-5',
                },
            }
        ),
    };
}
