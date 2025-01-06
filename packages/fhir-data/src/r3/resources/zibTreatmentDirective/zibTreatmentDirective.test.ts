import { expectJson, testUiSchemaContext } from '$test';
import { type Consent } from 'fhir/r3';
import { test } from 'vitest';
import input from './fixtures/zib-TreatmentDirective-01.json';
import { zibTreatmentDirective } from './zibTreatmentDirective';

test('parseZibTreatmentDirective returns the expected output 01', () => {
    const output = zibTreatmentDirective.parse(input as Consent);
    expectJson(output).toMatchFileSnapshot('./fixtures/zib-TreatmentDirective-01-output.snap.json');
});

test('uiSchema returns the expected output', () => {
    const output = zibTreatmentDirective.parse(input as Consent);
    const uiSchema = zibTreatmentDirective.uiSchema(
        output,
        testUiSchemaContext({
            ignoreMissingTranslations: true,
        })
    );
    expectJson(uiSchema).toMatchFileSnapshot(
        './fixtures/zib-TreatmentDirective-01-uiSchema.snap.json'
    );
});
