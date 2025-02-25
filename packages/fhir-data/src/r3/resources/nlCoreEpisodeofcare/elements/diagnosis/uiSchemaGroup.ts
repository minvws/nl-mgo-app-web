import { type HealthUiGroupFunction, type NonStrictUi } from '../../../../../ui/types';
import { type Diagnosis } from './diagnosis';

export const uiSchemaGroup: HealthUiGroupFunction<Diagnosis> = (resource, context) => {
    const ui = context.ui as NonStrictUi;
    const profile = 'r3.nl_core_episodeofcare.diagnosis';

    return {
        label: profile,
        children: [
            ui.reference(`${profile}.condition`, resource.condition),
            ui.codeableConcept(`${profile}.role`, resource.role),
            ui.positiveInt(`${profile}.rank`, resource.rank),
        ],
    };
};
