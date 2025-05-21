import { expectHealthCareUiSchemaJson, expectJson, testUiSchemaContext } from '$test';
import { type Dosage } from 'fhir/r3';
import { test } from 'vitest';
import inputFhirData01 from './fixtures/01/fhir-resource.json';
import inputFhirData02 from './fixtures/02/fhir-resource.json';
import { summary } from './summary';
import { uiSchemaGroup } from './uiSchemaGroup';
import { zibInstructionsForUse } from './zibInstructionsForUse';

test('01 mgo-resource', async () => {
    const output = zibInstructionsForUse.parse(inputFhirData01 as Dosage);
    await expectJson(output).toMatchFileSnapshot('./fixtures/01/mgo-resource.snap.json');
});

test('01 ui-schema', async () => {
    const zibData = zibInstructionsForUse.parse(inputFhirData01 as Dosage);
    const schema = uiSchemaGroup(zibData, testUiSchemaContext());
    await expectHealthCareUiSchemaJson(schema).toMatchFileSnapshot(
        './fixtures/01/ui-schema-group.snap.json'
    );
});

test('01 summary', async () => {
    const zibData = zibInstructionsForUse.parse(inputFhirData01 as Dosage);
    const schema = summary(zibData, testUiSchemaContext());
    await expectHealthCareUiSchemaJson(schema).toMatchFileSnapshot(
        './fixtures/01/summary.snap.json'
    );
});

test('02 mgo-resource', async () => {
    const output = zibInstructionsForUse.parse(inputFhirData02 as Dosage);
    await expectJson(output).toMatchFileSnapshot('./fixtures/02/mgo-resource.snap.json');
});

test('02 ui-schema', async () => {
    const zibData = zibInstructionsForUse.parse(inputFhirData02 as Dosage);
    const schema = uiSchemaGroup(zibData, testUiSchemaContext());
    await expectHealthCareUiSchemaJson(schema).toMatchFileSnapshot(
        './fixtures/02/ui-schema-group.snap.json'
    );
});

test('02 summary', async () => {
    const zibData = zibInstructionsForUse.parse(inputFhirData02 as Dosage);
    const schema = summary(zibData, testUiSchemaContext());
    await expectHealthCareUiSchemaJson(schema).toMatchFileSnapshot(
        './fixtures/02/summary.snap.json'
    );
});
