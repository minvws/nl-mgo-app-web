import { type NonStrictUi, type UiSchemaGroupFunction } from '../../../../../ui/types';
import { type Stage } from './stage';

export const uiSchemaGroup: UiSchemaGroupFunction<Stage> = (resource, context) => {
    const i18n = 'r3.stage';
    const ui = context.ui as NonStrictUi;

    return {
        label: i18n,
        children: [
            ui.codeableConcept(`${i18n}.summary`, resource.summary),
            ui.reference(`${i18n}.assessment`, resource.assessment),
        ],
    };
};
