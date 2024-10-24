import { ui } from '../../../../ui';
import { type UiSchemaGroup } from '../../../../ui/types';
import { type ReferenceRange } from './referenceRange';

export function uiSchemaGroup(resource: ReferenceRange): UiSchemaGroup {
    const i18n = 'zib_laboratory_test_result_observation.reference_range';

    return {
        label: `${i18n}`,
        children: [
            ui.simpleQuantity(`${i18n}.low`, resource.low),
            ui.simpleQuantity(`${i18n}.high`, resource.high),
        ],
    };
}
