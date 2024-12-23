import { expectJson, testUiSchemaContext, faker } from '$test';
import { test } from 'vitest';
import input01 from './fixtures/01/fhir-resource.json';
import { gpEncounterReport } from './gpEncounterReport';
import { type Composition } from 'fhir/r3';

test('returns the expected output 01', () => {
    const output = gpEncounterReport.parse(input01 as Composition, faker.custom.i18nContext());
    expectJson(output).toMatchFileSnapshot('./fixtures/01/mgo-resource.snap.json');
});

test('uiSchema returns the expected output 01', () => {
    const output = gpEncounterReport.parse(input01 as Composition, faker.custom.i18nContext());
    const uiSchema = gpEncounterReport.uiSchema(
        output,
        testUiSchemaContext({
            ignoreMissingTranslations: true,
        })
    );
    expectJson(uiSchema).toMatchFileSnapshot('./fixtures/01/ui-schema.snap.json');
});
