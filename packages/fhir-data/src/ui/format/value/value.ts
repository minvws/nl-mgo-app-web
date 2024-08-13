import { type Nullable } from '../../../types/Nullable';
import { isNullish } from '../../../utils';
import { numberToString } from '../../helpers';

export function valueWithUnit(value: Nullable<number>, unit: Nullable<string>) {
    if (isNullish(value)) return null;
    const valueString = numberToString(value);
    if (isNullish(unit)) return valueString;

    return `${valueString} ${unit}`;
}

export function valueWithMaxValue(value: Nullable<number>, maxValue: Nullable<number>) {
    if (isNullish(value)) return null;
    const valueString = numberToString(value);
    if (isNullish(maxValue)) return valueString;

    return `${valueString} / ${numberToString(maxValue)}`;
}
