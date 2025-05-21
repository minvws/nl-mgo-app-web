import { isNullish, type LosslessNumber, type Nullable } from '@minvws/mgo-mgo-utils';
import { numberToString } from '../../helpers';

export function valueWithUnit(value: Nullable<LosslessNumber | number>, unit: Nullable<string>) {
    if (isNullish(value)) return;
    const valueString = numberToString(value);
    if (isNullish(unit)) return valueString;

    return `${valueString} ${unit}`;
}

export function valueWithMaxValue(
    value: Nullable<LosslessNumber | number>,
    maxValue: Nullable<LosslessNumber | number>
) {
    if (isNullish(value)) return;
    const valueString = numberToString(value);
    if (isNullish(maxValue)) return valueString;

    return `${valueString} / ${numberToString(maxValue)}`;
}
