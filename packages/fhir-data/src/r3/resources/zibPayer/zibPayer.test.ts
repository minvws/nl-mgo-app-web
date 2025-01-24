import { expectJson, testUiSchemaContext } from '$test';
import { type Coverage } from 'fhir/r3';
import { expect, test } from 'vitest';
import input01 from './fixtures/zib-Payer-01.json';
import { zibPayer } from './zibPayer';
import { message } from '$test/i18n';
import { i18n } from './uiSchema';

test('parseZibPayer returns the expected output 01', () => {
    const output = zibPayer.parse(input01 as Coverage);
    expectJson(output).toMatchFileSnapshot('./fixtures/zib-Payer-01-output.snap.json');
});

test('uiSchema returns the expected output', () => {
    const output = zibPayer.parse(input01 as Coverage);
    const zibPayerUiSchema = zibPayer.uiSchema(
        output,
        testUiSchemaContext({
            ignoreMissingTranslations: true,
        })
    );
    expectJson(zibPayerUiSchema).toMatchFileSnapshot('./fixtures/zib-Payer-01-uiSchema.snap.json');
});

test('uiSchema returns default label if identifier not supplied', () => {
    const output = zibPayer.parse(input01 as Coverage);
    output.identifier = undefined;
    const uiSchema = zibPayer.uiSchema(
        output,
        testUiSchemaContext({
            ignoreMissingTranslations: true,
        })
    );
    expect(uiSchema.label).toBe(message(i18n));
});
