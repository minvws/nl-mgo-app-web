import { expectJson, testUiSchemaContext } from '$test';
import { fhirMessage } from '@minvws/mgo-mgo-intl/test';
import { type Consent } from 'fhir/r3';
import { expect, test } from 'vitest';
import input from './fixtures/zib-TreatmentDirective-01.json';
import { i18n } from './uiSchema';
import { zibTreatmentDirective } from './zibTreatmentDirective';

test('parseZibTreatmentDirective returns the expected output 01', async () => {
    const output = zibTreatmentDirective.parse(input as Consent);
    await expectJson(output).toMatchFileSnapshot(
        './fixtures/zib-TreatmentDirective-01-output.snap.json'
    );
});

test('uiSchema returns the expected output', async () => {
    const output = zibTreatmentDirective.parse(input as Consent);
    const uiSchema = zibTreatmentDirective.uiSchema(
        output,
        testUiSchemaContext({
            ignoreMissingTranslations: true,
        })
    );
    await expectJson(uiSchema).toMatchFileSnapshot(
        './fixtures/zib-TreatmentDirective-01-uiSchema.snap.json'
    );
});

test('parses fine without an attachment', async () => {
    const output = zibTreatmentDirective.parse(input as Consent);
    output.sourceAttachment = undefined;
    const uiSchema = zibTreatmentDirective.uiSchema(
        output,
        testUiSchemaContext({
            ignoreMissingTranslations: true,
        })
    );
    expect(uiSchema.label).toBe('1ebf6227-8fdf-11ec-1682-020000000000');
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
