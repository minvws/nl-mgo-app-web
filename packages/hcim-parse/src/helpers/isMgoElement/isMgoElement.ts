import { NictizNlProfile } from '@minvws/mgo-fhir';
import { MgoElementMeta } from '../../types.js';

export function isMgoElement<T extends NictizNlProfile>(
    value: unknown
): value is MgoElementMeta<T> {
    return (
        typeof value === 'object' &&
        value !== null &&
        typeof (value as MgoElementMeta<T>)['_profile'] === 'string'
    );
}
