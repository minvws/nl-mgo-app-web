import { ui } from '../../../ui';
import { type UiSchemaGroup } from '../../../ui/types';
import { type NlCoreContactInformationEmailAddresses } from './nlCoreContactInformationEmailAddresses';

export function uiSchemaGroup(resource: NlCoreContactInformationEmailAddresses): UiSchemaGroup {
    const i18n = 'nl_core_contact_information_email_addresses';

    return {
        label: i18n,
        children: [
            ui.string(`${i18n}.value`, resource?.value),
            ui.string(`${i18n}.use`, resource?.use),
        ],
    };
}
