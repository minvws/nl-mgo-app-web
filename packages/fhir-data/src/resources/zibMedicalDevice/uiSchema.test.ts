import { expectJson } from '$test';
import { test } from 'vitest';
import { type DeviceUseStatement } from '../../fhir';
import inputFhirData01 from './fixtures/01/fhir-resource.json';
import inputFhirData02 from './fixtures/02/fhir-resource.json';
import { uiSchema } from './uiSchema';
import { zibMedicalDevice } from './zibMedicalDevice';

const zibData01 = zibMedicalDevice.parse(inputFhirData01 as DeviceUseStatement);

test('uiSchema returns the expected output 01', () => {
    const zibUiSchema = uiSchema(zibData01);
    expectJson(zibUiSchema).toMatchFileSnapshot('./fixtures/01/ui-schema.snap.json');
});

const zibData02 = zibMedicalDevice.parse(inputFhirData02 as DeviceUseStatement);
test('uiSchema returns the expected output 02', () => {
    const zibUiSchema = uiSchema(zibData02);
    expectJson(zibUiSchema).toMatchFileSnapshot('./fixtures/02/ui-schema.snap.json');
});
