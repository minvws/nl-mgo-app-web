import {
    ResourcesResponsePromise,
    type FhirClient,
    type FhirVersion,
} from '@minvws/mgo-fhir-client';

type EpisodeOfCareService<V extends FhirVersion> = {
    getEpisodes: () => ResourcesResponsePromise<V, 'EpisodeOfCare'>;
};

export function setupEpisodeOfCare<V extends FhirVersion>({
    getResources,
}: FhirClient<V>): EpisodeOfCareService<V> {
    return {
        getEpisodes: () =>
            getResources({
                resource: 'EpisodeOfCare',
            } as const),
    };
}
