import type { Patient } from '../../../../fhir';

import patient1 from '../fixtures/stu3-patient-name-1.json';
import patient2 from '../fixtures/stu3-patient-name-2.json';
import patient3 from '../fixtures/stu3-patient-name-3.json';
import patient4 from '../fixtures/stu3-patient-name-4.json';

import { expect, test } from 'vitest';
import { getHumanName } from '..';

test.each<[Patient | undefined, string | undefined]>([
    [patient1 as Patient, 'Jim'],
    [patient2 as Patient, 'Dr. phil. Regina Johanna Maria von Hochheim-Weilenfels NCFSA'],
    [patient3 as Patient, 'Johan XXX_Helleman'],
    [patient4 as Patient, 'Karin Berg'],
    [undefined as Patient | undefined, undefined],
    [{} as Patient, undefined],
])(
    'getHumanName returns the patient name with a preference for the "usual" use name',
    (patient, expected) => {
        expect(getHumanName(patient)).toBe(expected);
    }
);
