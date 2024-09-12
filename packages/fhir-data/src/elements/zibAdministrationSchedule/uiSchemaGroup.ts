import { ui, type UiSchemaGroup } from '../../ui';
import { type ZibAdministrationSchedule } from './zibAdministrationSchedule';

export function uiSchemaGroup(resource: ZibAdministrationSchedule): UiSchemaGroup {
    const i18n = 'zib_administration_schedule';

    return {
        label: i18n,
        children: [
            ui.valueWithUnit(`${i18n}.duration`, resource?.duration, resource?.durationUnit),
            ui.valueWithMax(`${i18n}.frequency`, resource?.frequency, resource?.frequencyMax),
            ui.valueWithUnit(`${i18n}.period`, resource?.period, resource?.periodUnit),
            ui.multipleValue(`${i18n}.day_of_week`, resource?.dayOfWeek, ui.string),
            ui.multipleValue(`${i18n}.time_of_day`, resource?.timeOfDay, ui.dateTime),
            ui.multipleValue(`${i18n}.when`, resource?.when, ui.string),
        ],
    };
}
