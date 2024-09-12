import input from './fixtures/zib-TreatmentDirective-01.json';
import { expectJson } from '$test';
import { test } from 'vitest';
import { type Consent } from '../../fhir';
import { zibTreatmentDirective } from './zibTreatmentDirective';

test('parseZibTreatmentDirective returns the expected output 01', () => {
    const output = zibTreatmentDirective.parse(input as Consent);
    expectJson(output).toMatchFileSnapshot('./fixtures/zib-TreatmentDirective-01-output.snap.json');
});
