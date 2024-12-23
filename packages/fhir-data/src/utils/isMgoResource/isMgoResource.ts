import { type Nullable } from 'vitest';
import { type MgoResourceR3 } from '../../api/resources/resources';
import { type LosslessOutput } from '../../types/Lossless';

export function isMgoResource(
    value: unknown
): value is LosslessOutput<typeof value, MgoResourceR3> {
    const resourceTyped = value as Nullable<MgoResourceR3>;
    return !!resourceTyped?.resourceType && !!resourceTyped?.profile;
}
