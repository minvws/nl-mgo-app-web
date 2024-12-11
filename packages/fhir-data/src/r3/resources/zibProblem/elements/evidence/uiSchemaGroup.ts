import { type NonStrictUi, type UiSchemaGroupFunction } from '../../../../../ui/types';
import { type Evidence } from './evidence';

export const uiSchemaGroup: UiSchemaGroupFunction<Evidence> = (resource, context) => {
    const i18n = 'evidence';
    const ui = context.ui as NonStrictUi;

    return {
        label: i18n,
        children: [
            ui.codeableConcept(`${i18n}.code`, resource.code),
            ui.reference(`${i18n}.detail`, resource.detail),
        ],
    };
};
