import { type UiHelperContext } from '../context';
import { type HealthUiGroup, type UiElement, type UiFunction } from '../types';
import { annotation } from './annotation/annotation';
import { boolean } from './boolean/boolean';
import { code } from './code/code';
import { codeableConcept } from './codeableConcept/codeableConcept';
import { coding } from './coding/coding';
import { date } from './date/date';
import { dateTime } from './dateTime/dateTime';
import { decimal } from './decimal/decimal';
import { duration } from './duration/duration';
import { identifier } from './identifier/identifier';
import { instant } from './instant/instant';
import { integer } from './integer/integer';
import { integer64 } from './integer64/integer64';
import { period } from './period/period';
import { positiveInt } from './positiveInt/positiveInt';
import { quantity } from './quantity/quantity';
import { range } from './range/range';
import { ratio } from './ratio/ratio';
import { reference } from './reference/reference';
import { sampledData } from './sampledData/sampledData';
import { simpleQuantity } from './simpleQuantity/simpleQuantity';
import { string } from './string/string';
import { time } from './time/time';
import { timing } from './timing/timing';
import { unsignedInt } from './unsignedInt/unsignedInt';

export function getTypes(context: UiHelperContext) {
    return {
        annotation: annotation(context),
        boolean: boolean(context),
        code: code(context),
        codeableConcept: codeableConcept(context),
        coding: coding(context),
        date: date(context),
        dateTime: dateTime(context),
        instant: instant(context),
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
        time: time(context),
        simpleQuantity: simpleQuantity(context),
        sampledData: sampledData(context),
        timing: timing(context),
    } satisfies Record<string, UiFunction<any, UiElement | UiElement[] | HealthUiGroup, any, any>>; // eslint-disable-line @typescript-eslint/no-explicit-any
}
