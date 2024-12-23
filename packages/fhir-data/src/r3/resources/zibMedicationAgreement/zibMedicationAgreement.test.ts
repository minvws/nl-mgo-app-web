import type { MedicationRequest } from 'fhir/r3';
import inputFhirData from './fixtures/zib-MedicationAgreement-01.json';

import { expectJson, testUiSchemaContext, faker } from '$test';
import { test } from 'vitest';
import { zibMedicationAgreement } from './zibMedicationAgreement';

test('parseZibMedicationAgreement returns the expected output', () => {
    const output = zibMedicationAgreement.parse(
        inputFhirData as MedicationRequest,
        faker.custom.i18nContext()
    );
    expectJson(output).toMatchFileSnapshot(
        './fixtures/zib-MedicationAgreement-01-output.snap.json'
    );
});

test('uiSchema returns the expected output', () => {
    const output = zibMedicationAgreement.parse(
        inputFhirData as MedicationRequest,
        faker.custom.i18nContext()
    );
    const zibMedicationUseUiSchema = zibMedicationAgreement.uiSchema(
        output,
        testUiSchemaContext({
            ignoreMissingTranslations: true,
        })
    );
    expectJson(zibMedicationUseUiSchema).toMatchFileSnapshot(
        './fixtures/zib-MedicationAgreement-01-uiSchema.snap.json'
    );
});
