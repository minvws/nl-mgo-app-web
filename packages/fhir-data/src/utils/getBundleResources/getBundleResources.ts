import { type LosslessJson } from '@minvws/mgo-fhir-client';
import { type Bundle } from '../../fhir';

export type BundleResource<T extends Bundle | LosslessJson<Bundle>> = NonNullable<
    NonNullable<T['entry']>[number]['resource']
>;

export function getBundleResources<
    T extends Bundle | LosslessJson<Bundle>,
    Resource = BundleResource<T>,
>(bundle: T): Resource[] {
    if (!bundle.entry?.length) return [];

    const resources = bundle.entry.map((entry) => entry.resource);
    return resources.filter((x) => x !== undefined) as Resource[];
}
