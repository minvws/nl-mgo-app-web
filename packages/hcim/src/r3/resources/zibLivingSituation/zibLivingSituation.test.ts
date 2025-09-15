import { expectHealthCareUiSchemaJson, expectJson, testSchemaContext } from '$test';
import { type Observation } from '@minvws/mgo-fhir/r3';
import { test } from 'vitest';
import input from './fixtures/fhir-resource.json' with { type: 'json' };
import { zibLivingSituation } from './zibLivingSituation.js';

test('01: mgo-resource', async () => {
    const output = zibLivingSituation.parse(input as Observation);
    await expectJson(output).toMatchFileSnapshot('./fixtures/mgo-resource.snap.json');
});

test('01: ui-schema', async () => {
    const mgoResource = zibLivingSituation.parse(input as Observation);
    const uiSchema = zibLivingSituation.uiSchema(mgoResource, testSchemaContext());
    await expectHealthCareUiSchemaJson(uiSchema).toMatchFileSnapshot(
        './fixtures/ui-schema.snap.json'
    );
});
