import { createUniqueSlug } from '$/lib/uniqueSlug/uniqueSlug';
import { type HealthcareOrganizationDTO } from '$/types/Organisation';
import { create } from 'zustand';

export interface HealthcareOrganization extends HealthcareOrganizationDTO {
    slug: string;
}

export interface HealthcareOrganizationsState {
    healthcareOrganizations: HealthcareOrganization[];
    hasHealthcareOrganization: ({
        identification_type,
        identification_value,
    }: Pick<HealthcareOrganizationDTO, 'identification_type' | 'identification_value'>) => boolean;
    getHealthcareOrganization: (slug?: string) => HealthcareOrganization | undefined;
    addHealthcareOrganization: (provider: HealthcareOrganizationDTO) => void;
    removeHealthcareOrganization: (slug: string) => void;
}

export const useHealthcareOrganizationsStore = create<HealthcareOrganizationsState>()(
    (set, get) => ({
        healthcareOrganizations: [],
        hasHealthcareOrganization: ({ identification_type, identification_value }) => {
            return get().healthcareOrganizations.some(
                (p) =>
                    p.identification_type === identification_type &&
                    p.identification_value === identification_value
            );
        },
        addHealthcareOrganization: (organization) => {
            const slugs = get().healthcareOrganizations.map((p) => p.slug);
            const provider = {
                ...organization,
                slug: createUniqueSlug(organization.display_name, slugs),
            };
            set(({ healthcareOrganizations }) => ({
                healthcareOrganizations: [...healthcareOrganizations, provider],
            }));
        },
        getHealthcareOrganization: (slug) => {
            if (!slug) return;
            return get().healthcareOrganizations.find((x) => x.slug === slug);
        },
        removeHealthcareOrganization: (slug) => {
            set(({ healthcareOrganizations }) => ({
                healthcareOrganizations: healthcareOrganizations.filter((x) => x.slug !== slug),
            }));
        },
    })
);
