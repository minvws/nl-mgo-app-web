import { type MgoCode } from '../../../parse/type';
import { isNonNullish } from '../../../utils';
import { toString } from '../../helpers';
import {
    type MultipleValues,
    type SingleValue,
    type UiFunction,
    type WithUiContext,
} from '../../types';

export const code: WithUiContext<UiFunction<MgoCode | MgoCode[], SingleValue | MultipleValues>> =
    ({ formatMessage }) =>
    (label, value, options) => {
        if (Array.isArray(value)) {
            return {
                label: formatMessage(label),
                type: 'MULTIPLE_VALUES',
                display: value.map(toString).filter(isNonNullish),
                ...options,
            };
        }

        return {
            label: formatMessage(label),
            type: 'SINGLE_VALUE',
            display: toString(value),
            ...options,
        };
    };
