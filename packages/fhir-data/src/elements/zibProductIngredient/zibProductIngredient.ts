import { type MedicationIngredient } from '../../fhir';
import { parse } from '../../parse/type';
import { type Nullable } from '../../types/Nullable';

/**
 * @name HCIM PharmaceuticalProduct
 * @usage zibProduct.ingredient
 * @see https://simplifier.net/packages/nictiz.fhir.nl.stu3.zib2017/2.2.18/files/2317343
 */
export function zibProductIngredient(value: Nullable<MedicationIngredient>) {
    return {
        item: parse.codeableConcept(value?.itemCodeableConcept),
        amount: parse.ratio(value?.amount),
    };
}

export type ZibProductIngredient = ReturnType<typeof zibProductIngredient>;
