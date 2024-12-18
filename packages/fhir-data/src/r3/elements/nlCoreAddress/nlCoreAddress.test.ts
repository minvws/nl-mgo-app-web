import { faker, testUiSchemaContext } from '$test';
import { expect, test } from 'vitest';
import { nlCoreAddress } from './nlCoreAddress';

test('parses successfully', () => {
    const data = faker.fhir.address();
    const schema = nlCoreAddress.parse(data);
    expect(schema).toEqual(
        expect.objectContaining({
            city: data.city,
        })
    );
});

test('parses successfully when data is undefined', () => {
    const zibData = nlCoreAddress.parse(undefined);
    expect(zibData).toEqual(
        expect.objectContaining({
            city: undefined,
        })
    );
});

test('UI schema group is created successfully', () => {
    const data = nlCoreAddress.parse(faker.fhir.attachment());
    const schema = nlCoreAddress.uiSchemaGroup(
        data,
        testUiSchemaContext({
            useMock: true,
            ignoreMissingTranslations: true,
        })
    );
    expect(schema.label).toBe('r3.nl_core_address');
});
