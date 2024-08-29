import { type NictizNlProfile, type Resource } from '../../fhir';
import * as parse from '../../parse/type';

export function parseResourceMeta(statement: Resource, profile: NictizNlProfile) {
    const { resourceType, id, meta } = statement;

    if (!meta?.profile?.includes(profile)) {
        throw new Error(
            `Resource does not have the expected profile: "${profile}". Got: ${meta?.profile}`
        );
    }

    return {
        id: parse.string(id),
        resourceType: parse.string(resourceType),
        profile,
    };
}

export type MgoResourceMeta = ReturnType<typeof parseResourceMeta>;
