import { type NonStrictUi, type UiSchemaGroupFunction } from '../../../ui/types';
import { type EncounterParticipant } from './encounterParticipant';

export const uiSchemaGroup: UiSchemaGroupFunction<EncounterParticipant> = (resource, context) => {
    const ui = context.ui as NonStrictUi;
    return {
        label: 'Encounter.participant',
        children: [ui.reference(`Encounter.participant.individual`, resource.individual)],
    };
};
