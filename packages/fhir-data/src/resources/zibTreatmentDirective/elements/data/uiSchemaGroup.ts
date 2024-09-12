import { ui } from '../../../../ui';
import { type UiSchemaGroup } from '../../../../ui/types';
import { type Data } from './data';

export function uiSchemaGroup(resource: Data): UiSchemaGroup {
    const i18n = 'zib_treatment_directive.data';

    return {
        label: i18n,
        children: [
            ui.code(`${i18n}.meaning`, resource.meaning),
            ui.reference(`${i18n}.reference`, resource.reference),
        ],
    };
}
