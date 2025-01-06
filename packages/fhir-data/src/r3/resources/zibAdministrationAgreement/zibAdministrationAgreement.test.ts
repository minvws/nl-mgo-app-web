import { expectJson, testUiSchemaContext } from '$test';
import type { MedicationDispense } from 'fhir/r3';
import { test } from 'vitest';
import inputFhirData from './fixtures/fhir-resource.json';
import { uiSchema } from './uiSchema';
import { zibAdministrationAgreement } from './zibAdministrationAgreement';

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
