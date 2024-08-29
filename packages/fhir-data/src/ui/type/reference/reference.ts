import { type MgoReference } from '../../../parse/type';
import { type Reference, type UiFunction } from '../../types';

export const reference: UiFunction<MgoReference, Reference> = (label, value, options) => {
    return {
        label,
        type: 'reference',
        display: value?.display,
        reference: value?.reference,
        ...options,
    };
};
