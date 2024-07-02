import { type ParsedHealthcareOrganization } from '$/hooks';
import { createUniqueSlug } from '$/lib/uniqueSlug/uniqueSlug';
import { isEmpty } from 'lodash';
import { create } from 'zustand';
import { persist, createJSONStorage } from 'zustand/middleware';

export type HealthcareOrganization = ParsedHealthcareOrganization & {
    slug: string;
};

export interface OrganizationsState {
    organizations: HealthcareOrganization[];
    addOrganization: (
        healthcareOrganizationDetails: ParsedHealthcareOrganization
    ) => HealthcareOrganization;
    hasOrganizations: () => boolean;
    hasOrganizationById: (id: string) => boolean;
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
                    slug: createUniqueSlug(healthcareOrganizationDetails.name, slugs),
                };

                set(({ organizations }) => ({
                    organizations: [...organizations, healthcareOrganisation],
                }));

                return healthcareOrganisation;
            },

            hasOrganizations: () => !isEmpty(get().organizations),

            hasOrganizationById: (id) => get().organizations.some((x) => x.id === id),

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
