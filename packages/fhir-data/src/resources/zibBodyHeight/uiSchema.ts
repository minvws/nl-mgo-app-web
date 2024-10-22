import { ui, type UiSchema } from '../../ui';
import { type ZibBodyHeight } from './zibBodyHeight';

/**
 * @see: https://simplifier.net/packages/nictiz.fhir.nl.stu3.zib2017/2.2.18/files/2317147
 */
export function uiSchema(resource: ZibBodyHeight): UiSchema {
    const profile = 'zib_body_height';

    return {
        label: resource.effectiveDateTime,
        children: [
            {
                label: `${profile}`,
                children: [
                    ...ui.quantity(profile, resource.valueQuantity),
                    ui.dateTime(`${profile}.effective`, resource.effectiveDateTime),
                    ui.string(`${profile}.comment`, resource.comment),
                ],
            },
        ],
    };
}
