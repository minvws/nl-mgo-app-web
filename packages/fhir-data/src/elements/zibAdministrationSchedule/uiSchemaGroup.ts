import { format, ui, type UiSchemaGroup } from '../../ui';
import { multipleValue } from '../../ui/helpers';
import { type ZibAdministrationSchedule } from './zibAdministrationSchedule';

export function uiSchemaGroup(resource: ZibAdministrationSchedule): UiSchemaGroup {
    const i18n = 'zib_administration_schedule';
    return {
        label: `${i18n}.group`,
        children: [
            {
                label: `${i18n}.duration`,
                type: 'duration',
                display: format.valueWithUnit(resource?.duration, resource?.durationUnit),
            },
            {
                label: `${i18n}.frequency`,
                type: 'frequency',
                display: format.valueWithMaxValue(resource?.frequency, resource?.frequencyMax),
            },
            {
                label: `${i18n}.period`,
                type: 'period',
                display: format.valueWithUnit(resource?.period, resource?.periodUnit),
            },
            {
                label: `${i18n}.day_of_week`,
                type: 'day_of_week',
                display: resource?.dayOfWeek,
            },
            multipleValue(`${i18n}.time_of_day`, resource?.timeOfDay, ui.dateTime),
            {
                label: `${i18n}.when`,
                type: 'when',
                display: resource?.when,
            },
        ],
    };
}
