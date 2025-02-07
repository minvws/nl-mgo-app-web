import { expectHealthCareUiSchemaJson, expectJson, testUiSchemaContext } from '$test';
import { message } from '$test/i18n';
import type { MedicationRequest } from 'fhir/r3';
import { expect, test } from 'vitest';
import inputFhirData from './fixtures/zib-MedicationAgreement-01.json';
import { i18n } from './uiSchema';
import { zibMedicationAgreement } from './zibMedicationAgreement';

test('parseZibMedicationAgreement returns the expected output', () => {
    const output = zibMedicationAgreement.parse(inputFhirData as MedicationRequest);
    expectJson(output).toMatchFileSnapshot(
        './fixtures/zib-MedicationAgreement-01-output.snap.json'
    );
});

test('uiSchema returns the expected output', () => {
    const output = zibMedicationAgreement.parse(inputFhirData as MedicationRequest);
    const zibMedicationUseUiSchema = zibMedicationAgreement.uiSchema(
        output,
        testUiSchemaContext({
            ignoreMissingTranslations: true,
        })
    );
    expectHealthCareUiSchemaJson(zibMedicationUseUiSchema).toMatchFileSnapshot(
        './fixtures/zib-MedicationAgreement-01-uiSchema.snap.json'
    );
});

test('uiSchema returns default label if medicationReference not supplied', () => {
    const output = zibMedicationAgreement.parse(inputFhirData as MedicationRequest);
    output.medicationReference = undefined;
    const uiSchema = zibMedicationAgreement.uiSchema(
        output,
        testUiSchemaContext({
            ignoreMissingTranslations: true,
        })
    );
    expect(uiSchema.label).toBe(message(i18n));
});
