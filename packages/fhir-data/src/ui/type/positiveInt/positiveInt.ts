import { type MgoPositiveInt } from '../../../parse/type';
import { numberToString } from '../../helpers';
import { type SingleValue, type UiFunction, type WithUiHelperContext } from '../../types';

export const positiveInt: WithUiHelperContext<UiFunction<MgoPositiveInt, SingleValue>> =
    ({ formatLabel }) =>
    (label, value) => {
        return {
            label: formatLabel(label, value),
            type: 'SINGLE_VALUE',
            display: numberToString(value?.value),
        };
    };
