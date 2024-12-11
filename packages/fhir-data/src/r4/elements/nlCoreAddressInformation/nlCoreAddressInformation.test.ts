import { expectJson, testUiSchemaContext } from '$test';
import { type Address } from 'fhir/r4';
import { test } from 'vitest';
import input01 from './fixtures/01/fhir-resource.json';
import input02 from './fixtures/02/fhir-resource.json';
import { nlCoreAddressInformation } from './nlCoreAddressInformation';

test('returns the expected output 01', () => {
    const output = nlCoreAddressInformation.parse(input01 as Address);
    expectJson(output).toMatchFileSnapshot('./fixtures/01/mgo-resource.snap.json');
});

test('uiSchema returns the expected output 01', () => {
    const output = nlCoreAddressInformation.parse(input01 as Address);
    const uiSchemaGroup = nlCoreAddressInformation.uiSchemaGroup(
        output,
        testUiSchemaContext({
            ignoreMissingTranslations: true,
        })
    );
    expectJson(uiSchemaGroup).toMatchFileSnapshot('./fixtures/01/ui-schema-group.snap.json');
});

test('returns the expected output 02', () => {
    const output = nlCoreAddressInformation.parse(input02 as Address);
    expectJson(output).toMatchFileSnapshot('./fixtures/02/mgo-resource.snap.json');
});

test('uiSchema returns the expected output 02', () => {
    const output = nlCoreAddressInformation.parse(input02 as Address);
    const uiSchemaGroup = nlCoreAddressInformation.uiSchemaGroup(
        output,
        testUiSchemaContext({
            ignoreMissingTranslations: true,
        })
    );
    expectJson(uiSchemaGroup).toMatchFileSnapshot('./fixtures/02/ui-schema-group.snap.json');
});
