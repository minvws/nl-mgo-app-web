import { type MgoInteger } from '../../../parse/type';
import { numberToString } from '../../helpers';
import { type SingleValue, type UiFunction, type WithUiHelperContext } from '../../types';

export const integer: WithUiHelperContext<UiFunction<MgoInteger, SingleValue>> =
    ({ intl }) =>
    (label, value) => {
        return {
            label: intl.formatMessage({ id: label }),
            type: 'SINGLE_VALUE',
            display: numberToString(value),
        };
    };
