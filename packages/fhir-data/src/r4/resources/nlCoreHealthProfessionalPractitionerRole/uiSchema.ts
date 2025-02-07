import { type HealthUiSchemaFunction } from '../../../ui';
import { map } from '../../../utils';
import {
    nlCoreContactInformationEmailAddresses,
    nlCoreContactInformationTelephoneNumbers,
} from '../../elements';
import { type R4NlCoreHealthProfessionalPractitionerRole } from './nlCoreHealthProfessionalPractitionerRole';

export const i18n = 'r4.nl_core_health_professional_practitioner_role';
export const uiSchema: HealthUiSchemaFunction<R4NlCoreHealthProfessionalPractitionerRole> = (
    resource,
    context
) => {
    const { ui, formatMessage } = context;

    /**
     * https://simplifier.net/packages/nictiz.fhir.nl.r4.nl-core/0.11.0-beta.1/files/2628465/~mappings
     */
    const zibHealthProfessional = {
        Organization: ui.reference(`${i18n}.organization`, resource.organization),
        Speciality: ui.codeableConcept(`${i18n}.speciality`, resource.speciality),
    };

    const zibContactInformation = {
        TelephoneNumbers: map(
            resource.telephoneNumbers,
            (x) => nlCoreContactInformationTelephoneNumbers.uiSchemaGroup(x, context),
            true
        ).flat(),
        EmailAddresses: map(
            resource.emailAddresses,
            (x) => nlCoreContactInformationEmailAddresses.uiSchemaGroup(x, context),
            true
        ).flat(),
    };

    return {
        label: resource.speciality?.at(0)?.coding.at(0)?.display ?? formatMessage(i18n),
        children: [
            {
                label: formatMessage(i18n),
                children: [zibHealthProfessional.Organization, zibHealthProfessional.Speciality],
            },
            ...zibContactInformation.EmailAddresses,
            ...zibContactInformation.TelephoneNumbers,
        ],
    };
};
