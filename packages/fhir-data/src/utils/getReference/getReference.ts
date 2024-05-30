import {
    type Bundle,
    type InputFhir,
    type Reference,
    type ResourceByType,
    type ResourceType,
} from '../../fhir';

export type BundleResource<T extends InputFhir<Bundle>> = NonNullable<
    NonNullable<T['entry']>[number]['resource']
>;

export function getReference<T extends ResourceType, Resource = InputFhir<ResourceByType<T>>>(
    bundle?: InputFhir<Bundle>,
    { reference }: InputFhir<Reference> = {}
) {
    if (!bundle?.entry?.length || !reference) return;

    return bundle.entry.find((x) => x.fullUrl?.endsWith(reference))?.resource as Resource;
}
