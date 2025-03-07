import { expectJson, testUiSchemaContext } from '$test';
import { fhirMessage } from '@minvws/mgo-mgo-intl/test';
import { type AllergyIntolerance } from 'fhir/r3';
import { expect, test } from 'vitest';
import input01 from './fixtures/zib-AllergyIntolerance-01.json';
import { i18n } from './uiSchema';
import { zibAllergyIntolerance } from './zibAllergyIntolerance';

test('parse returns the expected output 01', async () => {
    const output = zibAllergyIntolerance.parse(input01 as AllergyIntolerance);
    await expectJson(output).toMatchFileSnapshot(
        './fixtures/zib-AllergyIntolerance-01-output.snap.json'
    );
});

test('uiSchema returns the expected output', async () => {
    const output = zibAllergyIntolerance.parse(input01 as AllergyIntolerance);
    const zibUiSchema = zibAllergyIntolerance.uiSchema(
        output,
        testUiSchemaContext({
            ignoreMissingTranslations: true,
        })
    );
    await expectJson(zibUiSchema).toMatchFileSnapshot(
        './fixtures/zib-AllergyIntolerance-01-uiSchema.snap.json'
    );
});

test('uiSchema returns default label if identifier not supplied', () => {
    const output = zibAllergyIntolerance.parse(input01 as AllergyIntolerance);
    output.identifier = undefined;
    const uiSchema = zibAllergyIntolerance.uiSchema(
        output,
        testUiSchemaContext({
            ignoreMissingTranslations: true,
        })
    );
    expect(uiSchema.label).toBe(fhirMessage(i18n));
});
