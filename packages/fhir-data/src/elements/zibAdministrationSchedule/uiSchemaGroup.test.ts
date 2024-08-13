import { faker, testSet } from '$test';
import { expect } from 'vitest';
import { uiSchemaGroup } from './uiSchemaGroup';
import { zibAdministrationSchedule } from './zibAdministrationSchedule';

testSet(
    'zibInstructionsForUse schema group is created successfully',
    () => {
        const data = faker.fhir.timing();
        return zibAdministrationSchedule(data);
    },
    (data) => {
        const schema = uiSchemaGroup(data);
        expect(schema.label).toBe('zib_administration_schedule.group');
    },
    false
);
