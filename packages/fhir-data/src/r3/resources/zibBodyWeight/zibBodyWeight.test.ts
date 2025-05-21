import { expectHealthCareUiSchemaJson, expectJson, testUiSchemaContext } from '$test';
import { type Observation } from 'fhir/r3';
import { test } from 'vitest';
import inputFhirData01 from './fixtures/fhir-resource.json';
import { zibBodyWeight } from './zibBodyWeight';

test('01 mgo-resource', async () => {
    const output = zibBodyWeight.parse(inputFhirData01 as Observation);
    await expectJson(output).toMatchFileSnapshot('./fixtures/mgo-resource.snap.json');
});

test('01: ui-schema', async () => {
    const mgoResource = zibBodyWeight.parse(inputFhirData01 as Observation);
    const uiSchema = zibBodyWeight.uiSchema(mgoResource, testUiSchemaContext());
    await expectHealthCareUiSchemaJson(uiSchema).toMatchFileSnapshot(
        './fixtures/ui-schema.snap.json'
    );
});
