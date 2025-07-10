import { isNonNullish } from '@minvws/mgo-utils';
import { type MgoDateTime } from '../../../parse/type';
import { date } from '../../format/date/date';
import { valueOf } from '../../helpers/valueOf/valueOf';
import {
    type MultipleValues,
    type SingleValue,
    type UiFunction,
    type WithUiHelperContext,
} from '../../types';

export const dateTime: WithUiHelperContext<
    UiFunction<MgoDateTime | MgoDateTime[], SingleValue | MultipleValues>
> =
    (context) =>
    (label, value, options = {}) => {
        const formatDate = date(context);
        const { formatLabel } = context;

        if (Array.isArray(value)) {
            return {
                label: formatLabel(label, value, options.defaultLabel),
                type: 'MULTIPLE_VALUES',
                display: value.map((x) => formatDate(valueOf(x))).filter(isNonNullish),
            };
        }

        return {
            label: formatLabel(label, value, options.defaultLabel),
            type: 'SINGLE_VALUE',
            display: formatDate(valueOf(value)),
        };
    };
