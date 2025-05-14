import { type FhirMessagesIds } from '@minvws/mgo-mgo-intl';
import { type MgoTiming } from '../../../parse/type';
import { type HealthUiGroup, type UiFunction, type WithUiHelperContext } from '../../types';
import { codeableConcept } from '../codeableConcept/codeableConcept';
import { dateTime } from '../dateTime/dateTime';
import { decimal } from '../decimal/decimal';
import { integer } from '../integer/integer';
import { string } from '../string/string';
import { unsignedInt } from '../unsignedInt/unsignedInt';

export const timing: WithUiHelperContext<UiFunction<MgoTiming, HealthUiGroup>> =
    (context) => (label, value) => {
        const { formatLabel } = context;

        const uiCodeableConcept = codeableConcept(context);
        const uiDateTime = dateTime(context);
        const uiDecimal = decimal(context);
        const uiInteger = integer(context);
        const uiString = string(context);
        const uiUnsignedInt = unsignedInt(context);

        return {
            label: formatLabel(label, null, 'fhir.timing'),
            children: [
                uiCodeableConcept(`${label}.code` as FhirMessagesIds, value?.code, {
                    defaultLabel: 'fhir.timing.code',
                }),
                uiDateTime(`${label}.event` as FhirMessagesIds, value?.event, {
                    defaultLabel: 'fhir.timing.event',
                }),
                uiDecimal(`${label}.repeat.duration` as FhirMessagesIds, value?.repeat?.duration, {
                    defaultLabel: 'fhir.timing.repeat.duration',
                }),
                uiInteger(`${label}.repeat.count` as FhirMessagesIds, value?.repeat?.count, {
                    defaultLabel: 'fhir.timing.repeat.count',
                }),
                uiInteger(
                    `${label}.repeat.frequency` as FhirMessagesIds,
                    value?.repeat?.frequency,
                    {
                        defaultLabel: 'fhir.timing.repeat.frequency',
                    }
                ),
                uiDecimal(`${label}.repeat.period` as FhirMessagesIds, value?.repeat?.period, {
                    defaultLabel: 'fhir.timing.repeat.period',
                }),
                uiInteger(`${label}.repeat.countMax` as FhirMessagesIds, value?.repeat?.countMax, {
                    defaultLabel: 'fhir.timing.repeat.count_max',
                }),
                uiInteger(
                    `${label}.repeat.frequency_max` as FhirMessagesIds,
                    value?.repeat?.frequencyMax,
                    {
                        defaultLabel: 'fhir.timing.repeat.frequency_max',
                    }
                ),
                uiDecimal(
                    `${label}.repeat.period_max` as FhirMessagesIds,
                    value?.repeat?.periodMax,
                    {
                        defaultLabel: 'fhir.timing.repeat.period_max',
                    }
                ),
                uiString(
                    `${label}.repeat.duration_unit` as FhirMessagesIds,
                    value?.repeat?.durationUnit,
                    {
                        defaultLabel: 'fhir.timing.repeat.duration_unit',
                    }
                ),
                uiString(
                    `${label}.repeat.period_unit` as FhirMessagesIds,
                    value?.repeat?.periodUnit,
                    {
                        defaultLabel: 'fhir.timing.repeat.period_unit',
                    }
                ),
                uiString(
                    `${label}.repeat.day_of_week` as FhirMessagesIds,
                    value?.repeat?.dayOfWeek,
                    {
                        defaultLabel: 'fhir.timing.repeat.day_of_week',
                    }
                ),
                uiString(
                    `${label}.repeat.time_of_day` as FhirMessagesIds,
                    value?.repeat?.timeOfDay,
                    {
                        defaultLabel: 'fhir.timing.repeat.time_of_day',
                    }
                ),
                uiString(`${label}.repeat.when` as FhirMessagesIds, value?.repeat?.when, {
                    defaultLabel: 'fhir.timing.repeat.when',
                }),
                uiUnsignedInt(`${label}.repeat.offset` as FhirMessagesIds, value?.repeat?.offset, {
                    defaultLabel: 'fhir.timing.repeat.offset',
                }),
            ],
        };
    };
