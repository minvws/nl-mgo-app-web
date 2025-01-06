import { type UiSchemaGroupFunction } from '../../../ui/types';
import { type R4NlCoreAddressInformation } from './nlCoreAddressInformation';

export const uiSchemaGroup: UiSchemaGroupFunction<R4NlCoreAddressInformation> = (
    resource,
    context
) => {
    const i18n = 'r4.zib_address_information';
    const { ui, formatMessage } = context;

    return {
        label: formatMessage(i18n),
        children: [
            ui.string(`${i18n}.line.street_name.value`, resource?.streetName),
            ui.string(`${i18n}.line.house_number.value`, resource?.houseNumber),
            ui.string(
                `${i18n}.line.house_number_letter_house_number_addition.value`,
                resource?.houseNumberAddition
            ),
            ui.string(
                `${i18n}.line.house_number_indication.value`,
                resource?.houseNumberIndication
            ),
            ui.string(`${i18n}.line.additional_information.value`, resource?.additionalInformation),
            ui.string(`${i18n}.city`, resource?.city),
            ui.string(`${i18n}.district`, resource?.district),
            ui.string(`${i18n}.postal_code`, resource?.postalCode),
            ui.string(`${i18n}.country.country_code.value`, resource?.country),
            ui.codeableConcept(`${i18n}.type`, resource?.addressType),
        ],
    };
};
