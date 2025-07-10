import { expectHealthCareUiSchemaJson, expectJson, testUiSchemaContext } from '$test';
import { type Location } from 'fhir/r4';
import { test } from 'vitest';
import input1 from './fixtures/01/fhir-resource.json';
import input2 from './fixtures/02/fhir-resource.json';
import { nlCoreHealthcareProvider } from './nlCoreHealthcareProvider';

test('01: mgo-resource', async () => {
    const output = nlCoreHealthcareProvider.parse(input1 as Location);
    await expectJson(output).toMatchFileSnapshot('./fixtures/01/mgo-resource.snap.json');
});

test('01: ui-schema', async () => {
    const output = nlCoreHealthcareProvider.parse(input1 as Location);
    const uiSchema = nlCoreHealthcareProvider.uiSchema(output, testUiSchemaContext());
    await expectHealthCareUiSchemaJson(uiSchema).toMatchFileSnapshot(
        './fixtures/01/ui-schema.snap.json'
    );
});

test('02: mgo-resource', async () => {
    const output = nlCoreHealthcareProvider.parse(input2 as Location);
    await expectJson(output).toMatchFileSnapshot('./fixtures/02/mgo-resource.snap.json');
});

test('02: ui-schema', async () => {
    const output = nlCoreHealthcareProvider.parse(input2 as Location);
    const uiSchema = nlCoreHealthcareProvider.uiSchema(output, testUiSchemaContext());
    await expectHealthCareUiSchemaJson(uiSchema).toMatchFileSnapshot(
        './fixtures/02/ui-schema.snap.json'
    );
});
