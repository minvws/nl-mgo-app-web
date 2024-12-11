import { annotation } from './annotation/annotation';
import { boolean } from './boolean/boolean';
import { code } from './code/code';
import { codeableConcept } from './codeableConcept/codeableConcept';
import { coding } from './coding/coding';
import { date } from './date/date';
import { dateTime } from './dateTime/dateTime';
import { duration } from './duration/duration';
import { identifier } from './identifier/identifier';
import { period } from './period/period';
import { quantity } from './quantity/quantity';
import { range } from './range/range';
import { ratio } from './ratio/ratio';
import { reference } from './reference/reference';
import { string } from './string/string';
import { decimal } from './decimal/decimal';
import { integer } from './integer/integer';
import { integer64 } from './integer64/integer64';
import { unsignedInt } from './unsignedInt/unsignedInt';
import { positiveInt } from './positiveInt/positiveInt';
import { type UiHelperContext } from '../types';

export function getTypes(context: UiHelperContext) {
    return {
        annotation: annotation(context),
        boolean: boolean(context),
        code: code(context),
        codeableConcept: codeableConcept(context),
        coding: coding(context),
        date: date(context),
        dateTime: dateTime(context),
        duration: duration(context),
        identifier: identifier(context),
        period: period(context),
        quantity: quantity(context),
        range: range(context),
        ratio: ratio(context),
        reference: reference(context),
        string: string(context),
        decimal: decimal(context),
        integer: integer(context),
        integer64: integer64(context),
        unsignedInt: unsignedInt(context),
        positiveInt: positiveInt(context),
    };
}
