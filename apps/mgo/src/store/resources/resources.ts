import { type MgoResource } from '@minvws/mgo-hcim';
import { StateCreator } from 'zustand';
import { HealthcareOrganization, OrganizationsSlice } from '../organizations/organizations';
import { createResourceFromDto, Resource, ResourceSource } from './createResourceFromDto';

export type { Resource, ResourceSource };

export interface ResourcesSlice {
    resources: Resource[];
    syncResources: (source: ResourceSource, mgoResources: MgoResource[]) => void;
    getResourceBySlug: (slug: string | undefined) => Resource | undefined;
    getResourceByReferenceId: (
        relatedResource: Resource | undefined,
        referenceId: string | undefined
    ) => Resource | undefined;
    getResourcesByProfiles: (
        profile: string[],
        organizations?: HealthcareOrganization[]
    ) => Resource[];
}

function isSameDataService(a: ResourceSource, b: ResourceSource) {
    return a.organizationId === b.organizationId && a.dataServiceId === b.dataServiceId;
}

function isSameEndpoint(a: ResourceSource, b: ResourceSource) {
    return isSameDataService(a, b) && a.endpointId === b.endpointId;
}

function isSameData(a: MgoResource, b: MgoResource) {
    return JSON.stringify(a) === JSON.stringify(b);
}

export const createResourcesSlice: StateCreator<
    ResourcesSlice & OrganizationsSlice,
    [],
    [],
    ResourcesSlice
> = (set, get) => ({
    resources: [],

    syncResources: (source, mgoResourcesUpdates) => {
        const currentSlugs = get().resources.map((resource) => resource.slug);
        const unchangedResources: Resource[] = [];
        const changedResources: Resource[] = [];
        const currentResources = get().resources.filter((resource) =>
            isSameEndpoint(resource.source, source)
        );

        for (const mgoResourceUpdate of mgoResourcesUpdates) {
            const existingResource = currentResources.find(
                (resource) => resource.mgoResource.referenceId === mgoResourceUpdate.referenceId
            );

            if (existingResource) {
                if (isSameData(existingResource.mgoResource, mgoResourceUpdate)) {
                    unchangedResources.push(existingResource);
                    continue;
                }
                // only update the data, but keep the same slug
                existingResource.mgoResource = mgoResourceUpdate;
                changedResources.push(existingResource);
            } else {
                const allSlugs = [...currentSlugs, ...changedResources.map((x) => x.slug)];
                const newResource = createResourceFromDto(source, mgoResourceUpdate, allSlugs);
                changedResources.push(newResource);
            }
        }

        const nextResources = [...unchangedResources, ...changedResources];
        const needsPruning = nextResources.length < currentResources.length;

        if (needsPruning || changedResources.length) {
            const differentSource = (resource: Resource) =>
                !isSameEndpoint(resource.source, source);
            set(({ resources }) => ({
                resources: [...resources.filter(differentSource), ...nextResources],
            }));
        }
    },

    getResourceBySlug: (slug) => {
        if (!slug) return;
        return get().resources.find((resource) => resource.slug === slug);
    },

    getResourceByReferenceId: (relatedResource, referenceId) => {
        if (!relatedResource || !referenceId) return;

        return get()
            .resources.filter(({ source }) => isSameDataService(source, relatedResource.source))
            .find(({ mgoResource }) => mgoResource.referenceId === referenceId);
    },

    getResourcesByProfiles: (profiles, organizations) => {
        const resources = [...get().resources];
        const organizationIds = organizations?.map((organization) => organization.id);
        return resources
            .filter(
                ({ source }) =>
                    !organizationIds?.length || organizationIds.includes(source.organizationId)
            )
            .filter(({ mgoResource }) => profiles.includes(mgoResource.profile));
    },
});
