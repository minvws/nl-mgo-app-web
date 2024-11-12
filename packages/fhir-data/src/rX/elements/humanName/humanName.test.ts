import { faker, testSet } from '$test';
import { expect, test } from 'vitest';
import { humanName } from './humanName';

testSet(
    'humanName parses successfully',
    faker.fhir.humanName,
    (data) => {
        const schema = humanName.parse(data);
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
    const zibData = humanName.parse(data);
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
        return humanName.parse(data);
    },
    (data) => {
        const schema = humanName.uiSchemaGroup(data);
        expect(schema.label).toBe('human_name');
    },
    false
);
