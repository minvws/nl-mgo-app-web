import { type NonStrictUi, type UiSchemaGroupFunction } from '../../../ui/types';
import { type NlCoreAddress } from './nlCoreAddress';

export const uiSchemaGroup: UiSchemaGroupFunction<NlCoreAddress> = (resource, context) => {
    const i18n = 'r3.nl_core_address';
    const ui = context.ui as NonStrictUi;

    return {
        label: i18n,
        children: [
            ui.code(`${i18n}.use`, resource?.use),
            ui.code(`${i18n}.type`, resource?.type),
            ui.string(`${i18n}.text`, resource?.text),
            ui.string(`${i18n}.city`, resource?.city),
            ui.string(`${i18n}.district`, resource?.district),
            ui.string(`${i18n}.state`, resource?.state),
            ui.string(`${i18n}.postalCode`, resource?.postalCode),
            ui.string(`${i18n}.country`, resource?.country),
            ...ui.period(`${i18n}.period`, resource?.period),
        ],
    };
};
