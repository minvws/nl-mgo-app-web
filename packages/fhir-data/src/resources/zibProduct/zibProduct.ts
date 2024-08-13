import { type Medication } from '../../fhir';
import { extensionNictiz } from '../../parse/helpers';
import { parse } from '../../parse/type';
import { map } from '../../utils';
import { zibProductIngredient } from '../../elements/zibProductIngredient/zibProductIngredient';
import { zibProductPackage } from '../../elements/zibProductPackage/zibProductPackage';
import { parseResourceMeta } from '../resourceMeta/resourceMeta';

/**
 * @see: https://simplifier.net/packages/nictiz.fhir.nl.stu3.zib2017/2.2.18/files/2317343
 */
export function parseZibProduct(resource: Medication) {
    return {
        ...parseResourceMeta(resource),
        description: extensionNictiz(resource, 'zib-Product-Description'),
        code: parse.codeableConcept(resource.code),
        form: parse.codeableConcept(resource.form),
        ingredient: map(resource.ingredient, zibProductIngredient),
        package: zibProductPackage(resource.package),
    };
}

export type ZibProduct = ReturnType<typeof parseZibProduct>;
