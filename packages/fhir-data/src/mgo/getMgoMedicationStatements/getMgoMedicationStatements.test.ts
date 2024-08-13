import type { Bundle } from '../../fhir';
import medicationStatements from './fixtures/stu3-medication-input.json';
import expectedOutput from './fixtures/stu3-medication-output.json';

import { expect, test } from 'vitest';
import { getMgoMedicationStatements } from './getMgoMedicationStatements';

test('getMgoMedicationStatements returns the expected output', () => {
    const items = getMgoMedicationStatements(medicationStatements as Bundle);
    expect(items.length).toEqual(expectedOutput.length);

    items.forEach((item, index) => {
        expect(item).toEqual(expectedOutput[index]);
    });
});
