import { type FhirVersion, type NictizNlProfile } from '@minvws/mgo-fhir';
import { type MgoResource } from '@minvws/mgo-hcim';
import { log } from '@minvws/mgo-utils';
import { StateCreator } from 'zustand';
import { OrganizationsSlice } from '../organizations/organizations';
import { createResourceFromDto, Resource, ResourceDTO } from './createResourceFromDto';

type MgoResourceProfile<V extends FhirVersion> = MgoResource<V>['profile'];
type MgoResourceByProfile<V extends FhirVersion, T extends NictizNlProfile> = Extract<
    MgoResource<V>,
    { profile: T }
>;

export type { Resource, ResourceDTO };

export interface ResourcesSlice {
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

export const createResourcesSlice: StateCreator<
    ResourcesSlice & OrganizationsSlice,
    [],
    [],
    ResourcesSlice
> = (set, get) => ({
    resources: [],

    addResources: (dtos) => {
        const currentResources = get().resources;
        const currentSlugs = get().resources.map((resource) => resource.slug);
        const newResources: Resource[] = [];

        for (const dto of dtos) {
            const newResourceSlugs = newResources.map((x) => x.slug);
            const organization = get().getOrganizationById(dto.organizationId);

            if (!organization) {
                throw new Error(`Organization with id "${dto.organizationId}" not found`);
            }

            const newResource = createResourceFromDto(dto, organization, [
                ...currentSlugs,
                ...newResourceSlugs,
            ]);
            if (
                currentResources.some(({ id }) => id === newResource.id) ||
                newResources.some(({ id }) => id === newResource.id)
            ) {
                log.warn(`Resource with id "${newResource.id}" already exists`);
            } else {
                newResources.push(newResource);
            }
        }

        if (newResources.length) {
            set(({ resources }) => ({
                resources: [...resources, ...newResources],
            }));
        }

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
});
