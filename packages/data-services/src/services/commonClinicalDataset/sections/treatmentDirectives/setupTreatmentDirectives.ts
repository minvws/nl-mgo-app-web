import { type FhirClient, type FhirVersion } from '@minvws/mgo-fhir-client';
import { partialRequest } from '../../../../utils/partialRequest/partialRequest';

export function setupTreatmentDirectives<V extends FhirVersion>({ getResources }: FhirClient<V>) {
    return {
        getTreatmentDirectives: partialRequest(
            getResources,
            {
                resource: 'Consent',
            } as const,
            {
                searchParams: {
                    category: 'http://snomed.info/sct|11291000146105', // NOSONAR
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
                    category: 'http://snomed.info/sct|11341000146107', // NOSONAR
                },
            }
        ),
    };
}
