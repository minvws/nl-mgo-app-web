import { expectJson, testUiSchemaContext } from '$test';
import { type Encounter } from 'fhir/r3';
import { expect, test } from 'vitest';
import input01 from './fixtures/01/fhir-resource.json';
import input02 from './fixtures/02/fhir-resource.json';
import input03 from './fixtures/03/fhir-resource.json';
import { zibEncounter } from './zibEncounter';
import { message } from '$test/i18n';
import { i18n } from './uiSchema';

test('returns the expected output 01', () => {
    const output = zibEncounter.parse(input01 as Encounter);
    expectJson(output).toMatchFileSnapshot('./fixtures/01/mgo-resource.snap.json');
});

test('returns the expected output 02', () => {
    const output = zibEncounter.parse(input02 as Encounter);
    expectJson(output).toMatchFileSnapshot('./fixtures/02/mgo-resource.snap.json');
});

test('returns the expected output 03', () => {
    const output = zibEncounter.parse(input03 as Encounter);
    expectJson(output).toMatchFileSnapshot('./fixtures/03/mgo-resource.snap.json');
});

test('uiSchema returns the expected output 01', () => {
    const output = zibEncounter.parse(input01 as Encounter);
    const uiSchema = zibEncounter.uiSchema(
        output,
        testUiSchemaContext({
            ignoreMissingTranslations: true,
        })
    );
    expectJson(uiSchema).toMatchFileSnapshot('./fixtures/01/ui-schema.snap.json');
});

test('uiSchema returns the expected output 02', () => {
    const output = zibEncounter.parse(input02 as Encounter);
    const uiSchema = zibEncounter.uiSchema(
        output,
        testUiSchemaContext({
            ignoreMissingTranslations: true,
        })
    );
    expectJson(uiSchema).toMatchFileSnapshot('./fixtures/02/ui-schema.snap.json');
});

test('uiSchema returns the expected output 03', () => {
    const output = zibEncounter.parse(input03 as Encounter);
    const uiSchema = zibEncounter.uiSchema(
        output,
        testUiSchemaContext({
            ignoreMissingTranslations: true,
        })
    );
    expectJson(uiSchema).toMatchFileSnapshot('./fixtures/03/ui-schema.snap.json');
});

test('uiSchema returns default label if serviceProvider not supplied', () => {
    const output = zibEncounter.parse(input01 as Encounter);
    output.serviceProvider = undefined;
    const uiSchema = zibEncounter.uiSchema(
        output,
        testUiSchemaContext({
            ignoreMissingTranslations: true,
        })
    );
    expect(uiSchema.label).toBe(message(i18n));
});
