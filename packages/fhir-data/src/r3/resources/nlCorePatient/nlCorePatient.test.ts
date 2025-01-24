import { expectJson, testUiSchemaContext } from '$test';
import { type Patient } from 'fhir/r3';
import { expect, test } from 'vitest';
import input01 from './fixtures/nl-core-Patient-01.json';
import { nlCorePatient } from './nlCorePatient';
import { message } from '$test/i18n';
import { i18n } from './uiSchema';

test('parseNlCorePatient returns the expected output 01', () => {
    const output = nlCorePatient.parse(input01 as Patient);
    expectJson(output).toMatchFileSnapshot('./fixtures/nl-core-Patient-01-output.snap.json');
});

test('uiSchema returns the expected output', () => {
    const output = nlCorePatient.parse(input01 as Patient);
    const zibUiSchema = nlCorePatient.uiSchema(
        output,
        testUiSchemaContext({
            ignoreMissingTranslations: true,
        })
    );
    expectJson(zibUiSchema).toMatchFileSnapshot('./fixtures/nl-core-Patient-01-uiSchema.snap.json');
});

test('uiSchema returns default label if name not supplied', () => {
    const output = nlCorePatient.parse(input01 as Patient);
    output.name = undefined;
    const uiSchema = nlCorePatient.uiSchema(
        output,
        testUiSchemaContext({
            ignoreMissingTranslations: true,
        })
    );
    expect(uiSchema.label).toBe(message(i18n));
});
