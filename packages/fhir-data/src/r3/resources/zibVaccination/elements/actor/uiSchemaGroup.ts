import { ui } from '../../../../../ui';
import { type UiSchemaGroup } from '../../../../../ui/types';
import { type Actor } from './actor';

export function uiSchemaGroup(resource: Actor): UiSchemaGroup {
    return {
        label: 'Immunization.practitioner.actor',
        children: [ui.reference(`Immunization.practitioner.actor`, resource.actor)],
    };
}
