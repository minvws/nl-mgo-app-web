import { type Lossless } from '../../../types/Lossless';
import { type Nullable } from '../../../types/Nullable';
import { isNonNullish } from '../../../utils/isNonNullish/isNonNullish';
import {
    type MultipleGroupValue,
    type MultipleValue,
    type SingleValue,
    type UiFunction,
    type ValueOptions,
} from '../../types';

export function multipleValue<T>(
    label: string,
    value: Nullable<Lossless<T>[]>,
    parse: UiFunction<T, SingleValue>,
    options?: ValueOptions
): MultipleValue;
export function multipleValue<T>(
    label: string,
    value: Nullable<Lossless<T>[]>,
    parse: UiFunction<T, MultipleValue>,
    options?: ValueOptions
): MultipleGroupValue;
export function multipleValue<T>(
    label: string,
    value: Nullable<Lossless<T>[]>,
    parse: UiFunction<T, SingleValue | MultipleValue>,
    options?: ValueOptions
) {
    const { type } = parse('', null);
    let display = undefined;

    if (isNonNullish(value)) {
        const entries = value.map((x) => parse('', x));
        display = entries.map((x) => x.display).filter(isNonNullish);
    }

    return {
        label,
        type,
        display,
        ...options,
    };
}
