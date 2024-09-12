import { isNullish } from '../../../utils';
import { type Nullable } from '../../../types/Nullable';
import { type UiSchemaGroup } from '../../types';

export function getChildren<T extends UiSchemaGroup | UiSchemaGroup[]>(
    value?: Nullable<T>
): UiSchemaGroup['children'] {
    if (isNullish(value)) return [];

    if (Array.isArray(value)) {
        return value.map((x) => x.children).flat();
    }

    return value.children;
}
