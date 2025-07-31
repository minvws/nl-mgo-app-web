import { expectHealthCareUiSchemaJson, expectJson, testSchemaContext } from '$test';
import { type Observation } from '@minvws/mgo-fhir/r3';
import { test } from 'vitest';
import input from './fixtures/fhir-resource.json' with { type: 'json' };
import { zibTobaccoUse } from './zibTobaccoUse.js';

test('01: mgo-resource', async () => {
    const output = zibTobaccoUse.parse(input as Observation);
    await expectJson(output).toMatchFileSnapshot('./fixtures/mgo-resource.snap.json');
});

test('01: ui-schema', async () => {
    const output = zibTobaccoUse.parse(input as Observation);
    const uiSchema = zibTobaccoUse.uiSchema(output, testSchemaContext());
    await expectHealthCareUiSchemaJson(uiSchema).toMatchFileSnapshot(
        './fixtures/ui-schema.snap.json'
    );
});
