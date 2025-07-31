import { type FhirResource, isFhirResource } from '@minvws/mgo-fhir';
import { type Bundle as BundleR3 } from '@minvws/mgo-fhir/r3';
import { type Bundle as BundleR4 } from '@minvws/mgo-fhir/r4';
import { isNonNullish } from '@minvws/mgo-utils';

type BundleResource<T extends BundleR3 | BundleR4> = NonNullable<
    NonNullable<T['entry']>[number]['resource']
>;

export function getBundleResources<T extends BundleR3 | BundleR4>(bundle: T): BundleResource<T>[] {
    // As this method is also used with JSON parsed inputs,
    // we want to ensure we're really dealing with a Bundle Resource.
    if (!isFhirResource(bundle, 'Bundle')) {
        throw new Error(
            `input does not seem to be a Fhir Bundle. Received resourceType: "${(bundle as FhirResource)?.resourceType}"`
        );
    }

    const resources = bundle.entry?.map((entry) => entry.resource).filter(isNonNullish);
    if (!resources?.length) return [];
    return resources;
}
