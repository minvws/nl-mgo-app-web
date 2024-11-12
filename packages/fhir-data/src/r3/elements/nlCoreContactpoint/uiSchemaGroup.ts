import { ui } from '../../../ui';
import { type UiSchemaGroup } from '../../../ui/types';
import { type NlCoreContactpoint } from './nlCoreContactpoint';

export function uiSchemaGroup(resource: NlCoreContactpoint): UiSchemaGroup {
    const i18n = 'nl_core_contact_point';

    return {
        label: i18n,
        children: [
            ui.string(`${i18n}.system`, resource?.system),
            ui.string(`${i18n}.value`, resource?.value),
            ui.string(`${i18n}.use`, resource?.use),
            ui.positiveInt(`${i18n}.rank`, resource?.rank),
            ...ui.period(`${i18n}.period`, resource.period),
        ],
    };
}
