import { type UiContext } from '../context/index.js';
import { type HealthUiGroup, type UiElement, type UiFunction } from '../types/index.js';
import { annotation } from './annotation/annotation.js';
import { boolean } from './boolean/boolean.js';
import { code } from './code/code.js';
import { codeableConcept } from './codeableConcept/codeableConcept.js';
import { coding } from './coding/coding.js';
import { date } from './date/date.js';
import { dateTime } from './dateTime/dateTime.js';
import { decimal } from './decimal/decimal.js';
import { duration } from './duration/duration.js';
import { identifier } from './identifier/identifier.js';
import { instant } from './instant/instant.js';
import { integer } from './integer/integer.js';
import { integer64 } from './integer64/integer64.js';
import { period } from './period/period.js';
import { positiveInt } from './positiveInt/positiveInt.js';
import { quantity } from './quantity/quantity.js';
import { range } from './range/range.js';
import { ratio } from './ratio/ratio.js';
import { reference } from './reference/reference.js';
import { sampledData } from './sampledData/sampledData.js';
import { simpleQuantity } from './simpleQuantity/simpleQuantity.js';
import { string } from './string/string.js';
import { time } from './time/time.js';
import { timing } from './timing/timing.js';
import { unsignedInt } from './unsignedInt/unsignedInt.js';

export function getTypes(context: UiContext) {
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
