import { Organization as OrganizationSearchResult } from '@minvws/mgo-org-search';
import { createUniqueSlug } from '@minvws/mgo-utils';
import { SetRequired } from 'type-fest';
import { StateCreator } from 'zustand';
import { ResourcesSlice } from '../resources/resources';

export type OrganizationSearchResultWithDataServices = SetRequired<
    OrganizationSearchResult,
    'dataServices'
>;

export interface HealthcareOrganization extends Omit<
    OrganizationSearchResultWithDataServices,
    'normalizedName'
> {
    slug: string;
}

export interface OrganizationsSlice {
    organizations: HealthcareOrganization[];
    addOrganization: (
        organizationSearchResult: OrganizationSearchResultWithDataServices
    ) => HealthcareOrganization;
    hasOrganizations: () => boolean;
    hasOrganizationById: (id: string) => boolean;
    getOrganizationById: (id?: string) => HealthcareOrganization | undefined;
    getOrganizationResourceEndpoint: (
        organizationId?: string,
        dataServiceId?: string
    ) => string | undefined;
    getOrganizationBySlug: (slug?: string) => HealthcareOrganization | undefined;
    removeOrganizationBySlug: (slug: string) => void;
}

export const createOrganizationsSlice: StateCreator<
    OrganizationsSlice & ResourcesSlice,
    [],
    [],
    OrganizationsSlice
> = (set, get) => ({
    organizations: [],

    addOrganization: (organizationSearchResult) => {
        const slugs = get().organizations.map((x) => x.slug);
        const { normalizedName, ...rest } = organizationSearchResult;

        const healthcareOrganization = {
            ...rest,
            // NOTE: Do not use any organization information as a slug as it could potentially be sensitive information
            slug: createUniqueSlug('aanbieder', slugs),
        };

        set(({ organizations }) => ({
            organizations: [...organizations, healthcareOrganization],
        }));

        return healthcareOrganization;
    },

    hasOrganizations: () => get().organizations.length > 0,

    hasOrganizationById: (id) => get().organizations.some((x) => x.id === id),

    getOrganizationById: (id) => {
        if (!id) return;
        return get().organizations.find((x) => x.id === id);
    },

    getOrganizationResourceEndpoint: (organizationId, dataServiceId) => {
        const organization = get().getOrganizationById(organizationId);
        return organization?.dataServices?.find((x) => x.id === dataServiceId)?.resourceEndpoint;
    },

    getOrganizationBySlug: (slug) => {
        if (!slug) return;
        return get().organizations.find((x) => x.slug === slug);
    },

    removeOrganizationBySlug: (slug) => {
        const organization = get().getOrganizationBySlug(slug);
        if (!organization) {
            return;
        }
        set(({ resources, organizations }) => {
            const nextOrganizations = organizations.filter((x) => x.id !== organization.id);
            const nextResources = resources.filter(
                (resource) => resource.source.organizationId !== organization.id
            );
            return nextResources.length === resources.length
                ? { organizations: nextOrganizations }
                : { organizations: nextOrganizations, resources: nextResources };
        });
    },
});
