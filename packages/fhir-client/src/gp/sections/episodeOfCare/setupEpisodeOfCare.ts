import { type FhirClient } from '../../../client/createClient/createClient';
import { partialRequest } from '../../../utils/partialRequest/partialRequest';

export function setupEpisodeOfCare({ getResources }: FhirClient) {
    return {
        getEpisodes: partialRequest(getResources, {
            resource: 'EpisodeOfCare',
        } as const),
    };
}
