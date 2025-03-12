import { expectHealthCareUiSchemaJson, expectJson, testUiSchemaContext } from '$test';
import { fhirMessage } from '@minvws/mgo-mgo-intl/test';
import type { MedicationDispense } from 'fhir/r3';
import { expect, test } from 'vitest';
import inputFhirData from './fixtures/fhir-resource.json';
import { i18n, uiSchema } from './uiSchema';
import { zibAdministrationAgreement } from './zibAdministrationAgreement';

test('parseZibAdministrationAgreement returns the expected output', async () => {
    const output = zibAdministrationAgreement.parse(inputFhirData as MedicationDispense);
    await expectJson(output).toMatchFileSnapshot('./fixtures/mgo-resource.snap.json');
});

test('uiSchema returns the expected output', async () => {
    const zibData = zibAdministrationAgreement.parse(inputFhirData as MedicationDispense);
    const zibMedicationUseUiSchema = uiSchema(
        zibData,
        testUiSchemaContext({
            ignoreMissingTranslations: true,
        })
    );
    await expectHealthCareUiSchemaJson(zibMedicationUseUiSchema).toMatchFileSnapshot(
        './fixtures/ui-schema.snap.json'
    );
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
    expect(uiSchema.label).toBe(fhirMessage(i18n));
});
