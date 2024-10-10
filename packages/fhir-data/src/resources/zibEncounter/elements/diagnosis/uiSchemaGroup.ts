import { ui } from '../../../../ui';
import { type UiSchemaGroup } from '../../../../ui/types';
import { type Diagnosis } from './diagnosis';

export function uiSchemaGroup(resource: Diagnosis): UiSchemaGroup {
    return {
        label: 'Encounter.diagnosis',
        children: [
            ui.reference(`Encounter.diagnosis.condition`, resource.condition, { summary: true }),
        ],
    };
}
