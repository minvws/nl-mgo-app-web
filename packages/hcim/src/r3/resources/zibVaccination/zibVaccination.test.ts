import { expectHealthCareUiSchemaJson, expectJson, testSchemaContext } from '$test';
import { type Immunization } from '@minvws/mgo-fhir/r3';
import { test } from 'vitest';
import inputFhirData01 from './fixtures/01/fhir-resource.json' with { type: 'json' };
import inputFhirData02 from './fixtures/02/fhir-resource.json' with { type: 'json' };
import { zibVaccination } from './zibVaccination.js';

test('01: mgo-resource', async () => {
    const output = zibVaccination.parse(inputFhirData01 as Immunization);
    await expectJson(output).toMatchFileSnapshot('./fixtures/01/mgo-resource.snap.json');
});

test('01: ui-schema1', async () => {
    const mgoResource = zibVaccination.parse(inputFhirData01 as Immunization);
    const uiSchema = zibVaccination.uiSchema(mgoResource, testSchemaContext());
    await expectHealthCareUiSchemaJson(uiSchema).toMatchFileSnapshot(
        './fixtures/01/ui-schema.snap.json'
    );
});

test('02: mgo-resource', async () => {
    const output = zibVaccination.parse(inputFhirData02 as Immunization);
    await expectJson(output).toMatchFileSnapshot('./fixtures/02/mgo-resource.snap.json');
});

test('02: ui-schema', async () => {
    const mgoResource = zibVaccination.parse(inputFhirData02 as Immunization);
    const uiSchema = zibVaccination.uiSchema(mgoResource, testSchemaContext());
    await expectHealthCareUiSchemaJson(uiSchema).toMatchFileSnapshot(
        './fixtures/02/ui-schema.snap.json'
    );
});
