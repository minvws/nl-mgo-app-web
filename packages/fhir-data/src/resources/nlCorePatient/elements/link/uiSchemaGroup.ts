import { ui } from '../../../../ui';
import { type UiSchemaGroup } from '../../../../ui/types';
import { type Link } from './link';

export function uiSchemaGroup(resource: Link): UiSchemaGroup {
    const i18n = 'nl_core_patient.link';

    return {
        label: i18n,
        children: [
            ui.reference(`${i18n}.other`, resource.other),
            ui.code(`${i18n}.type`, resource.type),
        ],
    };
}
