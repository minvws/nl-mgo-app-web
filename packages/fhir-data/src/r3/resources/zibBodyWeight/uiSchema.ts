import { type UiSchemaFunction } from '../../../ui';
import { type NonStrictUi } from '../../../ui/types';
import { type ZibBodyWeight } from './zibBodyWeight';

export const i18n = 'r3.zib_body_weight';
export const uiSchema: UiSchemaFunction<ZibBodyWeight> = (resource, context) => {
    const ui = context.ui as NonStrictUi;

    return {
        label: resource.effectiveDateTime ?? context.formatMessage(i18n),
        children: [
            {
                label: `${i18n}`,
                children: [
                    ui.quantity(i18n, resource.valueQuantity),
                    ui.string(`${i18n}.comment`, resource.comment),
                    ui.dateTime(`${i18n}.effective`, resource.effectiveDateTime),
                    ui.codeableConcept(`${i18n}.clothing`, resource.clothing.valueCodeableConcept),
                ],
            },
        ],
    };
};
