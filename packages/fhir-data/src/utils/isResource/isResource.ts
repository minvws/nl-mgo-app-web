import { type FhirResource, type InputFhir, type OutputFhir, type ResourceType } from '../../fhir';

export function isResource<Type extends ResourceType>(
    object: InputFhir<FhirResource> | undefined,
    type: Type
): object is OutputFhir<typeof object, Extract<FhirResource, { resourceType: Type }>> {
    return object?.resourceType === type;
}
