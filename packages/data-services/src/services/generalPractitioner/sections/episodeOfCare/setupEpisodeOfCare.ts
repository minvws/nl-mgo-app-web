import { type FhirClient, type FhirVersion } from '@minvws/mgo-fhir-client';
import { partialRequest } from '../../../../utils/partialRequest/partialRequest';

export function setupEpisodeOfCare<V extends FhirVersion>({ getResources }: FhirClient<V>) {
    return {
        getEpisodes: partialRequest(getResources, {
            resource: 'EpisodeOfCare',
        } as const),
    };
}
