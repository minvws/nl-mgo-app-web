import { type Bundle } from '../../fhir';
import { type Lossless } from '../../types/Lossless';
import { isNonNullish } from '../../utils/isNonNullish/isNonNullish';
import { getBundleResources } from '../getBundleResources/getBundleResources';
import { getMgoResource } from '../getMgoResource/getMgoResource';
import { type MgoResource } from '../resources/resources';

export function getBundleMgoResources(bundle: Lossless<Bundle>) {
    const resources = getBundleResources(bundle);
    if (!resources?.length) return;
    return resources.map(getMgoResource).filter(isNonNullish) as Lossless<MgoResource>[];
}
