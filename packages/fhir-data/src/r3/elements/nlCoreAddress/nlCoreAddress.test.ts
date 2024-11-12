import { faker, testSet } from '$test';
import { expect, test } from 'vitest';
import { nlCoreAddress } from './nlCoreAddress';

testSet(
    'parses successfully',
    faker.fhir.address,
    (data) => {
        const schema = nlCoreAddress.parse(data);
        expect(schema).toEqual(
            expect.objectContaining({
                city: data.city,
            })
        );
    },
    false
);

test('parses successfully when data is undefined', () => {
    const zibData = nlCoreAddress.parse(undefined);
    expect(zibData).toEqual(
        expect.objectContaining({
            city: undefined,
        })
    );
});

testSet(
    'UI schema group is created successfully',
    () => {
        const data = faker.fhir.attachment();
        return nlCoreAddress.parse(data);
    },
    (data) => {
        const schema = nlCoreAddress.uiSchemaGroup(data);
        expect(schema.label).toBe('nl_core_address');
    },
    false
);
