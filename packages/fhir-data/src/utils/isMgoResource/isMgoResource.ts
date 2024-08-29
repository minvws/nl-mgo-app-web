import { type Nullable } from 'vitest';
import { type MgoResource } from '../../api/resources/resources';
import { type LosslessOutput } from '../../types/Lossless';

export function isMgoResource(value: unknown): value is LosslessOutput<typeof value, MgoResource> {
    const resourceTyped = value as Nullable<MgoResource>;
    return !!resourceTyped?.id && !!resourceTyped?.resourceType && !!resourceTyped?.profile;
}
