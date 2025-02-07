import { type HealthUiGroupFunction, type NonStrictUi } from '../../../../../ui/types';
import { type Actor } from './actor';

export const uiSchemaGroup: HealthUiGroupFunction<Actor> = (resource, context) => {
    const i18n = 'r3.zib_treatment_directive.actor';
    const ui = context.ui as NonStrictUi;

    return {
        label: i18n,
        children: [
            ui.codeableConcept(`${i18n}.role`, resource.role),
            ui.reference(`${i18n}.reference`, resource.reference),
        ],
    };
};
