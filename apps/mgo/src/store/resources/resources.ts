import { type DataServiceId } from '@minvws/mgo-data-services';
import {
    getSummary,
    type FhirVersion,
    type MgoResource,
    type NictizNlProfile,
} from '@minvws/mgo-fhir-data';
import { createUniqueSlug, log } from '@minvws/mgo-utils';
import { create } from 'zustand';

type MgoResourceProfile<V extends FhirVersion> = MgoResource<V>['profile'];
type MgoResourceByProfile<V extends FhirVersion, T extends NictizNlProfile> = Extract<
    MgoResource<V>,
    { profile: T }
>;

export type Resource<
    V extends FhirVersion = FhirVersion,
    T extends MgoResource<V> = MgoResource<V>,
> = {
    id: string;
    slug: string;
    label: string;
    organizationId: string;
    dataServiceId: DataServiceId;
    dataServiceMethod: string;
    mgoResource: T;
};

export type ResourceDTO<V extends FhirVersion = FhirVersion> = Pick<
    Resource<V>,
    'organizationId' | 'dataServiceId' | 'mgoResource' | 'dataServiceMethod'
> & {
    id?: never;
};

export interface ResourcesState {
    resources: Resource[];
    addResources: (resourceData: ResourceDTO[]) => Resource[];
    getResourceByReferenceId: (
        relatedResource: Resource | undefined,
        referenceId: string | undefined
    ) => Resource | undefined;
    getResourceBySlug: (slug: string | undefined) => Resource | undefined;
    getResourcesByProfile: <V extends FhirVersion, T extends MgoResourceProfile<V>>(
        fhirVersion: V,
        profile: T,
        organizationIdFilter?: (string | undefined)[]
    ) => Resource<V, MgoResourceByProfile<V, T>>[];
}

function createResource(dto: ResourceDTO, slugs: string[]): Resource {
    const { organizationId, dataServiceId, mgoResource, dataServiceMethod } = dto;
    const summary = getSummary(mgoResource);

    const id = `${organizationId}-${dataServiceId}-${mgoResource.referenceId}`;
    return {
        id,
        // NOTE: Do not use any resource information as a slug as it could potentially be sensitive information
        slug: createUniqueSlug(`${slugs.length}`, slugs),
        label: summary.label,
        organizationId,
        dataServiceId,
        dataServiceMethod,
        mgoResource,
    };
}

export const useResourcesStore = create<ResourcesState>()((set, get) => ({
    resources: [],

    addResources: (dtos) => {
        const currentResources = get().resources;
        const currentSlugs = get().resources.map((resource) => resource.slug);
        const newResources: Resource[] = [];

        for (const dto of dtos) {
            const newResourceSlugs = newResources.map((x) => x.slug);
            const newResource = createResource(dto, [...currentSlugs, ...newResourceSlugs]);
            if (
                currentResources.some(({ id }) => id === newResource.id) ||
                newResources.some(({ id }) => id === newResource.id)
            ) {
                log.warn(`Resource with id "${newResource.id}" already exists`);
            } else {
                newResources.push(newResource);
            }
        }

        set(({ resources }) => ({
            resources: [...resources, ...newResources],
        }));

        return newResources;
    },

    getResourcesByProfile: (fhirVersion, profile, organizationIdFilter) => {
        const resources = [...get().resources];
        return resources
            .filter(
                ({ organizationId }) =>
                    !organizationIdFilter || organizationIdFilter.includes(organizationId)
            )
            .filter(({ mgoResource }) => {
                return mgoResource.fhirVersion === fhirVersion && mgoResource.profile === profile;
            }) as Resource<
            typeof fhirVersion,
            MgoResourceByProfile<typeof fhirVersion, typeof profile>
        >[];
    },

    getResourceByReferenceId: (relatedResource, referenceId) => {
        if (!relatedResource || !referenceId) return;
        return get()
            .resources.filter(
                ({ organizationId, dataServiceId }) =>
                    organizationId === relatedResource.organizationId &&
                    dataServiceId === relatedResource.dataServiceId
            )
            .find((resource) => resource.mgoResource.referenceId === referenceId);
    },

    getResourceBySlug: (slug) => {
        if (!slug) return;
        return get().resources.find((resource) => resource.slug === slug);
    },
}));
