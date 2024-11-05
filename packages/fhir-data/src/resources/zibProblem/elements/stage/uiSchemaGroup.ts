import { ui } from '../../../../ui';
import { type UiSchemaGroup } from '../../../../ui/types';
import { type Stage } from './stage';

export function uiSchemaGroup(resource: Stage): UiSchemaGroup {
    const i18n = 'stage';

    return {
        label: i18n,
        children: [
            ui.codeableConcept(`${i18n}.summary`, resource.summary),
            ui.multipleValues(`${i18n}.assessment`, resource.assessment, ui.reference),
        ],
    };
}
