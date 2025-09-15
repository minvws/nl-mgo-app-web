import { type Timing } from '@minvws/mgo-fhir';
import { map } from '@minvws/mgo-utils';
import { createTypeParser } from '../../helpers/index.js';
import { type ValueType } from '../../types.js';
import { codeableConcept, type MgoCodeableConcept } from '../codeableConcept/codeableConcept.js';
import { dateTime, type MgoDateTime } from '../dateTime/dateTime.js';
import { decimal, type MgoDecimal } from '../decimal/decimal.js';
import { duration, type MgoDuration } from '../duration/duration.js';
import { integer, type MgoInteger } from '../integer/integer.js';
import { type MgoPeriod, period } from '../period/period.js';
import { type MgoRange, range } from '../range/range.js';
import { type MgoString, string } from '../string/string.js';
import { type MgoUnsignedInt, unsignedInt } from '../unsignedInt/unsignedInt.js';

export interface MgoTiming extends ValueType<'timing'> {
    code: MgoCodeableConcept | undefined;
    event: MgoDateTime[] | undefined;
    repeat: MgoTimingRepeat;
}

export interface MgoTimingRepeat {
    boundsDuration?: MgoDuration | undefined;
    boundsRange?: MgoRange | undefined;
    boundsPeriod?: MgoPeriod | undefined;
    count: MgoInteger | undefined;
    countMax: MgoInteger | undefined;
    duration: MgoDecimal | undefined;
    durationMax: MgoDecimal | undefined;
    durationUnit: MgoString | undefined;
    frequency: MgoInteger | undefined;
    frequencyMax: MgoInteger | undefined;
    period: MgoDecimal | undefined;
    periodMax: MgoDecimal | undefined;
    periodUnit: MgoString | undefined;
    dayOfWeek: MgoString[] | undefined;
    timeOfDay: MgoString[] | undefined;
    when: MgoString[] | undefined;
    offset: MgoUnsignedInt | undefined;
}

/**
 * @see: https://simplifier.net/packages/hl7.fhir.r3.core/3.0.2/files/61268
 */
export const timing = createTypeParser<Timing, MgoTiming>((value) => {
    const { code, event, repeat } = value;
    const { boundsDuration, boundsRange, boundsPeriod } = value.repeat ?? {};

    return {
        _type: 'timing',
        code: codeableConcept(code),
        event: map(event, dateTime),
        repeat: {
            ...(boundsDuration && { boundsDuration: duration(boundsDuration) }),
            ...(boundsRange && { boundsRange: range(boundsRange) }),
            ...(boundsPeriod && { boundsPeriod: period(boundsPeriod) }),
            count: integer(repeat?.count),
            countMax: integer(repeat?.countMax),
            duration: decimal(repeat?.duration),
            durationMax: decimal(repeat?.durationMax),
            durationUnit: string(repeat?.durationUnit),
            frequency: integer(repeat?.frequency),
            frequencyMax: integer(repeat?.frequencyMax),
            period: decimal(repeat?.period),
            periodMax: decimal(repeat?.periodMax),
            periodUnit: string(repeat?.periodUnit),
            dayOfWeek: map(repeat?.dayOfWeek, string),
            timeOfDay: map(repeat?.timeOfDay, string),
            when: map(repeat?.when, string),
            offset: unsignedInt(repeat?.offset),
        },
    };
});
