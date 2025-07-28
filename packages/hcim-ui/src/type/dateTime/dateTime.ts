import { type MgoDateTime } from '@minvws/mgo-hcim-parse';
import { isNonNullish } from '@minvws/mgo-utils';
import { date } from '../../format/date/date.js';
import { valueOf } from '../../helpers/valueOf/valueOf.js';
import {
    type MultipleValues,
    type SingleValue,
    type UiFunction,
    type WithUiContext,
} from '../../types/index.js';

export const dateTime: WithUiContext<
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
