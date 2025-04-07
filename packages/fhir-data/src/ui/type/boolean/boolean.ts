import { type MgoBoolean } from '../../../parse/type';
import { isNonNullish } from '../../../utils/isNonNullish/isNonNullish';
import { type SingleValue, type UiFunction, type WithUiHelperContext } from '../../types';

export const boolean: WithUiHelperContext<UiFunction<MgoBoolean, SingleValue>> =
    ({ formatLabel, formatMessage }) =>
    (label, value) => {
        const truthyString = value?.value
            ? formatMessage('fhir.boolean.true')
            : formatMessage('fhir.boolean.false');

        return {
            label: formatLabel(label, value),
            type: 'SINGLE_VALUE',
            display: isNonNullish(value?.value) ? truthyString : undefined,
        };
    };
