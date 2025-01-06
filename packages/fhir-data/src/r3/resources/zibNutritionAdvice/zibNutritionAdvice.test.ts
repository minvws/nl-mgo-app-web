import { expectJson, testUiSchemaContext } from '$test';
import { type NutritionOrder } from 'fhir/r3';
import { test } from 'vitest';
import input from './fixtures/fhir-resource.json';
import { zibNutritionAdvice } from './zibNutritionAdvice';

test('returns the expected output', () => {
    const output = zibNutritionAdvice.parse(input as NutritionOrder);
    expectJson(output).toMatchFileSnapshot('./fixtures/mgo-resource.snap.json');
});

test('uiSchema returns the expected output', () => {
    const output = zibNutritionAdvice.parse(input as NutritionOrder);
    const uiSchema = zibNutritionAdvice.uiSchema(
        output,
        testUiSchemaContext({
            ignoreMissingTranslations: true,
        })
    );
    expectJson(uiSchema).toMatchFileSnapshot('./fixtures/ui-schema.snap.json');
});
