import { type Timing } from '../../fhir';
import { deepReplaceUndefined } from '../../parse/helpers';
import { parse, type MgoParsedType } from '../../parse/type';
import { type Nullable } from '../../types/Nullable';
import { map } from '../../utils';
import { uiSchemaGroup } from './uiSchemaGroup';

/**
 * @name HCIM AdministrationSchedule
 * @usage zibInstructionsForUse.timing
 * @see https://simplifier.net/packages/nictiz.fhir.nl.stu3.zib2017/2.2.18/files/2317128
 */
export function zibAdministrationSchedule(value: Nullable<Timing>) {
    const { repeat } = value || {};

    return deepReplaceUndefined({
        duration: repeat?.duration,
        durationUnit: parse.code(repeat?.durationUnit),
        frequency: repeat?.frequency,
        frequencyMax: repeat?.frequencyMax,
        period: repeat?.period,
        periodUnit: parse.code(repeat?.periodUnit),
        dayOfWeek: map(repeat?.dayOfWeek, parse.code),
        timeOfDay: map(repeat?.timeOfDay, parse.dateTime),
        when: map(repeat?.when, parse.code),
    });
}

export type ZibAdministrationSchedule = MgoParsedType<typeof zibAdministrationSchedule>;

export const zibAdministrationScheduleUiSchema = uiSchemaGroup;
