import { type HealthUiGroupFunction, type NonStrictUi } from '../../../ui/types';
import { type NlCoreContactpoint } from './nlCoreContactpoint';

export const uiSchemaGroup: HealthUiGroupFunction<NlCoreContactpoint> = (resource, context) => {
    const i18n = 'r3.nl_core_contact_point';
    const ui = context.ui as NonStrictUi;

    return {
        label: i18n,
        children: [
            ui.code(`${i18n}.system`, resource?.system),
            ui.string(`${i18n}.value`, resource?.value),
            ui.code(`${i18n}.use`, resource?.use),
        ],
    };
};
