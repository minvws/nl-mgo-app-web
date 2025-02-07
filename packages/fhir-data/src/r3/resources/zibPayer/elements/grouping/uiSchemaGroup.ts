import { type HealthUiGroupFunction, type NonStrictUi } from '../../../../../ui/types';
import { type Grouping } from './grouping';

export const uiSchemaGroup: HealthUiGroupFunction<Grouping> = (resource, context) => {
    const i18n = 'r3.zib_payer.grouping';
    const ui = context.ui as NonStrictUi;

    return {
        label: i18n,
        children: [
            ui.string(`${i18n}.group`, resource.groupDisplay),
            ui.string(`${i18n}.sub_group`, resource.subGroupDisplay),
            ui.string(`${i18n}.plan`, resource.planDisplay),
            ui.string(`${i18n}.sub_plan`, resource.subPlanDisplay),
            ui.string(`${i18n}.class`, resource.classDisplay),
            ui.string(`${i18n}.sub_class`, resource.subClassDisplay),
        ],
    };
};
