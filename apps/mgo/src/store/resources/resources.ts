import { createUniqueSlug } from '$/lib/uniqueSlug/uniqueSlug';
import { type DataServiceId } from '@minvws/mgo-data-services';
import {
    getUiSchema,
    type FhirVersion,
    type Lossless,
    type MgoResource,
    type NictizNlProfile,
    type UiSchema,
} from '@minvws/mgo-fhir-data';
import { create } from 'zustand';

type MgoResourceProfile<V extends FhirVersion> = MgoResource<V>['profile'];
type MgoResourceByProfile<V extends FhirVersion, T extends NictizNlProfile> = Extract<
    MgoResource<V>,
    { profile: T }
>;

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
    getResourceBySlug: (slug: string | undefined) => Resource | undefined;
    getResourcesByProfile: <V extends FhirVersion, T extends MgoResourceProfile<V>>(
        fhirVersion: V,
        profile: T,
        organizationIdFilter?: (string | undefined)[]
    ) => Resource<MgoResourceByProfile<V, T>>[];
}

function createResource(dto: ResourceDTO, existingSlugs: string[]): Resource {
    const { organizationId, dataServiceId, mgoResource } = dto;
    const uiSchema = getUiSchema(mgoResource as MgoResource);

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

    getResourcesByProfile: (fhirVersion, profile, organizationIdFilter) => {
        const resources = [...get().resources];
        return resources
            .filter(
                ({ organizationId }) =>
                    !organizationIdFilter || organizationIdFilter.includes(organizationId)
            )
            .filter(({ mgoResource }) => {
                return mgoResource.fhirVersion === fhirVersion && mgoResource.profile === profile;
            }) as Resource<MgoResourceByProfile<typeof fhirVersion, typeof profile>>[];
    },

    getResourceBySlug: (slug) => {
        if (!slug) return;
        return get().resources.find((resource) => resource.slug === slug);
    },
}));
