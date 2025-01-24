import { expectJson, testUiSchemaContext } from '$test';
import { type Observation } from 'fhir/r3';
import { expect, test } from 'vitest';
import input from './fixtures/fhir-resource.json';
import { zibBodyHeight } from './zibBodyHeight';
import { message } from '$test/i18n';
import { i18n } from './uiSchema';

test('returns the expected output 01', () => {
    const output = zibBodyHeight.parse(input as Observation);
    expectJson(output).toMatchFileSnapshot('./fixtures/mgo-resource.snap.json');
});

test('uiSchema returns the expected output', () => {
    const output = zibBodyHeight.parse(input as Observation);
    const uiSchema = zibBodyHeight.uiSchema(
        output,
        testUiSchemaContext({
            ignoreMissingTranslations: true,
        })
    );
    expectJson(uiSchema).toMatchFileSnapshot('./fixtures/ui-schema.snap.json');
});

test('uiSchema returns default label if effectiveDateTime not supplied', () => {
    const output = zibBodyHeight.parse(input as Observation);
    output.effectiveDateTime = undefined;
    const uiSchema = zibBodyHeight.uiSchema(
        output,
        testUiSchemaContext({
            ignoreMissingTranslations: true,
        })
    );
    expect(uiSchema.label).toBe(message(i18n));
});
