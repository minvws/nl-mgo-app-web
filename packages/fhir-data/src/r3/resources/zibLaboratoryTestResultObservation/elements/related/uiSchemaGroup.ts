import { ui } from '../../../../../ui';
import { type UiSchemaGroup } from '../../../../../ui/types';
import { type Related } from './related';

export function uiSchemaGroup(resource: Related): UiSchemaGroup {
    return {
        label: 'zib_laboratory_test_result_observation.related',
        children: [ui.reference(`zib_laboratory_test_result_observation.related`, resource.target)],
    };
}
