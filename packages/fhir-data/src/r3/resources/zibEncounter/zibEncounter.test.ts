import { expectHealthCareUiSchemaJson, expectJson, testUiSchemaContext } from '$test';
import { type Encounter } from 'fhir/r3';
import { test } from 'vitest';
import input01 from './fixtures/01/fhir-resource.json';
import input02 from './fixtures/02/fhir-resource.json';
import input03 from './fixtures/03/fhir-resource.json';
import { zibEncounter } from './zibEncounter';

test('01: mgo-resource', async () => {
    const output = zibEncounter.parse(input01 as Encounter);
    await expectJson(output).toMatchFileSnapshot('./fixtures/01/mgo-resource.snap.json');
});

test('02: mgo-resource', async () => {
    const output = zibEncounter.parse(input02 as Encounter);
    await expectJson(output).toMatchFileSnapshot('./fixtures/02/mgo-resource.snap.json');
});

test('03: mgo-resource', async () => {
    const output = zibEncounter.parse(input03 as Encounter);
    await expectJson(output).toMatchFileSnapshot('./fixtures/03/mgo-resource.snap.json');
});

test('01: ui-schema', async () => {
    const mgoResource = zibEncounter.parse(input01 as Encounter);
    const uiSchema = zibEncounter.uiSchema(mgoResource, testUiSchemaContext());
    await expectHealthCareUiSchemaJson(uiSchema).toMatchFileSnapshot(
        './fixtures/01/ui-schema.snap.json'
    );
});

test('02: ui-schema', async () => {
    const mgoResource = zibEncounter.parse(input02 as Encounter);
    const uiSchema = zibEncounter.uiSchema(mgoResource, testUiSchemaContext());
    await expectHealthCareUiSchemaJson(uiSchema).toMatchFileSnapshot(
        './fixtures/02/ui-schema.snap.json'
    );
});

test('03: ui-schema', async () => {
    const mgoResource = zibEncounter.parse(input03 as Encounter);
    const uiSchema = zibEncounter.uiSchema(mgoResource, testUiSchemaContext());
    await expectHealthCareUiSchemaJson(uiSchema).toMatchFileSnapshot(
        './fixtures/03/ui-schema.snap.json'
    );
});
