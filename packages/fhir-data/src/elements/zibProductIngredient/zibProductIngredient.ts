import { type MedicationIngredient } from '../../fhir';
import { parse } from '../../parse';
import { type Nullable } from '../../types/Nullable';
import { type ResourceElementConfig } from '../config';
import { uiSchemaGroup } from './uiSchemaGroup';

export interface ZibProductIngredient {
    item: parse.MgoCodeableConcept | undefined;
    amount: parse.MgoRatio | undefined;
}

/**
 * @name HCIM PharmaceuticalProduct
 * @usage zibProduct.ingredient
 * @see https://simplifier.net/packages/nictiz.fhir.nl.stu3.zib2017/2.2.18/files/2317343
 */
function parseZibProductIngredient(value: Nullable<MedicationIngredient>): ZibProductIngredient {
    return {
        item: parse.codeableConcept(value?.itemCodeableConcept),
        amount: parse.ratio(value?.amount),
    };
}

export const zibProductIngredient = {
    parse: parseZibProductIngredient,
    uiSchemaGroup,
} satisfies ResourceElementConfig<MedicationIngredient, ZibProductIngredient>;
