import input01 from './fixtures/zib-Payer-01.json';

import { expectJson } from '$test';
import { test } from 'vitest';
import { type Coverage } from '../../fhir';
import { zibPayer } from './zibPayer';

test('parseZibPayer returns the expected output 01', () => {
    const output = zibPayer.parse(input01 as Coverage);
    expectJson(output).toMatchFileSnapshot('./fixtures/zib-Payer-01-output.snap.json');
});
