import { expectJson, testUiSchemaContext } from '$test';
import { fhirMessage } from '@minvws/mgo-mgo-intl/test';
import { type DeviceUseStatement } from 'fhir/r3';
import { expect, test } from 'vitest';
import input01 from './fixtures/01/fhir-resource.json';
import input02 from './fixtures/02/fhir-resource.json';
import { i18n } from './uiSchema';
import { zibMedicalDevice } from './zibMedicalDevice';

test('parse returns the expected output 01', () => {
    const output = zibMedicalDevice.parse(input01 as DeviceUseStatement);
    expectJson(output).toMatchFileSnapshot('./fixtures/01/mgo-resource.snap.json');
});

test('parse returns the expected output 02', () => {
    const output = zibMedicalDevice.parse(input02 as DeviceUseStatement);
    expectJson(output).toMatchFileSnapshot('./fixtures/02/mgo-resource.snap.json');
});

test('uiSchema returns the expected output 01', () => {
    const output = zibMedicalDevice.parse(input01 as DeviceUseStatement);
    const zibUiSchema = zibMedicalDevice.uiSchema(
        output,
        testUiSchemaContext({
            ignoreMissingTranslations: true,
        })
    );
    expectJson(zibUiSchema).toMatchFileSnapshot('./fixtures/01/ui-schema.snap.json');
});

test('uiSchema returns the expected output 02', () => {
    const output = zibMedicalDevice.parse(input02 as DeviceUseStatement);
    const zibUiSchema = zibMedicalDevice.uiSchema(
        output,
        testUiSchemaContext({
            ignoreMissingTranslations: true,
        })
    );
    expectJson(zibUiSchema).toMatchFileSnapshot('./fixtures/02/ui-schema.snap.json');
});

test('uiSchema returns default label if device not supplied', () => {
    const output = zibMedicalDevice.parse(input01 as DeviceUseStatement);
    output.device = undefined;
    const uiSchema = zibMedicalDevice.uiSchema(
        output,
        testUiSchemaContext({
            ignoreMissingTranslations: true,
        })
    );
    expect(uiSchema.label).toBe(fhirMessage(i18n));
});
