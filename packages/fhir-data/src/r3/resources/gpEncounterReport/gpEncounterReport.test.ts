import { expectJson, testUiSchemaContext } from '$test';
import { fhirMessage } from '@minvws/mgo-mgo-intl/test';
import { type Composition } from 'fhir/r3';
import { expect, test } from 'vitest';
import input01 from './fixtures/01/fhir-resource.json';
import { gpEncounterReport } from './gpEncounterReport';
import { i18n } from './uiSchema';

test('returns the expected output 01', async () => {
    const output = gpEncounterReport.parse(input01 as Composition);
    await expectJson(output).toMatchFileSnapshot('./fixtures/01/mgo-resource.snap.json');
});

test('uiSchema returns the expected output 01', async () => {
    const output = gpEncounterReport.parse(input01 as Composition);
    const uiSchema = gpEncounterReport.uiSchema(
        output,
        testUiSchemaContext({
            ignoreMissingTranslations: true,
        })
    );
    await expectJson(uiSchema).toMatchFileSnapshot('./fixtures/01/ui-schema.snap.json');
});

test('uiSchema returns default label if title not supplied', () => {
    const output = gpEncounterReport.parse(input01 as Composition);
    output.title = undefined;
    const uiSchema = gpEncounterReport.uiSchema(
        output,
        testUiSchemaContext({
            ignoreMissingTranslations: true,
        })
    );
    expect(uiSchema.label).toBe(fhirMessage(i18n));
});
