import { type MgoIdentifier } from '../../../parse/type';
import { type UiFunction, type SingleValue } from '../../types';

export const identifier: UiFunction<MgoIdentifier, SingleValue> = (label, value, options) => {
    return {
        label,
        type: 'identifier',
        display: value?.value,
        ...options,
    };
};
