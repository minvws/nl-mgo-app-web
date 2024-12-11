import { type UiSchemaFunction } from '../../../ui';
import { type NonStrictUi } from '../../../ui/types';
import { type ZibBodyWeight } from './zibBodyWeight';

/**
 * @see: https://simplifier.net/packages/nictiz.fhir.nl.stu3.zib2017/2.2.18/files/2317147
 */
export const uiSchema: UiSchemaFunction<ZibBodyWeight> = (resource, context) => {
    const ui = context.ui as NonStrictUi;
    const profile = 'zib_body_weight';

    return {
        label: resource.effectiveDateTime,
        children: [
            {
                label: `${profile}`,
                children: [
                    ui.quantity(profile, resource.valueQuantity),
                    ui.string(`${profile}.comment`, resource.comment),
                    ui.dateTime(`${profile}.effective`, resource.effectiveDateTime),
                    ui.codeableConcept(
                        `${profile}.clothing`,
                        resource.clothing.valueCodeableConcept
                    ),
                ],
            },
        ],
    };
};
