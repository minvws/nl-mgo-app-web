import { expectHealthCareUiSchemaJson, expectJson, testSchemaContext } from '$test';
import { type ImmunizationRecommendation } from '@minvws/mgo-fhir/r3';
import { test } from 'vitest';
import inputFhirData01 from './fixtures/01/fhir-resource.json' with { type: 'json' };
import { zibVaccinationRecommendation } from './zibVaccinationRecommendation.js';

test('01: mgo-resource', async () => {
    const output = zibVaccinationRecommendation.parse(
        inputFhirData01 as ImmunizationRecommendation
    );
    await expectJson(output).toMatchFileSnapshot('./fixtures/01/mgo-resource.snap.json');
});

test('01: ui-schema', async () => {
    const mgoResource = zibVaccinationRecommendation.parse(
        inputFhirData01 as ImmunizationRecommendation
    );
    const uiSchema = zibVaccinationRecommendation.uiSchema(mgoResource, testSchemaContext());
    await expectHealthCareUiSchemaJson(uiSchema).toMatchFileSnapshot(
        './fixtures/01/ui-schema.snap.json'
    );
});
