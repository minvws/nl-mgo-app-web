import { capitalize } from 'lodash';
import { type ParserKey } from '../../../parse/helpers/valueX/valueX';
import { type Lossless } from '../../../types/Lossless';
import { type Nullable } from '../../../types/Nullable';
import { isNullish } from '../../../utils';
import { annotation } from '../../type/annotation/annotation';
import { boolean } from '../../type/boolean/boolean';
import { code } from '../../type/code/code';
import { codeableConcept } from '../../type/codeableConcept/codeableConcept';
import { coding } from '../../type/coding/coding';
import { date } from '../../type/date/date';
import { dateTime } from '../../type/dateTime/dateTime';
import { decimal } from '../../type/decimal/decimal';
import { duration } from '../../type/duration/duration';
import { identifier } from '../../type/identifier/identifier';
import { integer } from '../../type/integer/integer';
import { integer64 } from '../../type/integer64/integer64';
import { period } from '../../type/period/period';
import { positiveInt } from '../../type/positiveInt/positiveInt';
import { quantity } from '../../type/quantity/quantity';
import { range } from '../../type/range/range';
import { ratio } from '../../type/ratio/ratio';
import { reference } from '../../type/reference/reference';
import { string } from '../../type/string/string';
import { unsignedInt } from '../../type/unsignedInt/unsignedInt';
import { type UiEntry, type UiEntryOptions, type UiFunction } from '../../types';

const valueTypeMap = {
    quantity: quantity,
    codeableConcept: codeableConcept,
    string: string,
    boolean: boolean,
    range: range,
    dateTime: dateTime,
    period: period,
    annotation: annotation,
    code: code,
    coding: coding,
    date: date,
    duration: duration,
    identifier: identifier,
    ratio: ratio,
    reference: reference,
    decimal: decimal,
    integer: integer,
    integer64: integer64,
    unsignedInt: unsignedInt,
    positiveInt: positiveInt,
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
} satisfies Record<ParserKey, UiFunction<any, UiEntry | UiEntry[]>>;

export function valueX<T extends object>(
    label: string,
    value: Nullable<Lossless<T>>,
    prefix: string = 'value',
    options?: UiEntryOptions
): UiEntry[] {
    if (isNullish(value)) {
        return [];
    }

    for (const valueType in valueTypeMap) {
        const key = `${prefix}${capitalize(valueType)}` as keyof Nullable<Lossless<T>>;

        if (key in value) {
            const uiValue = valueTypeMap[valueType as ParserKey](label, value[key], options);
            return Array.isArray(uiValue) ? uiValue : [uiValue];
        }
    }

    return [];
}
