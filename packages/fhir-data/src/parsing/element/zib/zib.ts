import { type MedicationIngredient, type MedicationPackage } from '../../../fhir';
import { codableConcept, ratio } from '../../type/general/general';
import { EMPTY_VALUE } from '../../type';
import { reference } from '../../type/special/special';
import { collection } from '../../helpers';

/**
 * zibProduct.ingredient
 * @see https://simplifier.net/packages/nictiz.fhir.nl.stu3.zib2017/2.2.18/files/2317343
 */
export function zibProductIngredient(value?: MedicationIngredient) {
    if (!value) return EMPTY_VALUE;
    const { itemCodeableConcept, amount } = value;
    return {
        item: codableConcept(itemCodeableConcept),
        amount: ratio(amount),
    };
}

/**
 * zibProduct.package
 * @see https://simplifier.net/packages/nictiz.fhir.nl.stu3.zib2017/2.2.18/files/2317343
 */
export function zibProductPackage(value?: MedicationPackage) {
    if (!value) return EMPTY_VALUE;
    const { content } = value;

    return collection(content, ({ itemCodeableConcept, itemReference }) => ({
        item: codableConcept(itemCodeableConcept),
        reference: reference(itemReference),
    }));
}
