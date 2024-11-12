import { expectJson } from '$test';
import { test } from 'vitest';
import { type PractitionerRole } from 'fhir/r3';
import input01 from './fixtures/01/fhir-resource.json';
import input02 from './fixtures/02/fhir-resource.json';
import input03 from './fixtures/03/fhir-resource.json';
import input04 from './fixtures/04/fhir-resource.json';
import { nlCorePractitionerRole } from './nlCorePractitionerRole';

test('returns the expected output 01', () => {
    const output = nlCorePractitionerRole.parse(input01 as PractitionerRole);
    expectJson(output).toMatchFileSnapshot('./fixtures/01/mgo-resource.snap.json');
});

test('returns the expected output 02', () => {
    const output = nlCorePractitionerRole.parse(input02 as PractitionerRole);
    expectJson(output).toMatchFileSnapshot('./fixtures/02/mgo-resource.snap.json');
});

test('returns the expected output 03', () => {
    const output = nlCorePractitionerRole.parse(input03 as PractitionerRole);
    expectJson(output).toMatchFileSnapshot('./fixtures/03/mgo-resource.snap.json');
});

test('returns the expected output 04', () => {
    const output = nlCorePractitionerRole.parse(input04 as PractitionerRole);
    expectJson(output).toMatchFileSnapshot('./fixtures/04/mgo-resource.snap.json');
});

test('returns the expected output 05', () => {
    const output = nlCorePractitionerRole.parse(input04 as PractitionerRole);
    expectJson(output).toMatchFileSnapshot('./fixtures/05/mgo-resource.snap.json');
});

test('uiSchema returns the expected output 01', () => {
    const output = nlCorePractitionerRole.parse(input01 as PractitionerRole);
    const uiSchema = nlCorePractitionerRole.uiSchema(output);
    expectJson(uiSchema).toMatchFileSnapshot('./fixtures/01/ui-schema.snap.json');
});

test('uiSchema returns the expected output 02', () => {
    const output = nlCorePractitionerRole.parse(input02 as PractitionerRole);
    const uiSchema = nlCorePractitionerRole.uiSchema(output);
    expectJson(uiSchema).toMatchFileSnapshot('./fixtures/02/ui-schema.snap.json');
});

test('uiSchema returns the expected output 03', () => {
    const output = nlCorePractitionerRole.parse(input03 as PractitionerRole);
    const uiSchema = nlCorePractitionerRole.uiSchema(output);
    expectJson(uiSchema).toMatchFileSnapshot('./fixtures/03/ui-schema.snap.json');
});

test('uiSchema returns the expected output 04', () => {
    const output = nlCorePractitionerRole.parse(input04 as PractitionerRole);
    const uiSchema = nlCorePractitionerRole.uiSchema(output);
    expectJson(uiSchema).toMatchFileSnapshot('./fixtures/04/ui-schema.snap.json');
});

test('uiSchema returns the expected output 05', () => {
    const output = nlCorePractitionerRole.parse(input04 as PractitionerRole);
    const uiSchema = nlCorePractitionerRole.uiSchema(output);
    expectJson(uiSchema).toMatchFileSnapshot('./fixtures/05/ui-schema.snap.json');
});
