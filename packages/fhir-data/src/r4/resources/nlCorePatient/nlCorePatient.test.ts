import input01 from './fixtures/nl-core-Patient-01.json';

import { expectJson } from '$test';
import { test } from 'vitest';
import { type Patient } from 'fhir/r4';
import { nlCorePatientR4 } from './nlCorePatient';

test('parseNlCorePatient returns the expected output 01', () => {
    const output = nlCorePatientR4.parse(input01 as Patient);
    expectJson(output).toMatchFileSnapshot('./fixtures/nl-core-Patient-01-output.snap.json');
});
