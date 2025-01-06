import { type NonStrictUi, type UiSchemaGroupFunction } from '../../../ui/types';
import {
    type R4NlCoreNameInformation,
    type R4NlCoreNameInformationGiven,
} from './nlCoreNameInformation';

export const uiSchemaGroup: UiSchemaGroupFunction<
    R4NlCoreNameInformation | R4NlCoreNameInformationGiven
> = (resource, context) => {
    const ui = context.ui as NonStrictUi;
    if (resource?.use === 'usual') {
        const i18n = 'nl_name_information_given_name';
        return {
            label: i18n,
            children: [ui.string(`${i18n}.given`, resource.given)],
        };
    }

    const i18n = 'nl_name_information';
    return {
        label: i18n,
        children: [
            ui.string(`${i18n}.text`, resource?.text),
            ui.string(`${i18n}.family`, resource?.family),
            ui.string(`${i18n}.given`, resource?.given),
            ui.string(`${i18n}.name_usage`, resource?.nameUsage),
            ui.string(`${i18n}.prefix`, resource?.prefix),
            ui.string(`${i18n}.suffix`, resource?.suffix),
        ],
    };
};
