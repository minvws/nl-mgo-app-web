import { type FhirClient } from '../../../client/createClient/createClient';
import { partialRequest } from '../../../utils/partialRequest/partialRequest';

export function setupTreatmentDirectives({ getResources }: FhirClient) {
    return {
        getTreatmentDirectives: partialRequest(
            getResources,
            {
                resource: 'Consent',
            } as const,
            {
                searchParams: {
                    category: 'http://snomed.info/sct|11291000146105',
                },
            }
        ),

        getAdvanceDirectives: partialRequest(
            getResources,
            {
                resource: 'Consent',
            } as const,
            {
                searchParams: {
                    category: 'http://snomed.info/sct|11341000146107',
                },
            }
        ),
    };
}
