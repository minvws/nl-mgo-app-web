import { expectJson, testUiSchemaContext, faker } from '$test';
import { test } from 'vitest';
import { type Encounter } from 'fhir/r3';
import input01 from './fixtures/01/fhir-resource.json';
import input02 from './fixtures/02/fhir-resource.json';
import input03 from './fixtures/03/fhir-resource.json';
import { zibEncounter } from './zibEncounter';

test('returns the expected output 01', () => {
    const output = zibEncounter.parse(input01 as Encounter, faker.custom.i18nContext());
    expectJson(output).toMatchFileSnapshot('./fixtures/01/mgo-resource.snap.json');
});

test('returns the expected output 02', () => {
    const output = zibEncounter.parse(input02 as Encounter, faker.custom.i18nContext());
    expectJson(output).toMatchFileSnapshot('./fixtures/02/mgo-resource.snap.json');
});

test('returns the expected output 03', () => {
    const output = zibEncounter.parse(input03 as Encounter, faker.custom.i18nContext());
    expectJson(output).toMatchFileSnapshot('./fixtures/03/mgo-resource.snap.json');
});

test('uiSchema returns the expected output 01', () => {
    const output = zibEncounter.parse(input01 as Encounter, faker.custom.i18nContext());
    const uiSchema = zibEncounter.uiSchema(
        output,
        testUiSchemaContext({
            ignoreMissingTranslations: true,
        })
    );
    expectJson(uiSchema).toMatchFileSnapshot('./fixtures/01/ui-schema.snap.json');
});

test('uiSchema returns the expected output 02', () => {
    const output = zibEncounter.parse(input02 as Encounter, faker.custom.i18nContext());
    const uiSchema = zibEncounter.uiSchema(
        output,
        testUiSchemaContext({
            ignoreMissingTranslations: true,
        })
    );
    expectJson(uiSchema).toMatchFileSnapshot('./fixtures/02/ui-schema.snap.json');
});

test('uiSchema returns the expected output 03', () => {
    const output = zibEncounter.parse(input03 as Encounter, faker.custom.i18nContext());
    const uiSchema = zibEncounter.uiSchema(
        output,
        testUiSchemaContext({
            ignoreMissingTranslations: true,
        })
    );
    expectJson(uiSchema).toMatchFileSnapshot('./fixtures/03/ui-schema.snap.json');
});
