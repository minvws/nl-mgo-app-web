import { ui } from '../../../../ui';
import { type UiSchemaGroup } from '../../../../ui/types';
import { map } from '../../../../utils';
import { type Section } from './section';

export function uiSchemaGroup(resource: Section): UiSchemaGroup {
    const profile = 'EncounterReport.Section';

    return {
        label: profile,
        children: [
            ui.codeableConcept(`${profile}.code`, resource.code),
            ...map(resource.entry, (entry) => ui.reference(`${profile}.entry`, entry), true),
        ],
    };
}
