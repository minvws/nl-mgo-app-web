import { type FhirResource, type Bundle } from '../../fhir';
import { type Lossless } from '../../types/Lossless';
import { isNonNullish } from '../../utils/isNonNullish/isNonNullish';

export function getBundleResources(bundle: Lossless<Bundle>) {
    const resources = bundle.entry?.map((entry) => entry.resource).filter(isNonNullish);
    if (!resources?.length) return;
    return resources as Lossless<FhirResource>[];
}
