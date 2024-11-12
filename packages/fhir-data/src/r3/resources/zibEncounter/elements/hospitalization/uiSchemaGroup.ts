import { ui } from '../../../../../ui';
import { type UiSchemaGroup } from '../../../../../ui/types';
import { type Hospitalization } from './hospitalization';

export function uiSchemaGroup(resource: Hospitalization): UiSchemaGroup {
    return {
        label: 'Encounter.hospitalization',
        children: [
            ui.codeableConcept(`Encounter.hospitalization.admitSource`, resource.admitSource),
            ui.codeableConcept(
                `Encounter.hospitalization.dischargeDisposition`,
                resource.dischargeDisposition
            ),
        ],
    };
}
