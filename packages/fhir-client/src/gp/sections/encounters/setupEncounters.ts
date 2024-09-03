import { type FhirClient } from '../../../client/createClient/createClient';
import { partialRequest } from '../../../utils/partialRequest/partialRequest';

export function setupEncounters({ getResources }: FhirClient) {
    return {
        getEncounters: partialRequest(getResources, {
            resource: 'Encounter',
        } as const),
    };
}
