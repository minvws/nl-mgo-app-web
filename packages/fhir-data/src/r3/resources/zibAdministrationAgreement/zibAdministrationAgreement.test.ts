import type { MedicationDispense } from 'fhir/r3';
import inputFhirData from './fixtures/fhir-resource.json';

import { expectJson, testUiSchemaContext, faker } from '$test';
import { test } from 'vitest';
import { zibAdministrationAgreement } from './zibAdministrationAgreement';
import { uiSchema } from './uiSchema';

test('parseZibAdministrationAgreement returns the expected output', () => {
    const output = zibAdministrationAgreement.parse(
        inputFhirData as MedicationDispense,
        faker.custom.i18nContext()
    );
    expectJson(output).toMatchFileSnapshot('./fixtures/mgo-resource.snap.json');
});

test('uiSchema returns the expected output', () => {
    const zibData = zibAdministrationAgreement.parse(
        inputFhirData as MedicationDispense,
        faker.custom.i18nContext()
    );
    const zibMedicationUseUiSchema = uiSchema(
        zibData,
        testUiSchemaContext({
            ignoreMissingTranslations: true,
        })
    );
    expectJson(zibMedicationUseUiSchema).toMatchFileSnapshot('./fixtures/ui-schema.snap.json');
});
