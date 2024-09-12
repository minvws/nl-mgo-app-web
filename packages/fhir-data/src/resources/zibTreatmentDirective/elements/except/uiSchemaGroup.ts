import { ui } from '../../../../ui';
import { type UiSchemaGroup } from '../../../../ui/types';
import { map } from '../../../../utils';
import { uiSchemaGroup as actorUiSchema } from '../actor/uiSchemaGroup';
import { uiSchemaGroup as dataUiSchema } from '../data/uiSchemaGroup';
import { type Except } from './except';

export function uiSchemaGroup(resource: Except): UiSchemaGroup {
    const i18n = 'zib_treatment_directive.except';

    const actor = map(resource.actor, actorUiSchema);
    const data = map(resource.data, dataUiSchema);

    return {
        label: i18n,
        children: [
            ui.code(`${i18n}.type`, resource.type),
            ...ui.period(`${i18n}.period`, resource.period),
            ui.multipleValue(`${i18n}.action`, resource.action, ui.codeableConcept),
            ui.multipleValue(`${i18n}.security_label`, resource.securityLabel, ui.coding),
            ui.multipleValue(`${i18n}.purpose`, resource.purpose, ui.coding),
            ui.multipleValue(`${i18n}.class`, resource.class, ui.coding),
            ui.multipleValue(`${i18n}.code`, resource.code, ui.coding),
            ...ui.period(`${i18n}.plan`, resource.dataPeriod),
            ...ui.helpers.getChildren(actor),
            ...ui.helpers.getChildren(data),
        ],
    };
}
