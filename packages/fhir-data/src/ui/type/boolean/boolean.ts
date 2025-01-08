import { type MgoBoolean } from '../../../parse/type';
import { type SingleValue, type UiFunction, type WithUiHelperContext } from '../../types';
import { isNonNullish } from '../../../utils/isNonNullish/isNonNullish';

export const boolean: WithUiHelperContext<UiFunction<MgoBoolean, SingleValue>> =
    ({ formatMessage }) =>
    (label, value) => {
        const truthyString = value
            ? formatMessage('fhir.boolean.true')
            : formatMessage('fhir.boolean.false');

        return {
            label: formatMessage(label),
            type: 'SINGLE_VALUE',
            display: isNonNullish(value) ? truthyString : undefined,
        };
    };
