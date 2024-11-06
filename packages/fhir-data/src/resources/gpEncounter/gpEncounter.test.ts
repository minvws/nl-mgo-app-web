import { expectJson } from '$test';
import { test } from 'vitest';
import { type Encounter } from '../../fhir';
import input01 from './fixtures/01/fhir-resource.json';
import { gpEncounter } from './gpEncounter';

test('returns the expected output 01', () => {
    const output = gpEncounter.parse(input01 as Encounter);
    expectJson(output).toMatchFileSnapshot('./fixtures/01/mgo-resource.snap.json');
});

test('uiSchema returns the expected output 01', () => {
    const output = gpEncounter.parse(input01 as Encounter);
    const uiSchema = gpEncounter.uiSchema(output);
    expectJson(uiSchema).toMatchFileSnapshot('./fixtures/01/ui-schema.snap.json');
});
