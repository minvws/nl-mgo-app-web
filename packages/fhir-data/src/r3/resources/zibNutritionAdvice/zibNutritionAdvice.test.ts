import { expectJson, testUiSchemaContext } from '$test';
import { type NutritionOrder } from 'fhir/r3';
import { expect, test } from 'vitest';
import input from './fixtures/fhir-resource.json';
import { zibNutritionAdvice } from './zibNutritionAdvice';
import { message } from '$test/i18n';
import { i18n } from './uiSchema';

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

test('uiSchema returns default label if identifier not supplied', () => {
    const output = zibNutritionAdvice.parse(input as NutritionOrder);
    output.identifier = undefined;
    const uiSchema = zibNutritionAdvice.uiSchema(
        output,
        testUiSchemaContext({
            ignoreMissingTranslations: true,
        })
    );
    expect(uiSchema.label).toBe(message(i18n));
});
