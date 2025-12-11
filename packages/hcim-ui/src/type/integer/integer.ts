import { type MgoInteger } from '@minvws/mgo-hcim-parse';
import { numberToString } from '../../helpers/index.js';
import { type SingleValue, type UiFunction, type WithUiContext } from '../../types/index.js';

export const integer: WithUiContext<UiFunction<MgoInteger, SingleValue>> =
    ({ formatLabel }) =>
    (label, value, options = {}) => {
        return {
            label: formatLabel(label, value, options.defaultLabel),
            type: 'SINGLE_VALUE',
            value: { display: numberToString(value?.value) },
        };
    };
