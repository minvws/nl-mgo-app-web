import { expectJson } from '$test';
import { test } from 'vitest';
import { type Consent } from 'fhir/r3';
import input01 from './fixtures/01/fhir-resource.json';
import input02 from './fixtures/02/fhir-resource.json';
import input03 from './fixtures/03/fhir-resource.json';
import { zibAdvanceDirective } from './zibAdvanceDirective';

test('returns the expected output 01', () => {
    const output = zibAdvanceDirective.parse(input01 as Consent);
    expectJson(output).toMatchFileSnapshot('./fixtures/01/mgo-resource.snap.json');
});

test('returns the expected output 02', () => {
    const output = zibAdvanceDirective.parse(input02 as Consent);
    expectJson(output).toMatchFileSnapshot('./fixtures/02/mgo-resource.snap.json');
});

test('returns the expected output 03', () => {
    const output = zibAdvanceDirective.parse(input03 as Consent);
    expectJson(output).toMatchFileSnapshot('./fixtures/03/mgo-resource.snap.json');
});

test('uiSchema returns the expected output 01', () => {
    const output = zibAdvanceDirective.parse(input01 as Consent);
    const uiSchema = zibAdvanceDirective.uiSchema(output);
    expectJson(uiSchema).toMatchFileSnapshot('./fixtures/01/ui-schema.snap.json');
});

test('uiSchema returns the expected output 02', () => {
    const output = zibAdvanceDirective.parse(input02 as Consent);
    const uiSchema = zibAdvanceDirective.uiSchema(output);
    expectJson(uiSchema).toMatchFileSnapshot('./fixtures/02/ui-schema.snap.json');
});

test('uiSchema returns the expected output 03', () => {
    const output = zibAdvanceDirective.parse(input03 as Consent);
    const uiSchema = zibAdvanceDirective.uiSchema(output);
    expectJson(uiSchema).toMatchFileSnapshot('./fixtures/03/ui-schema.snap.json');
});
