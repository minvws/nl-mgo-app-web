import { type MgoUnsignedInt } from '../../../parse/type';
import { numberToString } from '../../helpers';
import { type SingleValue, type UiFunction, type WithUiHelperContext } from '../../types';

export const unsignedInt: WithUiHelperContext<UiFunction<MgoUnsignedInt, SingleValue>> =
    ({ intl }) =>
    (label, value) => {
        return {
            label: intl.formatMessage({ id: label }),
            type: 'SINGLE_VALUE',
            display: numberToString(value?.value),
        };
    };
