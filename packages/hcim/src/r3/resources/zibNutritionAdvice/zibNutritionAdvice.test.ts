import { expectHealthCareUiSchemaJson, expectJson, testSchemaContext } from '$test';
import { type NutritionOrder } from '@minvws/mgo-fhir/r3';
import { test } from 'vitest';
import inputFHIRData01 from './fixtures/01/fhir-resource.json' with { type: 'json' };
import inputFHIRData02 from './fixtures/02/fhir-resource.json' with { type: 'json' };
import { zibNutritionAdvice } from './zibNutritionAdvice.js';

test('01: mgo-resource', async () => {
    const output = zibNutritionAdvice.parse(inputFHIRData01 as NutritionOrder);
    await expectJson(output).toMatchFileSnapshot('./fixtures/01/mgo-resource.snap.json');
});

test('01: ui-schema', async () => {
    const mgoResource = zibNutritionAdvice.parse(inputFHIRData01 as NutritionOrder);
    const uiSchema = zibNutritionAdvice.uiSchema(mgoResource, testSchemaContext());
    await expectHealthCareUiSchemaJson(uiSchema).toMatchFileSnapshot(
        './fixtures/01/ui-schema.snap.json'
    );
});

test('02: mgo-resource', async () => {
    const output = zibNutritionAdvice.parse(inputFHIRData02 as NutritionOrder);
    await expectJson(output).toMatchFileSnapshot('./fixtures/02/mgo-resource.snap.json');
});

test('02: ui-schema', async () => {
    const mgoResource = zibNutritionAdvice.parse(inputFHIRData02 as NutritionOrder);
    const uiSchema = zibNutritionAdvice.uiSchema(mgoResource, testSchemaContext());
    await expectHealthCareUiSchemaJson(uiSchema).toMatchFileSnapshot(
        './fixtures/02/ui-schema.snap.json'
    );
});
