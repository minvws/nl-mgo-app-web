import { ui } from '../../../../ui';
import { type UiSchemaGroup } from '../../../../ui/types';
import { type Performer } from './performer';

export function uiSchemaGroup(resource: Performer): UiSchemaGroup {
    return {
        label: 'zib_procedure.performer',
        children: [ui.reference(`zib_procedure.performer`, resource.actor, { summary: true })],
    };
}
