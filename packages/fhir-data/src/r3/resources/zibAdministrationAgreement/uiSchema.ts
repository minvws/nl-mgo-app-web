import { capitalize } from 'lodash';
import { type HealthUiSchema, type HealthUiSchemaFunction } from '../../../ui';
import { type UiHelperContext } from '../../../ui/context';
import { map } from '../../../utils';
import { uiSchemaGroup as zibInstructionsForUseUiSchema } from '../../elements/zibInstructionsForUse/uiSchemaGroup';
import { performerGroup } from './elements/performer/uiSchemaGroup';
import { type ZibAdministrationAgreement } from './zibAdministrationAgreement';

export const i18n = 'r3.zib_administration_agreement';

export function getLabel(resource: ZibAdministrationAgreement, { formatMessage }: UiHelperContext) {
    return capitalize(resource.medicationReference?.display) || formatMessage(i18n);
}

export const uiSchema: HealthUiSchemaFunction<ZibAdministrationAgreement> = (resource, context) => {
    const { ui, formatMessage } = context;

    /**
     * https://simplifier.net/packages/nictiz.fhir.nl.stu3.zib2017/2.2.18/files/2317124/~mappings
     */
    const hcimAdministrationAgreement = {
        AdministrationAgreementDateTime: ui.dateTime(`${i18n}.authored_on`, resource.authoredOn),
        AgreementReason: ui.string(`${i18n}.agreement_reason`, resource.agreementReason),
        PeriodOfUsePeriod: ui.period(`${i18n}.period_of_use`, resource.periodOfUse),
        UsageDuration: ui.duration(`${i18n}.usage_duration`, resource.usageDuration),
        AdministrationAgreementAdditionalInformation: ui.codeableConcept(
            `${i18n}.additional_information`,
            resource.additionalInformation
        ),
        StopType: ui.codeableConcept(`${i18n}.stop_type`, resource.stopType),
        CanceledIndicator: ui.code(`${i18n}.status`, resource.status),
        MedicineForAdministrationAgreement: ui.reference(
            `${i18n}.medication_reference`,
            resource.medicationReference
        ),
        Supplier: map(resource.performer, (x) => performerGroup(x, context), true),
        MedicationAgreement: ui.reference(
            `${i18n}.authorizing_prescription`,
            resource.authorizingPrescription
        ),
        Comment: ui.annotation(`${i18n}.note`, resource.note),
    };

    const hcimInstructionsForUse = map(
        resource.dossageInstruction,
        (x) => zibInstructionsForUseUiSchema(x, context),
        true
    ).flat();

    const uiSchema: HealthUiSchema = {
        label: getLabel(resource, context),
        children: [
            {
                label: formatMessage(`fhir.group_general_info`),
                children: [
                    hcimAdministrationAgreement.AdministrationAgreementDateTime,
                    hcimAdministrationAgreement.AgreementReason,
                    ...hcimAdministrationAgreement.PeriodOfUsePeriod,
                    hcimAdministrationAgreement.UsageDuration,
                    hcimAdministrationAgreement.AdministrationAgreementAdditionalInformation,
                    hcimAdministrationAgreement.StopType,
                    hcimAdministrationAgreement.CanceledIndicator,
                    hcimAdministrationAgreement.MedicineForAdministrationAgreement,
                    hcimAdministrationAgreement.MedicationAgreement,
                    hcimAdministrationAgreement.Comment,
                ],
            },
            ...hcimAdministrationAgreement.Supplier,
            ...hcimInstructionsForUse,
        ],
    };

    return uiSchema;
};
