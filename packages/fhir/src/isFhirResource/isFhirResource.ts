import { type Nullable } from '@minvws/mgo-utils';
import { type FhirResource, type ResourceByType, type ResourceType } from '../resource.js';

export function isFhirResource<Type extends ResourceType>(
    value: unknown,
    type?: Type
): value is ResourceByType<Type> {
    const resource = value as Nullable<FhirResource>;
    if (!type) {
        return typeof resource?.resourceType === 'string' && !!resource?.resourceType.length;
    }
    return resource?.resourceType === type;
}
