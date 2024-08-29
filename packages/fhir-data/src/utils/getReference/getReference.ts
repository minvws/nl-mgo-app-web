import { type Bundle, type Reference, type ResourceByType, type ResourceType } from '../../fhir';
import { type Lossless } from '../../types/Lossless';

export type BundleResource<T extends Lossless<Bundle>> = NonNullable<
    NonNullable<T['entry']>[number]['resource']
>;

export function getReference<T extends ResourceType, Resource = Lossless<ResourceByType<T>>>(
    bundle?: Lossless<Bundle>,
    { reference }: Lossless<Reference> = {}
) {
    if (!bundle?.entry?.length || !reference) return;

    return bundle.entry.find((x) => x.fullUrl?.endsWith(reference))?.resource as Resource;
}
