import { uiSchemaGroup as zibInstructionsForUseUiSchema } from '../../elements/zibInstructionsForUse/uiSchemaGroup';
import { type UiSchemaFunction } from '../../../ui';
import { type NonStrictUi } from '../../../ui/types';
import { map } from '../../../utils';
import { type ZibAdministrationAgreement } from './zibAdministrationAgreement';

export const i18n = 'r3.zib_administration_agreement';
export const uiSchema: UiSchemaFunction<ZibAdministrationAgreement> = (resource, context) => {
    const ui = context.ui as NonStrictUi;
    const instructionsForUse = map(
        resource.dossageInstruction,
        (x) => zibInstructionsForUseUiSchema(x, context),
        true
    ).flat();

    return {
        label: resource.medicationReference?.display ?? context.formatMessage(i18n),
        children: [
            {
                label: `${i18n}.group_general_information`,
                children: [
                    ui.dateTime(`${i18n}.authored_on`, resource.authoredOn),
                    ui.string(`${i18n}.agreement_reason`, resource.agreementReason),
                    ui.duration(`${i18n}.usage_duration`, resource.usageDuration),
                    ui.codeableConcept(
                        `${i18n}.additional_information`,
                        resource.additionalInformation
                    ),
                    ui.identifier(`${i18n}.medication_treatment`, resource.medicationTreatment),
                    ui.codeableConcept(`${i18n}.stop_type`, resource.stopType),
                    ui.duration(
                        `${i18n}.repeat_period_cyclical_schedule`,
                        resource.repeatPeriodCyclicalSchedule
                    ),
                    ui.identifier(`${i18n}.identifier`, resource.identifier),
                    ui.code(`${i18n}.status`, resource.status),
                    ui.codeableConcept(`${i18n}.category`, resource.category),
                    ui.quantity(`${i18n}.quantity`, resource.quantity),
                    ui.quantity(`${i18n}.days_supply`, resource.daysSupply),
                    ui.annotation(`${i18n}.note`, resource.note),
                ],
            },
            ...instructionsForUse,
        ],
    };
};
