import input1 from './fixtures/01/fhir-resource.json';

import { expectJson } from '$test';
import { test } from 'vitest';
import { type ImmunizationRecommendation } from '../../fhir';
import { zibVaccinationRecommendation } from './zibVaccinationRecommendation';

test('returns the expected output 01', () => {
    const output = zibVaccinationRecommendation.parse(input1 as ImmunizationRecommendation);
    expectJson(output).toMatchFileSnapshot('./fixtures/01/mgo-resource.snap.json');
});

test('uiSchema 01 returns the expected output', () => {
    const output = zibVaccinationRecommendation.parse(input1 as ImmunizationRecommendation);
    const uiSchema = zibVaccinationRecommendation.uiSchema(output);
    expectJson(uiSchema).toMatchFileSnapshot('./fixtures/01/ui-schema.snap.json');
});
