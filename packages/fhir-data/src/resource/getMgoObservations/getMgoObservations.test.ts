import type { Bundle } from '../../fhir';
import observations from './fixtures/stu3-observation-input.json';
import expectedOutput from './fixtures/stu3-observation-output.json';

import { expect, test } from 'vitest';
import { getMgoObservations } from './getMgoObservations';

test('getMgoObservations returns the expected output', () => {
    const items = getMgoObservations(observations as Bundle);
    expect(items.length).toEqual(expectedOutput.length);

    items.forEach((item, index) => {
        expect(item).toEqual(expectedOutput[index]);
    });
});
