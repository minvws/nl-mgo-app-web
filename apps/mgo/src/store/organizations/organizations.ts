import { type HealthcareOrganizationSearchResult } from '$/services/load/load';
import { createUniqueSlug } from '@minvws/mgo-mgo-utils';
import { isEmpty } from 'lodash';
import { create } from 'zustand';
import { createJSONStorage, persist } from 'zustand/middleware';

export type HealthcareOrganization = HealthcareOrganizationSearchResult & {
    slug: string;
};

export interface OrganizationsState {
    organizations: HealthcareOrganization[];
    addOrganization: (
        healthcareOrganizationDetails: HealthcareOrganizationSearchResult
    ) => HealthcareOrganization;
    hasOrganizations: () => boolean;
    hasOrganizationById: (id: string) => boolean;
    getOrganizationById: (id?: string) => HealthcareOrganization | undefined;
    getOrganizationsById: (id?: (string | undefined)[]) => HealthcareOrganization[];
    getAllOrganizations: () => HealthcareOrganization[];
    getOrganizationBySlug: (slug?: string) => HealthcareOrganization | undefined;
    removeOrganizationBySlug: (slug: string) => void;
}

export const useOrganizationsStore = create<OrganizationsState>()(
    persist(
        (set, get) => ({
            organizations: [],

            addOrganization: (healthcareOrganizationDetails) => {
                const slugs = get().organizations.map((x) => x.slug);
                const healthcareOrganisation = {
                    ...healthcareOrganizationDetails,
                    // NOTE: Do not use any organization information as a slug as it could potentially be sensitive information
                    slug: createUniqueSlug('aanbieder', slugs),
                };

                set(({ organizations }) => ({
                    organizations: [...organizations, healthcareOrganisation],
                }));

                return healthcareOrganisation;
            },

            hasOrganizations: () => !isEmpty(get().organizations),

            hasOrganizationById: (id) => get().organizations.some((x) => x.id === id),

            getOrganizationById: (id) => {
                if (!id) return;
                return get().organizations.find((x) => x.id === id);
            },

            getOrganizationsById: (ids) => {
                if (!ids?.length) return [];
                return get().organizations.filter((x) => ids.includes(x.id));
            },

            getAllOrganizations: () => {
                return get().organizations;
            },

            getOrganizationBySlug: (slug) => {
                if (!slug) return;
                return get().organizations.find((x) => x.slug === slug);
            },

            removeOrganizationBySlug: (slug) => {
                set(({ organizations }) => ({
                    organizations: organizations.filter((x) => x.slug !== slug),
                }));
            },
        }),
        {
            name: 'mgo-organizations',
            storage: createJSONStorage(() => sessionStorage),
        }
    )
);
