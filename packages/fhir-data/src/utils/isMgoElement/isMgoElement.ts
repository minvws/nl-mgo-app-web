import { type MgoElementMeta, type NictizNlProfile } from '../../types';

export function isMgoElement<T extends NictizNlProfile>(
    value: unknown
): value is MgoElementMeta<T> {
    return (
        typeof value === 'object' &&
        value !== null &&
        typeof (value as MgoElementMeta<T>)['_profile'] === 'string'
    );
}
