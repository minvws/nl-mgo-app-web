import { ui } from '../../../../ui';
import { type UiSchemaGroup } from '../../../../ui/types';
import { type Communication } from './communication';

export function uiSchemaGroup(resource: Communication): UiSchemaGroup {
    const i18n = 'nl_core_patient.communication';

    return {
        label: i18n,
        children: [
            ui.codeableConcept(`${i18n}.language`, resource.language),
            ui.boolean(`${i18n}.preferred`, resource.preferred),
        ],
    };
}
