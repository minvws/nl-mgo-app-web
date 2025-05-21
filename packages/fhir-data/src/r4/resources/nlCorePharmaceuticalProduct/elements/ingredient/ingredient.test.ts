import { faker, testUiSchemaContext } from '$test';
import { fhirMessage } from '@minvws/mgo-mgo-intl/test';
import { expect, test } from 'vitest';
import { parse } from '../../../../../parse';
import { ingredient } from './ingredient';

test('ingredient parses successfully', () => {
    const input = faker.fhirR4.medicationIngredient();
    const data = ingredient.parse(input);
    expect(data).toEqual(
        expect.objectContaining({
            strength: parse.ratio(input.strength),
        })
    );
});

test('ingredient UI schema group is created successfully', () => {
    const input = faker.fhirR4.medicationIngredient();
    const data = ingredient.parse(input);
    const schema = ingredient.uiSchemaGroup(data, testUiSchemaContext());
    expect(schema.label).toBe(fhirMessage('r4.zib_pharmaceutical_product.ingredient'));
});
