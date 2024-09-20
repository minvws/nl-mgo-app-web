import input from './fixtures/fhir-resource.json';

import { expectJson } from '$test';
import { test } from 'vitest';
import { type Observation } from '../../fhir';
import { zibFunctionalOrMentalStatus } from './zibFunctionalOrMentalStatus';

test('returns the expected output 01', () => {
    const output = zibFunctionalOrMentalStatus.parse(input as Observation);
    expectJson(output).toMatchFileSnapshot('./fixtures/mgo-resource.snap.json');
});

test('uiSchema returns the expected output', () => {
    const output = zibFunctionalOrMentalStatus.parse(input as Observation);
    const uiSchema = zibFunctionalOrMentalStatus.uiSchema(output);
    expectJson(uiSchema).toMatchFileSnapshot('./fixtures/ui-schema.snap.json');
});
