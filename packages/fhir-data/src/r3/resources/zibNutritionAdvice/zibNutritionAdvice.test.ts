import { expectJson, testUiSchemaContext } from '$test';
import { fhirMessage } from '@minvws/mgo-mgo-intl/test';
import { type NutritionOrder } from 'fhir/r3';
import { expect, test } from 'vitest';
import input from './fixtures/fhir-resource.json';
import { i18n } from './uiSchema';
import { zibNutritionAdvice } from './zibNutritionAdvice';

test('returns the expected output', async () => {
    const output = zibNutritionAdvice.parse(input as NutritionOrder);
    await expectJson(output).toMatchFileSnapshot('./fixtures/mgo-resource.snap.json');
});

test('uiSchema returns the expected output', async () => {
    const output = zibNutritionAdvice.parse(input as NutritionOrder);
    const uiSchema = zibNutritionAdvice.uiSchema(
        output,
        testUiSchemaContext({
            ignoreMissingTranslations: true,
        })
    );
    await expectJson(uiSchema).toMatchFileSnapshot('./fixtures/ui-schema.snap.json');
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
    expect(uiSchema.label).toBe(fhirMessage(i18n));
});
