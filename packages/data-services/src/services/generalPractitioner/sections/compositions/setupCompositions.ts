import { type FhirClient, type FhirVersion } from '@minvws/mgo-fhir-client';
import { partialRequest } from '../../../../utils/partialRequest/partialRequest';

export function setupCompositions<V extends FhirVersion>({ getResources }: FhirClient<V>) {
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
