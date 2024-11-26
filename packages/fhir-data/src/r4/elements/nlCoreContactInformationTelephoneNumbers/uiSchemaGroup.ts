import { ui } from '../../../ui';
import { type UiSchemaGroup } from '../../../ui/types';
import { type NlCoreContactInformationTelephoneNumbers } from './nlCoreContactInformationTelephoneNumbers';

export function uiSchemaGroup(resource: NlCoreContactInformationTelephoneNumbers): UiSchemaGroup {
    const i18n = 'nl_core_contact_information_telephone_numbers';

    return {
        label: i18n,
        children: [
            ui.string(`${i18n}.value`, resource?.value),
            ui.string(`${i18n}.use`, resource?.use),
            ui.string(`${i18n}.comment`, resource?.comment),
            ui.codeableConcept(`${i18n}.telecomType`, resource?.telecomType),
        ],
    };
}
