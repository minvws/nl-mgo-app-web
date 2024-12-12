import { type MgoCoding } from '../../../parse/type';
import { isNonNullish } from '../../../utils';
import {
    type FormatDisplayFunction,
    type MultipleValues,
    type SingleValue,
    type UiFunction,
    type WithUiContext,
} from '../../types';

export const codingDisplay: WithUiContext<FormatDisplayFunction<MgoCoding, string | undefined>> =
    ({ hasMessage, formatMessage }) =>
    (value) => {
        const { display, code, system } = value ?? {};

        let displayString: string = display ?? '';
        if (code) {
            const systemI18n = `system.${system}`;
            const systemString = hasMessage(systemI18n) ? formatMessage(systemI18n) : system;
            const codeInSystemString = formatMessage('format.code_in_system', {
                code,
                system: systemString,
            });
            displayString = `${displayString} (${system ? codeInSystemString : code})`.trim();
        }

        return displayString === '' ? undefined : displayString;
    };

export const coding: WithUiContext<
    UiFunction<MgoCoding | MgoCoding[], SingleValue | MultipleValues>
> = (context) => (label, value, options) => {
    const { formatMessage } = context;
    const display = codingDisplay(context);

    if (Array.isArray(value)) {
        return {
            label: formatMessage(label),
            type: 'MULTIPLE_VALUES',
            display: value.map(display).filter(isNonNullish),
            ...options,
        };
    }
    return {
        label: formatMessage(label),
        type: 'SINGLE_VALUE',
        display: display(value),
        ...options,
    };
};
