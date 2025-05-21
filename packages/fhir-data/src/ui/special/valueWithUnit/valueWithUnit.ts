import { type PrimitiveValueType } from '../../../parse/types';
import { format } from '../../format';
import { valueOf } from '../../helpers/valueOf/valueOf';
import { type CombinedUiFunction, type SingleValue, type WithUiHelperContext } from '../../types';

export const valueWithUnit: WithUiHelperContext<
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
