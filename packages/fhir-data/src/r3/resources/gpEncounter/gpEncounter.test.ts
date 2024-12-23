import { expectJson, testUiSchemaContext, faker } from '$test';
import { type Encounter } from 'fhir/r3';
import { test } from 'vitest';
import input01 from './fixtures/01/fhir-resource.json';
import { gpEncounter } from './gpEncounter';

test('returns the expected output 01', () => {
    const output = gpEncounter.parse(input01 as Encounter, faker.custom.i18nContext());
    expectJson(output).toMatchFileSnapshot('./fixtures/01/mgo-resource.snap.json');
});

test('uiSchema returns the expected output 01', () => {
    const output = gpEncounter.parse(input01 as Encounter, faker.custom.i18nContext());
    const uiSchema = gpEncounter.uiSchema(
        output,
        testUiSchemaContext({
            ignoreMissingTranslations: true,
        })
    );
    expectJson(uiSchema).toMatchFileSnapshot('./fixtures/01/ui-schema.snap.json');
});
