import { type FhirClient } from '../../../client/createClient/createClient';
import { partialRequest } from '../../../utils/partialRequest/partialRequest';

export function setupAlerts({ getResources }: FhirClient) {
    return {
        getAlerts: partialRequest(getResources, {
            resource: 'Flag',
        } as const),
    };
}
