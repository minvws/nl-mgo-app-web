import { type HealthUiGroupFunction, type NonStrictUi } from '../../../../../ui/types';
import { type Diagnosis } from './diagnosis';

export const uiSchemaGroup: HealthUiGroupFunction<Diagnosis> = (resource, context) => {
    const ui = context.ui as NonStrictUi;
    return {
        label: 'Encounter.diagnosis',
        children: [ui.reference(`Encounter.diagnosis.condition`, resource.condition)],
    };
};
