import { expectHealthCareUiSchemaJson, expectJson, testSchemaContext } from '$test';
import { type Device } from '@minvws/mgo-fhir/r3';
import { test } from 'vitest';
import inputFhirData from './fixtures/fhir-resource.json' with { type: 'json' };
import { zibMedicalDeviceProduct } from './zibMedicalDeviceProduct.js';

test('01: mgo-resource', async () => {
    const output = zibMedicalDeviceProduct.parse(inputFhirData as Device);
    await expectJson(output).toMatchFileSnapshot('./fixtures/mgo-resource.snap.json');
});

test('01: ui-schema', async () => {
    const mgoResource = zibMedicalDeviceProduct.parse(inputFhirData as Device);
    const zibMedicalDeviceProductUiSchema = zibMedicalDeviceProduct.uiSchema(
        mgoResource,
        testSchemaContext()
    );
    await expectHealthCareUiSchemaJson(zibMedicalDeviceProductUiSchema).toMatchFileSnapshot(
        './fixtures/ui-schema.snap.json'
    );
});
