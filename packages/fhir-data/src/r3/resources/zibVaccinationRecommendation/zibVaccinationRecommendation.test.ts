import { expectJson, testUiSchemaContext } from '$test';
import { fhirMessage } from '@minvws/mgo-mgo-intl/test';
import { type ImmunizationRecommendation } from 'fhir/r3';
import { expect, test } from 'vitest';
import input1 from './fixtures/01/fhir-resource.json';
import { i18n } from './uiSchema';
import { zibVaccinationRecommendation } from './zibVaccinationRecommendation';

test('returns the expected output 01', () => {
    const output = zibVaccinationRecommendation.parse(input1 as ImmunizationRecommendation);
    expectJson(output).toMatchFileSnapshot('./fixtures/01/mgo-resource.snap.json');
});

test('uiSchema 01 returns the expected output', () => {
    const output = zibVaccinationRecommendation.parse(input1 as ImmunizationRecommendation);
    const uiSchema = zibVaccinationRecommendation.uiSchema(
        output,
        testUiSchemaContext({
            ignoreMissingTranslations: true,
        })
    );
    expectJson(uiSchema).toMatchFileSnapshot('./fixtures/01/ui-schema.snap.json');
});

test('uiSchema returns default label if recommendation not supplied', () => {
    const output = zibVaccinationRecommendation.parse(input1 as ImmunizationRecommendation);
    output.recommendation = undefined;
    const uiSchema = zibVaccinationRecommendation.uiSchema(
        output,
        testUiSchemaContext({
            ignoreMissingTranslations: true,
        })
    );
    expect(uiSchema.label).toBe(fhirMessage(i18n));
});
