import { type MgoInteger } from '../../../parse/type';
import { numberToString } from '../../helpers';
import { type SingleValue, type UiFunction, type WithUiHelperContext } from '../../types';

export const integer: WithUiHelperContext<UiFunction<MgoInteger, SingleValue>> =
    ({ formatLabel }) =>
    (label, value) => {
        return {
            label: formatLabel(label, value),
            type: 'SINGLE_VALUE',
            display: numberToString(value?.value),
        };
    };
