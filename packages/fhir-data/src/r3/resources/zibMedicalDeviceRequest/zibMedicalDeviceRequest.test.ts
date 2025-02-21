import { expectJson, testUiSchemaContext } from '$test';
import { fhirMessage } from '@minvws/mgo-mgo-intl/test';
import { type DeviceRequest } from 'fhir/r3';
import { expect, test } from 'vitest';
import input1 from './fixtures/01/fhir-resource.json';
import input2 from './fixtures/02/fhir-resource.json';
import { i18n } from './uiSchema';
import { zibMedicalDeviceRequest } from './zibMedicalDeviceRequest';

test('returns the expected output 01', () => {
    const output = zibMedicalDeviceRequest.parse(input1 as DeviceRequest);
    expectJson(output).toMatchFileSnapshot('./fixtures/01/mgo-resource.snap.json');
});

test('returns the expected output 02', () => {
    const output = zibMedicalDeviceRequest.parse(input2 as DeviceRequest);
    expectJson(output).toMatchFileSnapshot('./fixtures/02/mgo-resource.snap.json');
});

test('uiSchema 01 returns the expected output', () => {
    const output = zibMedicalDeviceRequest.parse(input1 as DeviceRequest);
    const uiSchema = zibMedicalDeviceRequest.uiSchema(
        output,
        testUiSchemaContext({
            ignoreMissingTranslations: true,
        })
    );
    expectJson(uiSchema).toMatchFileSnapshot('./fixtures/01/ui-schema.snap.json');
});

test('uiSchema 02 returns the expected output', () => {
    const output = zibMedicalDeviceRequest.parse(input2 as DeviceRequest);
    const uiSchema = zibMedicalDeviceRequest.uiSchema(
        output,
        testUiSchemaContext({
            ignoreMissingTranslations: true,
        })
    );
    expectJson(uiSchema).toMatchFileSnapshot('./fixtures/02/ui-schema.snap.json');
});

test('uiSchema returns default label if occurrence not supplied', () => {
    const output = zibMedicalDeviceRequest.parse(input1 as DeviceRequest);
    output.occurrence = undefined;
    const uiSchema = zibMedicalDeviceRequest.uiSchema(
        output,
        testUiSchemaContext({
            ignoreMissingTranslations: true,
        })
    );
    expect(uiSchema.label).toBe(fhirMessage(i18n));
});
