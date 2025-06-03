import { isNonNullish } from '@minvws/mgo-utils';
import { type MgoInstant } from '../../../parse/type';
import { date } from '../../format/date/date';
import {
    type MultipleValues,
    type SingleValue,
    type UiFunction,
    type WithUiHelperContext,
} from '../../types';

export const instant: WithUiHelperContext<
    UiFunction<MgoInstant | MgoInstant[], SingleValue | MultipleValues>
> =
    (context) =>
    (label, value, options = {}) => {
        const formatDate = date(context);
        const { formatLabel } = context;

        if (Array.isArray(value)) {
            return {
                label: formatLabel(label, value, options.defaultLabel),
                type: 'MULTIPLE_VALUES',
                display: value.map((x) => formatDate(x.value)).filter(isNonNullish),
            };
        }

        return {
            label: formatLabel(label, value, options.defaultLabel),
            type: 'SINGLE_VALUE',
            display: formatDate(value?.value),
        };
    };
