import { type MgoPositiveInt } from '@minvws/mgo-hcim-parse';
import { numberToString } from '../../helpers';
import { type SingleValue, type UiFunction, type WithUiContext } from '../../types';

export const positiveInt: WithUiContext<UiFunction<MgoPositiveInt, SingleValue>> =
    ({ formatLabel }) =>
    (label, value, options = {}) => {
        return {
            label: formatLabel(label, value, options.defaultLabel),
            type: 'SINGLE_VALUE',
            display: numberToString(value?.value),
        };
    };
