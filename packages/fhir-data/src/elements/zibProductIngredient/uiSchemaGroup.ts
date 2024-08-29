import { ui } from '../../ui';
import { type UiSchemaGroup } from '../../ui/types';
import { type ZibProductIngredient } from './zibProductIngredient';

export function uiSchemaGroup(resource: ZibProductIngredient): UiSchemaGroup {
    const i18n = 'zib_product_ingredient';

    return {
        label: `${i18n}.group`,
        children: [
            ui.codeableConcept(`${i18n}.item`, resource.item),
            ...ui.ratio(`${i18n}.amount`, resource.amount),
        ],
    };
}
