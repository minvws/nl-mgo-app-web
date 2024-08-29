import { type Bundle, type BundleResource, type FhirResource, type ResourceType } from '../../fhir';
import { type Lossless, type LosslessOutput } from '../../types/Lossless';

export function getBundleResources<T extends Lossless<Bundle>, Resource = BundleResource<T>>(
    bundle: T
): Resource[];
export function getBundleResources<
    T extends Lossless<Bundle>,
    Filter extends ResourceType,
    FilterResource = Extract<FhirResource, { resourceType: Filter }>,
    ReturnFilterResource = LosslessOutput<T, FilterResource>,
>(bundle: T, resourceTypeFilter: Filter): ReturnFilterResource[];
export function getBundleResources<
    T extends Lossless<Bundle>,
    Filter extends ResourceType,
    Resource = BundleResource<T>,
    FilterResource = Extract<FhirResource, { resourceType: Filter }>,
    ReturnFilterResource = LosslessOutput<T, FilterResource>,
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
