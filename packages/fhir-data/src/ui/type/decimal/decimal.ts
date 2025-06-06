import { type MgoDecimal } from '../../../parse/type';
import { numberToString } from '../../helpers';
import { type SingleValue, type UiFunction, type WithUiHelperContext } from '../../types';

export const decimal: WithUiHelperContext<UiFunction<MgoDecimal, SingleValue>> =
    ({ formatLabel }) =>
    (label, value, options = {}) => {
        return {
            label: formatLabel(label, value, options.defaultLabel),
            type: 'SINGLE_VALUE',
            display: numberToString(value?.value),
        };
    };
