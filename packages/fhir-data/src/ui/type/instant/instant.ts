import { type MgoInstant } from '../../../parse/type';
import { isNonNullish } from '../../../utils';
import { date } from '../../format/date/date';
import {
    type MultipleValues,
    type SingleValue,
    type UiFunction,
    type WithUiHelperContext,
} from '../../types';

export const instant: WithUiHelperContext<
    UiFunction<MgoInstant | MgoInstant[], SingleValue | MultipleValues>
> = (context) => (label, value) => {
    const formatDate = date(context);

    if (Array.isArray(value)) {
        return {
            label: context.formatMessage(label),
            type: 'MULTIPLE_VALUES',
            display: value.map((x) => formatDate(x.value)).filter(isNonNullish),
        };
    }

    return {
        label: context.formatMessage(label),
        type: 'SINGLE_VALUE',
        display: formatDate(value?.value),
    };
};
