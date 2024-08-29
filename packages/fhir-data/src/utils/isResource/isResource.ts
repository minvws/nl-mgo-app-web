import { type FhirResource, type ResourceByType, type ResourceType } from '../../fhir';
import { type Lossless, type LosslessOutput } from '../../types/Lossless';
import { resourceTypes } from './resourceTypes';
import { type Nullable } from '../../types/Nullable';

export function isFhirResource<Type extends ResourceType>(
    value: unknown,
    type?: Type
): value is LosslessOutput<typeof value, ResourceByType<Type>> {
    const resource = value as Nullable<Lossless<FhirResource>>;
    if (!type) {
        return resourceTypes.includes(resource?.resourceType as ResourceType);
    }
    return resource?.resourceType === type;
}
