import { common } from '@minvws/mgo-hcim-ui';
import { SummarySchemaFunction } from '../../../resourceTypes.js';
import {
    nlCoreAddressSummary,
    nlCoreContactpointSummaryEmail,
    nlCoreContactpointSummaryPhone,
    nlCoreHumannameSummary,
} from '../../elements/index.js';
import { NlCorePatient } from './nlCorePatient.js';

const i18n = 'r3.nl_core_patient';

export const summary: SummarySchemaFunction<NlCorePatient> = (resource, context) => {
    const { ui, formatMessage } = context;

    const patientName = resource.name?.[0];
    const officialAddress = resource.address?.find((x) => x.official?.value);

    return {
        label: patientName?.text?.value || formatMessage('fhir.unknown'),
        children: [
            {
                children: [
                    ...nlCoreHumannameSummary(patientName, context),
                    ui.date(`${i18n}.birth_date`, resource.birthDate),
                    ui.codeableConcept(`${i18n}.gender`, resource.gender.geslachtCodelijst),
                    ui.reference(`${i18n}.general_practitioner`, resource.generalPractitioner),
                ],
            },

            {
                label: formatMessage(`summary.${i18n}.group_contact_details`),
                children: [
                    ...nlCoreAddressSummary(officialAddress, context),
                    ...nlCoreContactpointSummaryPhone(resource.telecom, context),
                    ...nlCoreContactpointSummaryEmail(resource.telecom, context),
                ],
            },

            ...(resource.contact?.map((contact, idx) => ({
                label: formatMessage(`summary.${i18n}.group_contacts`, { idx: idx + 1 }),
                children: [
                    ...nlCoreHumannameSummary(contact.name, context),
                    ...nlCoreContactpointSummaryPhone(contact.telecom, context),
                ],
            })) ?? []),

            {
                label: formatMessage(`summary.${i18n}.group_author`),
                children: [common.organization(context, context.organization)],
            },

            common.summaryOptions(context, i18n, resource),
        ],
    };
};
