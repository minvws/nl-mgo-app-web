import { type Lossless } from '../../../types/Lossless';
import { type Nullable } from '../../../types/Nullable';
import { isNullish } from '../../../utils';
import { numberToString } from '../../helpers';

export function valueWithUnit(value: Nullable<Lossless<number>>, unit: Nullable<string>) {
    if (isNullish(value)) return;
    const valueString = numberToString(value);
    if (isNullish(unit)) return valueString;

    return `${valueString} ${unit}`;
}

export function valueWithMaxValue(
    value: Nullable<Lossless<number>>,
    maxValue: Nullable<Lossless<number>>
) {
    if (isNullish(value)) return;
    const valueString = numberToString(value);
    if (isNullish(maxValue)) return valueString;

    return `${valueString} / ${numberToString(maxValue)}`;
}
