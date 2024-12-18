import { type UiSchemaGroupFunction, type NonStrictUi } from '../../../ui/types';
import { type NlCoreHumanname } from './nlCoreHumanname';

export const uiSchemaGroup: UiSchemaGroupFunction<NlCoreHumanname> = (resource, context) => {
    const i18n = 'r3.nl_core_humanname';
    const ui = context.ui as NonStrictUi;

    return {
        label: i18n,
        children: [
            ui.string(`${i18n}.family`, resource?.family),
            ui.string(`${i18n}.given`, resource?.given),
            ...ui.period(`${i18n}.period`, resource?.period),
            ui.string(`${i18n}.prefix`, resource?.prefix),
            ui.string(`${i18n}.suffix`, resource?.suffix),
            ui.string(`${i18n}.use`, resource?.use),
            ui.string(`${i18n}.text`, resource?.text),
        ],
    };
};
