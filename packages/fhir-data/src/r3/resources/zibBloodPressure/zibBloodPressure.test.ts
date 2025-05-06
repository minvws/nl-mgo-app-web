import { expectHealthCareUiSchemaJson, expectJson, testUiSchemaContext } from '$test';
import { type Observation } from 'fhir/r3';
import { test } from 'vitest';
import inputFHIRData01 from './fixtures/01/fhir-resource.json';
import inputFHIRData02 from './fixtures/02/fhir-resource.json';
import { zibBloodPressure } from './zibBloodPressure';

test('01: mgo-resource', async () => {
    const output = zibBloodPressure.parse(inputFHIRData01 as Observation);
    await expectJson(output).toMatchFileSnapshot('./fixtures/01/mgo-resource.snap.json');
});

test('01: ui-schema', async () => {
    const mgoResource = zibBloodPressure.parse(inputFHIRData01 as Observation);
    const uiSchema = zibBloodPressure.uiSchema(mgoResource, testUiSchemaContext());
    await expectHealthCareUiSchemaJson(uiSchema).toMatchFileSnapshot(
        './fixtures/01/ui-schema.snap.json'
    );
});

test('02: mgo-resource', async () => {
    const output = zibBloodPressure.parse(inputFHIRData02 as Observation);
    await expectJson(output).toMatchFileSnapshot('./fixtures/02/mgo-resource.snap.json');
});

test('02: ui-schema', async () => {
    const mgoResource = zibBloodPressure.parse(inputFHIRData02 as Observation);
    const uiSchema = zibBloodPressure.uiSchema(mgoResource, testUiSchemaContext());
    await expectHealthCareUiSchemaJson(uiSchema).toMatchFileSnapshot(
        './fixtures/02/ui-schema.snap.json'
    );
});
