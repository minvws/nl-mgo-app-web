import { type Bundle as BundleR3 } from 'fhir/r3';
import { type Bundle as BundleR4 } from 'fhir/r4';
import { isNonNullish } from '../../utils/isNonNullish/isNonNullish';

type BundleResource<T extends BundleR3 | BundleR4> = NonNullable<
    NonNullable<T['entry']>[number]['resource']
>;

export function getBundleResources<T extends BundleR3 | BundleR4>(bundle: T): BundleResource<T>[] {
    const resources = bundle.entry?.map((entry) => entry.resource).filter(isNonNullish);
    if (!resources?.length) return [];
    return resources;
}
