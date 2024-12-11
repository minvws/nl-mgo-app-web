import { type UiSchemaGroupFunction, type NonStrictUi } from '../../../ui/types';
import { type ZibProductIngredient } from './zibProductIngredient';

export const uiSchemaGroup: UiSchemaGroupFunction<ZibProductIngredient> = (resource, context) => {
    const i18n = 'zib_product_ingredient';
    const ui = context.ui as NonStrictUi;

    return {
        label: i18n,
        children: [
            ui.codeableConcept(`${i18n}.item`, resource.item),
            ...ui.ratio(`${i18n}.amount`, resource.amount),
        ],
    };
};
