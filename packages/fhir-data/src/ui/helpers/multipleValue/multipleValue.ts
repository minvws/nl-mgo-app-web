import { type Nullable } from '../../../types/Nullable';
import { isNonNullish } from '../../../utils/isNonNullish/isNonNullish';
import {
    type MultipleGroupValue,
    type MultipleValue,
    type SingleValue,
    type ValueOptions,
} from '../../types';

type UiFunction<T> = (
    label: string,
    arg: Nullable<T>,
    options?: ValueOptions
) => SingleValue | MultipleValue | MultipleGroupValue;

export function multipleValue<T, P extends UiFunction<T>>(
    label: string,
    value: Nullable<T[]>,
    parse: P,
    options?: ValueOptions
) {
    const { type } = parse('', null);
    let display = null;

    if (isNonNullish(value)) {
        const values = value.map((x) => parse('', x));
        display = (values.map((x) => x.display) as ReturnType<P>['display'][]).filter(isNonNullish);
    }

    return {
        label,
        type,
        display,
        ...options,
    };
}
