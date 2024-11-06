import { ui } from '../../ui';
import { type UiSchemaGroup } from '../../ui/types';
import { type Participant } from './encounterParticipant';

export function uiSchemaGroup(resource: Participant): UiSchemaGroup {
    return {
        label: 'Encounter.participant',
        children: [ui.reference(`Encounter.participant.individual`, resource.individual)],
    };
}
