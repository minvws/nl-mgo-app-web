import { expectHealthCareUiSchemaJson, expectJson, testSchemaContext } from '$test';
import { type DeviceUseStatement } from '@minvws/mgo-fhir/r3';
import { test } from 'vitest';
import inputFhirData01 from './fixtures/01/fhir-resource.json' with { type: 'json' };
import inputFhirData02 from './fixtures/02/fhir-resource.json' with { type: 'json' };
import { zibMedicalDevice } from './zibMedicalDevice.js';

test('01: mgo-resource', async () => {
    const output = zibMedicalDevice.parse(inputFhirData01 as DeviceUseStatement);
    await expectJson(output).toMatchFileSnapshot('./fixtures/01/mgo-resource.snap.json');
});

test('01: ui-schema', async () => {
    const mgoResource = zibMedicalDevice.parse(inputFhirData01 as DeviceUseStatement);
    const schema = zibMedicalDevice.uiSchema(mgoResource, testSchemaContext());
    await expectHealthCareUiSchemaJson(schema).toMatchFileSnapshot(
        './fixtures/01/ui-schema.snap.json'
    );
});

test('02: mgo-resource', async () => {
    const output = zibMedicalDevice.parse(inputFhirData02 as DeviceUseStatement);
    await expectJson(output).toMatchFileSnapshot('./fixtures/02/mgo-resource.snap.json');
});

test('02: ui-schema', async () => {
    const mgoResource = zibMedicalDevice.parse(inputFhirData02 as DeviceUseStatement);
    const schema = zibMedicalDevice.uiSchema(mgoResource, testSchemaContext());
    await expectHealthCareUiSchemaJson(schema).toMatchFileSnapshot(
        './fixtures/02/ui-schema.snap.json'
    );
});
