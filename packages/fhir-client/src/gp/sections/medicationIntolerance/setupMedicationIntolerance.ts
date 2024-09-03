import { type FhirClient } from '../../../client/createClient/createClient';
import { partialRequest } from '../../../utils/partialRequest/partialRequest';

export function setupMedicationIntolerance({ getResources }: FhirClient) {
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
