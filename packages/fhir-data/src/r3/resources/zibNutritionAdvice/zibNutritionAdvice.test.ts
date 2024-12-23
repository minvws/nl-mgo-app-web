import input from './fixtures/fhir-resource.json';

import { expectJson, testUiSchemaContext, faker } from '$test';
import { test } from 'vitest';
import { type NutritionOrder } from 'fhir/r3';
import { zibNutritionAdvice } from './zibNutritionAdvice';

test('returns the expected output', () => {
    const output = zibNutritionAdvice.parse(input as NutritionOrder, faker.custom.i18nContext());
    expectJson(output).toMatchFileSnapshot('./fixtures/mgo-resource.snap.json');
});

test('uiSchema returns the expected output', () => {
    const output = zibNutritionAdvice.parse(input as NutritionOrder, faker.custom.i18nContext());
    const uiSchema = zibNutritionAdvice.uiSchema(
        output,
        testUiSchemaContext({
            ignoreMissingTranslations: true,
        })
    );
    expectJson(uiSchema).toMatchFileSnapshot('./fixtures/ui-schema.snap.json');
});
