import { type MgoBoolean } from '@minvws/mgo-hcim-parse';
import { isNonNullish } from '@minvws/mgo-utils';
import { type SingleValue, type UiFunction, type WithUiContext } from '../../types/index.js';

export const boolean: WithUiContext<UiFunction<MgoBoolean, SingleValue>> =
    ({ formatLabel, formatMessage }) =>
    (label, value, options = {}) => {
        const truthyString = value?.value
            ? formatMessage('fhir.boolean.true')
            : formatMessage('fhir.boolean.false');

        return {
            label: formatLabel(label, value, options.defaultLabel),
            type: 'SINGLE_VALUE',
            display: isNonNullish(value?.value) ? truthyString : undefined,
        };
    };
