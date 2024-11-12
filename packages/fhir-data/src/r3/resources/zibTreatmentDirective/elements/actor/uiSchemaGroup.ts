import { ui } from '../../../../../ui';
import { type UiSchemaGroup } from '../../../../../ui/types';
import { type Actor } from './actor';

export function uiSchemaGroup(resource: Actor): UiSchemaGroup {
    const i18n = 'zib_treatment_directive.actor';

    return {
        label: i18n,
        children: [
            ui.codeableConcept(`${i18n}.role`, resource.role),
            ui.reference(`${i18n}.reference`, resource.reference),
        ],
    };
}
