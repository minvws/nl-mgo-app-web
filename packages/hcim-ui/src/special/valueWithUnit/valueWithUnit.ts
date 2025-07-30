import { type PrimitiveValueType } from '@minvws/mgo-hcim-parse';
import { format } from '../../format/index.js';
import { valueOf } from '../../helpers/valueOf/valueOf.js';
import {
    type CombinedUiFunction,
    type SingleValue,
    type WithUiContext,
} from '../../types/index.js';

export const valueWithUnit: WithUiContext<
    CombinedUiFunction<
        number | PrimitiveValueType<string, number>,
        string | PrimitiveValueType<string, string>,
        SingleValue
    >
> =
    ({ formatLabel }) =>
    (label, value, unit) => {
        return {
            label: formatLabel(label, value),
            display: format.valueWithUnit(valueOf(value), valueOf(unit)),
            type: 'SINGLE_VALUE',
        };
    };
