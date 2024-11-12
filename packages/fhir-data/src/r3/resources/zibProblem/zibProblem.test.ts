import input from './fixtures/zib-Problem-01.json';

import { expectJson } from '$test';
import { test } from 'vitest';
import { type Condition } from 'fhir/r3';
import { zibProblem } from './zibProblem';

test('parseZibProblem returns the expected output 01', () => {
    const output = zibProblem.parse(input as Condition);
    expectJson(output).toMatchFileSnapshot('./fixtures/zib-Problem-01-output.snap.json');
});
