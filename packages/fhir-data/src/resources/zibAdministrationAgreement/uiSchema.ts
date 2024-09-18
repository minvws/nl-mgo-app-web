import { uiSchemaGroup as zibInstructionsForUseUiSchema } from '../../elements/zibInstructionsForUse/uiSchemaGroup';
import { ui, type UiSchema } from '../../ui';
import { map } from '../../utils';
import { type ZibAdministrationAgreement } from './zibAdministrationAgreement';

/**
 * @see: https://simplifier.net/packages/nictiz.fhir.nl.stu3.zib2017/2.2.18/files/2317124
 */
export function uiSchema(resource: ZibAdministrationAgreement): UiSchema {
    const i18n = 'zib_administration_agreement';
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
                    ui.dateTime(`${i18n}.authored_on`, resource.authoredOn),
                    ui.string(`${i18n}.agreement_reason`, resource.agreementReason),
                    ...ui.duration(`${i18n}.usage_duration`, resource.usageDuration),
                    ui.codeableConcept(
                        `${i18n}.additional_information`,
                        resource.additionalInformation
                    ),
                    ui.identifier(`${i18n}.medication_treatment`, resource.medicationTreatment),
                    ui.codeableConcept(`${i18n}.stop_type`, resource.stopType),
                    ...ui.duration(
                        `${i18n}.repeat_period_cyclical_schedule`,
                        resource.repeatPeriodCyclicalSchedule
                    ),
                    ui.multipleValue(`${i18n}.identifier`, resource.identifier, ui.identifier),
                    ui.code(`${i18n}.status`, resource.status),
                    ui.codeableConcept(`${i18n}.category`, resource.category),
                    ...ui.quantity(`${i18n}.quantity`, resource.quantity),
                    ...ui.quantity(`${i18n}.days_supply`, resource.daysSupply),
                    ui.multipleValue(`${i18n}.note`, resource.note, ui.annotation),
                ],
            },
            ...instructionsForUse,
        ],
    };
}
