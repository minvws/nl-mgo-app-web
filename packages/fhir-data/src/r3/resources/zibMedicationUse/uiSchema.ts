import { uiSchemaGroup as zibInstructionsForUseUiSchema } from '../../elements/zibInstructionsForUse/uiSchemaGroup';
import { ui, type UiSchema } from '../../../ui';
import { map } from '../../../utils';
import { type ZibMedicationUse } from './zibMedicationUse';

/**
 * @see: https://simplifier.net/packages/nictiz.fhir.nl.stu3.zib2017/2.2.18/files/2317343
 */
export function uiSchema(resource: ZibMedicationUse): UiSchema {
    const i18n = 'zib_medication_use';
    const instructionsForUse = map(resource.dosage, zibInstructionsForUseUiSchema, true);

    return {
        label: resource.medication?.display,
        children: [
            {
                label: `${i18n}.group_general_information`,
                children: [
                    ui.dateTime(`${i18n}.date_asserted`, resource.dateAsserted, { summary: true }),
                    ui.reference(`${i18n}.prescriber`, resource.prescriber, { summary: true }),
                    ui.code(`${i18n}.status`, resource.status, { summary: true }),
                    ui.codeableConcept(
                        `${i18n}.reason_for_change_or_discontinuation_of_use`,
                        resource.reasonForChangeOrDiscontinuationOfUse
                    ),
                    ui.codeableConcept(`${i18n}.category`, resource.category, { summary: true }),
                    ...ui.duration(
                        `${i18n}.repeat_period_cyclical_schedule`,
                        resource.repeatPeriodCyclicalSchedule
                    ),
                    ui.boolean(`${i18n}.as_agreed_indicator`, resource.asAgreedIndicator, {
                        summary: true,
                    }),
                ],
            },
            {
                label: `${i18n}.group_effective_period`,
                children: [
                    ...ui.period(`${i18n}.effective_period`, resource.effectivePeriod),
                    ...ui.duration(`${i18n}.effective_duration`, resource.effectiveDuration),
                ],
            },
            {
                label: `${i18n}.group_medication`,
                children: [
                    ui.multipleValues(`${i18n}.identifier`, resource.identifier, ui.identifier),
                    ui.reference(`${i18n}.medication`, resource.medication),
                    ui.identifier(`${i18n}.medication_treatment`, resource.medicationTreatment),
                ],
            },
            {
                label: `${i18n}.group_other`,
                children: [
                    ui.reference(`${i18n}.information_source`, resource.informationSource),
                    ui.reference(`${i18n}.subject`, resource.subject),
                    ui.code(`${i18n}.taken`, resource.taken),
                    ui.multipleValues(
                        `${i18n}.reason_code`,
                        resource.reasonCode,
                        ui.codeableConcept
                    ),
                    ui.multipleValues(`${i18n}.note`, resource.note, ui.annotation),
                ],
            },
            ...instructionsForUse,
        ],
    };
}
