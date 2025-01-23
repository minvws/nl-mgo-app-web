import { type FhirClient, type FhirVersion } from '@minvws/mgo-fhir-client';
import { partialRequest } from '../../../../utils/partialRequest/partialRequest';

export function setupMedicationIntolerance<V extends FhirVersion>({ getResources }: FhirClient<V>) {
    return {
        getMedicationIntolerance: partialRequest(
            getResources,
            {
                resource: 'AllergyIntolerance',
            } as const,
            {
                searchParams: {
                    category: 'medication',
                },
            }
        ),
    };
}
