import { type HealthUiGroupFunction } from '../../../ui/types';
import { type ZibAdministrationSchedule } from './zibAdministrationSchedule';

export const uiSchemaGroup: HealthUiGroupFunction<ZibAdministrationSchedule> = (
    resource,
    { ui, formatMessage }
) => {
    const i18n = 'r3.zib_administration_schedule';
    const { repeat } = resource;

    /**
     * @see: https://simplifier.net/packages/nictiz.fhir.nl.stu3.zib2017/2.2.18/files/2317128/~mappings
     */
    const hcimInstructionsForUse = {
        DoseDuration: ui.oneOfValueX(`${i18n}.repeat.bounds`, repeat, 'bounds'),
        DurationOfAdministration: ui.valueWithUnit(
            `${i18n}.repeat.duration`,
            repeat?.duration,
            repeat?.durationUnit
        ),
        Frequency: ui.integer(`${i18n}.repeat.frequency`, repeat?.frequency),
        FrequencyMax: ui.integer(`${i18n}.repeat.frequency_max`, repeat?.frequencyMax),
        FrequencyOrInterval: ui.valueWithUnit(
            `${i18n}.repeat.period`,
            repeat?.period,
            repeat?.periodUnit
        ),
        WeekDay: ui.code(`${i18n}.repeat.day_of_week`, repeat?.dayOfWeek),
        AdministrationTime: ui.dateTime(`${i18n}.repeat.time_of_day`, repeat?.timeOfDay),
        TimeOfDay: ui.code(`${i18n}.repeat.when`, repeat?.when),
    };

    return {
        label: formatMessage(i18n),
        children: [
            ...hcimInstructionsForUse.DoseDuration,
            hcimInstructionsForUse.DurationOfAdministration,
            hcimInstructionsForUse.Frequency,
            hcimInstructionsForUse.FrequencyMax,
            hcimInstructionsForUse.FrequencyOrInterval,
            hcimInstructionsForUse.WeekDay,
            hcimInstructionsForUse.AdministrationTime,
            hcimInstructionsForUse.TimeOfDay,
        ],
    };
};
