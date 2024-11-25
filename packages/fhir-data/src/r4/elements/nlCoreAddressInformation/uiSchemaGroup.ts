import { type Nullable } from '../../../types/Nullable';
import { ui } from '../../../ui';
import { type UiSchemaGroup } from '../../../ui/types';
import { type NlCoreAddress } from './nlCoreAddressInformation';

export function uiSchemaGroup(resource: Nullable<NlCoreAddress>): UiSchemaGroup {
    const i18n = 'nl_core_address_information';
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
}
