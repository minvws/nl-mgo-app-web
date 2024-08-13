import { type Resource } from '../../fhir';
import { deepReplaceUndefined } from '../../parse/helpers';
import { parse, type MgoParsedType } from '../../parse/type';

export function parseResourceMeta(statement: Resource) {
    const { resourceType, id, meta } = statement;
    const profiles = meta?.profile;

    if ((profiles?.length || 0) > 1) {
        // There are no known cases where a resource has more than one profile
        // But if it happens, it could be useful to log this
        console.warn('Multiple profiles found for resource', resourceType, profiles);
    }

    return deepReplaceUndefined({
        id: parse.string(id),
        resourceType: parse.string(resourceType),
        profile: profiles?.[0],
    });
}

export type ResourceMeta = MgoParsedType<typeof parseResourceMeta>;
