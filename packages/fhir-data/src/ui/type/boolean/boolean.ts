import { type MgoBoolean } from '../../../parse/type';
import { type SingleValue, type UiFunction, type WithI18nContext } from '../../types';
import { isNonNullish } from '../../../utils/isNonNullish/isNonNullish';

export const boolean: WithI18nContext<UiFunction<MgoBoolean, SingleValue>> =
    ({ formatMessage }) =>
    (label, value, options) => {
        const truthyString = value
            ? formatMessage('fhir.boolean.true')
            : formatMessage('fhir.boolean.false');

        return {
            label: formatMessage(label),
            type: 'SINGLE_VALUE',
            display: isNonNullish(value) ? truthyString : undefined,
            ...options,
        };
    };
