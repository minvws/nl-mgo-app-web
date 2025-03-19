import { expectJson, faker, testUiSchemaContext } from '$test';
import { type ContactPoint } from 'fhir/r4';
import { expect, test } from 'vitest';
import inputContactPoint01 from './fixtures/01/fhir-resource.json';
import { nlCoreContactInformationEmailAddresses } from './nlCoreContactInformationEmailAddresses';

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

test('returns the expected output 01', async () => {
    const address = inputContactPoint01 as ContactPoint;
    const output = nlCoreContactInformationEmailAddresses.parse(address);
    await expectJson(output).toMatchFileSnapshot('./fixtures/01/mgo-resource.snap.json');
});

test('uiSchema returns the expected output 01', async () => {
    const address = inputContactPoint01 as ContactPoint;
    const output = nlCoreContactInformationEmailAddresses.parse(address);
    const uiSchemaGroup = nlCoreContactInformationEmailAddresses.uiSchemaGroup(
        output!,
        testUiSchemaContext()
    );
    await expectJson(uiSchemaGroup).toMatchFileSnapshot('./fixtures/01/ui-schema-group.snap.json');
});
