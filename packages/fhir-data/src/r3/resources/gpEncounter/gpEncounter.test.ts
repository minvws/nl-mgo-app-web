import { expectJson, testUiSchemaContext } from '$test';
import { type Encounter } from 'fhir/r3';
import { expect, test } from 'vitest';
import input01 from './fixtures/01/fhir-resource.json';
import { gpEncounter } from './gpEncounter';
import { message } from '$test/i18n';
import { i18n } from './uiSchema';

test('returns the expected output 01', () => {
    const output = gpEncounter.parse(input01 as Encounter);
    expectJson(output).toMatchFileSnapshot('./fixtures/01/mgo-resource.snap.json');
});

test('uiSchema returns the expected output 01', () => {
    const output = gpEncounter.parse(input01 as Encounter);
    const uiSchema = gpEncounter.uiSchema(
        output,
        testUiSchemaContext({
            ignoreMissingTranslations: true,
        })
    );
    expectJson(uiSchema).toMatchFileSnapshot('./fixtures/01/ui-schema.snap.json');
});

test('uiSchema returns default label if context not supplied', () => {
    const output = gpEncounter.parse(input01 as Encounter);
    output.serviceProvider = undefined;
    const uiSchema = gpEncounter.uiSchema(
        output,
        testUiSchemaContext({
            ignoreMissingTranslations: true,
        })
    );
    expect(uiSchema.label).toBe(message(i18n));
});
