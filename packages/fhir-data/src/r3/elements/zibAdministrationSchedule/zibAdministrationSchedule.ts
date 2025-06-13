import { type Nullable } from '@minvws/mgo-utils';
import { type Timing } from 'fhir/r3';
import { parse } from '../../../parse';
import { oneOfValueX } from '../../../parse/helpers/oneOfValueX/oneOfValueX';
import { type MgoElementMeta, type ResourceElementConfig } from '../../../resourceTypes';
import { map } from '../../../utils';
import { uiSchemaGroup } from './uiSchemaGroup';

const profile = 'http://nictiz.nl/fhir/StructureDefinition/zib-AdministrationSchedule'; // NOSONAR

export interface ZibAdministrationSchedule extends MgoElementMeta<typeof profile> {
    repeat: {
        boundsDuration?: parse.MgoDuration;
        boundsPeriod?: parse.MgoPeriod;
        boundsRange?: parse.MgoRange;
        duration: parse.MgoDecimal | undefined;
        durationUnit: parse.MgoCode | undefined;
        frequency: parse.MgoInteger | undefined;
        frequencyMax: parse.MgoInteger | undefined;
        period: parse.MgoDecimal | undefined;
        periodUnit: parse.MgoCode | undefined;
        dayOfWeek: parse.MgoCode[] | undefined;
        timeOfDay: parse.MgoDateTime[] | undefined;
        when: parse.MgoCode[] | undefined;
    };
}

/**
 * @name HCIM AdministrationSchedule
 * @usage zibInstructionsForUse.timing
 * @see https://simplifier.net/packages/nictiz.fhir.nl.stu3.zib2017/2.2.18/files/2317128
 */
function parseZibAdministrationSchedule(value: Nullable<Timing>): ZibAdministrationSchedule {
    const { repeat } = value ?? {};

    return {
        _profile: profile,
        repeat: {
            // HCIM InstructionsForUse-v1.1(2017EN)
            ...oneOfValueX(repeat, ['duration', 'range', 'period'], 'bounds'),
            duration: parse.decimal(repeat?.duration),
            durationUnit: parse.code(repeat?.durationUnit),
            frequency: parse.integer(repeat?.frequency),
            frequencyMax: parse.integer(repeat?.frequencyMax),
            period: parse.decimal(repeat?.period),
            periodUnit: parse.code(repeat?.periodUnit),
            dayOfWeek: map(repeat?.dayOfWeek, parse.code),
            timeOfDay: map(repeat?.timeOfDay, parse.dateTime),
            when: map(repeat?.when, parse.code),
        },
    };
}

export const zibAdministrationScheduleUiSchema = uiSchemaGroup;

export const zibAdministrationSchedule = {
    parse: parseZibAdministrationSchedule,
    uiSchemaGroup,
} satisfies ResourceElementConfig<Timing, ZibAdministrationSchedule>;
