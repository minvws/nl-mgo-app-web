import { faker, testSet } from '$test';
import { expect } from 'vitest';
import { zibProductIngredient } from './zibProductIngredient';
import { parse } from '../../../parse';

testSet('zibProductIngredient', faker.fhir.medicationIngredient, (data) => {
    const { itemCodeableConcept, amount } = data;
    expect(zibProductIngredient.parse(data)).toEqual({
        item: parse.codeableConcept(itemCodeableConcept),
        amount: parse.ratio(amount),
    });
});

testSet(
    'ui schema group is created successfully',
    () => {
        const data = faker.fhir.medicationIngredient();
        return zibProductIngredient.parse(data);
    },
    (data) => {
        const schema = zibProductIngredient.uiSchemaGroup(data);
        expect(schema.label).toBe('zib_product_ingredient');
    },
    false
);
