import { type NonStrictUi, type UiSchemaGroupFunction } from '../../../ui/types';
import { type NlCoreAddress } from './nlCoreAddressInformation';

export const uiSchemaGroup: UiSchemaGroupFunction<NlCoreAddress> = (resource, context) => {
    const i18n = 'nl_core_address_information';
    const ui = context.ui as NonStrictUi;

    return {
        label: i18n,
        children: [
            ui.string(`${i18n}.streetName`, resource?.streetName),
            ui.string(`${i18n}.houseNumber`, resource?.houseNumber),
            ui.string(`${i18n}.houseNumberAddition`, resource?.houseNumberAddition),
            ui.string(`${i18n}.houseNumberIndication`, resource?.houseNumberIndication),
            ui.string(`${i18n}.additionalInformation`, resource?.additionalInformation),
            ui.string(`${i18n}.city`, resource?.city),
            ui.string(`${i18n}.district`, resource?.district),
            ui.string(`${i18n}.postalCode`, resource?.postalCode),
            ui.string(`${i18n}.country`, resource?.country),
            ui.codeableConcept(`${i18n}.addressType`, resource?.addressType),
        ],
    };
};
