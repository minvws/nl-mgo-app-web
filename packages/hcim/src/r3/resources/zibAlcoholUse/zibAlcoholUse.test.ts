import { expectHealthCareUiSchemaJson, expectJson, testSchemaContext } from '$test';
import { type Observation } from 'fhir/r3';
import { test } from 'vitest';
import input from './fixtures/fhir-resource.json';
import { zibAlcoholUse } from './zibAlcoholUse';

test('01: mgo-resource', async () => {
    const output = zibAlcoholUse.parse(input as Observation);
    await expectJson(output).toMatchFileSnapshot('./fixtures/mgo-resource.snap.json');
});

test('01: ui-schema', async () => {
    const mgoResource = zibAlcoholUse.parse(input as Observation);
    const uiSchema = zibAlcoholUse.uiSchema(mgoResource, testSchemaContext());
    await expectHealthCareUiSchemaJson(uiSchema).toMatchFileSnapshot(
        './fixtures/ui-schema.snap.json'
    );
});
