import { faker, testUiSchemaContext } from '$test';
import { expect, test } from 'vitest';
import { nlCoreHumanname } from './nlCoreHumanname';

test('humanName parses successfully', () => {
    const data = faker.fhir.humanName();
    const schema = nlCoreHumanname.parse(data);
    expect(schema).toEqual(
        expect.objectContaining({
            text: data.text,
        })
    );
});

test.each([
    {
        ...faker.fhir.humanName(),
        text: undefined,
    },
    undefined,
])('humanName parses successfully when there data is undefined', (data) => {
    const zibData = nlCoreHumanname.parse(data);
    expect(zibData).toEqual(
        expect.objectContaining({
            text: undefined,
        })
    );
});

test('humanName UI schema group is created successfully', () => {
    const data = nlCoreHumanname.parse(faker.fhir.humanName());
    const schema = nlCoreHumanname.uiSchemaGroup(
        data,
        testUiSchemaContext({
            useMock: true,
            ignoreMissingTranslations: true,
        })
    );
    expect(schema.label).toBe('nl_core_humanname');
});
