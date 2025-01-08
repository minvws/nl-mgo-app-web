import { type MgoDateTime } from '../../../parse/type';
import { isNonNullish } from '../../../utils';
import { date } from '../../format/date/date';
import {
    type MultipleValues,
    type SingleValue,
    type UiFunction,
    type WithUiHelperContext,
} from '../../types';

export const dateTime: WithUiHelperContext<
    UiFunction<MgoDateTime | MgoDateTime[], SingleValue | MultipleValues>
> = (context) => (label, value) => {
    if (Array.isArray(value)) {
        return {
            label: context.formatMessage(label),
            type: 'MULTIPLE_VALUES',
            display: value.map(date(context)).filter(isNonNullish),
        };
    }

    return {
        label: context.formatMessage(label),
        type: 'SINGLE_VALUE',
        display: date(context)(value),
    };
};
