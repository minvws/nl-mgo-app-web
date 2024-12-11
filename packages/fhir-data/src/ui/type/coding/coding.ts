import { type MgoCoding } from '../../../parse/type';
import { type Nullable } from '../../../types/Nullable';
import { isNonNullish } from '../../../utils';
import { format } from '../../format';
import {
    type MultipleValues,
    type SingleValue,
    type UiFunction,
    type WithUiContext,
} from '../../types';

export const codingDisplay = (value: Nullable<MgoCoding>) => {
    const { display, code, system } = value ?? {};

    let displayString = display ?? '';
    const codeString = format.codeWithSystem(code, system);
    if (codeString) displayString += ` (${codeString})`;

    return displayString === '' ? undefined : displayString;
};

export const coding: WithUiContext<
    UiFunction<MgoCoding | MgoCoding[], SingleValue | MultipleValues>
> =
    ({ intl }) =>
    (label, value, options) => {
        if (Array.isArray(value)) {
            return {
                label: intl.formatMessage({ id: label }),
                type: 'MULTIPLE_VALUES',
                display: value.map(codingDisplay).filter(isNonNullish),
                ...options,
            };
        }
        return {
            label: intl.formatMessage({ id: label }),
            type: 'SINGLE_VALUE',
            display: codingDisplay(value),
            ...options,
        };
    };
