import { zibProductIngredient, zibProductPackage } from '../../elements';
import { type UiSchemaFunction } from '../../../ui';
import { type NonStrictUi } from '../../../ui/types';
import { map } from '../../../utils';
import { type ZibProduct } from './zibProduct';

export const i18n = 'r3.zib_product';
export const uiSchema: UiSchemaFunction<ZibProduct> = (resource, context) => {
    const ui = context.ui as NonStrictUi;

    const productPackage = zibProductPackage.uiSchemaGroup(resource.package, context);
    const ingredients = map(
        resource.ingredient,
        (x) => zibProductIngredient.uiSchemaGroup(x, context),
        true
    );

    return {
        label: resource.description ?? context.formatMessage(i18n),
        children: [
            {
                label: `${i18n}.group_general_information`,
                children: [
                    ui.codeableConcept(`${i18n}.code`, resource.code),
                    ui.codeableConcept(`${i18n}.form`, resource.form),
                ],
            },
            {
                label: `${i18n}.group_ingredients`,
                children: ui.helpers.getChildren(ingredients),
            },
            productPackage,
        ],
    };
};
