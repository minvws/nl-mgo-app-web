import { expectJson, testUiSchemaContext } from '$test';
import { fhirMessage } from '@minvws/mgo-mgo-intl/test';
import { type Observation } from 'fhir/r3';
import { expect, test } from 'vitest';
import input from './fixtures/fhir-resource.json';
import { i18n } from './uiSchema';
import { zibBodyWeight } from './zibBodyWeight';

test('returns the expected output 01', () => {
    const output = zibBodyWeight.parse(input as Observation);
    expectJson(output).toMatchFileSnapshot('./fixtures/mgo-resource.snap.json');
});

test('uiSchema returns the expected output', () => {
    const output = zibBodyWeight.parse(input as Observation);
    const uiSchema = zibBodyWeight.uiSchema(
        output,
        testUiSchemaContext({
            ignoreMissingTranslations: true,
        })
    );
    expectJson(uiSchema).toMatchFileSnapshot('./fixtures/ui-schema.snap.json');
});

test('uiSchema returns default label if effectiveDateTime not supplied', () => {
    const output = zibBodyWeight.parse(input as Observation);
    output.effectiveDateTime = undefined;
    const uiSchema = zibBodyWeight.uiSchema(
        output,
        testUiSchemaContext({
            ignoreMissingTranslations: true,
        })
    );
    expect(uiSchema.label).toBe(fhirMessage(i18n));
});
