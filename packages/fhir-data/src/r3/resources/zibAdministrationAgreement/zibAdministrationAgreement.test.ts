import { expectJson, testUiSchemaContext } from '$test';
import type { MedicationDispense } from 'fhir/r3';
import { expect, test } from 'vitest';
import inputFhirData from './fixtures/fhir-resource.json';
import { i18n, uiSchema } from './uiSchema';
import { zibAdministrationAgreement } from './zibAdministrationAgreement';
import { message } from '$test/i18n';

test('parseZibAdministrationAgreement returns the expected output', () => {
    const output = zibAdministrationAgreement.parse(inputFhirData as MedicationDispense);
    expectJson(output).toMatchFileSnapshot('./fixtures/mgo-resource.snap.json');
});

test('uiSchema returns the expected output', () => {
    const zibData = zibAdministrationAgreement.parse(inputFhirData as MedicationDispense);
    const zibMedicationUseUiSchema = uiSchema(
        zibData,
        testUiSchemaContext({
            ignoreMissingTranslations: true,
        })
    );
    expectJson(zibMedicationUseUiSchema).toMatchFileSnapshot('./fixtures/ui-schema.snap.json');
});

test('uiSchema returns default label if medicationReference not supplied', () => {
    const zibData = zibAdministrationAgreement.parse(inputFhirData as MedicationDispense);
    zibData.medicationReference = undefined;
    const uiSchema = zibAdministrationAgreement.uiSchema(
        zibData,
        testUiSchemaContext({
            ignoreMissingTranslations: true,
        })
    );
    expect(uiSchema.label).toBe(message(i18n));
});
