import { type MessagesIds } from '../../../i18n/messages';
import { type MgoDuration } from '../../../parse/type';
import { format } from '../../format';
import { type SingleValue, type UiFunction, type WithUiContext } from '../../types';

const codeLabels: Record<string, MessagesIds> = {
    'http://unitsofmeasure.org|d': 'fhir.duration_days', // NOSONAR
};

export const duration: WithUiContext<UiFunction<MgoDuration, SingleValue>> =
    ({ formatMessage }) =>
    (label, value, options) => {
        const { value: quantityValue, unit, system, code } = value ?? {};

        const codeLabel = codeLabels[`${system}|${code}`];
        const display = codeLabel
            ? formatMessage(codeLabel, { count: quantityValue as number })
            : format.valueWithUnit(quantityValue, unit);

        return {
            label: formatMessage(label),
            type: `SINGLE_VALUE`,
            display,
            ...options,
        };
    };
