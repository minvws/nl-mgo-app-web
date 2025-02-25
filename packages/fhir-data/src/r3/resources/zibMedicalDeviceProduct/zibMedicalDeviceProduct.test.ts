import { expectJson, testUiSchemaContext } from '$test';
import { fhirMessage } from '@minvws/mgo-mgo-intl/test';
import type { Device } from 'fhir/r3';
import { expect, test } from 'vitest';
import inputFhirData from './fixtures/zib-MedicalDeviceProduct-01.json';
import { i18n } from './uiSchema';
import { zibMedicalDeviceProduct } from './zibMedicalDeviceProduct';

test('parseZibMedicalDeviceProduct returns the expected output', () => {
    const output = zibMedicalDeviceProduct.parse(inputFhirData as Device);
    expectJson(output).toMatchFileSnapshot(
        './fixtures/zib-MedicalDeviceProduct-01-output.snap.json'
    );
});

test('uiSchema returns the expected output', () => {
    const output = zibMedicalDeviceProduct.parse(inputFhirData as Device);
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

test('uiSchema returns default label if id not supplied', () => {
    const output = zibMedicalDeviceProduct.parse(inputFhirData as Device);
    output.id = undefined;
    const uiSchema = zibMedicalDeviceProduct.uiSchema(
        output,
        testUiSchemaContext({
            ignoreMissingTranslations: true,
        })
    );
    expect(uiSchema.label).toBe(fhirMessage(i18n));
});
