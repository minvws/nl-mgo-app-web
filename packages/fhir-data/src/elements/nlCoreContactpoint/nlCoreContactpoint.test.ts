import { faker, testSet } from '$test';
import { expect, test } from 'vitest';
import { nlCoreContactpoint } from './nlCoreContactpoint';

testSet(
    'parses successfully',
    faker.fhir.contactPoint,
    (data) => {
        const schema = nlCoreContactpoint.parse(data);
        expect(schema).toEqual(
            expect.objectContaining({
                value: data.value,
            })
        );
    },
    false
);

test('parses successfully when there data is undefined', () => {
    const zibData = nlCoreContactpoint.parse(undefined);
    expect(zibData).toEqual(
        expect.objectContaining({
            value: undefined,
        })
    );
});

testSet(
    'UI schema group is created successfully',
    () => {
        const data = faker.fhir.contactPoint();
        return nlCoreContactpoint.parse(data);
    },
    (data) => {
        const schema = nlCoreContactpoint.uiSchemaGroup(data);
        expect(schema.label).toBe('nl_core_contact_point');
    },
    false
);
