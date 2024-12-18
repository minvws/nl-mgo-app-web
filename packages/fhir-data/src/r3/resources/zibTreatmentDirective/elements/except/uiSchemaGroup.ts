import { type NonStrictUi, type UiSchemaGroupFunction } from '../../../../../ui/types';
import { map } from '../../../../../utils';
import { uiSchemaGroup as actorUiSchema } from '../actor/uiSchemaGroup';
import { uiSchemaGroup as dataUiSchema } from '../data/uiSchemaGroup';
import { type Except } from './except';

export const uiSchemaGroup: UiSchemaGroupFunction<Except> = (resource, context) => {
    const i18n = 'r3.zib_treatment_directive.except';
    const ui = context.ui as NonStrictUi;

    const actor = map(resource.actor, (x) => actorUiSchema(x, context));
    const data = map(resource.data, (x) => dataUiSchema(x, context));

    return {
        label: i18n,
        children: [
            ui.code(`${i18n}.type`, resource.type),
            ...ui.period(`${i18n}.period`, resource.period),
            ui.codeableConcept(`${i18n}.action`, resource.action),
            ui.coding(`${i18n}.security_label`, resource.securityLabel),
            ui.coding(`${i18n}.purpose`, resource.purpose),
            ui.coding(`${i18n}.class`, resource.class),
            ui.coding(`${i18n}.code`, resource.code),
            ...ui.period(`${i18n}.plan`, resource.dataPeriod),
            ...ui.helpers.getChildren(actor),
            ...ui.helpers.getChildren(data),
        ],
    };
};
