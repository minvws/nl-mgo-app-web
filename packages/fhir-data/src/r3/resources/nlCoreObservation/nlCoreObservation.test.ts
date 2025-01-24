import { expectJson, testUiSchemaContext } from '$test';
import { type Observation } from 'fhir/r3';
import { expect, test } from 'vitest';
import input from './fixtures/fhir-resource.json';
import { nlCoreObservation } from './nlCoreObservation';
import { message } from '$test/i18n';
import { i18n } from './uiSchema';

test('returns the expected output', () => {
    const output = nlCoreObservation.parse(input as Observation);
    expectJson(output).toMatchFileSnapshot('./fixtures/mgo-resource.snap.json');
});

test('uiSchema returns the expected output', () => {
    const output = nlCoreObservation.parse(input as Observation);
    const uiSchema = nlCoreObservation.uiSchema(
        output,
        testUiSchemaContext({
            ignoreMissingTranslations: true,
        })
    );
    expectJson(uiSchema).toMatchFileSnapshot('./fixtures/ui-schema.snap.json');
});

test('uiSchema returns default label if identifier not supplied', () => {
    const output = nlCoreObservation.parse(input as Observation);
    output.identifier = undefined;
    const uiSchema = nlCoreObservation.uiSchema(
        output,
        testUiSchemaContext({
            ignoreMissingTranslations: true,
        })
    );
    expect(uiSchema.label).toBe(message(i18n));
});
