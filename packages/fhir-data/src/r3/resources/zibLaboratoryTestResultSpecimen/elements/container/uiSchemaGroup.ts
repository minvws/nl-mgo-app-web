import { ui } from '../../../../../ui';
import { type UiSchemaGroup } from '../../../../../ui/types';
import { type Container } from './container';

export function uiSchemaGroup(resource: Container): UiSchemaGroup {
    const i18n = 'zib_laboratory_test_result_specimen';

    return {
        label: `${i18n}.container`,
        children: [
            ui.multipleValues(`${i18n}.identifier`, resource.identifier, ui.identifier),
            ui.codeableConcept(`${i18n}.type`, resource.type),
        ],
    };
}
