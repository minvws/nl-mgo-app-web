import { expectJson, faker } from '$test';
import { type ContactPoint } from 'fhir/r4';
import { expect, test } from 'vitest';
import inputContactPoint01 from './fixtures/01/fhir-resource.json';
import { nlCoreContactInformationTelephoneNumbers } from './nlCoreContactInformationTelephoneNumbers';

test('returns undefined if the data is undefined', () => {
    const input = undefined;
    const zibData = nlCoreContactInformationTelephoneNumbers.parse(input);
    expect(zibData).toBeUndefined();
});

test('returns undefined if system is not email', () => {
    const input = faker.fhir.contactPoint({
        system: 'email',
    }) as ContactPoint;
    const zibData = nlCoreContactInformationTelephoneNumbers.parse(input);
    expect(zibData).toBeUndefined();
});

test('returns the expected output 01', () => {
    const address = inputContactPoint01 as ContactPoint;
    const output = nlCoreContactInformationTelephoneNumbers.parse(address);
    expectJson(output).toMatchFileSnapshot('./fixtures/01/mgo-resource.snap.json');
});

test('uiSchema returns the expected output 01', () => {
    const address = inputContactPoint01 as ContactPoint;
    const output = nlCoreContactInformationTelephoneNumbers.parse(address);
    const uiSchemaGroup = nlCoreContactInformationTelephoneNumbers.uiSchemaGroup(output!);
    expectJson(uiSchemaGroup).toMatchFileSnapshot('./fixtures/01/ui-schema-group.snap.json');
});
