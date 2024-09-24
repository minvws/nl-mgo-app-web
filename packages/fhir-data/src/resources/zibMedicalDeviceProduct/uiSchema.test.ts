import { expectJson } from '$test';
import { test } from 'vitest';
import { type Device } from '../../fhir';
import inputFhirData from './fixtures/zib-MedicalDeviceProduct-01.json';
import { uiSchema } from './uiSchema';
import { zibMedicalDeviceProduct } from './zibMedicalDeviceProduct';

const zibMedicalDeviceProductData = zibMedicalDeviceProduct.parse(inputFhirData as Device);

test('uiSchema returns the expected output', () => {
    const zibMedicalDeviceProductUiSchema = uiSchema(zibMedicalDeviceProductData);
    expectJson(zibMedicalDeviceProductUiSchema).toMatchFileSnapshot(
        './fixtures/zib-MedicalDeviceProduct-01-uiSchema.snap.json'
    );
});
