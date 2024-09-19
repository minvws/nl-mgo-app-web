import { createUniqueSlug } from '$/lib/uniqueSlug/uniqueSlug';
import { type DataServiceId } from '@minvws/mgo-fhir-client';
import {
    getUiSchema,
    type Lossless,
    type MgoResource,
    type NictizNlProfile,
    type UiSchema,
} from '@minvws/mgo-fhir-data';
import { create } from 'zustand';

type MgoResourceProfile = MgoResource['profile'];
type MgoResourceByProfile<T extends NictizNlProfile> = Extract<MgoResource, { profile: T }>;

export type Resource<T extends MgoResource = MgoResource> = {
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
    getResourcesByProfile: <T extends MgoResourceProfile>(
        profile: T,
        organizationIdFilter?: (string | undefined)[]
    ) => Resource<MgoResourceByProfile<T>>[];
    getResourceBySlug: (slug: string | undefined) => Resource | undefined;
}

function createResource(dto: ResourceDTO, resources: Resource[]): Resource {
    const slugs = resources.map((resource) => resource.slug);
    const { organizationId, dataServiceId, mgoResource } = dto;
    const uiSchema = getUiSchema(mgoResource as Lossless<MgoResource>);

    const id = `${organizationId}-${dataServiceId}-${mgoResource.referenceId}`;
    return {
        id,
        slug: createUniqueSlug('detail', slugs),
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
        const newResources: Resource[] = [];

        for (const dto of dtos) {
            const newResource = createResource(dto, currentResources);
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
            MgoResourceByProfile<typeof profile>
        >[];
    },

    getResourceBySlug: (slug) => {
        if (!slug) return;
        return get().resources.find((resource) => resource.slug === slug);
    },
}));
