import { faker, testSet } from '$test';
import { expect } from 'vitest';
import { parse } from '../../parse/type';
import { zibProductIngredient } from './zibProductIngredient';

testSet('zibProductIngredient', faker.fhir.medicationIngredient, (data) => {
    const { itemCodeableConcept, amount } = data;
    expect(zibProductIngredient(data)).toEqual({
        item: parse.codeableConcept(itemCodeableConcept),
        amount: parse.ratio(amount),
    });
});
