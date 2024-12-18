import { type NonStrictUi, type UiSchemaGroupFunction } from '../../../../../ui/types';
import { type Communication } from './communication';

export const uiSchemaGroup: UiSchemaGroupFunction<Communication> = (resource, context) => {
    const i18n = 'r3.nl_core_patient.communication';
    const ui = context.ui as NonStrictUi;

    return {
        label: i18n,
        children: [
            ui.codeableConcept(`${i18n}.language`, resource.language),
            ui.boolean(`${i18n}.preferred`, resource.preferred),
        ],
    };
};
