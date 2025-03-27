import { type DateTimeString } from '@minvws/mgo-fhir-types';
import { type MgoDateTime } from '../../../parse/type';
import { isNonNullish } from '../../../utils';
import { date } from '../../format/date/date';
import { valueOf } from '../../helpers/valueOf/valueOf';
import {
    type MultipleValues,
    type SingleValue,
    type UiFunction,
    type WithUiHelperContext,
} from '../../types';

export const dateTime: WithUiHelperContext<
    UiFunction<
        DateTimeString | MgoDateTime | DateTimeString[] | MgoDateTime[],
        SingleValue | MultipleValues
    >
> = (context) => (label, value) => {
    const formatDate = date(context);

    if (Array.isArray(value)) {
        return {
            label: context.formatMessage(label),
            type: 'MULTIPLE_VALUES',
            display: value.map((x) => formatDate(valueOf(x))).filter(isNonNullish),
        };
    }

    return {
        label: context.formatMessage(label),
        type: 'SINGLE_VALUE',
        display: formatDate(valueOf(value)),
    };
};
