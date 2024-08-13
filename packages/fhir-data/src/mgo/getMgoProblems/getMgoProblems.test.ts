import type { Bundle } from '../../fhir';
import problems from './fixtures/problem-input.json';
import expectedOutput from './fixtures/problem-output.json';

import { expect, test } from 'vitest';
import { getMgoProblems } from './getMgoProblems';

test('getMgoMedicationStatements returns the expected output', () => {
    const items = getMgoProblems(problems as Bundle);
    expect(items.length).toEqual(expectedOutput.length);

    items.forEach((item, index) => {
        expect(item).toEqual(expectedOutput[index]);
    });
});
