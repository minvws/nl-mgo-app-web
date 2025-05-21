import { expectHealthCareUiSchemaJson, expectJson, testUiSchemaContext } from '$test';
import { type DeviceRequest } from 'fhir/r3';
import { test } from 'vitest';
import input1 from './fixtures/01/fhir-resource.json';
import input2 from './fixtures/02/fhir-resource.json';
import { zibMedicalDeviceRequest } from './zibMedicalDeviceRequest';

test('01: mgo-resource', async () => {
    const output = zibMedicalDeviceRequest.parse(input1 as DeviceRequest);
    await expectJson(output).toMatchFileSnapshot('./fixtures/01/mgo-resource.snap.json');
});

test('02: mgo-resource', async () => {
    const output = zibMedicalDeviceRequest.parse(input2 as DeviceRequest);
    await expectJson(output).toMatchFileSnapshot('./fixtures/02/mgo-resource.snap.json');
});

test('01: ui-schema', async () => {
    const output = zibMedicalDeviceRequest.parse(input1 as DeviceRequest);
    const uiSchema = zibMedicalDeviceRequest.uiSchema(output, testUiSchemaContext());
    await expectHealthCareUiSchemaJson(uiSchema).toMatchFileSnapshot(
        './fixtures/01/ui-schema.snap.json'
    );
});

test('02: ui-schema', async () => {
    const output = zibMedicalDeviceRequest.parse(input2 as DeviceRequest);
    const uiSchema = zibMedicalDeviceRequest.uiSchema(output, testUiSchemaContext());
    await expectHealthCareUiSchemaJson(uiSchema).toMatchFileSnapshot(
        './fixtures/02/ui-schema.snap.json'
    );
});
