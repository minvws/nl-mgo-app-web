import { type HealthUiGroupFunction, type NonStrictUi } from '../../../ui/types';
import { type NlCoreHumanname } from './nlCoreHumanname';

export const uiSchemaGroup: HealthUiGroupFunction<NlCoreHumanname> = (resource, context) => {
    const i18n = 'r3.nl_core_humanname';
    const ui = context.ui as NonStrictUi;

    return {
        label: i18n,
        children: [ui.string(`${i18n}.given`, resource?.given?.callName)],
    };
};
