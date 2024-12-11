import { type NonStrictUi, type UiSchemaGroupFunction } from '../../../ui/types';
import { type NlCoreContactInformationEmailAddresses } from './nlCoreContactInformationEmailAddresses';

export const uiSchemaGroup: UiSchemaGroupFunction<NlCoreContactInformationEmailAddresses> = (
    resource,
    context
) => {
    const i18n = 'nl_core_contact_information_email_addresses';
    const ui = context.ui as NonStrictUi;

    return {
        label: i18n,
        children: [
            ui.string(`${i18n}.value`, resource?.value),
            ui.string(`${i18n}.use`, resource?.use),
        ],
    };
};
