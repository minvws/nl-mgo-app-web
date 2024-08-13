import { type MgoReference } from '../../../parse/type';
import { type Nullable } from '../../../types/Nullable';
import { replaceUndefined } from '../../helpers';
import { type ValueOptions, type ValueDescription } from '../../types';

export function reference(label: string, value: Nullable<MgoReference>, options?: ValueOptions) {
    return {
        label,
        type: 'reference',
        display: replaceUndefined(value?.display),
        reference: replaceUndefined(value?.reference),
        ...options,
    } satisfies ValueDescription;
}
