import { type UiSchemaGroupFunction, type NonStrictUi } from '../../../../../ui/types';
import { type Link } from './link';

export const uiSchemaGroup: UiSchemaGroupFunction<Link> = (resource, context) => {
    const i18n = 'nl_core_patient.link';
    const ui = context.ui as NonStrictUi;

    return {
        label: i18n,
        children: [
            ui.reference(`${i18n}.other`, resource.other),
            ui.code(`${i18n}.type`, resource.type),
        ],
    };
};
