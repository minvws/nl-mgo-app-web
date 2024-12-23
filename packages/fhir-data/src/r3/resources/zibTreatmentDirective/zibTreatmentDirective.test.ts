import input from './fixtures/zib-TreatmentDirective-01.json';
import { expectJson, testUiSchemaContext, faker } from '$test';
import { test } from 'vitest';
import { type Consent } from 'fhir/r3';
import { zibTreatmentDirective } from './zibTreatmentDirective';

test('parseZibTreatmentDirective returns the expected output 01', () => {
    const output = zibTreatmentDirective.parse(input as Consent, faker.custom.i18nContext());
    expectJson(output).toMatchFileSnapshot('./fixtures/zib-TreatmentDirective-01-output.snap.json');
});

test('uiSchema returns the expected output', () => {
    const output = zibTreatmentDirective.parse(input as Consent, faker.custom.i18nContext());
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
