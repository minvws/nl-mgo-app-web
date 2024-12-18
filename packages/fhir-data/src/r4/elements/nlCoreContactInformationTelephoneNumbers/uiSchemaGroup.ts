import { type UiSchemaGroupFunction } from '../../../ui/types';
import { type NlCoreContactInformationTelephoneNumbers } from './nlCoreContactInformationTelephoneNumbers';

export const uiSchemaGroup: UiSchemaGroupFunction<NlCoreContactInformationTelephoneNumbers> = (
    resource,
    context
) => {
    const i18n = 'r4.nl_core_contact_information_telephone_numbers';
    const { ui, formatMessage } = context;

    return {
        label: formatMessage(i18n),
        children: [
            ui.string(`${i18n}.value`, resource?.value),
            ui.string(`${i18n}.use`, resource?.use),
            ui.string(`${i18n}.comment`, resource?.comment),
            ui.codeableConcept(`${i18n}.telecom_type`, resource?.telecomType),
        ],
    };
};
