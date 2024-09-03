import { type FhirClient } from '../../../client/createClient/createClient';
import { partialRequest } from '../../../utils/partialRequest/partialRequest';

export function setupMedicationRequest({ getResources }: FhirClient) {
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
