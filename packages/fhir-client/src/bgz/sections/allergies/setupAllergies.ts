import { type FhirClient } from '../../../client/createClient/createClient';
import { partialRequest } from '../../../utils/partialRequest/partialRequest';

export function setupAllergies({ getResources }: FhirClient) {
    return {
        getAllergies: partialRequest(getResources, {
            resource: 'AllergyIntolerance',
        } as const),
    };
}
