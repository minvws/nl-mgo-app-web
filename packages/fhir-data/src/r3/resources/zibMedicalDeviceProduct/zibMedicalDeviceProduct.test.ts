import type { Device } from 'fhir/r3';
import inputFhirData from './fixtures/zib-MedicalDeviceProduct-01.json';

import { expectJson, testUiSchemaContext, faker } from '$test';
import { test } from 'vitest';
import { zibMedicalDeviceProduct } from './zibMedicalDeviceProduct';

test('parseZibMedicalDeviceProduct returns the expected output', () => {
    const output = zibMedicalDeviceProduct.parse(
        inputFhirData as Device,
        faker.custom.i18nContext()
    );
    expectJson(output).toMatchFileSnapshot(
        './fixtures/zib-MedicalDeviceProduct-01-output.snap.json'
    );
});

test('uiSchema returns the expected output', () => {
    const output = zibMedicalDeviceProduct.parse(
        inputFhirData as Device,
        faker.custom.i18nContext()
    );
    const zibMedicalDeviceProductUiSchema = zibMedicalDeviceProduct.uiSchema(
        output,
        testUiSchemaContext({
            ignoreMissingTranslations: true,
        })
    );
    expectJson(zibMedicalDeviceProductUiSchema).toMatchFileSnapshot(
        './fixtures/zib-MedicalDeviceProduct-01-uiSchema.snap.json'
    );
});
