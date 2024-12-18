import { faker, testUiSchemaContext } from '$test';
import { expect, test } from 'vitest';
import { parse } from '../../../parse';
import { zibProductIngredient } from './zibProductIngredient';

test('zibProductIngredient', () => {
    const data = faker.fhir.medicationIngredient();
    const { itemCodeableConcept, amount } = data;
    expect(zibProductIngredient.parse(data)).toEqual({
        item: parse.codeableConcept(itemCodeableConcept),
        amount: parse.ratio(amount),
    });
});

test('ui schema group is created successfully', () => {
    const data = zibProductIngredient.parse(faker.fhir.medicationIngredient());
    const schema = zibProductIngredient.uiSchemaGroup(
        data,
        testUiSchemaContext({
            useMock: true,
            ignoreMissingTranslations: true,
        })
    );
    expect(schema.label).toBe('r3.zib_product_ingredient');
});
