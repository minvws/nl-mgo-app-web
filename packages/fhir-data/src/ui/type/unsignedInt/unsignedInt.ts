import { type MgoUnsignedInt } from '../../../parse/type';
import { numberToString } from '../../helpers';
import { valueOf } from '../../helpers/valueOf/valueOf';
import { type SingleValue, type UiFunction, type WithUiHelperContext } from '../../types';

export const unsignedInt: WithUiHelperContext<UiFunction<MgoUnsignedInt, SingleValue>> =
    ({ formatLabel }) =>
    (label, value, options = {}) => {
        return {
            label: formatLabel(label, value, options.defaultLabel),
            type: 'SINGLE_VALUE',
            display: numberToString(valueOf(value)),
        };
    };
