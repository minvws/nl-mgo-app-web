import { ui } from '../../../../ui';
import { type UiSchemaGroup } from '../../../../ui/types';
import { type Grouping } from './grouping';

export function uiSchemaGroup(resource: Grouping): UiSchemaGroup {
    const i18n = 'zib_payer.grouping';

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
}
