import { type Resource } from '../../../fhir';
import { EMPTY_VALUE, parse } from '../../type';

export function parseResourceMeta(statement: Resource) {
    if (!statement) return EMPTY_VALUE;

    const { resourceType, id, meta } = statement;
    const profiles = meta?.profile;

    if ((profiles?.length || 0) > 1) {
        // There are no known cases where a resource has more than one profile
        // But if it happens, it could be useful to log this
        console.warn('Multiple profiles found for resource', resourceType, profiles);
    }

    return {
        id: parse.string(id),
        resourceType: parse.string(resourceType),
        profile: profiles?.[0] || EMPTY_VALUE,
    };
}

export type ResourceMeta = ReturnType<typeof parseResourceMeta>;
