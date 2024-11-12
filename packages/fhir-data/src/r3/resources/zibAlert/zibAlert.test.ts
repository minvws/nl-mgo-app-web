import input from './fixtures/zib-Alert-01.json';

import { expectJson } from '$test';
import { test } from 'vitest';
import { type Flag } from 'fhir/r3';
import { zibAlert } from './zibAlert';

test('praseZibAlert returns the expected output 01', () => {
    const output = zibAlert.parse(input as Flag);
    expectJson(output).toMatchFileSnapshot('./fixtures/zib-Alert-01-output.snap.json');
});
