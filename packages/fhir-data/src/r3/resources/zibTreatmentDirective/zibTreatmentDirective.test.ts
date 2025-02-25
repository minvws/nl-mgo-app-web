import { expectJson, testUiSchemaContext } from '$test';
import { fhirMessage } from '@minvws/mgo-mgo-intl/test';
import { type Consent } from 'fhir/r3';
import { expect, test } from 'vitest';
import input from './fixtures/zib-TreatmentDirective-01.json';
import { i18n } from './uiSchema';
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

test('uiSchema returns default label if identifier not supplied', () => {
    const output = zibTreatmentDirective.parse(input as Consent);
    output.identifier = undefined;
    const uiSchema = zibTreatmentDirective.uiSchema(
        output,
        testUiSchemaContext({
            ignoreMissingTranslations: true,
        })
    );
    expect(uiSchema.label).toBe(fhirMessage(i18n));
});
