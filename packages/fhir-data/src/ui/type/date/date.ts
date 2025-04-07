import { type MgoDate } from '../../../parse/type';
import { date as formatDate } from '../../format/date/date';
import { type SingleValue, type UiFunction, type WithUiHelperContext } from '../../types';

export const date: WithUiHelperContext<UiFunction<MgoDate, SingleValue>> =
    (i18nContext) => (label, value) => {
        return {
            label: i18nContext.formatLabel(label, value),
            type: 'SINGLE_VALUE',
            display: formatDate(i18nContext)(value?.value),
        };
    };
