import { type NonStrictUi, type UiSchemaGroupFunction } from '../../../../../ui/types';
import { type Hospitalization } from './hospitalization';

export const uiSchemaGroup: UiSchemaGroupFunction<Hospitalization> = (resource, context) => {
    const ui = context.ui as NonStrictUi;
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
};
