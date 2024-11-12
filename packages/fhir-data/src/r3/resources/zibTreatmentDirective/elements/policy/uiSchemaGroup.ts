import { ui } from '../../../../../ui';
import { type UiSchemaGroup } from '../../../../../ui/types';
import { type Policy } from './policy';

export function uiSchemaGroup(resource: Policy): UiSchemaGroup {
    const i18n = 'zib_treatment_directive.policy';

    return {
        label: i18n,
        children: [
            ui.string(`${i18n}.id`, resource.id),
            ui.string(`${i18n}.authority`, resource.authority),
            ui.string(`${i18n}.uri`, resource.uri),
        ],
    };
}
