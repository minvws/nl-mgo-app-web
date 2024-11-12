import { zibProductIngredient, zibProductPackage } from '../../elements';
import { ui, type UiSchema } from '../../../ui';
import { map } from '../../../utils';
import { type ZibProduct } from './zibProduct';

/**
 * @see: https://simplifier.net/packages/nictiz.fhir.nl.stu3.zib2017/2.2.18/files/2317343
 */
export function uiSchema(resource: ZibProduct): UiSchema {
    const i18n = 'zib_product';

    const productPackage = zibProductPackage.uiSchemaGroup(resource.package);
    const ingredients = map(resource.ingredient, zibProductIngredient.uiSchemaGroup, true);

    return {
        label: resource.description,
        children: [
            {
                label: `${i18n}.group_general_information`,
                children: [
                    ui.codeableConcept(`${i18n}.code`, resource.code, { summary: true }),
                    ui.codeableConcept(`${i18n}.form`, resource.form, { summary: true }),
                ],
            },
            {
                label: `${i18n}.group_ingredients`,
                children: ui.helpers.getChildren(ingredients),
            },
            productPackage,
        ],
    };
}
