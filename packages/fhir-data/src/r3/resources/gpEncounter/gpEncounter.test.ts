import { expectJson, testUiSchemaContext } from '$test';
import { type Encounter } from 'fhir/r3';
import { test } from 'vitest';
import input01 from './fixtures/01/fhir-resource.json';
import { gpEncounter } from './gpEncounter';

test('returns the expected output 01', async () => {
    const output = gpEncounter.parse(input01 as Encounter);
    await expectJson(output).toMatchFileSnapshot('./fixtures/01/mgo-resource.snap.json');
});

test('uiSchema returns the expected output 01', async () => {
    const output = gpEncounter.parse(input01 as Encounter);
    const uiSchema = gpEncounter.uiSchema(output, testUiSchemaContext());
    await expectJson(uiSchema).toMatchFileSnapshot('./fixtures/01/ui-schema.snap.json');
});
