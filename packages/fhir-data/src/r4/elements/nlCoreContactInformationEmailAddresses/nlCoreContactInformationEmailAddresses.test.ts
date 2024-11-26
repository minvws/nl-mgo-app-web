import { expect, test } from 'vitest';
import { nlCoreContactInformationEmailAddresses } from './nlCoreContactInformationEmailAddresses';
import { expectJson, faker } from '$test';
import { type ContactPoint } from 'fhir/r4';
import inputContactPoint01 from './fixtures/01/fhir-resource.json';

test('returns undefined if the data is undefined', () => {
    const input = undefined;
    const zibData = nlCoreContactInformationEmailAddresses.parse(input);
    expect(zibData).toBeUndefined();
});

test('returns undefined if system is not email', () => {
    const input = faker.fhir.contactPoint({
        system: 'phone',
    }) as ContactPoint;
    const zibData = nlCoreContactInformationEmailAddresses.parse(input);
    expect(zibData).toBeUndefined();
});

test('returns the expected output 01', () => {
    const address = inputContactPoint01 as ContactPoint;
    const output = nlCoreContactInformationEmailAddresses.parse(address);
    expectJson(output).toMatchFileSnapshot('./fixtures/01/mgo-resource.snap.json');
});

test('uiSchema returns the expected output 01', () => {
    const address = inputContactPoint01 as ContactPoint;
    const output = nlCoreContactInformationEmailAddresses.parse(address);
    const uiSchemaGroup = nlCoreContactInformationEmailAddresses.uiSchemaGroup(output!);
    expectJson(uiSchemaGroup).toMatchFileSnapshot('./fixtures/01/ui-schema-group.snap.json');
});
