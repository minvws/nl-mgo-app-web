import { type NonStrictUi, type UiSchemaGroupFunction } from '../../../ui/types';
import { type NlCoreContactpoint } from './nlCoreContactpoint';

export const uiSchemaGroup: UiSchemaGroupFunction<NlCoreContactpoint> = (resource, context) => {
    const i18n = 'r3.nl_core_contact_point';
    const ui = context.ui as NonStrictUi;

    return {
        label: i18n,
        children: [
            ui.string(`${i18n}.system`, resource?.system),
            ui.string(`${i18n}.value`, resource?.value),
            ui.string(`${i18n}.use`, resource?.use),
            ui.positiveInt(`${i18n}.rank`, resource?.rank),
            ...ui.period(`${i18n}.period`, resource.period),
        ],
    };
};
