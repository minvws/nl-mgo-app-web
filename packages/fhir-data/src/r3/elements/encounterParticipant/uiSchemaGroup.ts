import { type HealthUiGroupFunction, type NonStrictUi } from '../../../ui/types';
import { type EncounterParticipant } from './encounterParticipant';

export const uiSchemaGroup: HealthUiGroupFunction<EncounterParticipant> = (resource, context) => {
    const ui = context.ui as NonStrictUi;
    return {
        label: 'Encounter.participant',
        children: [ui.reference(`Encounter.participant.individual`, resource.individual)],
    };
};
