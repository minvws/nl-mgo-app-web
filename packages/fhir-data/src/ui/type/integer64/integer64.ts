import { type MgoInteger64 } from '../../../parse/type';
import { numberToString } from '../../helpers';
import { type SingleValue, type UiFunction, type WithUiHelperContext } from '../../types';

export const integer64: WithUiHelperContext<UiFunction<MgoInteger64, SingleValue>> =
    ({ intl }) =>
    (label, value) => {
        return {
            label: intl.formatMessage({ id: label }),
            type: 'SINGLE_VALUE',
            display: numberToString(value),
        };
    };
