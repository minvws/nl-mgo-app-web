import { isNullish, type Nullable } from '@minvws/mgo-utils';
import { type HealthUiGroup } from '../../types/index.js';

export function getChildren<T extends HealthUiGroup | HealthUiGroup[]>(
    value?: Nullable<T>
): HealthUiGroup['children'] {
    if (isNullish(value)) return [];

    if (Array.isArray(value)) {
        return value.map((x) => x.children).flat();
    }

    return value.children;
}
