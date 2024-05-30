import {
    type Bundle,
    type BundleResource,
    type FhirResource,
    type InputFhir,
    type OutputFhir,
    type ResourceType,
} from '../../fhir';

export function getBundleResources<T extends InputFhir<Bundle>, Resource = BundleResource<T>>(
    bundle: T
): Resource[];
export function getBundleResources<
    T extends InputFhir<Bundle>,
    Filter extends ResourceType,
    FilterResource = Extract<FhirResource, { resourceType: Filter }>,
    ReturnFilterResource = OutputFhir<T, FilterResource>,
>(bundle: T, resourceTypeFilter: Filter): ReturnFilterResource[];
export function getBundleResources<
    T extends InputFhir<Bundle>,
    Filter extends ResourceType,
    Resource = BundleResource<T>,
    FilterResource = Extract<FhirResource, { resourceType: Filter }>,
    ReturnFilterResource = OutputFhir<T, FilterResource>,
>(bundle: T, resourceTypeFilter?: Filter): Resource[] | ReturnFilterResource[] {
    if (!bundle.entry?.length) return [];

    const resources = bundle.entry.map((entry) => entry.resource);

    if (resourceTypeFilter) {
        return resources.filter(
            (x) => x?.resourceType === resourceTypeFilter
        ) as ReturnFilterResource[];
    }

    return resources.filter((x) => x !== undefined) as Resource[];
}
