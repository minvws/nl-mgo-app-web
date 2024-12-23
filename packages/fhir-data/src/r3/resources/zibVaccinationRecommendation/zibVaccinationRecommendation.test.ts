import input1 from './fixtures/01/fhir-resource.json';

import { expectJson, testUiSchemaContext, faker } from '$test';
import { test } from 'vitest';
import { zibVaccinationRecommendation } from './zibVaccinationRecommendation';
import { type ImmunizationRecommendation } from 'fhir/r3';

test('returns the expected output 01', () => {
    const output = zibVaccinationRecommendation.parse(
        input1 as ImmunizationRecommendation,
        faker.custom.i18nContext()
    );
    expectJson(output).toMatchFileSnapshot('./fixtures/01/mgo-resource.snap.json');
});

test('uiSchema 01 returns the expected output', () => {
    const output = zibVaccinationRecommendation.parse(
        input1 as ImmunizationRecommendation,
        faker.custom.i18nContext()
    );
    const uiSchema = zibVaccinationRecommendation.uiSchema(
        output,
        testUiSchemaContext({
            ignoreMissingTranslations: true,
        })
    );
    expectJson(uiSchema).toMatchFileSnapshot('./fixtures/01/ui-schema.snap.json');
});
