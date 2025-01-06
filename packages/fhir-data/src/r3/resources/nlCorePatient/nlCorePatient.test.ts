import { expectJson } from '$test';
import { type Patient } from 'fhir/r3';
import { test } from 'vitest';
import input01 from './fixtures/nl-core-Patient-01.json';
import { nlCorePatient } from './nlCorePatient';

test('parseNlCorePatient returns the expected output 01', () => {
    const output = nlCorePatient.parse(input01 as Patient);
    expectJson(output).toMatchFileSnapshot('./fixtures/nl-core-Patient-01-output.snap.json');
});
