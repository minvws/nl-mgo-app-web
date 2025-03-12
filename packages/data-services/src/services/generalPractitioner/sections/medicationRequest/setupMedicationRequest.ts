import { type FhirClient, type FhirVersion } from '@minvws/mgo-fhir-client';
import { partialRequest } from '../../../../utils/partialRequest/partialRequest';

export function setupMedicationRequest<V extends FhirVersion>({ getResources }: FhirClient<V>) {
    const today = new Date().toISOString().split('T')[0];
    return {
        getCurrentMedication: partialRequest(
            getResources,
            {
                resource: 'MedicationRequest',
            } as const,
            {
                searchParams: {
                    periodofuse: `ge${today}`,
                    category: 'http://snomed.info/sct|16076005', // NOSONAR
                    _include: 'MedicationRequest:medication',
                },
            }
        ),
    };
}
