import { type FhirClient } from '../../../client/createClient/createClient';
import { partialRequest } from '../../../utils/partialRequest/partialRequest';

export function setupProblems({ getResources }: FhirClient) {
    return {
        getProblems: partialRequest(getResources, {
            resource: 'Condition',
        } as const),
    };
}
