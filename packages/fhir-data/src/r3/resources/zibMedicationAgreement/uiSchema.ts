import { uiSchemaGroup as zibInstructionsForUseUiSchema } from '../../elements/zibInstructionsForUse/uiSchemaGroup';
import { type UiSchemaFunction } from '../../../ui';
import { type NonStrictUi } from '../../../ui/types';
import { map } from '../../../utils';
import { type ZibMedicationAgreement } from './zibMedicationAgreement';

/**
 * @see: https://simplifier.net/packages/nictiz.fhir.nl.stu3.zib2017/2.2.18/files/2317273
 */
export const uiSchema: UiSchemaFunction<ZibMedicationAgreement> = (resource, context) => {
    const ui = context.ui as NonStrictUi;
    const i18n = 'r3.zib_medication_agreement';
    const instructionsForUse = map(
        resource.dossageInstruction,
        (x) => zibInstructionsForUseUiSchema(x, context),
        true
    ).flat();

    return {
        label: resource.medicationReference?.display,
        children: [
            {
                label: `${i18n}.group_general_information`,
                children: [
                    ...ui.period(`${i18n}.period_of_use`, resource.periodOfUse),
                    ui.duration(`${i18n}.usage_duration`, resource.usageDuration),
                    ui.identifier(`${i18n}.medication_treatment`, resource.medicationTreatment),
                    ui.codeableConcept(`${i18n}.stop_type`, resource.stopType),
                    ui.duration(
                        `${i18n}.repeat_period_cyclical_schedule`,
                        resource.repeatPeriodCyclicalSchedule
                    ),
                    ui.identifier(`${i18n}.identifier`, resource.identifier),
                    ui.reference(`${i18n}.definition`, resource.definition),
                    ui.reference(`${i18n}.basedOn`, resource.basedOn),
                    ui.identifier(`${i18n}.group_identifier`, resource.groupIdentifier),
                    ui.code(`${i18n}.status`, resource.status),
                    ui.code(`${i18n}.intent`, resource.intent),
                    ui.codeableConcept(`${i18n}.category`, resource.category),
                    ui.code(`${i18n}.priority`, resource.priority),
                    ui.reference(`${i18n}.medication_reference`, resource.medicationReference),
                    ui.annotation(`${i18n}.note`, resource.note),
                ],
            },
            ...instructionsForUse,
        ],
    };
};
