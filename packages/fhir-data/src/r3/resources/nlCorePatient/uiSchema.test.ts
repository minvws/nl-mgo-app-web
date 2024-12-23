import { expectJson, testUiSchemaContext, faker } from '$test';
import { test } from 'vitest';
import { type Patient } from 'fhir/r3';
import inputFhirData from './fixtures/nl-core-Patient-01.json';
import { nlCorePatient } from './nlCorePatient';
import { uiSchema } from './uiSchema';

test('uiSchema returns the expected output', () => {
    const zibData = nlCorePatient.parse(inputFhirData as Patient, faker.custom.i18nContext());
    const zibUiSchema = uiSchema(
        zibData,
        testUiSchemaContext({
            ignoreMissingTranslations: true,
        })
    );
    expectJson(zibUiSchema).toMatchFileSnapshot('./fixtures/nl-core-Patient-01-uiSchema.snap.json');
});
