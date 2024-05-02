import type { Patient } from '../../../../fhir';

import patient1 from '../fixtures/stu3-patient-telecom-1.json';
import patient2 from '../fixtures/stu3-patient-telecom-2.json';
import patient3 from '../fixtures/stu3-patient-telecom-3.json';
import patient4 from '../fixtures/stu3-patient-telecom-4.json';

import { expect, test } from 'vitest';
import { getEmail } from './getEmail';

test.each<[Patient | undefined, string | undefined]>([
    [patient1 as Patient, 'current@hotmail.com'],
    [patient2 as Patient, 'user@home.nl'],
    [patient3 as Patient, 'XXX_Helleman@work.nl'],
    [patient4 as Patient, undefined],
    [undefined as Patient | undefined, undefined],
    [{} as Patient, undefined],
])("getEmail returns the patient's email", (patient, expected) => {
    expect(getEmail(patient)).toBe(expected);
});
