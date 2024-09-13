import { type MgoReference } from '../../../parse/type';
import { type ReferenceValue, type UiFunction } from '../../types';

export const reference: UiFunction<MgoReference, ReferenceValue> = (label, value, options) => {
    return {
        label,
        type: 'reference',
        display: value?.display,
        reference: value?.reference,
        ...options,
    };
};
