import { ui, dropEmptyEntries, type UiSchemaGroup } from '../../../ui';
import { type ZibAdministrationSchedule } from './zibAdministrationSchedule';

export function uiSchemaGroup(resource: ZibAdministrationSchedule): UiSchemaGroup {
    const i18n = 'zib_administration_schedule';

    /**
     * @see: https://simplifier.net/packages/nictiz.fhir.nl.stu3.zib2017/2.2.18/files/2317128/~mappings
     */
    const hcimInstructionsForUse = {
        DoseDuration: ui.oneOfValueX(`${i18n}.bounds`, resource, 'bounds'),
        DurationOfAdministration: ui.valueWithUnit(
            `${i18n}.duration`,
            resource?.duration,
            resource?.durationUnit
        ),
        Frequency: ui.valueWithMax(
            `${i18n}.frequency`,
            resource?.frequency,
            resource?.frequencyMax
        ),
        FrequencyOrInterval: ui.valueWithUnit(
            `${i18n}.period`,
            resource?.period,
            resource?.periodUnit
        ),
        WeekDay: ui.multipleValues(`${i18n}.day_of_week`, resource?.dayOfWeek, ui.string),
        AdministrationTime: ui.multipleValues(
            `${i18n}.time_of_day`,
            resource?.timeOfDay,
            ui.dateTime
        ),
        TimeOfDay: ui.multipleValues(`${i18n}.when`, resource?.when, ui.string),
    };

    return dropEmptyEntries({
        label: i18n,
        children: [
            ...hcimInstructionsForUse.DoseDuration,
            hcimInstructionsForUse.DurationOfAdministration,
            hcimInstructionsForUse.Frequency,
            hcimInstructionsForUse.FrequencyOrInterval,
            hcimInstructionsForUse.WeekDay,
            hcimInstructionsForUse.AdministrationTime,
            hcimInstructionsForUse.TimeOfDay,
        ],
    });
}
