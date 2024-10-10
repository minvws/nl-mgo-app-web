import { type MgoCoding } from '../../../parse/type';
import { format } from '../../format';
import { type SingleValue, type UiFunction } from '../../types';

export const coding: UiFunction<MgoCoding, SingleValue> = (label, value, options) => {
    const { display, code, system } = value ?? {};

    let displayString = display ?? '';
    const codeString = format.codeWithSystem(code, system);
    if (codeString) displayString += ` (${codeString})`;

    return {
        label,
        type: 'coding',
        display: displayString === '' ? undefined : displayString,
        ...options,
    };
};

export const codingWithoutSystem: UiFunction<MgoCoding, SingleValue> = (label, value, options) => {
    const { display } = value ?? {};

    const displayString = display ?? '';

    return {
        label,
        type: 'coding',
        display: displayString === '' ? undefined : displayString,
        ...options,
    };
};
