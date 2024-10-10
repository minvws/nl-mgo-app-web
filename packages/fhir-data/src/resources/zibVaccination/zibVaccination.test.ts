import { expectJson } from '$test';
import { test } from 'vitest';
import { type Immunization } from '../../fhir';
import { zibVaccination } from './zibVaccination';
import input01 from './fixtures/01/fhir-resource.json';
import input02 from './fixtures/02/fhir-resource.json';

test('returns the expected output 01', () => {
    const output = zibVaccination.parse(input01 as Immunization);
    expectJson(output).toMatchFileSnapshot('./fixtures/01/mgo-resource.snap.json');
});

test('returns the expected output 02', () => {
    const output = zibVaccination.parse(input02 as Immunization);
    expectJson(output).toMatchFileSnapshot('./fixtures/02/mgo-resource.snap.json');
});

test('uiSchema returns the expected output 01', () => {
    const output = zibVaccination.parse(input01 as Immunization);
    const uiSchema = zibVaccination.uiSchema(output);
    expectJson(uiSchema).toMatchFileSnapshot('./fixtures/01/ui-schema.snap.json');
});

test('uiSchema returns the expected output 02', () => {
    const output = zibVaccination.parse(input02 as Immunization);
    const uiSchema = zibVaccination.uiSchema(output);
    expectJson(uiSchema).toMatchFileSnapshot('./fixtures/02/ui-schema.snap.json');
});
