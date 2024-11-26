import { ui, type UiSchema } from '../../../ui';
import { map } from '../../../utils';
import {
    nlCoreNameInformation,
    nlCoreAddressInformation,
    nlCoreContactInformationEmailAddresses,
    nlCoreContactInformationTelephoneNumbers,
} from '../..//elements';
import { type NlCoreHealthProfessionalPractitioner } from './nlCoreHealthProfessionalPractitioner';
import { uiSchemaGroup as qualificationUiSchemaGroup } from './elements/qualification/uiSchemaGroup';

/**
 * @see: https://simplifier.net/packages/nictiz.fhir.nl.r4.nl-core/0.8.0-beta.1/files/1946120
 */
export function uiSchema(resource: NlCoreHealthProfessionalPractitioner): UiSchema {
    const profile = 'nl_core_health_professional_practitioner';

    const address = map(resource.address, nlCoreAddressInformation.uiSchemaGroup, true);
    const name = map(resource.name, nlCoreNameInformation.uiSchemaGroup, true);
    const emailAddresses = map(
        resource.emailAddresses,
        nlCoreContactInformationEmailAddresses.uiSchemaGroup,
        true
    );
    const telephoneNumbers = map(
        resource.telephoneNumbers,
        nlCoreContactInformationTelephoneNumbers.uiSchemaGroup,
        true
    );
    const qualification = map(resource.qualification, qualificationUiSchemaGroup, true);

    return {
        label: resource.name?.at(0)?.text,
        children: [
            {
                label: `${profile}.group_details`,
                children: [
                    ui.multipleValues(`${profile}.identifier`, resource.identifier, ui.identifier),
                    ui.code(`${profile}.gender`, resource.gender),
                    ui.date(`${profile}.birth_date`, resource.birthDate),
                    ui.multipleValues(
                        `${profile}.communication`,
                        resource.communication,
                        ui.codeableConcept
                    ),
                ],
            },
            ...name,
            ...emailAddresses,
            ...telephoneNumbers,
            ...address,
            ...qualification,
        ],
    };
}
