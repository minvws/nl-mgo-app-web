import { type HealthUiSchemaFunction } from '../../../ui';
import { map } from '../../../utils';
import {
    nlCoreAddressInformation,
    nlCoreContactInformationEmailAddresses,
    nlCoreContactInformationTelephoneNumbers,
} from '../../elements';
import { type R4NlCoreHealthcareProvider } from './nlCoreHealthcareProvider';

export const i18n = 'r4.nl_core_healthcare_provider';
export const uiSchema: HealthUiSchemaFunction<R4NlCoreHealthcareProvider> = (resource, context) => {
    const { ui, formatMessage } = context;

    /**
     * https://simplifier.net/packages/nictiz.fhir.nl.r4.nl-core/0.8.0-beta.1/files/1946116/~mappings
     */
    const zibHealthcareProvider = {
        LocationName: ui.string(`${i18n}.name`, resource.name),
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

    return {
        label: resource.managingOrganization?.display ?? formatMessage(i18n),
        children: [
            {
                label: formatMessage(i18n),
                children: [
                    zibHealthcareProvider.LocationName,
                    ...zibHealthcareProvider.AddressInformation,
                ],
            },
            ...zibContactInformation.TelephoneNumbers,
            ...zibContactInformation.EmailAddresses,
        ],
    };
};
