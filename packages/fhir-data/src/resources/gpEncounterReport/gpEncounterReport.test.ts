import { expectJson } from '$test';
import { test } from 'vitest';
import { type Composition } from '../../fhir';
import input01 from './fixtures/01/fhir-resource.json';
import { gpEncounterReport } from './gpEncounterReport';

test('returns the expected output 01', () => {
    const output = gpEncounterReport.parse(input01 as Composition);
    expectJson(output).toMatchFileSnapshot('./fixtures/01/mgo-resource.snap.json');
});

test('uiSchema returns the expected output 01', () => {
    const output = gpEncounterReport.parse(input01 as Composition);
    const uiSchema = gpEncounterReport.uiSchema(output);
    expectJson(uiSchema).toMatchFileSnapshot('./fixtures/01/ui-schema.snap.json');
});
