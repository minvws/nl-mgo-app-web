import { uiSchemaGroup as zibInstructionsForUseUiSchema } from '../../elements/zibInstructionsForUse/uiSchemaGroup';
import { ui, type UiSchema } from '../../../ui';
import { map } from '../../../utils';
import { type ZibMedicationUse } from './zibMedicationUse';

/**
 * @see: https://simplifier.net/packages/nictiz.fhir.nl.stu3.zib2017/2.2.18/files/2317343
 */
export function uiSchema(resource: ZibMedicationUse): UiSchema {
    const i18n = 'zib_medication_use';

    /**
     * https://simplifier.net/packages/nictiz.fhir.nl.stu3.zib2017/2.2.18/files/2317279/~mappings
     */
    const hcimMedicationUse2 = {
        AsAgreedIndicator: ui.boolean(`${i18n}.as_agreed_indicator`, resource.asAgreedIndicator),
        Prescriber: ui.reference(`${i18n}.prescriber`, resource.prescriber),
        ReasonForChangeOrDiscontinuationOfUse: ui.codeableConcept(
            `${i18n}.reason_for_change_or_discontinuation_of_use`,
            resource.reasonForChangeOrDiscontinuationOfUse
        ),
        MedicationUseStopType: ui.code(`${i18n}.status`, resource.status),
        ProductUsed: ui.reference(`${i18n}.medication`, resource.medicationReference),
        PeriodOfUsePeriod: ui.period(`${i18n}.effective_period`, resource.effectivePeriod),
        PeriodOfUseDuration: ui.duration(`${i18n}.effective_duration`, resource.effectiveDuration),
        MedicationUseDateTime: ui.dateTime(`${i18n}.date_asserted`, resource.dateAsserted),
        UseIndicator: ui.code(`${i18n}.taken`, resource.taken),
        ReasonForUse: ui.multipleValues(
            `${i18n}.reason_code`,
            resource.reasonCode,
            ui.codeableConcept
        ),
        Comment: ui.multipleValues(`${i18n}.note`, resource.note, ui.annotation),
    };

    const hcimInstructionsForUse = {
        InstructionsForUse: map(resource.dosage, zibInstructionsForUseUiSchema, true),
        RepeatPeriodCyclicalSchedule: ui.duration(
            `${i18n}.repeat_period_cyclical_schedule`,
            resource.repeatPeriodCyclicalSchedule
        ),
    };

    return {
        label: resource.medicationReference?.display,
        children: [
            {
                label: `${i18n}.group_general_information`,
                children: [
                    hcimMedicationUse2.MedicationUseDateTime,
                    ...hcimMedicationUse2.PeriodOfUsePeriod,
                    ...hcimMedicationUse2.PeriodOfUseDuration,
                    hcimMedicationUse2.Prescriber,
                    hcimMedicationUse2.ReasonForUse,
                    hcimMedicationUse2.AsAgreedIndicator,
                    hcimMedicationUse2.UseIndicator,
                    hcimMedicationUse2.Comment,

                    hcimMedicationUse2.ProductUsed,
                    hcimMedicationUse2.MedicationUseStopType,
                    hcimMedicationUse2.ReasonForChangeOrDiscontinuationOfUse,
                    ...hcimInstructionsForUse.RepeatPeriodCyclicalSchedule,

                    ui.codeableConcept(`${i18n}.category`, resource.category),
                    ui.identifier(`${i18n}.medication_treatment`, resource.medicationTreatment),
                ],
            },
            ...hcimInstructionsForUse.InstructionsForUse,
        ],
    };
}
