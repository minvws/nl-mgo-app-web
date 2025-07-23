import { type MgoUnsignedInt } from '@minvws/mgo-hcim-parse';
import { numberToString } from '../../helpers';
import { valueOf } from '../../helpers/valueOf/valueOf';
import { type SingleValue, type UiFunction, type WithUiContext } from '../../types';

export const unsignedInt: WithUiContext<UiFunction<MgoUnsignedInt, SingleValue>> =
    ({ formatLabel }) =>
    (label, value, options = {}) => {
        return {
            label: formatLabel(label, value, options.defaultLabel),
            type: 'SINGLE_VALUE',
            display: numberToString(valueOf(value)),
        };
    };
