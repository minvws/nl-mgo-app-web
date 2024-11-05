import { uiSchemaGroup as zibInstructionsForUseUiSchema } from '../../elements/zibInstructionsForUse/uiSchemaGroup';
import { ui, type UiSchema } from '../../ui';
import { map } from '../../utils';
import { type ZibMedicationAgreement } from './zibMedicationAgreement';

/**
 * @see: https://simplifier.net/packages/nictiz.fhir.nl.stu3.zib2017/2.2.18/files/2317273
 */
export function uiSchema(resource: ZibMedicationAgreement): UiSchema {
    const i18n = 'zib_medication_agreement';
    const instructionsForUse = map(
        resource.dossageInstruction,
        zibInstructionsForUseUiSchema,
        true
    );

    return {
        label: resource.medicationReference?.display,
        children: [
            {
                label: `${i18n}.group_general_information`,
                children: [
                    ...ui.period(`${i18n}.period_of_use`, resource.periodOfUse),
                    ...ui.duration(`${i18n}.usage_duration`, resource.usageDuration),
                    ui.identifier(`${i18n}.medication_treatment`, resource.medicationTreatment),
                    ui.codeableConcept(`${i18n}.stop_type`, resource.stopType),
                    ...ui.duration(
                        `${i18n}.repeat_period_cyclical_schedule`,
                        resource.repeatPeriodCyclicalSchedule
                    ),
                    ui.multipleValues(`${i18n}.identifier`, resource.identifier, ui.identifier),
                    ui.multipleValues(`${i18n}.definition`, resource.definition, ui.reference),
                    ui.multipleValues(`${i18n}.basedOn`, resource.basedOn, ui.reference),
                    ui.identifier(`${i18n}.group_identifier`, resource.groupIdentifier),
                    ui.code(`${i18n}.status`, resource.status),
                    ui.code(`${i18n}.intent`, resource.intent),
                    ui.codeableConcept(`${i18n}.category`, resource.category),
                    ui.code(`${i18n}.priority`, resource.priority),
                    ui.reference(`${i18n}.medication_reference`, resource.medicationReference),
                    ui.multipleValues(`${i18n}.note`, resource.note, ui.annotation),
                ],
            },
            ...instructionsForUse,
        ],
    };
}
