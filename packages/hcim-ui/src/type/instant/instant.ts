import { type MgoInstant } from '@minvws/mgo-hcim-parse';
import { date } from '../../format/date/date.js';
import {
    type MultipleValues,
    type SingleValue,
    type UiFunction,
    type WithUiContext,
} from '../../types/index.js';

export const instant: WithUiContext<
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
                value: value.map((x) => ({ display: formatDate(x.value) })),
            };
        }

        return {
            label: formatLabel(label, value, options.defaultLabel),
            type: 'SINGLE_VALUE',
            value: { display: formatDate(value?.value) },
        };
    };
