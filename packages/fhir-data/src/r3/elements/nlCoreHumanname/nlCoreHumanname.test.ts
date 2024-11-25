import { faker, testSet } from '$test';
import { expect, test } from 'vitest';
import { nlCoreHumanname } from './nlCoreHumanname';

testSet(
    'humanName parses successfully',
    faker.fhir.humanName,
    (data) => {
        const schema = nlCoreHumanname.parse(data);
        expect(schema).toEqual(
            expect.objectContaining({
                text: data.text,
            })
        );
    },
    false
);

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

testSet(
    'humanName UI schema group is created successfully',
    () => {
        const data = faker.fhir.humanName();
        return nlCoreHumanname.parse(data);
    },
    (data) => {
        const schema = nlCoreHumanname.uiSchemaGroup(data);
        expect(schema.label).toBe('nl_core_humanname');
    },
    false
);
