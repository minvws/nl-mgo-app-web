import { type NonStrictUi, type UiSchemaGroupFunction } from '../../../../../ui/types';
import { type Policy } from './policy';

export const uiSchemaGroup: UiSchemaGroupFunction<Policy> = (resource, context) => {
    const i18n = 'zib_treatment_directive.policy';
    const ui = context.ui as NonStrictUi;

    return {
        label: i18n,
        children: [
            ui.string(`${i18n}.id`, resource.id),
            ui.string(`${i18n}.authority`, resource.authority),
            ui.string(`${i18n}.uri`, resource.uri),
        ],
    };
};
