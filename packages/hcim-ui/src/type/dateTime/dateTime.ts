import { type MgoDateTime } from '@minvws/mgo-hcim-parse';
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
        const { baseProps } = context;

        if (Array.isArray(value)) {
            return {
                ...baseProps(label, value, options),
                type: 'MULTIPLE_VALUES',
                value: value.map((x) => ({ display: formatDate(valueOf(x)) })),
            };
        }

        return {
            ...baseProps(label, value, options),
            type: 'SINGLE_VALUE',
            value: { display: formatDate(valueOf(value)) },
        };
    };
