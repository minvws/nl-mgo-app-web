import { expectHealthCareUiSchemaJson, expectJson, testSchemaContext } from '$test';
import { type Observation } from '@minvws/mgo-fhir/r3';
import { test } from 'vitest';
import inputFhirData01 from './fixtures/fhir-resource.json' with { type: 'json' };
import { zibBodyHeight } from './zibBodyHeight.js';

test('01: mgo-resource', async () => {
    const output = zibBodyHeight.parse(inputFhirData01 as Observation);
    await expectJson(output).toMatchFileSnapshot('./fixtures/mgo-resource.snap.json');
});

test('01: ui-schema', async () => {
    const mgoResource = zibBodyHeight.parse(inputFhirData01 as Observation);
    const uiSchema = zibBodyHeight.uiSchema(mgoResource, testSchemaContext());
    await expectHealthCareUiSchemaJson(uiSchema).toMatchFileSnapshot(
        './fixtures/ui-schema.snap.json'
    );
});
