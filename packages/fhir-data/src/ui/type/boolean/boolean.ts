import { type MgoBoolean } from '../../../parse/type';
import { type SingleValue, type UiFunction, type WithUiContext } from '../../types';

export const boolean: WithUiContext<UiFunction<MgoBoolean, SingleValue>> =
    ({ formatMessage }) =>
    (label, value, options) => {
        return {
            label: formatMessage(label),
            type: 'SINGLE_VALUE',
            display: value
                ? formatMessage('fhir.boolean.true')
                : formatMessage('fhir.boolean.false'),
            ...options,
        };
    };
