import { zibProductIngredient, zibProductPackage } from '../../elements';
import { type UiSchemaFunction } from '../../../ui';
import { type NonStrictUi } from '../../../ui/types';
import { map } from '../../../utils';
import { type ZibProduct } from './zibProduct';

/**
 * @see: https://simplifier.net/packages/nictiz.fhir.nl.stu3.zib2017/2.2.18/files/2317343
 */
export const uiSchema: UiSchemaFunction<ZibProduct> = (resource, context) => {
    const ui = context.ui as NonStrictUi;
    const i18n = 'zib_product';

    const productPackage = zibProductPackage.uiSchemaGroup(resource.package, context);
    const ingredients = map(
        resource.ingredient,
        (x) => zibProductIngredient.uiSchemaGroup(x, context),
        true
    );

    return {
        label: resource.description,
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
