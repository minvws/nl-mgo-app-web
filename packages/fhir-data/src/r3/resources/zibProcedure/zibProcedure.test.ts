import { expectJson } from '$test';
import { test } from 'vitest';
import { type Procedure } from 'fhir/r3';
import input01 from './fixtures/01/fhir-resource.json';
import input02 from './fixtures/02/fhir-resource.json';
import { zibProcedure } from './zibProcedure';

test('returns the expected output 01', () => {
    const output = zibProcedure.parse(input01 as Procedure);
    expectJson(output).toMatchFileSnapshot('./fixtures/01/mgo-resource.snap.json');
});

test('returns the expected output 02', () => {
    const output = zibProcedure.parse(input02 as Procedure);
    expectJson(output).toMatchFileSnapshot('./fixtures/02/mgo-resource.snap.json');
});

test('uiSchema returns the expected output 01', () => {
    const output = zibProcedure.parse(input01 as Procedure);
    const uiSchema = zibProcedure.uiSchema(output);
    expectJson(uiSchema).toMatchFileSnapshot('./fixtures/01/ui-schema.snap.json');
});

test('uiSchema returns the expected output 02', () => {
    const output = zibProcedure.parse(input02 as Procedure);
    const uiSchema = zibProcedure.uiSchema(output);
    expectJson(uiSchema).toMatchFileSnapshot('./fixtures/02/ui-schema.snap.json');
});
