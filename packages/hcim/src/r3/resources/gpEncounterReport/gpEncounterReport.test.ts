import { expectJson, testSchemaContext } from '$test';
import { type Composition } from '@minvws/mgo-fhir/r3';
import { test } from 'vitest';
import input01 from './fixtures/01/fhir-resource.json' with { type: 'json' };
import { gpEncounterReport } from './gpEncounterReport.js';

test('returns the expected output 01', async () => {
    const output = gpEncounterReport.parse(input01 as Composition);
    await expectJson(output).toMatchFileSnapshot('./fixtures/01/mgo-resource.snap.json');
});

test('uiSchema returns the expected output 01', async () => {
    const output = gpEncounterReport.parse(input01 as Composition);
    const uiSchema = gpEncounterReport.uiSchema(output, testSchemaContext());
    await expectJson(uiSchema).toMatchFileSnapshot('./fixtures/01/ui-schema.snap.json');
});
