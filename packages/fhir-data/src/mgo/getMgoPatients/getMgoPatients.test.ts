import type { Bundle } from '../../fhir';
import patients from './fixtures/stu3-patient-input.json';
import expectedOutput from './fixtures/stu3-patient-output.json';

import { expect, test } from 'vitest';
import { getMgoPatients } from './getMgoPatients';

test('getMgoPatients returns the expected output', () => {
    const items = getMgoPatients(patients as Bundle);
    expect(items.length).toEqual(expectedOutput.length);

    items.forEach((item, index) => {
        expect(item).toEqual(expectedOutput[index]);
    });
});
