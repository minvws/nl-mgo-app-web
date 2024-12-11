import { faker, testUiSchemaContext } from '$test';
import { expect, test } from 'vitest';
import { nlCoreContactpoint } from './nlCoreContactpoint';

test('parses successfully', () => {
    const data = faker.fhir.contactPoint();
    const schema = nlCoreContactpoint.parse(data);
    expect(schema).toEqual(
        expect.objectContaining({
            value: data.value,
        })
    );
});

test('parses successfully when there data is undefined', () => {
    const zibData = nlCoreContactpoint.parse(undefined);
    expect(zibData).toEqual(
        expect.objectContaining({
            value: undefined,
        })
    );
});

test('UI schema group is created successfully', () => {
    const data = nlCoreContactpoint.parse(faker.fhir.contactPoint());
    const schema = nlCoreContactpoint.uiSchemaGroup(
        data,
        testUiSchemaContext({
            useMock: true,
            ignoreMissingTranslations: true,
        })
    );
    expect(schema.label).toBe('nl_core_contact_point');
});
