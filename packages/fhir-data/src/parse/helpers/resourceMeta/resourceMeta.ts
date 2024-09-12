import { type NictizNlProfile, type Resource } from '../../../fhir';
import { string } from '../../type/string/string';

export function resourceMeta<T extends NictizNlProfile>(resource: Resource, profile: T) {
    const { resourceType: fhirResourceType, id, meta } = resource;

    if (!meta?.profile?.includes(profile)) {
        throw new Error(
            `Resource does not have the expected profile: "${profile}". Got: ${meta?.profile}`
        );
    }

    const resourceId = string(id);
    const resourceType = string(fhirResourceType);

    return {
        id: resourceId,
        referenceId: `${resourceType}/${resourceId}`,
        resourceType,
        profile,
    } as const;
}

export type MgoResourceMeta = ReturnType<typeof resourceMeta>;
