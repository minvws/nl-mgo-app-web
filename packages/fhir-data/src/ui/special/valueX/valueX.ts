import { type ParserKey } from '../../../parse/helpers/valueX/valueX';
import { type Lossless } from '../../../types/Lossless';
import { type Nullable } from '../../../types/Nullable';
import { capitalizeFirstLetter, isNullish } from '../../../utils';
import { isNonNullish } from '../../../utils/isNonNullish/isNonNullish';
import { codeableConcept } from '../../type/codeableConcept/codeableConcept';
import { annotation } from '../../type/annotation/annotation';
import { boolean } from '../../type/boolean/boolean';
import { code } from '../../type/code/code';
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
    quantity,
    codeableConcept,
    string,
    boolean,
    range,
    dateTime,
    period,
    annotation,
    code,
    coding,
    date,
    duration,
    identifier,
    ratio,
    reference,
    decimal,
    integer,
    integer64,
    unsignedInt,
    positiveInt,
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
        const key = `${prefix}${capitalizeFirstLetter(valueType)}` as keyof Nullable<Lossless<T>>;
        if (key in value && isNonNullish(value[key])) {
            const uiValue = valueTypeMap[valueType as ParserKey](label, value[key], options);
            return Array.isArray(uiValue) ? uiValue : [uiValue];
        }
    }

    return [];
}
