import { type FhirClient, type FhirVersion } from '@minvws/mgo-fhir-client';
import { partialRequest } from '../../../../utils/partialRequest/partialRequest';

export function setupMedicationRequest<V extends FhirVersion>({ getResources }: FhirClient<V>) {
    return {
        getCurrentMedication: partialRequest(
            getResources,
            {
                resource: 'MedicationRequest',
            } as const,
            {
                searchParams: {
                    _include: 'MedicationRequest:medication',
                },
            }
        ),
    };
}
