import { isNonNullish } from '@minvws/mgo-utils';
import { type MgoBoolean } from '../../../parse/type';
import { type SingleValue, type UiFunction, type WithUiHelperContext } from '../../types';

export const boolean: WithUiHelperContext<UiFunction<MgoBoolean, SingleValue>> =
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
