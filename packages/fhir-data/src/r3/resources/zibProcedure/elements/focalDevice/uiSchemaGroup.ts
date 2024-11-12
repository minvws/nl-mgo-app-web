import { ui } from '../../../../../ui';
import { type UiSchemaGroup } from '../../../../../ui/types';
import { type FocalDevice } from './focalDevice';

export function uiSchemaGroup(resource: FocalDevice): UiSchemaGroup {
    return {
        label: 'zib_procedure.focal_device',
        children: [
            ui.reference(`zib_procedure.focal_device.manipulated`, resource.manipulated, {
                summary: true,
            }),
        ],
    };
}
