import { type UiSchemaFunction } from '../../../ui';
import { map } from '../../../utils';
import {
    nlCoreAddressInformation,
    nlCoreContactInformationEmailAddresses,
    nlCoreContactInformationTelephoneNumbers,
} from '../../elements';
import { type R4NlCoreHealtcareProvider } from './nlCoreHealtcareProvider';

/**
 * @see: https://simplifier.net/packages/nictiz.fhir.nl.r4.nl-core/0.8.0-beta.1/files/1946116
 */
export const uiSchema: UiSchemaFunction<R4NlCoreHealtcareProvider> = (resource, context) => {
    const profile = 'r4.nl_core_healtcare_provider';
    const { ui, formatMessage, setEmptyEntries } = context;

    /**
     * https://simplifier.net/packages/nictiz.fhir.nl.r4.nl-core/0.8.0-beta.1/files/1946116/~mappings
     */
    const zibHealthcareProvider = {
        LocationName: ui.string(`${profile}.name`, resource.name),
        AddressInformation: ui.helpers.getChildren(
            nlCoreAddressInformation.uiSchemaGroup(resource.address, context)
        ),
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

    return setEmptyEntries({
        label: resource.managingOrganization?.display ?? formatMessage(profile),
        children: [
            {
                label: formatMessage(profile),
                children: [
                    zibHealthcareProvider.LocationName,
                    ...zibHealthcareProvider.AddressInformation,
                ],
            },
            ...zibContactInformation.TelephoneNumbers,
            ...zibContactInformation.EmailAddresses,
        ],
    });
};
