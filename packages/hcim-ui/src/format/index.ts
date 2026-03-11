import { type UiContext } from '../context/index.js';
import * as date from './date/date.js';
import * as value from './value/value.js';

export const format = {
    ...value,
    ...date,
};

export function createFormatHelpers(context: UiContext) {
    return {
        date: date.date(context),
        ...value,
    };
}

export type FormatHelpers = ReturnType<typeof createFormatHelpers>;
