import input01 from './fixtures/zib-AllergyIntolerance-01.json';

import { expectJson } from '$test';
import { test } from 'vitest';
import { type AllergyIntolerance } from 'fhir/r3';
import { zibAllergyIntolerance } from './zibAllergyIntolerance';

test('parse returns the expected output 01', () => {
    const output = zibAllergyIntolerance.parse(input01 as AllergyIntolerance);
    expectJson(output).toMatchFileSnapshot('./fixtures/zib-AllergyIntolerance-01-output.snap.json');
});
