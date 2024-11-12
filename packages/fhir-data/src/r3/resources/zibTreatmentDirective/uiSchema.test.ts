import { expectJson } from '$test';
import { test } from 'vitest';
import { type Consent } from 'fhir/r3';
import input from './fixtures/zib-TreatmentDirective-01.json';
import { zibTreatmentDirective } from './zibTreatmentDirective';

test('uiSchema returns the expected output', () => {
    const zibData = zibTreatmentDirective.parse(input as Consent);
    const uiSchema = zibTreatmentDirective.uiSchema(zibData);
    expectJson(uiSchema).toMatchFileSnapshot(
        './fixtures/zib-TreatmentDirective-01-uiSchema.snap.json'
    );
});
