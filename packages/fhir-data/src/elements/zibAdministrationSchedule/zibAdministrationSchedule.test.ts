import { faker, testSet } from '$test';
import { expect, test } from 'vitest';
import { zibAdministrationSchedule } from './zibAdministrationSchedule';

testSet(
    'zibAdministrationSchedule parses successfully',
    faker.fhir.timing,
    (data) => {
        const schema = zibAdministrationSchedule.parse(data);
        expect(schema).toEqual(
            expect.objectContaining({
                duration: data.repeat?.duration,
            })
        );
    },
    false
);

test.each([
    {
        ...faker.fhir.timing(),
        repeat: undefined,
    },
    undefined,
])('zibAdministrationSchedule parses successfully when there data is undefined', (data) => {
    const zibData = zibAdministrationSchedule.parse(data);
    expect(zibData).toEqual(
        expect.objectContaining({
            duration: undefined,
        })
    );
});

testSet(
    'zibAdministrationSchedule UI schema group is created successfully',
    () => {
        const data = faker.fhir.timing();
        return zibAdministrationSchedule.parse(data);
    },
    (data) => {
        const schema = zibAdministrationSchedule.uiSchemaGroup(data);
        expect(schema.label).toBe('zib_administration_schedule.group');
    },
    false
);
