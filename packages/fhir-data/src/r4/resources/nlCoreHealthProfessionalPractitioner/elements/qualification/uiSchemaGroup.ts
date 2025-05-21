import { type HealthUiGroupFunction, type NonStrictUi } from '../../../../../ui/types';
import { type Qualification } from './qualification';

export const uiSchemaGroup: HealthUiGroupFunction<Qualification> = (resource, context) => {
    const profile = 'nl_core_health_professional_practitioner.qualification';
    const ui = context.ui as NonStrictUi;

    return {
        label: `${profile}.group_details`,
        children: [
            ui.identifier(`${profile}.identifier`, resource.identifier),
            ui.codeableConcept(`${profile}.code`, resource.code),
            ...ui.period(`${profile}.period`, resource.period),
            ui.reference(`${profile}.issuer`, resource.issuer),
        ],
    };
};
