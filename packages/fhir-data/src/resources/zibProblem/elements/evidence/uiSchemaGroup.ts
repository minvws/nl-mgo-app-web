import { ui } from '../../../../ui';
import { type UiSchemaGroup } from '../../../../ui/types';
import { type Evidence } from './evidence';

export function uiSchemaGroup(resource: Evidence): UiSchemaGroup {
    const i18n = 'evidence';

    return {
        label: i18n,
        children: [
            ui.multipleValues(`${i18n}.code`, resource.code, ui.codeableConcept),
            ui.multipleValues(`${i18n}.detail`, resource.detail, ui.reference),
        ],
    };
}
