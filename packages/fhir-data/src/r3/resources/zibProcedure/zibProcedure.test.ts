import { expectHealthCareUiSchemaJson, expectJson, testUiSchemaContext } from '$test';
import { type Procedure } from 'fhir/r3';
import { test } from 'vitest';
import inputFhirData01 from './fixtures/01/fhir-resource.json';
import inputFhirData02 from './fixtures/02/fhir-resource.json';
import { zibProcedure } from './zibProcedure';

test('01: mgo-resource', async () => {
    const output = zibProcedure.parse(inputFhirData01 as Procedure);
    await expectJson(output).toMatchFileSnapshot('./fixtures/01/mgo-resource.snap.json');
});

test('01: ui-schema', async () => {
    const mgoResource = zibProcedure.parse(inputFhirData01 as Procedure);
    const uiSchema = zibProcedure.uiSchema(mgoResource, testUiSchemaContext());
    await expectHealthCareUiSchemaJson(uiSchema).toMatchFileSnapshot(
        './fixtures/01/ui-schema.snap.json'
    );
});

test('02: mgo-resource', async () => {
    const output = zibProcedure.parse(inputFhirData02 as Procedure);
    await expectJson(output).toMatchFileSnapshot('./fixtures/02/mgo-resource.snap.json');
});

test('uiSchema returns the expected output 02', async () => {
    const mgoResource = zibProcedure.parse(inputFhirData02 as Procedure);
    const uiSchema = zibProcedure.uiSchema(mgoResource, testUiSchemaContext());
    await expectHealthCareUiSchemaJson(uiSchema).toMatchFileSnapshot(
        './fixtures/02/ui-schema.snap.json'
    );
});
