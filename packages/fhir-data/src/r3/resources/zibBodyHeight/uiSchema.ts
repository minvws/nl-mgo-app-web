import { type HealthUiSchemaFunction } from '../../../ui';
import { valueOf } from '../../../ui/helpers/valueOf/valueOf';
import { type NonStrictUi } from '../../../ui/types';
import { type ZibBodyHeight } from './zibBodyHeight';

export const i18n = 'r3.zib_body_height';
export const uiSchema: HealthUiSchemaFunction<ZibBodyHeight> = (resource, context) => {
    const ui = context.ui as NonStrictUi;

    return {
        label: valueOf(resource.effectiveDateTime) ?? context.formatMessage(i18n),
        children: [
            {
                label: `${i18n}`,
                children: [
                    ui.quantity(i18n, resource.valueQuantity),
                    ui.dateTime(`${i18n}.effective`, resource.effectiveDateTime),
                    ui.string(`${i18n}.comment`, resource.comment),
                ],
            },
        ],
    };
};
