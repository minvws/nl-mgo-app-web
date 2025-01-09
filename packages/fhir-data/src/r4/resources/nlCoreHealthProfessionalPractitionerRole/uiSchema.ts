import { type UiSchemaFunction } from '../../../ui';
import { map } from '../../../utils';
import {
    nlCoreContactInformationEmailAddresses,
    nlCoreContactInformationTelephoneNumbers,
} from '../../elements';
import { type R4NlCoreHealthProfessionalPractitionerRole } from './nlCoreHealthProfessionalPractitionerRole';

/**
 * @see: https://simplifier.net/packages/nictiz.fhir.nl.r4.nl-core/0.11.0-beta.1/files/2628465
 */
export const uiSchema: UiSchemaFunction<R4NlCoreHealthProfessionalPractitionerRole> = (
    resource,
    context
) => {
    const profile = 'r4.nl_core_health_professional_practitioner_role';
    const { ui, formatMessage } = context;

    /**
     * https://simplifier.net/packages/nictiz.fhir.nl.r4.nl-core/0.11.0-beta.1/files/2628465/~mappings
     */
    const zibHealthProfessional = {
        Organization: ui.reference(`${profile}.organization`, resource.organization),
        Speciality: ui.codeableConcept(`${profile}.speciality`, resource.speciality),
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
        label: resource.speciality?.at(0)?.coding.at(0)?.display ?? formatMessage(profile),
        children: [
            {
                label: formatMessage(profile),
                children: [zibHealthProfessional.Organization, zibHealthProfessional.Speciality],
            },
            ...zibContactInformation.EmailAddresses,
            ...zibContactInformation.TelephoneNumbers,
        ],
    };
};
