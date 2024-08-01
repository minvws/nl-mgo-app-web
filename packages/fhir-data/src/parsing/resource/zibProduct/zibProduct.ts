import { type Medication } from '../../../fhir';
import { EMPTY_VALUE, parse } from '../../type';
import { extensionNictiz, zibProductIngredient, zibProductPackage } from '../../element';
import { collection } from '../../helpers';
import { parseResourceMeta } from '../resourceMeta/resourceMeta';

/**
 * @see: https://simplifier.net/packages/nictiz.fhir.nl.stu3.zib2017/2.2.18/files/2317343
 */
export function parseZibProduct(statement: Medication) {
    if (!statement) return EMPTY_VALUE;

    const { code, form, ingredient, package: medicationPackage } = statement;

    return {
        ...parseResourceMeta(statement)!,
        description: extensionNictiz(statement, 'zib-Product-Description'),
        code: parse.codableConcept(code),
        form: parse.codableConcept(form),
        ingredient: collection(ingredient, zibProductIngredient),
        package: zibProductPackage(medicationPackage),
    };
}

export type ZibProduct = ReturnType<typeof parseZibProduct>;
