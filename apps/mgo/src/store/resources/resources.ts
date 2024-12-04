import { createUniqueSlug } from '$/lib/uniqueSlug/uniqueSlug';
import { type DataServiceId } from '@minvws/mgo-fhir-client';
import {
    getUiSchema,
    type MgoResourceR4,
    type Lossless,
    type MgoResourceR3,
    type NictizNlProfile,
    type UiSchema,
} from '@minvws/mgo-fhir-data';
import { create } from 'zustand';

type MgoResourceR3Profile = MgoResourceR3['profile'];
type MgoResourceR4Profile = MgoResourceR4['profile'];
type MgoResourceR3ByProfile<T extends NictizNlProfile> = Extract<MgoResourceR3, { profile: T }>;
type MgoResourceR4ByProfile<T extends NictizNlProfile> = Extract<MgoResourceR4, { profile: T }>;

export type Resource<T extends MgoResourceR3 | MgoResourceR4 = MgoResourceR3 | MgoResourceR4> = {
    id: string;
    slug: string;
    organizationId: string;
    dataServiceId: DataServiceId;
    mgoResource: Lossless<T>;
    uiSchema: UiSchema;
};

export type ResourceDTO = Pick<Resource, 'organizationId' | 'dataServiceId' | 'mgoResource'> & {
    id?: never;
};

export interface ResourcesState {
    resources: Resource[];
    addResources: (resourceData: ResourceDTO[]) => Resource[];
    getResourcesByProfile: <T extends MgoResourceR3Profile | MgoResourceR4Profile>(
        profile: T,
        organizationIdFilter?: (string | undefined)[]
    ) => Resource<MgoResourceR3ByProfile<T> | MgoResourceR4ByProfile<T>>[];
    getResourceBySlug: (slug: string | undefined) => Resource | undefined;
}

function createResource(dto: ResourceDTO, existingSlugs: string[]): Resource {
    const { organizationId, dataServiceId, mgoResource } = dto;
    const uiSchema = getUiSchema(mgoResource as MgoResourceR3);

    const id = `${organizationId}-${dataServiceId}-${mgoResource.referenceId}`;
    return {
        id,
        slug: createUniqueSlug('detail', existingSlugs),
        organizationId,
        dataServiceId,
        mgoResource,
        uiSchema,
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
                console.warn(`Resource with id "${newResource.id}" already exists`);
            } else {
                newResources.push(newResource);
            }
        }

        set(({ resources }) => ({
            resources: [...resources, ...newResources],
        }));

        return newResources;
    },

    getResourcesByProfile: (profile, organizationIdFilter) => {
        const resources = [...get().resources];
        return resources
            .filter(
                ({ organizationId }) =>
                    !organizationIdFilter || organizationIdFilter.includes(organizationId)
            )
            .filter(({ mgoResource }) => mgoResource.profile === profile) as Resource<
            MgoResourceR3ByProfile<typeof profile> | MgoResourceR4ByProfile<typeof profile>
        >[];
    },

    getResourceBySlug: (slug) => {
        if (!slug) return;
        return get().resources.find((resource) => resource.slug === slug);
    },
}));
