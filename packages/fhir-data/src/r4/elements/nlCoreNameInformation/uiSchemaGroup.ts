import { type Nullable } from '../../../types/Nullable';
import { ui } from '../../../ui';
import { type UiSchemaGroup } from '../../../ui/types';
import {
    type NlCoreNameInformation,
    type NlCoreNameInformationGiven,
} from './nlCoreNameInformation';

export function uiSchemaGroup(
    resource: Nullable<NlCoreNameInformation | NlCoreNameInformationGiven>
): UiSchemaGroup {
    if (resource?.use === 'usual') {
        const i18n = 'nl_name_information_given_name';
        return {
            label: i18n,
            children: [ui.multipleValues(`${i18n}.given`, resource?.given, ui.string)],
        };
    }

    const i18n = 'nl_name_information';
    return {
        label: i18n,
        children: [
            ui.string(`${i18n}.text`, resource?.text),
            ui.string(`${i18n}.family`, resource?.family),
            ui.multipleValues(`${i18n}.given`, resource?.given, ui.string),
            ui.string(`${i18n}.name_usage`, resource?.nameUsage),
            ui.multipleValues(`${i18n}.prefix`, resource?.prefix, ui.string),
            ui.multipleValues(`${i18n}.suffix`, resource?.suffix, ui.string),
        ],
    };
}
