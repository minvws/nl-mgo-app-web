import { createUniqueSlug } from '$/lib/uniqueSlug/uniqueSlug';
import { type HealthcareService } from '$/types/Addressing';
import { type HealthcareOrganisation } from '$/types/Organisation';
import { create } from 'zustand';

interface HealthcareProviderData {
    organisation: HealthcareOrganisation;
    service: HealthcareService;
}

interface HealthcareProvider extends HealthcareProviderData {
    slug: string;
}

export interface HealthcareProvidersState {
    healthcareProviders: HealthcareProvider[];
    getHealthcareProvider: (slug?: string) => HealthcareProvider | undefined;
    addHealthcareProvider: (provider: HealthcareProviderData) => void;
}

export const useHealthcareProvidersStore = create<HealthcareProvidersState>()((set, get) => ({
    healthcareProviders: [],
    addHealthcareProvider: ({ organisation, service }) => {
        const slugs = get().healthcareProviders.map((p) => p.slug);
        const provider = {
            organisation,
            service,
            slug: createUniqueSlug(organisation.display_name, slugs),
        };
        set(({ healthcareProviders }) => ({
            healthcareProviders: [...healthcareProviders, provider],
        }));
    },
    getHealthcareProvider: (slug) => {
        if (!slug) return;
        return get().healthcareProviders.find((x) => x.slug === slug);
    },
}));
