import { type UiSchemaFunction } from '../../../ui';
import { type NonStrictUi } from '../../../ui/types';
import { map } from '../../../utils';
import {
    nlCoreAddressInformation,
    nlCoreContactInformationEmailAddresses,
    nlCoreContactInformationTelephoneNumbers,
    nlCoreNameInformation,
} from '../..//elements';
import { uiSchemaGroup as qualificationUiSchemaGroup } from './elements/qualification/uiSchemaGroup';
import { type NlCoreHealthProfessionalPractitioner } from './nlCoreHealthProfessionalPractitioner';

/**
 * @see: https://simplifier.net/packages/nictiz.fhir.nl.r4.nl-core/0.8.0-beta.1/files/1946120
 */
export const uiSchema: UiSchemaFunction<NlCoreHealthProfessionalPractitioner> = (
    resource,
    context
) => {
    const profile = 'nl_core_health_professional_practitioner';
    const ui = context.ui as NonStrictUi;

    const address = map(
        resource.address,
        (x) => nlCoreAddressInformation.uiSchemaGroup(x, context),
        true
    );
    const name = map(resource.name, (x) => nlCoreNameInformation.uiSchemaGroup(x, context), true);
    const emailAddresses = map(
        resource.emailAddresses,
        (x) => nlCoreContactInformationEmailAddresses.uiSchemaGroup(x, context),
        true
    );
    const telephoneNumbers = map(
        resource.telephoneNumbers,
        (x) => nlCoreContactInformationTelephoneNumbers.uiSchemaGroup(x, context),
        true
    );
    const qualification = map(
        resource.qualification,
        (x) => qualificationUiSchemaGroup(x, context),
        true
    );

    return {
        label: resource.name?.at(0)?.text,
        children: [
            {
                label: `${profile}.group_details`,
                children: [
                    ui.identifier(`${profile}.identifier`, resource.identifier),
                    ui.code(`${profile}.gender`, resource.gender),
                    ui.date(`${profile}.birth_date`, resource.birthDate),
                    ui.codeableConcept(`${profile}.communication`, resource.communication),
                ],
            },
            ...name,
            ...emailAddresses,
            ...telephoneNumbers,
            ...address,
            ...qualification,
        ],
    };
};
