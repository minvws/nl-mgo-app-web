import { type MgoInteger64 } from '../../../parse/type';
import { numberToString } from '../../helpers';
import { type SingleValue, type UiFunction, type WithUiHelperContext } from '../../types';

export const integer64: WithUiHelperContext<UiFunction<MgoInteger64, SingleValue>> =
    ({ formatLabel }) =>
    (label, value) => {
        return {
            label: formatLabel(label, value),
            type: 'SINGLE_VALUE',
            display: numberToString(value?.value),
        };
    };
