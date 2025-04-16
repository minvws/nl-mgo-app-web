import { expectHealthCareUiSchemaJson, expectJson, testUiSchemaContext } from '$test';
import { type Consent } from 'fhir/r3';
import { test } from 'vitest';
import inputFhirData01 from './fixtures/01/fhir-resource.json';
import inputFhirData02 from './fixtures/02/fhir-resource.json';
import { zibTreatmentDirective } from './zibTreatmentDirective';

test('01: mgo-resource', async () => {
    const output = zibTreatmentDirective.parse(inputFhirData01 as Consent);
    await expectJson(output).toMatchFileSnapshot('./fixtures/01/mgo-resource.snap.json');
});

test('01: ui-schema', async () => {
    const mgoResource = zibTreatmentDirective.parse(inputFhirData01 as Consent);
    const schema = zibTreatmentDirective.uiSchema(mgoResource, testUiSchemaContext());
    await expectHealthCareUiSchemaJson(schema).toMatchFileSnapshot(
        './fixtures/01/ui-schema.snap.json'
    );
});

test('02: mgo-resource', async () => {
    const output = zibTreatmentDirective.parse(inputFhirData02 as Consent);
    await expectJson(output).toMatchFileSnapshot('./fixtures/02/mgo-resource.snap.json');
});

test('02: ui-schema', async () => {
    const mgoResource = zibTreatmentDirective.parse(inputFhirData02 as Consent);
    const schema = zibTreatmentDirective.uiSchema(mgoResource, testUiSchemaContext());
    await expectHealthCareUiSchemaJson(schema).toMatchFileSnapshot(
        './fixtures/02/ui-schema.snap.json'
    );
});
