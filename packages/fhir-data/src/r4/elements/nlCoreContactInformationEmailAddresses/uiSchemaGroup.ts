import { type HealthUiGroupFunction } from '../../../ui/types';
import { type R4NlCoreContactInformationEmailAddresses } from './nlCoreContactInformationEmailAddresses';

export const uiSchemaGroup: HealthUiGroupFunction<R4NlCoreContactInformationEmailAddresses> = (
    resource,
    context
) => {
    const i18n = 'r4.nl_core_contact_information_email_addresses';
    const { ui, formatMessage } = context;

    return {
        label: formatMessage(i18n),
        children: [
            ui.string(`${i18n}.value`, resource?.value),
            ui.code(`${i18n}.use`, resource?.use),
        ],
    };
};
