import { type MedicationIngredient } from 'fhir/r4';
import { parse } from '../../../../../parse';
import { oneOfValueX } from '../../../../../parse/helpers';
import { type Nullable } from '../../../../../types/Nullable';
import { type R4ResourceElementConfig } from '../../../../elements/config';
import { uiSchemaGroup } from './uiSchemaGroup';

export interface Ingredient {
    itemReference?: parse.MgoReference;
    itemCodeableConcept?: parse.MgoCodeableConcept;
    strength: parse.MgoRatio | undefined;
}

function parseIngredient(value: Nullable<MedicationIngredient>): Ingredient {
    return {
        ...oneOfValueX(value, ['codeableConcept', 'reference'], 'item'),
        strength: parse.ratio(value?.strength),
    };
}

export const ingredient = {
    parse: parseIngredient,
    uiSchemaGroup,
} satisfies R4ResourceElementConfig<MedicationIngredient, Ingredient>;
