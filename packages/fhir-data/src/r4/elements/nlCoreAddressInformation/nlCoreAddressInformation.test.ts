import { expectJson } from '$test';
import { type RelatedPerson } from 'fhir/r4';
import { test } from 'vitest';
import inputContactPerson01 from './fixtures/01/fhir-resource-contact-person.json';
import inputContactPerson02 from './fixtures/02/fhir-resource-contact-person.json';
import { nlCoreAddressInformation } from './nlCoreAddressInformation';

test('returns the expected output 01', () => {
    const address = (inputContactPerson01 as RelatedPerson).address![0];
    const output = nlCoreAddressInformation.parse(address);
    expectJson(output).toMatchFileSnapshot('./fixtures/01/mgo-resource.snap.json');
});

test('uiSchema returns the expected output 01', () => {
    const address = (inputContactPerson01 as RelatedPerson).address![0];
    const output = nlCoreAddressInformation.parse(address);
    const uiSchemaGroup = nlCoreAddressInformation.uiSchemaGroup(output);
    expectJson(uiSchemaGroup).toMatchFileSnapshot('./fixtures/01/ui-schema-group.snap.json');
});

test('returns the expected output 02', () => {
    const address = (inputContactPerson02 as RelatedPerson).address![0];
    const output = nlCoreAddressInformation.parse(address);
    expectJson(output).toMatchFileSnapshot('./fixtures/02/mgo-resource.snap.json');
});

test('uiSchema returns the expected output 02', () => {
    const address = (inputContactPerson02 as RelatedPerson).address![0];
    const output = nlCoreAddressInformation.parse(address);
    const uiSchemaGroup = nlCoreAddressInformation.uiSchemaGroup(output);
    expectJson(uiSchemaGroup).toMatchFileSnapshot('./fixtures/02/ui-schema-group.snap.json');
});
