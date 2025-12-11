import { type FhirVersion } from '@minvws/mgo-fhir';
import { type MgoResource } from '@minvws/mgo-hcim';
import { createUniqueSlug } from '@minvws/mgo-utils';

export type ResourceSource = {
    organizationId: string;
    dataServiceId: string;
    endpointId: string;
};

export interface ResourceDTO<
    V extends FhirVersion = FhirVersion,
    T extends MgoResource<V> = MgoResource<V>,
> {
    mgoResource: T;
    source: ResourceSource;
}

export interface Resource<
    V extends FhirVersion = FhirVersion,
    T extends MgoResource<V> = MgoResource<V>,
> extends ResourceDTO<V, T> {
    id: string;
    slug: string;
}

export function createResourceFromDto(
    source: ResourceSource,
    mgoResource: MgoResource,
    slugs: string[]
): Resource {
    return {
        id: `${source.organizationId}-${source.dataServiceId}-${mgoResource.referenceId}`,
        // NOTE: Do not use any resource information as a slug as it could potentially be sensitive information
        slug: createUniqueSlug(`${slugs.length}`, slugs),
        mgoResource,
        source,
    };
}
