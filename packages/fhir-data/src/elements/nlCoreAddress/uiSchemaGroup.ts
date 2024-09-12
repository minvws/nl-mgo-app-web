import { type Nullable } from '../../types/Nullable';
import { ui } from '../../ui';
import { type UiSchemaGroup } from '../../ui/types';
import { type NlCoreAddress } from './nlCoreAddress';

export function uiSchemaGroup(resource: Nullable<NlCoreAddress>): UiSchemaGroup {
    const i18n = 'nl_core_address';

    return {
        label: i18n,
        children: [
            ui.string(`${i18n}.use`, resource?.use),
            ui.string(`${i18n}.type`, resource?.type),
            ui.string(`${i18n}.text`, resource?.text),
            ui.multipleValue(`${i18n}.line`, resource?.line, ui.string),
            ui.string(`${i18n}.city`, resource?.city),
            ui.string(`${i18n}.district`, resource?.district),
            ui.string(`${i18n}.state`, resource?.state),
            ui.string(`${i18n}.postalCode`, resource?.postalCode),
            ui.string(`${i18n}.country`, resource?.country),
            ...ui.period(`${i18n}.period`, resource?.period),
        ],
    };
}
