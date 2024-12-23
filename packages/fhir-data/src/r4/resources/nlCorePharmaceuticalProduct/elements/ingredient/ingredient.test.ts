import { faker, testUiSchemaContext } from '$test';
import { expect, test } from 'vitest';
import { ingredient } from './ingredient';
import { message } from '$test/i18n';

test('qualification parses successfully', () => {
    const input = faker.fhirR4.medicationIngredient();
    const data = ingredient.parse(input);
    expect(data).toEqual(
        expect.objectContaining({
            itemReference: input.itemReference,
            strength: input.strength,
        })
    );
});

test('qualification UI schema group is created successfully', () => {
    const input = faker.fhirR4.medicationIngredient();
    const data = ingredient.parse(input);
    const schema = ingredient.uiSchemaGroup(data, testUiSchemaContext());
    expect(schema.label).toBe(message('r4.zib_pharmaceutical_product.ingredient'));
});
