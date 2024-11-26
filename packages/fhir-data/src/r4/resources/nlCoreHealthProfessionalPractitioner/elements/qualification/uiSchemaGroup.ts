import { ui } from '../../../../../ui';
import { type UiSchemaGroup } from '../../../../../ui/types';
import { type Qualification } from './qualification';

export function uiSchemaGroup(resource: Qualification): UiSchemaGroup {
    const profile = 'nl_core_health_professional_practitioner.qualification';

    return {
        label: `${profile}.group_details`,
        children: [
            ui.multipleValues(`${profile}.identifier`, resource.identifier, ui.identifier),
            ui.codeableConcept(`${profile}.code`, resource.code),
            ...ui.period(`${profile}.period`, resource.period),
            ui.reference(`${profile}.issuer`, resource.issuer),
        ],
    };
}
