import { type Lossless } from '../../../types/Lossless';
import { type Nullable } from '../../../types/Nullable';
import { isNonNullish } from '../../../utils/isNonNullish/isNonNullish';
import {
    type MultipleGroupedValues,
    type MultipleValues,
    type SingleValue,
    type UiFunction,
    type UiEntryOptions,
    type ReferenceValue,
} from '../../types';

export function multipleValues<T>(
    label: string,
    value: Nullable<Lossless<T>[]>,
    parse: UiFunction<T, SingleValue | ReferenceValue>,
    options?: UiEntryOptions
): MultipleValues;
export function multipleValues<T>(
    label: string,
    value: Nullable<Lossless<T>[]>,
    parse: UiFunction<T, MultipleValues>,
    options?: UiEntryOptions
): MultipleGroupedValues;
export function multipleValues<T>(
    label: string,
    value: Nullable<Lossless<T>[]>,
    parse: UiFunction<T, SingleValue | ReferenceValue | MultipleValues>,
    options?: UiEntryOptions
) {
    let display = undefined;

    if (isNonNullish(value)) {
        const entries = value.map((x) => parse('', x));
        display = entries.map((x) => x.display).filter(isNonNullish);
    }

    return {
        label,
        type: Array.isArray(display?.[0]) ? 'MULTIPLE_GROUPED_VALUES' : 'MULTIPLE_VALUES',
        display,
        ...options,
    };
}
