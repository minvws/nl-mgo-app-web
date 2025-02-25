import { type HealthUiGroupFunction } from '../../../../../ui/types';
import { type FocalDevice } from './focalDevice';

export const uiSchemaGroup: HealthUiGroupFunction<FocalDevice> = (resource, context) => {
    const ui = context.ui;
    return {
        label: 'zib_procedure.focal_device',
        children: [ui.reference(`r3.zib_procedure.focal_device.manipulated`, resource.manipulated)],
    };
};
