import { type HealthUiGroupFunction, type NonStrictUi } from '../../../ui/types';
import {
    type R4NlCoreNameInformation,
    type R4NlCoreNameInformationGiven,
} from './nlCoreNameInformation';

export const uiSchemaGroup: HealthUiGroupFunction<
    R4NlCoreNameInformation | R4NlCoreNameInformationGiven
> = (resource, context) => {
    const ui = context.ui as NonStrictUi;
    if (resource?.use?.value === 'usual') {
        const i18n = 'nl_name_information_given_name';
        return {
            label: i18n,
            children: [ui.string(`${i18n}.given`, resource.given)],
        };
    }

    const i18n = 'nl_name_information';
    const nameInformation = resource as R4NlCoreNameInformation;
    return {
        label: i18n,
        children: [
            ui.string(`${i18n}.text`, nameInformation?.text),
            ui.string(`${i18n}.family`, nameInformation?.family),
            ui.string(`${i18n}.given`, nameInformation?.given),
            ui.code(`${i18n}.name_usage`, nameInformation?.nameUsage),
            ui.string(`${i18n}.prefix`, nameInformation?.prefix),
            ui.string(`${i18n}.suffix`, nameInformation?.suffix),
        ],
    };
};
