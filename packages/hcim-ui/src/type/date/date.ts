import { type MgoDate } from '@minvws/mgo-hcim-parse';
import { date as formatDate } from '../../format/date/date';
import { type SingleValue, type UiFunction, type WithUiContext } from '../../types';

export const date: WithUiContext<UiFunction<MgoDate, SingleValue>> =
    (i18nContext) =>
    (label, value, options = {}) => {
        return {
            label: i18nContext.formatLabel(label, value, options.defaultLabel),
            type: 'SINGLE_VALUE',
            display: formatDate(i18nContext)(value?.value),
        };
    };
