import { type MgoPeriod } from '../../../parse/type';
import { format } from '../../format';
import { type SingleValue, type UiFunction } from '../../types';

export const period: UiFunction<MgoPeriod, SingleValue[]> = (label, value, options) => {
    return [
        {
            label: `${label}.start`,
            type: `SINGLE_VALUE`,
            display: format.dateTime(value?.start),
            ...options,
        },
        {
            label: `${label}.end`,
            type: `SINGLE_VALUE`,
            display: format.dateTime(value?.end),
            ...options,
        },
    ];
};
